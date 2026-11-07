// Trade-vendor pitch screen for contractor lead forms.
//
// Companion to lib/pitch.ts, which catches the pitches every small business
// gets (SEO, web design, loans). This file catches the ones aimed specifically
// at a TRADE business — and those are the ones a roofer actually gets most:
//
//   - lead resellers ("$75 per qualified storm damage appointment")
//   - material suppliers ("factory direct shingles, here's our price list")
//   - sub crews looking for work ("tear-off crews available, looking for GCs")
//   - trade software ("roofing CRM, 14 day free trial")
//   - back-office services ("Xactimate supplements, $45 a claim")
//   - canvassing / appointment setting ("our reps knock, you just inspect")
//   - business brokers ("private equity group acquiring roofing businesses")
//
// lib/pitch.ts is blind to all of these: none of them mention SEO or a loan.
// Worse, lib/spam.ts SUBTRACTS 2 for roofing vocabulary to protect real
// homeowners, so a pitch written in trade language scores LOWER than a generic
// one. Every example above scored 0/clean before this file existed.
//
// The structural tell these share, and the thing a customer never does, is the
// DIRECTION of the offer: a customer asks us to do work on their building; a
// vendor offers to do something for us, or for businesses like ours. So the
// strongest rules here are shaped "offer verb + for + trade audience", not
// single keywords. "I need a roofer for my rental" must stay clean.
//
// Scoring mirrors lib/pitch.ts so the two compose:
//   OFFER patterns (aimed at the business) weigh 2, SERVICE 2, WEAK 1,
//   CONTEXT 1 but only when something else also hit.
//   "pitch": a 2-weight hit plus score 2+, or 3+ from weaker hits.
//   "check": any other hit. "clean": nothing.
// Nothing in this file drops a lead; the caller decides what to do.
//
// Portable: the trade vocabulary is a parameter, so a plumbing or concrete
// client can reuse this file unchanged. Pure — no imports, no I/O.

export type TradePitchVerdict = "pitch" | "check" | "clean";
export type TradePitchResult = {
  verdict: TradePitchVerdict;
  score: number;
  reasons: string[];
};

export type TradePitchOptions = {
  /**
   * Words naming this client's trade, as a regex alternation body, e.g.
   * "roof(ing|er|ers)?|siding|gutter". Used to build the "for <trade>
   * companies" audience rules. Defaults to a general contractor vocabulary.
   */
  trade?: string;
  /** Rule ids to ignore (a phrase this client's real customers use). */
  skip?: string[];
};

type Kind = "offer" | "service" | "weak" | "context";
type Rule = { id: string; kind: Kind; re: RegExp; reason: string };

/** Bounded gap inside one sentence. */
const GAP = "[^.!?\\n]{0,40}";
const rx = (source: string) => new RegExp(source, "i");

/** Default trade vocabulary: roofing and the trades around it. */
const DEFAULT_TRADE =
  "roof(s|ing|er|ers)?|siding|gutters?|exterior|constructions?|contracting|home ?service|home ?improvement|restorations?";

/** Words for "a business like ours" that no homeowner writes about us. */
const AUDIENCE = `(${DEFAULT_TRADE}) (companies|contractors|businesses|firms|shops|pros|professionals)|contractors|roofers|businesses like yours|companies like yours|home ?service businesses|small businesses like yours`;

/** Verbs a vendor uses when offering us something. */
const OFFER_VERB =
  "(we|i|our (team|company|firm|agency|group))\\b(\\s(can|could|will|would|also))? (offer|offering|provide|providing|supply|supplying|sell|selling|generate|generating|deliver|delivering|build|building|develop|developing|run|running|handle|handling|manage|managing|do|doing|specialize in|specializing in|work with|partner with)";

