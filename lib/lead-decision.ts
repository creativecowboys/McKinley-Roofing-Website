import type { LeadPayload } from './email';
import { assessLead, type SpamMeta } from './spam';
import { screenPitch } from './pitch';
import { readsLikeCustomerRelay, screenTradePitch } from './trade-pitch';

/**
 * One place that decides what happens to a form submission.
 *
 * Pulled out of app/api/lead/route.ts so the whole routing policy — not just
 * the keyword screens — can be unit tested without Resend, GoHighLevel or a
 * network. See scripts/test-lead-decision.mjs.
 *
 * Three outcomes:
 *   'drop'    — a bot filled the honeypot. Nothing sent anywhere. This is the
 *               only path that discards a submission, and it needs a hard
 *               machine signal, never a content guess.
 *   'review'  — a solicitation. Goes to OUR review mailbox only, never to the
 *               client, and never to GoHighLevel. Kept, not deleted, so a
 *               false positive can still be rescued.
 *   'deliver' — a real lead. Client email + GoHighLevel, as before. Borderline
 *               cases are delivered with a "[Check]" subject AND copied to
 *               review, because a missed roofing lead costs more than a tagged
 *               one the client glances at.
 *
 * The bias is deliberate: confident solicitations are taken off the client's
 * desk, uncertain ones stay on it. Nothing is silently thrown away except a
 * filled honeypot.
 */

export type LeadAction = 'drop' | 'review' | 'deliver';

export interface LeadDecision {
  action: LeadAction;
  /** Send the client's normal notification email. */
  toClient: boolean;
  /** Send a copy to the review mailbox (us). */
  toReview: boolean;
  /** Create the GoHighLevel contact/opportunity. */
  toGhl: boolean;
  /** Subject prefix for whichever email goes out. */
  subjectPrefix: string;
  /** Plain-English banner for the top of the email, or ''. */
  note: string;
  /** Why, for logs and for the review copy. */
  reasons: string[];
  /** Verdict label used in logs. */
  verdict: 'ok' | 'check' | 'solicitation' | 'bot';
}

/** Roofing/siding words McKinley's real customers use (same list as spam.ts). */
const TRADE_VOCAB =
  'roof(s|ing|er|ers)?|siding|gutters?|shingles?|exterior|constructions?|contracting|home ?service|home ?improvement|restorations?';

/**
 * Longest message we score. Past this a submission is a wall of text, not an
 * inquiry; we truncate rather than reject so a long genuine story still lands.
 */
export const MAX_SCORED_MESSAGE = 5000;

/** Anything that is not a string becomes ''. The route already coerces, but
 *  this is a shared entry point now and lib/spam.ts throws on a non-string. */
function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function truncate(value: unknown): string {
  const text = str(value);
  return text.length > MAX_SCORED_MESSAGE ? text.slice(0, MAX_SCORED_MESSAGE) : text;
}

export interface DecideMeta extends SpamMeta {
  /** True when this IP has already submitted more than the allowed burst. */
  overRateLimit?: boolean;
}

export function decideLead(lead: LeadPayload, meta: DecideMeta = {}): LeadDecision {
  const message = truncate(lead.message);
  const firstName = str(lead.firstName);
  const lastName = str(lead.lastName);
  const address = str(lead.address);

  // --- Hard machine signals -------------------------------------------------
  const spam = assessLead({ ...lead, message, firstName, lastName, address }, meta);

  // Honeypot is the one signal trusted enough to discard a submission: a human
  // cannot see or fill that field.
  if (spam.verdict === 'bot' && spam.reasons.some((r) => r.includes('honeypot'))) {
    return {
      action: 'drop',
      toClient: false,
      toReview: false,
      toGhl: false,
      subjectPrefix: '',
      note: '',
      reasons: spam.reasons,
      verdict: 'bot',
    };
  }

  // Submitted faster than a human can type used to be dropped silently too.
  // A password manager or an autofilled form can beat a 3-second floor, so this
  // now goes to review instead of into the bin.
  const tooFast = spam.verdict === 'bot';

  // A gibberish name ("lxVlUceuVTNgiDbGWoQWdeoL") is a bot fingerprint.
  const gibberish = spam.reasons.includes('gibberish name');

  // --- Content screens ------------------------------------------------------
  // Generic small-business pitches (SEO, web, loans) — the shared Oct 2026 list.
  const generic = screenPitch([message, address], { profile: 'default' });

  // Pitches aimed at a trade business (lead resale, suppliers, sub crews,
  // contractor software, canvassing, business brokers). The name and company
  // fields go through this screen too — "Mike, RoofLeads Pro" is a tell — but
  // NOT through the generic one, whose bare "SEO" rule would flag a real
  // customer surnamed Seo.
  const trade = screenTradePitch([message, address, firstName, lastName], {
    trade: TRADE_VOCAB,
  });

  // A homeowner who repeats a pitch somebody made to THEM uses every word a
  // vendor would ("a guy knocked on my door about canvassing for roofing
  // companies — I want a real inspection on my roof"), and the keyword screens
  // cannot hear who is speaking. When the relay reading holds, a confident
  // pitch is downgraded to borderline: the client still gets it, tagged, with
  // a copy to us. Only the keyword screens are softened — lib/spam.ts's own
  // 'spam' verdict (links, payloads, gibberish) is left alone.
  const pitched = generic.verdict === 'pitch' || trade.verdict === 'pitch';
  const relay = pitched ? readsLikeCustomerRelay([message, address]) : { relayed: false, reasons: [] };
  const demoted = pitched && relay.relayed;

  const solicitation = spam.verdict === 'spam' || (pitched && !demoted);

  const reasons = [
    ...(spam.verdict === 'spam' ? spam.reasons : []),
    ...generic.reasons,
    ...trade.reasons,
    ...relay.reasons,
    ...(tooFast ? spam.reasons : []),
    ...(meta.overRateLimit ? ['more submissions from this address than a person makes'] : []),
  ];

  if (gibberish || solicitation || tooFast || meta.overRateLimit) {
    const why = reasons.join('; ');
    return {
      action: 'review',
      toClient: false,
      toReview: true,
      toGhl: false,
      subjectPrefix: '[Filtered: solicitation] ',
      note:
        `Held back from McKinley's inbox: the website scored this as a solicitation rather ` +
        `than a customer (${why}). It was NOT added to GoHighLevel. If it is a real ` +
        `roofing or siding lead, forward it on and tell us so the filter can be tuned.`,
      reasons,
      // Content beats the machine signals in the label: a pitch that also
      // happened to trip the rate limit is still a pitch, and logging it as a
      // "bot" would hide which rule to tune.
      verdict: solicitation ? 'solicitation' : 'bot',
    };
  }

  // --- Borderline -----------------------------------------------------------
  // Something hit, but not enough to be confident. The client still gets it.
  if (generic.verdict === 'check' || trade.verdict === 'check' || demoted) {
    const why = reasons.join('; ');
    return {
      action: 'deliver',
      toClient: true,
      toReview: true,
      toGhl: true,
      subjectPrefix: '[Check] ',
      note: `The website flagged this for a second look (${why}). It may well be a real inquiry.`,
      reasons,
      verdict: 'check',
    };
  }

  // --- Normal lead ----------------------------------------------------------
  return {
    action: 'deliver',
    toClient: true,
    toReview: false,
    toGhl: true,
    subjectPrefix: '',
    note: '',
    reasons: [],
    verdict: 'ok',
  };
}
