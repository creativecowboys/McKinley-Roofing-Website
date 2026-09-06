import type { LeadPayload } from './email';

/**
 * Lead spam assessment.
 *
 * Two classes of junk hit the contact forms:
 *   1. Bots — caught by the honeypot field and a time-to-submit floor.
 *   2. Human cold-pitches (VA agencies, freelance writers, SEO shops,
 *      "buyers interested in your business" brokers) — caught by a content
 *      score. These are typed by real people, so CAPTCHAs don't stop them.
 *
 * Verdicts:
 *   - 'ok'      → normal pipeline (email + GHL)
 *   - 'spam'    → content looks like solicitation. Not sent to the client or
 *                 GHL; forwarded to LEAD_SPAM_NOTIFY_EMAIL (if set) for review.
 *   - 'bot'     → hard signal (honeypot / too fast). Dropped silently.
 */

export type SpamVerdict = 'ok' | 'spam' | 'bot';

export interface SpamAssessment {
  verdict: SpamVerdict;
  score: number;
  reasons: string[];
}

export interface SpamMeta {
  /** Honeypot field value. Any non-empty value means a bot filled it. */
  honeypot?: unknown;
  /** Client-side timestamp (ms since epoch) when the form was first shown. */
  startedAt?: unknown;
}

/** Threshold at or above which a submission is treated as solicitation spam. */
export const SPAM_THRESHOLD = 3;

/** Minimum plausible time for a human to fill out the form. */
const MIN_FILL_TIME_MS = 3000;

/** Phrases that almost only appear in cold outreach, never in a roofing inquiry. */
const SOLICITATION_PHRASES: Array<[RegExp, number, string]> = [
  [/virtual assistant/i, 2, 'virtual assistant pitch'],
  [/freelanc/i, 2, 'freelance pitch'],
  [/\bseo\b/i, 2, 'SEO pitch'],
  [/web(site)? (design|development|redesign)/i, 2, 'web design pitch'],
  [/lead gen(eration)?/i, 2, 'lead-gen pitch'],
  [/backlink|guest post/i, 2, 'link-building pitch'],
  [/digital marketing|marketing (services|agency|team)/i, 2, 'marketing pitch'],
  [/graphic design|video animation|app development|chatbot|ai tools?/i, 2, 'agency services pitch'],
  [/press releases?|case studies|thought leadership|blog posts/i, 2, 'content-writing pitch'],
  [/buyers? (are )?interested|purchas(e|ing) (a |your )?business|interested in selling|sell(ing)? your (business|company)/i, 3, 'business-broker pitch'],
  [/calendly\.com|book a (time|call|slot)|set up a call|schedule a (quick )?call/i, 2, 'asks to book a call'],
  [/we (offer|provide|specialize)|our (services|team can|system)/i, 2, "'we offer' language"],
  [/reaching out (because|to|about)|tried emailing you/i, 1, 'cold-outreach opener'],
  [/take over your|entire marketing|prospecting/i, 2, 'outsourcing pitch'],
  [/first page of google|google rank|rank(ing)? (higher|on google)/i, 2, 'ranking pitch'],
  [/looking for (new )?(opportunities|clients|projects)/i, 2, 'looking-for-work pitch'],
  [/any use for a/i, 1, 'offering services'],
];

/** Anything a real homeowner or property manager is likely to mention. */
const ROOFING_INTENT =
  /\b(roof|roofing|leak|shingle|gutter|storm|hail|wind|estimate|quote|inspect|insurance|claim|repair|replace|metal|chimney|skylight|siding|flashing|attic|ceiling|water damage|tarp|adjuster)\w*/i;

const URL_PATTERN = /(https?:\/\/|www\.)\S+|\b[a-z0-9-]+\.(com|net|org|io|co|ai)\b/i;

function isGibberishName(value: string): boolean {
  // e.g. "lxVlUceuVTNgiDbGWoQWdeoL" — one long token with many internal
  // case flips and almost no vowels. Real names don't look like this.
  const token = value.trim();
  if (token.length < 10 || /\s/.test(token)) return false;
  let flips = 0;
  for (let i = 1; i < token.length; i++) {
    const a = token[i - 1];
    const b = token[i];
    if (/[a-z]/.test(a) && /[A-Z]/.test(b)) flips++;
    if (/[A-Z]/.test(a) && /[a-z]/.test(b)) flips++;
  }
  const vowels = (token.match(/[aeiou]/gi) ?? []).length / token.length;
  return flips >= 4 || vowels < 0.2;
}

export function assessLead(lead: LeadPayload, meta: SpamMeta = {}): SpamAssessment {
  // --- Hard bot signals -----------------------------------------------------
  if (typeof meta.honeypot === 'string' && meta.honeypot.trim() !== '') {
    return { verdict: 'bot', score: 99, reasons: ['honeypot filled'] };
  }
  const startedAt = Number(meta.startedAt);
  if (Number.isFinite(startedAt) && startedAt > 0) {
    const elapsed = Date.now() - startedAt;
    if (elapsed >= 0 && elapsed < MIN_FILL_TIME_MS) {
      return {
        verdict: 'bot',
        score: 99,
        reasons: [`submitted ${elapsed}ms after form load`],
      };
    }
  }

  // --- Content score --------------------------------------------------------
  let score = 0;
  const reasons: string[] = [];
  const message = lead.message ?? '';
  const fullName = [lead.firstName, lead.lastName].filter(Boolean).join(' ');

  for (const [pattern, weight, label] of SOLICITATION_PHRASES) {
    if (pattern.test(message)) {
      score += weight;
      reasons.push(label);
    }
  }

  if (URL_PATTERN.test(message)) {
    score += 2;
    reasons.push('contains a link');
  }

  if (isGibberishName(lead.firstName ?? '') || isGibberishName(lead.lastName ?? '') || isGibberishName(fullName)) {
    score += 3;
    reasons.push('gibberish name');
  }

  // Long message with zero roofing vocabulary is a strong tell on its own.
  if (message.length > 200 && !ROOFING_INTENT.test(message)) {
    score += 1;
    reasons.push('long message, no roofing terms');
  }

  // Genuine roofing vocabulary offsets a borderline score.
  if (ROOFING_INTENT.test(message)) {
    score -= 2;
  }

  score = Math.max(0, score);
  return {
    verdict: score >= SPAM_THRESHOLD ? 'spam' : 'ok',
    score,
    reasons,
  };
}