function buildRules(trade: string): Rule[] {
  const T = `(${trade})`;
  const audience = `(${T} (companies|contractors|businesses|firms|shops|pros|professionals)|${AUDIENCE})`;

  return [
    // ------------------------------------------------------------ offers (2)
    {
      // The core structural rule: an offer aimed at businesses like ours.
      id: "t-offer-to-trade",
      kind: "offer",
      reason: "offers a service to roofing/contracting businesses",
      re: rx(`${OFFER_VERB}${GAP}\\b(for|to) ${audience}\\b`),
    },
    {
      id: "t-service-for-trade",
      kind: "offer",
      reason: "sells a product or service \"for contractors\"",
      re: rx(
        `\\b(leads?|appointments?|calls?|estimates?|takeoffs?|measurements?|reports?|software|crm|platforms?|apps?|tools?|systems?|services?|solutions?|crews?|labor|staffing|financing|marketing|canvassing|setters?|answering|bookkeeping|insurance)\\b${GAP}\\bfor ${audience}\\b`
      ),
    },
    {
      id: "t-lead-resale",
      kind: "offer",
      reason: "sells leads or appointments",
      re: rx(
        `\\b((exclusive|qualified|verified|pre-?screened|pre-?qualified|inbound|live[- ]transfer|storm[- ]damage|insurance[- ]claim)\\b${GAP}\\b(leads?|appointments?)|(leads?|appointments?)\\b${GAP}\\b(per|a|each) (lead|appointment|month|week|job|closed deal)|pay[- ]per[- ](lead|appointment|call)|\\$\\s?\\d[\\d,.]*\\s*(per|\\/)\\s*(lead|appointment|call|job)|cost per (lead|appointment|acquisition))\\b`
      ),
    },
    {
      id: "t-crews-available",
      kind: "offer",
      reason: "sub crews or labor offering to work for us",
      re: rx(
        `\\b((installation |install |tear[- ]?off |labou?r[- ]?only |experienced |licensed |insured |our )?(crews?|installers?|subcontractors?|sub[- ]crews?|work ?force|laborers?)\\b${GAP}\\b(available|ready|open|looking for|seeking|need)|\\b(looking|searching) for (gcs?|general contractors?|builders?|roofing companies|contractors) to (partner|work|sub)|\\bwe (sub|subcontract|do (the )?(install|installs|tear[- ]?offs?|labor))\\b|\\b(subcontract|sub) (work|jobs?|opportunities)\\b)`
      ),
    },
    {
      id: "t-wholesale-supply",
      kind: "offer",
      reason: "material supplier / wholesale pitch",
      re: rx(
        `\\b(wholesale (prices?|pricing|rates?|supplier|distributor|cost)|factory[- ]direct|direct from (the|our) (factory|mill|plant)|we (are|'re) (a |an )?(manufacturer|supplier|distributor|trading company|exporter)|oem\\/?odm|\\bmoq\\b|\\bfob\\b|(send|share) (you )?(our|the) (catalog|catalogue|price ?list|quotation|product list)|our (latest )?(catalog|catalogue|price ?list)|bulk (orders?|pricing|discounts?)|container (loads?|pricing))\\b`
      ),
    },
    {
      id: "t-acquire-business",
      kind: "offer",
      reason: "wants to buy the business",
      re: rx(
        `\\b((acquir(e|ing)|buy(ing)?|purchas(e|ing)|invest(ing)? in|roll(ing)? up)\\b${GAP}\\b(your (business|company|firm|roofing business)|${T} (businesses|companies))|private equity|search fund|\\bm&a\\b|(interested in|considering|open to) (selling|an exit|an offer)|make you an offer for your (business|company)|exit (strategy|planning) for (your business|owners))\\b`
      ),
    },
    {
      id: "t-canvassing",
      kind: "offer",
      reason: "canvassing / appointment-setting pitch",
      re: rx(
        `\\b((door[- ]to[- ]door|d2d|door[- ]knock(ing|ers?)?|canvass(ing|ers?)?)\\b${GAP}\\b(for|service|team|reps?|crew|company|program)|(our|we have) (reps?|setters?|callers?|team)\\b${GAP}\\b(set|book|schedule)\\b${GAP}\\b(appointments?|inspections?|estimates?)|appointment setting (services?|for)|we (set|book) (the )?appointments?\\b)`
      ),
    },
    {
      id: "t-backoffice-claims",
      kind: "offer",
      reason: "estimating / supplement / claims back-office pitch",
      re: rx(
        `\\b(xactimate|symbility|eagle ?view|hover\\b|roof ?r|(estimating|takeoff|measurement|supplement|claims?|adjusting) (services?|team|company|support|outsourcing)|(we|our team) (write|writes|prepare|prepares|handle|handles) (your )?(estimates?|supplements?|claims?|takeoffs?)|per (claim|estimate|supplement)\\b${GAP}\\b(turnaround|turn[- ]around|\\$)|\\d+ hour turnaround)\\b`
      ),
    },
    {
      id: "t-trade-software",
      kind: "offer",
      reason: "software/SaaS pitch to the business",
      re: rx(
        `\\b((crm|software|platform|app|portal|dashboard|saas|tool)\\b${GAP}\\b(built|designed|made) for|(our|my|the) (software|platform|crm|app|system|tool)\\b${GAP}\\b(helps?|lets?|allows?|enables?)|(free|no[- ]obligation|complimentary) (trial|demo|pilot)|(book|schedule|set up|see) a (quick |short |live |free )?(demo|walkthrough)|\\d+[- ]day free trial)\\b`
      ),
    },
    {
      id: "t-dealer-program",
      kind: "offer",
      reason: "dealer / reseller / white-label program pitch",
      re: rx(
        `\\b((become|join) (an?|our) (authori[sz]ed )?(dealer|reseller|partner|affiliate|installer network)|(dealer|reseller|partner|affiliate|referral) (program|network|opportunit(y|ies))|white[- ]label|franchis(e|ing) opportunit)\\b`
      ),
    },
    {
      id: "t-financing-for-customers",
      kind: "offer",
      reason: "offers consumer-financing product to the business",
      re: rx(
        `\\b(offer (your )?(customers?|homeowners?|clients?) financing|(consumer|homeowner|customer|point[- ]of[- ]sale|pos) financing (for|program|platform|options for (contractors|roofers|your business))|finance (your )?(customers?|homeowners?)\\b${GAP}\\b(approval|rates?|program))\\b`
      ),
    },

    // ------------------------------------------------------- services (2)
    {
      id: "t-trade-marketing",
      kind: "service",
      reason: "marketing-to-contractors pitch",
      re: rx(
        `\\b((we|i) (help|helps|have helped|work with|have worked with) \\d*\\s*(\\+\\s*)?${T}?\\s*(companies|contractors|businesses|roofers|clients)\\b|(specializ|focus)(e|es|ing|ed) (in|on) ${audience}|our (${T} )?(clients|contractors) (get|see|average|close))\\b`
      ),
    },
    {
      id: "t-staffing",
      kind: "service",
      reason: "staffing / recruiting pitch to the business",
      re: rx(
        `\\b((staffing|recruit(ing|ment)|headhunt(ing)?|talent (acquisition|sourcing)) (agency|firm|services?|partner|solutions?|for)|(we|our firm) (place|places|source|sources|recruit|recruits) (candidates|installers|crews|sales ?(reps|people)|estimators))\\b`
      ),
    },

    // ---------------------------------------------------------------- weak (1)
    {
      id: "t-w-trade-audience",
      kind: "weak",
      reason: "talks about \"contractors\" / \"companies like yours\" as an audience",
      re: rx(`\\b(${AUDIENCE})\\b`),
    },
    {
      id: "t-w-no-contracts",
      kind: "weak",
      reason: "vendor terms wording (no contracts / cancel anytime)",
      re: rx(
        `\\b(no (long[- ]term )?contracts?|cancel any ?time|month[- ]to[- ]month|no (setup|set[- ]up) fees?|risk[- ]free|money[- ]back guarantee|pay only (for|when)|performance[- ]based|results? guaranteed|guaranteed results?)\\b`
      ),
    },
    {
      id: "t-w-volume-promise",
      kind: "weak",
      reason: "promises a volume of jobs/leads per month",
      re: rx(
        `\\b\\d+\\s*(\\+|plus)?\\s*(qualified |exclusive |new |extra |additional )?(leads?|appointments?|jobs?|deals?|installs?|calls?|customers?|clients?)\\b${GAP}\\b(per|a|each|every) (month|week|day)\\b`
      ),
    },
    {
      id: "t-w-close-rate",
      kind: "context",
      reason: "quotes a close rate / ROI improvement",
      re: rx(
        `\\b(close|closing|conversion|win) rates?\\b|\\b\\d+%\\s*(more|higher|increase|lift|better)\\b|\\b(\\d+x|\\d+ times) (roi|return|more)\\b`
      ),
    },
    {
      id: "t-w-intro-call",
      kind: "context",
      reason: "asks for an intro call with the owner",
      re: rx(
        `\\b(who('s| is) the best person|speak (with|to) (the )?(owner|manager|whoever handles)|worth a (chat|conversation|quick call)|open to (a quick|a brief|a short)? ?(chat|call|conversation)|if (this|that) sounds interesting|let me know if (you|this)\\b${GAP}\\binterest)\\b`
      ),
    },
    {
      id: "t-w-portfolio",
      kind: "context",
      reason: "offers to send a portfolio/deck/samples",
      re: rx(
        `\\b(send (you )?(our|my|a) (portfolio|deck|samples?|case stud(y|ies)|rate ?card|credentials|brochure|proposal|pricing)|attach(ed|ing) (our|my) (portfolio|deck|brochure|catalog|price))\\b`
      ),
    },
  ];
}

