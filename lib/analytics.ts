/**
 * GA4 event helpers.
 *
 * The gtag.js tag is loaded once in the root layout (see components/GoogleAnalytics.tsx),
 * which only calls `gtag('config', ...)` — that gives pageviews and GA4's automatic
 * enhanced measurement, but nothing about leads.
 *
 * The site's three forms all POST to /api/lead via fetch(), so there is no native form
 * submit and no navigation for GA4 to observe automatically. Conversions have to be sent
 * explicitly, which is what this file is for.
 *
 * Every call is a no-op when gtag is absent (SSR, ad blockers, consent tooling), so these
 * are always safe to call.
 */

type GtagArgs =
  | [command: 'event', eventName: string, params?: Record<string, unknown>]
  | [command: 'config', targetId: string, params?: Record<string, unknown>]
  | [command: 'js', config: Date];

declare global {
  interface Window {
    gtag?: (...args: GtagArgs) => void;
    dataLayer?: unknown[];
  }
}

/** The `source` values the forms already send to /api/lead, reused as the GA4 label. */
export type LeadSource = 'contact-page' | 'contact-form' | 'inspection-modal';

function send(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', eventName, params);
}

/**
 * Fire on a *successful* /api/lead response only — never on submit attempt, or the
 * conversion count inflates with failed and abandoned submissions.
 *
 * `generate_lead` is a GA4 recommended event name, so it appears in the standard
 * lead-generation reports without extra configuration. Mark it as a key event
 * (Admin → Events) once it starts collecting.
 */
export function trackLead(source: LeadSource): void {
  send('generate_lead', {
    form_source: source,
    // GA4 expects a currency when value is present; we have no per-lead value yet, so
    // both are omitted deliberately rather than sent as 0, which would skew reporting.
  });
}

/**
 * Fire when someone taps a tel: link. For a roofing contractor the phone call is the
 * real conversion — GBP reports calls from the profile, but calls originating on the
 * site were previously invisible.
 */
export function trackPhoneClick(phone: string): void {
  send('phone_click', { phone_number: phone });
}
