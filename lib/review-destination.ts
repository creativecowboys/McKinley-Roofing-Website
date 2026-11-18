/**
 * Where a held submission goes: Dave, and only Dave.
 *
 * Dave, Nov 18 2026: vendor pitches are kept off McKinley's desk and rerouted
 * to him rather than dropped, so a false positive can still be forwarded on
 * and no real lead is ever silently lost.
 *
 * Until Nov 18 this came from LEAD_SPAM_NOTIFY_EMAIL, screened down to a
 * Creative Cowboys address with howdy@ as the fallback. Vercel stores that
 * variable as sensitive, so nobody could read back where held submissions were
 * actually going, and a lead copy in howdy@ carries the pitcher as Reply-To,
 * which an inbox routine could answer. A fixed address in code is visible,
 * reviewable and tested. LEAD_SPAM_NOTIFY_EMAIL is no longer read.
 *
 * It can never be the client: this is a constant, not configuration.
 *
 * Pure — no imports, no I/O, no process.env access.
 */

/** The one inbox held submissions go to. Never a client address. */
export const REVIEW_RECIPIENT = 'dave@creativecowboys.co';

const ADDRESS_RE = /^[^\s@,;<>]+@[^\s@,;<>]+\.[a-z]{2,}$/i;

/**
 * Pull bare addresses out of a recipient list.
 *
 * Handles `a@b.co, c@d.co`, `a@b.co; c@d.co`, `Name <a@b.co>`,
 * `"Last, First" <a@b.co>`, extra whitespace and empty entries. Results are
 * lower-cased and de-duplicated so comparisons are case-insensitive.
 * Non-strings and anything that is not address-shaped are ignored.
 */
export function parseAddressList(value: unknown): string[] {
  if (typeof value !== 'string') return [];

  const out: string[] = [];
  const seen = new Set<string>();

  // Split on commas/semicolons that are not inside a quoted display name.
  const parts: string[] = [];
  let current = '';
  let quoted = false;
  for (const char of value) {
    if (char === '"') quoted = !quoted;
    if (!quoted && (char === ',' || char === ';')) {
      parts.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current);

  for (const part of parts) {
    // `Display Name <addr@example.com>` -> `addr@example.com`
    const angled = part.match(/<([^<>]+)>/);
    const candidate = (angled ? angled[1] : part).trim().replace(/^"|"$/g, '').trim();
    if (!candidate || !ADDRESS_RE.test(candidate)) continue;
    const lower = candidate.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    out.push(lower);
  }

  return out;
}

/**
 * True when the review inbox is already one of the client's notification
 * recipients (LEAD_NOTIFY_EMAIL). It then already receives the "[Check]" email
 * for a borderline lead, so a second "[Check — copy]" would be a duplicate.
 */
export function reviewInboxGetsClientMail(clientNotify: unknown): boolean {
  return parseAddressList(clientNotify).includes(REVIEW_RECIPIENT);
}