/** Rule ids, for a site's `skip` list and for tests. */
export const TRADE_PITCH_RULE_IDS: readonly string[] = buildRules(DEFAULT_TRADE).map((r) => r.id);

/**
 * Collapse the tricks used to slip a keyword past a word-boundary regex:
 * zero-width characters, letter-spacing ("s e o", "r o o f i n g"), dot or
 * dash separation ("S.E.O", "l-e-a-d-s") and a few leet substitutions.
 *
 * Returns the de-obfuscated text. Screen BOTH this and the original: undoing
 * letter-spacing can fuse ordinary words ("a b c" -> "abc"), so the plain text
 * stays the primary input and this one is a second pass.
 */
export function deobfuscate(text: string): string {
  return (
    text
      // zero-width and bidi marks
      .replace(/[​-‏‪-‮⁠﻿]/g, "")
      // homoglyph-ish leet inside words only (avoid mangling "$75" or "24/7")
      .replace(/([a-z])0([a-z])/gi, "$1o$2")
      .replace(/([a-z])1([a-z])/gi, "$1i$2")
      .replace(/([a-z])3([a-z])/gi, "$1e$2")
      .replace(/([a-z])4([a-z])/gi, "$1a$2")
      .replace(/([a-z])\$([a-z])/gi, "$1s$2")
      .replace(/([a-z])@([a-z])/gi, "$1a$2")
      // single letters separated by dots/dashes/spaces: "S.E.O", "l e a d s"
      .replace(/\b(?:[a-z][.\-_ ]){2,}[a-z]\b/gi, (m) => m.replace(/[.\-_ ]/g, ""))
  );
}

