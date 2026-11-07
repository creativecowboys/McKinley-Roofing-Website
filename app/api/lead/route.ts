import { NextResponse, after } from 'next/server';
import { sendLeadEmail } from '@/lib/email';
import { createGhlLead } from '@/lib/ghl';
import { handleLead } from '@/lib/lead-handler';
import { overRateLimit } from '@/lib/rate-limit';

// Lead capture runs at request time (never prerendered/cached).
export const dynamic = 'force-dynamic';

/**
 * POST /api/lead
 *
 * Every form on the site (contact page, the Contact section, the
 * free-inspection modal) posts here, so this is the one gate every submission
 * passes through.
 *
 * All the policy lives in lib/lead-handler.ts, which takes its delivery
 * channels as arguments. This file is only the wiring: the real Resend mailer,
 * the real GoHighLevel client, the in-memory rate limiter, and `after()` for
 * the best-effort review copy — Next's own primitive for work that must
 * outlive the response, since a serverless function can be frozen as soon as
 * it responds.
 */
export async function POST(request: Request) {
  const { status, body } = await handleLead(request, {
    sendEmail: sendLeadEmail,
    createGhl: createGhlLead,
    overRateLimit,
    defer: (work) => after(work),
    env: process.env,
    productionRuntime: process.env.VERCEL_ENV === 'production',
  });

  return NextResponse.json(body, { status });
}
