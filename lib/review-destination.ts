/**
 * Where a filtered submission is allowed to go.
 *
 * A confident solicitation must never be mailed back to the client — that was
 * the original leak: the filter relabelled solicitations and then sent them to
 * the client's own inbox anyway, so nothing actually came off their desk.
 *
 * `LEAD_SPAM_NOTIFY_EMAIL` is a plain environment variable. Anyone with Vercel
 * access can set it, and its value is not readable back out of the dashboard,
 * so "it is probably fine" is not a safe assumption. This module decides the
 * review destination from that variable instead of trusting it:
 *
 *   1. Addresses are parsed out of the raw value — comma or semicolon
 *      separated, `Name <addr>` display-name form, stray whitespace, blanks.
 *   2. An address is only usable if it sits on a domain Creative Cowboys
 *      controls. Anything else — the client's own address, a client-domain
 *      address, a typo, a stranger — is dropped.
 *   3. An address that is ALSO one of the client's notification recipients
 *      (`LEAD_NOTIFY_EMAIL`, same parsing, case-insensitive) is dropped, even
 *      if it is on our domain.
 *   4. If nothing survives, review mail goes to the default Creative Cowboys
 *      review mailbox. There is no code path where it goes to the client.
 *
 * Nothing here reads, returns or logs the configured value beyond the
 * addresses it actually approves: callers get counts and a source label, which
 * is enough to verify the policy in tests and in logs without printing a
 * secret.
 *
 * Pure — no imports, no I/O, no process.env access. The caller passes the
 * values in, which is also what makes it testable.
 */

/** Domains Creative Cowboys controls. A review address must be on one. */
export const AUTHORIZED_REVIEW_DOMAINS: readonly string[] = ['creativecowboys.co'];

/** Last-resort review mailbox: ours, monitored, and never a client address. */
export const DEFAULT_REVIEW_RECIPIENT = 'howdy@creativecowboys.co';

export type ReviewDestinationSource =
  /** Every configured address was authorized. */
  | 'configured'
  /** Some configured addresses were authorized, some were dropped. */
  | 'partial'
  /** Nothing configured, or nothing configured was authorized. */
  | 'fallback';

export interface ReviewDestination {
  /** Comma-separated recipients for lib/email.ts. Never empty. */
  to: string;
  source: ReviewDestinationSource;
  /** How many configured addresses were approved. */
  accepted: number;
  /** How many were dropped, with why — rule ids only, never an address. */
  rejected: number;
  reasons: string[];
}

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

/** True when the address sits on a domain we control (or a subdomain of one). */
export function isAuthorizedReviewAddress(address: string): boolean {
  const domain = address.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return AUTHORIZED_REVIEW_DOMAINS.some(
    (ours) => domain === ours || domain.endsWith(`.${ours}`)
  );
}

/**
 * Decide where review mail goes.
 *
 * @param configured   raw LEAD_SPAM_NOTIFY_EMAIL (may be undefined/blank/junk)
 * @param clientNotify raw LEAD_NOTIFY_EMAIL — the client's own recipients
 */
export function resolveReviewDestination(
  configured: unknown,
  clientNotify: unknown
): ReviewDestination {
  const candidates = parseAddressList(configured);
  const clientRecipients = new Set(parseAddressList(clientNotify));

  const approved: string[] = [];
  const reasons: string[] = [];
  let rejected = 0;

  for (const address of candidates) {
    if (clientRecipients.has(address)) {
      rejected += 1;
      reasons.push('dropped: configured review address is also a client recipient');
      continue;
    }
    if (!isAuthorizedReviewAddress(address)) {
      rejected += 1;
      reasons.push('dropped: configured review address is not on a Creative Cowboys domain');
      continue;
    }
    approved.push(address);
  }

  if (approved.length === 0) {
    reasons.push(
      candidates.length === 0
        ? 'no review address configured — using the Creative Cowboys default'
        : 'no configured review address was usable — using the Creative Cowboys default'
    );
    return {
      to: DEFAULT_REVIEW_RECIPIENT,
      source: 'fallback',
      accepted: 0,
      rejected,
      reasons,
    };
  }

  return {
    to: approved.join(', '),
    source: rejected > 0 ? 'partial' : 'configured',
    accepted: approved.length,
    rejected,
    reasons,
  };
}