/**
 * Screen a submission's free text for a pitch aimed at this trade business.
 * Pass the fields as an array; non-strings are ignored.
 */
export function screenTradePitch(
  fields: unknown,
  options: TradePitchOptions = {}
): TradePitchResult {
  const text = normalize(fields);
  if (!text.trim()) return { verdict: "clean", score: 0, reasons: [] };

  const rules = buildRules(options.trade || DEFAULT_TRADE);
  const skip = new Set(options.skip || []);
  const probe = `${text}\n${deobfuscate(text)}`;

  let score = 0;
  let strong = false;
  let standalone = false;
  const reasons: string[] = [];

  for (const rule of rules) {
    if (skip.has(rule.id) || !rule.re.test(probe)) continue;
    const weight = rule.kind === "offer" || rule.kind === "service" ? 2 : 1;
    if (weight === 2) strong = true;
    if (rule.kind !== "context") standalone = true;
    score += weight;
    reasons.push(rule.reason);
  }

  // Context-only hits ("worth a quick chat?", "30% more") also show up in real
  // inquiries, so on their own they mean nothing.
  if (!standalone) return { verdict: "clean", score: 0, reasons: [] };

  const pitch = (strong && score >= 2) || score >= 3;
  return { verdict: pitch ? "pitch" : "check", score, reasons };
}

