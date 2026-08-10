import { NextResponse } from 'next/server';
import { sendLeadEmail, type LeadPayload } from '@/lib/email';
import { createGhlLead } from '@/lib/ghl';

// Lead capture runs at request time (never prerendered/cached).
export const dynamic = 'force-dynamic';

/**
 * POST /api/lead
 *
 * Server-side lead pipeline. Runs two INDEPENDENT side effects under
 * Promise.allSettled so one failing never blocks the other:
 *   1. Resend notification email
 *   2. GoHighLevel contact + note + opportunity
 *
 * The visitor only sees an error if BOTH configured channels fail. If a channel
 * is not configured (missing env vars), it is skipped gracefully and the request
 * still succeeds, so the form never appears broken and no lead is lost in dev.
 */
export async function POST(request: Request) {
  let body: Partial<LeadPayload> = {};
  try {
    body = (await request.json()) as Partial<LeadPayload>;
  } catch {
    return NextResponse.json(
      { ok: false, email: false, ghl: false, error: 'Invalid JSON body' },
      { status: 400 }
    );
  }

  const lead: LeadPayload = {
    firstName: typeof body.firstName === 'string' ? body.firstName.trim() : '',
    lastName: typeof body.lastName === 'string' ? body.lastName.trim() : '',
    email: typeof body.email === 'string' ? body.email.trim() : '',
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
    address: typeof body.address === 'string' ? body.address.trim() : '',
    newClient: typeof body.newClient === 'string' ? body.newClient.trim() : '',
    message: typeof body.message === 'string' ? body.message.trim() : '',
    source: typeof body.source === 'string' ? body.source.trim() : 'contact-form',
  };

  // Minimal validation: need at least an email or a phone to be actionable.
  if (!lead.email && !lead.phone) {
    return NextResponse.json(
      { ok: false, email: false, ghl: false, error: 'Email or phone required' },
      { status: 400 }
    );
  }

  // Are the channels configured? Used to decide graceful-dev success.
  const emailConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_EMAIL
  );
  const ghlConfigured = Boolean(
    process.env.GHL_API_TOKEN && process.env.GHL_LOCATION_ID
  );

  const [emailResult, ghlResult] = await Promise.allSettled([
    sendLeadEmail(lead),
    createGhlLead(lead),
  ]);

  const emailOk =
    emailResult.status === 'fulfilled' && emailResult.value === true;
  const ghlOk =
    ghlResult.status === 'fulfilled' && ghlResult.value.ghl === true;

  if (emailResult.status === 'rejected') {
    console.error('[lead] email channel rejected:', emailResult.reason);
  }
  if (ghlResult.status === 'rejected') {
    console.error('[lead] ghl channel rejected:', ghlResult.reason);
  }

  const anyConfigured = emailConfigured || ghlConfigured;
  // ok if at least one channel succeeded, OR nothing is configured (dev).
  const ok = emailOk || ghlOk || !anyConfigured;

  return NextResponse.json(
    { ok, email: emailOk, ghl: ghlOk },
    { status: ok ? 200 : 502 }
  );
}
