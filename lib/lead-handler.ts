import { clientIp } from './rate-limit';
import { decideLead } from './lead-decision';
import { resolveReviewDestination } from './review-destination';
import type { LeadPayload, SendLeadEmailOptions } from './email';

/**
 * Everything POST /api/lead actually does, with the delivery channels passed
 * in instead of imported.
 *
 * app/api/lead/route.ts is a thin wrapper that supplies the real Resend
 * mailer, the real GoHighLevel client, the real rate limiter and Next's
 * `after()`. That split exists so the routing policy — including the failure
 * paths, which are the part that can silently lose a lead — is testable
 * without a network, a mailbox or a CRM. See scripts/test-lead-route.mjs.
 *
 * What happens to a submission is decided by lib/lead-decision.ts:
 *   'drop'    → honeypot was filled. Nothing sent. The only discard path.
 *   'review'  → scored as a solicitation. Goes to OUR review mailbox only —
 *               never the client, never GoHighLevel.
 *   'deliver' → real lead: client email + GoHighLevel. Borderline ones are
 *               delivered tagged "[Check]" with a copy to review.
 *
 * Two rules this file exists to hold:
 *
 *  1. Review mail goes to an address resolved by lib/review-destination.ts,
 *     never to the client's LEAD_NOTIFY_EMAIL. Before Nov 2026 a filtered
 *     pitch fell back to the client's own inbox, so the filter relabelled
 *     solicitations instead of taking them off their desk.
 *
 *  2. A filtered submission is only reported as accepted if the review
 *     mailbox actually took it. There is no database here, so that one email
 *     IS the record. If it fails, the visitor is told the submission failed —
 *     all three forms then show the phone number and the direct email address
 *     — rather than being thanked while a real, mis-scored roofing lead is
 *     thrown away.
 */

export interface LeadChannels {
  sendEmail(lead: LeadPayload, options?: SendLeadEmailOptions): Promise<boolean>;
  createGhl(lead: LeadPayload): Promise<{ ghl: boolean }>;
  /** Counts this submission; true when the address is over its burst. */
  overRateLimit(ip: string | null): boolean;
  /**
   * Keep background work alive after the response is returned. In the route
   * this is Next's `after()`; a serverless function can be frozen the moment
   * it responds, so an un-deferred fire-and-forget send is simply abandoned.
   */
  defer(work: () => Promise<unknown>): void;
  env: Record<string, string | undefined>;
  /** True only on the real production deployment. */
  productionRuntime: boolean;
  log?: { warn(...args: unknown[]): void; error(...args: unknown[]): void };
}

export interface LeadResponseBody {
  ok: boolean;
  email: boolean;
  ghl: boolean;
  /** Present on every scored submission; the browser skips GA4 when true. */
  filtered?: boolean;
  error?: string;
  /** True when the visitor can usefully try again. */
  retryable?: boolean;
}

export interface LeadResponse {
  status: number;
  body: LeadResponseBody;
}

const RETRY_MESSAGE =
  'We could not record your message. Please try again, or call (678) 983-4455.';