// ---------------------------------------------------------------------------
// False-positive guard: the homeowner who REPEATS a pitch back to us
// ---------------------------------------------------------------------------
//
// The rules above are keyword- and direction-shaped, and most of them cannot
// tell who is speaking. That breaks on a very ordinary real customer:
//
//   "A guy knocked on my door and said he does door-to-door canvassing for
//    roofing companies after storms. Is that legit? I want a real inspection
//    on my roof."
//
// Every word a canvassing vendor would use is in there, but the person writing
// it is a homeowner asking for an inspection — exactly the lead McKinley must
// not lose. Same for someone quoting a supplier's price, repeating a financing
// offer a salesman made, or mentioning the trade they work in themselves.
//
// Two signals separate that from a vendor:
//
//   RELAYED  - the pitch is attributed to somebody else, or they are
//              describing their own business: "another company told me",
//              "the salesman said", "I got an email from", "I run a".
//   OWN_WORK - they want work done on their own building: "my roof",
//              "I need a quote", "come out", "second opinion".
//
// And one signal that overrides both: a vendor speaking in the first person
// about what they sell ("we supply", "our team", "your business"). If that is
// present it is a pitch no matter how many relay words it also contains.
//
// This never upgrades anything and never blocks delivery. The caller uses it
// to turn a confident "pitch" into "check", so the submission still reaches
// the client, tagged, with a copy to us. An ambiguous inquiry stays on the
// client's desk - a missed roofing lead costs more than a tagged maybe.

/** They want work done on their own property. */
const OWN_WORK = rx(
  [
    `\\b(my|our) (roof|roofs|house|home|property|rental|gutters?|siding|chimney|garage|shed|ceiling|attic|shingles|warehouse|office building)\\b`,
    `\\b(i|we) (just )?(need|needed|want|would like|'?d like|am looking|'?m looking|would rather|'?d rather)\\b`,
    `\\b(come (out|by)|take a look at|look at (my|our|it)|second (quote|opinion)|honest (quote|estimate|inspection|roofer)|real (quote|estimate|inspection|roofer))\\b`,
    `\\bplease call\\b`,
  ].join("|")
);

/** The pitch is somebody else's, or they are describing their own trade. */
const RELAYED = rx(
  [
    `\\b(another|a different|some|this|the other|the) (company|companies|contractor|contractors|roofer|roofers|guy|salesman|salesperson|sales ?rep|rep|reps|outfit|crew|business)\\b`,
    `\\b(they|he|she|someone|somebody|a guy|a rep|a salesman|a contractor|a roofer|a company)\\b${GAP}\\b(said|says|told|claimed|claims|offered|offers|quoted|came by|came out|stopped by|left|pushed|sent|knocked|wanted|wants)\\b`,
    `\\bsaid (he|she|they|his|her|their|its|the)\\b`,
    `\\bknock(ed|ing) on (my|our) door\\b`,
    `\\b(got|received) (a|an) (email|call|letter|flyer|text|postcard|voicemail|pitch|quote)\\b`,
    `\\b(left|dropped off) (a|an|their) (flyer|card|brochure|quote|estimate|door ?hanger)\\b`,
    `\\bis (this|that) (legit|legitimate|a scam|normal|true|for real)\\b`,
    `\\bquoted me\\b`,
    `\\bsounded like a (sales ?)?pitch\\b`,
    `\\b(i|we) (own|owns|run|runs|operate|work (for|at|in)|manage) (a|an|my|our|the)\\b`,
    `\\b(i am|i'?m|we are|we'?re) (a|an|in the)\\b${GAP}\\b(business|company|contractor|realtor|owner|builder|supplier)\\b`,
  ].join("|")
);

/** A vendor describing, in their own voice, what they sell. Overrides both. */
const FIRST_PERSON_OFFER = rx(
  [
    OFFER_VERB,
    `\\b(we|i) (are|'?re|am|'?m) (a|an|the)\\b${GAP}\\b(manufacturer|supplier|distributor|exporter|trading company|agency|crm|platform|software|staffing|recruiting|lender|broker|reseller|wholesaler|marketing (company|agency|firm)|services?|provider|company|firm|group|team|consultancy|vendor|outfit|shop|startup|studio|partner)\\b`,
    `\\bi represent\\b`,
    `\\b(reaching|reached) out\\b`,
    // One optional adjective: "our agency", "our staffing agency".
    `\\bour ([a-z-]+ )?(team|company|firm|agency|group|software|platform|crm|app|system|tool|reps?|setters?|callers?|crews?|clients?|services?|portfolio|catalog|catalogue|price ?list|pricing|program)\\b`,
    `\\byour (business|company|crew|team|shop|website|customers?|clients?|roofing business|zip ?codes?)\\b`,
    `\\b(we|i) (can|could|would|will) (help|get|give) you\\b`,
    `\\bwe (write|writes|handle|handles|prepare|prepares|supply|supplies|sell|sells|provide|provides|generate|generates|place|places|source|sources|sub|subcontract|help|helps|have helped|serve|serves|assist|assists|partner|partners)\\b`,
    `\\bwe (have|'?ve got)\\b${GAP}\\b(crews?|installers?|reps?|setters?|leads?|appointments?|openings?)\\b${GAP}\\b(available|ready|open)\\b`,
    `\\b(become|join) (a|an|our)\\b`,
    `\\bwould you consider an offer\\b`,
    `\\b(free|no[- ]obligation|complimentary) (trial|demo)\\b`,
  ].join("|")
);

export type CustomerRelayResult = { relayed: boolean; reasons: string[] };

/**
 * Does this read like a customer repeating somebody else's pitch, rather than
 * a vendor making one?
 *
 * Pass the free-text fields (message, address). Pure; no I/O.
 */
export function readsLikeCustomerRelay(fields: unknown): CustomerRelayResult {
  const text = normalize(fields);
  if (!text.trim()) return { relayed: false, reasons: [] };

  const probe = `${text}\n${deobfuscate(text)}`;

  if (FIRST_PERSON_OFFER.test(probe)) return { relayed: false, reasons: [] };
  if (!RELAYED.test(probe) || !OWN_WORK.test(probe)) return { relayed: false, reasons: [] };

  return {
    relayed: true,
    reasons: [
      "reads like a homeowner repeating someone else's pitch while asking for work on their own property",
    ],
  };
}

function normalize(value: unknown): string {
  if (Array.isArray(value)) return value.map(normalize).filter(Boolean).join("\n");
  if (typeof value !== "string") return "";
  return value
    .replace(/[‘’ʼ]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[ \t ]+/g, " ");
}