function field(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function handleLead(
  request: Request,
  channels: LeadChannels
): Promise<LeadResponse> {
  const { env, log = console } = channels;

  let body: Record<string, unknown> = {};
  try {
    body = (await request.json()) as Record<string, unknown>;
    if (!body || typeof body !== 'object' || Array.isArray(body)) body = {};
  } catch {
    return {
      status: 400,
      body: { ok: false, email: false, ghl: false, error: 'Invalid JSON body' },
    };
  }

  const lead: LeadPayload = {
    firstName: field(body.firstName),
    lastName: field(body.lastName),
    email: field(body.email),
    phone: field(body.phone),
    address: field(body.address),
    newClient: field(body.newClient),
    message: field(body.message),
    source: field(body.source) || 'contact-form',
  };

  // Minimal validation: need at least an email or a phone to be actionable.
  if (!lead.email && !lead.phone) {
    return {
      status: 400,
      body: { ok: false, email: false, ghl: false, error: 'Email or phone required' },
    };
  }

  const decision = decideLead(lead, {
    honeypot: body.website,
    startedAt: body.ts,
    overRateLimit: channels.overRateLimit(clientIp(request)),
  });

  if (decision.action === 'drop') {
    log.warn(`[lead] dropped bot submission: ${decision.reasons.join(', ')}`);
    return { status: 200, body: { ok: true, email: false, ghl: false, filtered: true } };
  }

  // --- Where a filtered submission is allowed to go -------------------------
  // Resolved, not trusted: the configured value is never used verbatim and is
  // never logged. Only the source label and the counts are.
  const review = resolveReviewDestination(
    env.LEAD_SPAM_NOTIFY_EMAIL,
    env.LEAD_NOTIFY_EMAIL
  );
  if (review.source !== 'configured') {
    log.warn(
      `[lead] review destination: source=${review.source} accepted=${review.accepted} ` +
        `rejected=${review.rejected} (${review.reasons.join('; ')})`
    );
  }
  const reviewConfigured = Boolean(env.RESEND_API_KEY);

  if (decision.action === 'review') {
    log.warn(`[lead] held as ${decision.verdict}: ${decision.reasons.join(', ')}`);

    let reviewSent = false;
    if (reviewConfigured) {
      try {
        reviewSent = await channels.sendEmail(lead, {
          to: review.to,
          subjectPrefix: decision.subjectPrefix,
          note: decision.note,
        });
      } catch (err) {
        log.error('[lead] review email failed:', err);
      }
    }

    if (reviewSent) {
      return { status: 200, body: { ok: true, email: true, ghl: false, filtered: true } };
    }

    // Nothing is wired up and this is not production: a local developer gets
    // the same graceful success the deliver path gives them. Loud in the log,
    // because on production this branch means a lead was lost.
    if (!reviewConfigured && !channels.productionRuntime) {
      log.warn('[lead] review email skipped: not configured (non-production)');
      return { status: 200, body: { ok: true, email: false, ghl: false, filtered: true } };
    }

    // The review mailbox was the only place this submission was going to be
    // kept, and it did not take it. Say so: the forms show the phone number.
    log.error(
      '[lead] REVIEW SEND FAILED — submission not preserved anywhere. ' +
        `verdict=${decision.verdict} source=${lead.source} ` +
        `destination=${review.source} configured=${reviewConfigured}`
    );
    return {
      status: 503,
      body: {
        ok: false,
        email: false,
        ghl: false,
        filtered: true,
        error: RETRY_MESSAGE,
        retryable: true,
      },
    };
  }

  // --- Real lead -------------------------------------------------------------
  // Are the channels configured? Used to decide graceful-dev success.
  const emailConfigured = Boolean(env.RESEND_API_KEY && env.LEAD_NOTIFY_EMAIL);
  const ghlConfigured = Boolean(env.GHL_API_TOKEN && env.GHL_LOCATION_ID);

  // Two INDEPENDENT side effects under allSettled so one failing never blocks
  // the other. The review copy of a borderline lead is a third, best-effort
  // one — deferred, not fire-and-forget, so the platform does not freeze the
  // function out from under it the moment this response is returned.
  const [emailResult, ghlResult] = await Promise.allSettled([
    channels.sendEmail(lead, {
      subjectPrefix: decision.subjectPrefix,
      note: decision.note,
    }),
    channels.createGhl(lead),
  ]);

  if (decision.toReview) {
    channels.defer(() =>
      channels
        .sendEmail(lead, {
          to: review.to,
          subjectPrefix: '[Check — copy] ',
          note: decision.note,
        })
        .catch((err) => {
          log.error('[lead] review copy failed:', err);
          return false;
        })
    );
  }

  const emailOk = emailResult.status === 'fulfilled' && emailResult.value === true;
  const ghlOk = ghlResult.status === 'fulfilled' && ghlResult.value?.ghl === true;

  if (emailResult.status === 'rejected') {
    log.error('[lead] email channel rejected:', emailResult.reason);
  }
  if (ghlResult.status === 'rejected') {
    log.error('[lead] ghl channel rejected:', ghlResult.reason);
  }

  const anyConfigured = emailConfigured || ghlConfigured;
  // ok if at least one channel succeeded, OR nothing is configured (dev).
  const ok = emailOk || ghlOk || !anyConfigured;

  return {
    status: ok ? 200 : 502,
    body: {
      ok,
      email: emailOk,
      ghl: ghlOk,
      filtered: false,
      ...(ok ? {} : { error: RETRY_MESSAGE, retryable: true }),
    },
  };
}
