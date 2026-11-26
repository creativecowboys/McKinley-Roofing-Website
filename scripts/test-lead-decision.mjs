// Tests for the whole lead routing policy: lib/lead-decision.ts, which
// composes lib/spam.ts, lib/pitch.ts and lib/trade-pitch.ts.
//
// Run: node --import ./scripts/register-ts.mjs scripts/test-lead-decision.mjs
//
// No network, no Resend, no GoHighLevel — decideLead() is pure, so these are
// real assertions about what would reach McKinley, not mocks of a mailer.
//
// Every message below is made up. The genuine ones copy the shape of what
// McKinley's customers actually send (including the short ones — "Roof
// leaking. Call me." is a real lead and must never be filtered). The
// solicitations copy what reaches a roofing contractor's form: the generic
// SEO/web/loan pitches the Oct 2026 filter already caught, plus the
// trade-aimed ones it did not (lead resellers, suppliers, sub crews,
// contractor software, canvassing, business brokers).

import test from "node:test";
import assert from "node:assert/strict";
import { decideLead } from "../lib/lead-decision.ts";
import { overRateLimit, resetRateLimit, RATE_LIMIT } from "../lib/rate-limit.ts";

const lead = (message, extra = {}) => ({
  firstName: "Pat",
  lastName: "Jones",
  email: "pat.jones@example.com",
  phone: "678-555-0100",
  message,
  source: "contact-form",
  ...extra,
});

const decide = (message, extra = {}, meta = {}) => decideLead(lead(message, extra), meta);

// ---------------------------------------------------------------- genuine ---
// Only clear roofing customer requests reach the client. Unclear requests
// remain preserved in Dave's inbox for review.

const GENUINE = [
  // short and bare — the case a naive "must describe the job" filter breaks
  "Need a quote for a new roof.",
  "Roof leaking. Call me.",
  "How much for a roof?",
  // ordinary homeowner inquiries
  "Do you do metal roofs? Looking at replacing my shingle roof next spring.",
  "Found you on Google, would like a quote to replace the roof on a 2,400 sq ft ranch. Do you offer financing?",
  "I'm selling the house and the inspector flagged the roof. Need it looked at before closing next week.",
  // legitimate B2B leads — someone buying roofing work, not selling to us
  "We manage 12 rental homes and need a roofer we can call. Can someone look at two in Carrollton?",
  "I'm a general contractor and need a roofer for a client's house in Hiram. Do you sub out?",
  "Our church needs the fellowship hall roof replaced. Can we get a quote and do you work with church budgets?",
  "I own a small apartment complex and need three buildings re-roofed. Looking for a long-term vendor.",
  // words that overlap vendor vocabulary but are a real customer
  "I came across your website and the quote form wouldn't load on my phone. Need a roof inspection.",
  "Do you have a catalog of shingle colors I can look at?",
  "I'm pre-approved for a home equity loan and want the metal roof done before winter.",
  "Can you schedule a call? I want to talk through replacing the roof and siding together.",
  "My name is Min-ji Seo. Roof is leaking in the upstairs bedroom.",
];

test("clear roofing customer requests reach the client", () => {
  for (const m of GENUINE) {
    const d = decide(m);
    assert.equal(d.action, "deliver", `FILTERED a real lead: ${m}\n  -> ${d.reasons.join("; ")}`);
    assert.equal(d.toClient, true, m);
    assert.equal(d.toGhl, true, m);
  }
});

test("short bare inquiries go through completely clean, no [Check] tag", () => {
  for (const m of ["Need a quote for a new roof.", "Roof leaking. Call me."]) {
    assert.equal(decide(m).verdict, "ok", m);
    assert.equal(decide(m).subjectPrefix, "", m);
  }
});

test("most genuine leads are not even tagged for a second look", () => {
  const clean = GENUINE.filter((m) => decide(m).verdict === "ok").length;
  assert.ok(
    clean >= GENUINE.length - 3,
    `only ${clean}/${GENUINE.length} went through untagged: ` +
      GENUINE.filter((m) => decide(m).verdict !== "ok").join(" | ")
  );
});

// ----------------------------------------------------------- solicitations ---

// The trade-aimed pitches. Every one of these scored 0 / clean before this
// change and went to the client's inbox AND into GoHighLevel as an opportunity.
const TRADE_PITCHES = [
  "We generate exclusive roofing leads for contractors in Georgia. $75 per qualified storm damage appointment, no contracts. Want 20 this month?",
  "Hi, we supply OEM shingles and underlayment direct from the factory at wholesale prices. Can I send our roofing material catalog and price list?",
  "We have experienced roofing crews available for subcontract work in the Atlanta metro. Tear-off and install, fully insured. Looking for GCs to partner with.",
  "Our drone roof inspection software measures and produces a full report in 15 minutes. Roofing companies using it close 30% more jobs. Free trial?",
  "We do door-to-door canvassing for roofing companies after storms. Our reps set the appointment, you just show up and inspect.",
  "We are a roofing CRM built for contractors. Scheduling, estimating and supplement tracking in one place. 14 day free trial.",
  "Hello, we are an Xactimate estimating service for roofing contractors. $45 per claim, 24 hour turnaround on supplements.",
  "I represent a private equity group acquiring roofing businesses in the Southeast. Would you consider an offer for McKinley Roofing?",
  "We offer insurance claim leads for roofers. Homeowners with approved hail claims, exclusive to you in your zip codes.",
  "Become an authorized dealer for our standing seam metal panels. Dealer program includes co-op marketing.",
  "We provide consumer financing for contractors so you can offer your customers financing at the kitchen table. Instant approvals.",
  "Our staffing agency places experienced installers and estimators with roofing companies. No placement fee until they start.",
  "We help 200+ roofing contractors get 30 exclusive appointments per month. Performance based, cancel anytime. Worth a quick chat?",
  "Attaching our portfolio. We are a trading company and manufacturer of metal roofing sheets, MOQ 500 sqm, FOB price list inside.",
  "We write your supplements for you. Our team handles claims and takeoffs for contractors, 24 hour turnaround.",
];

// The generic small-business pitches the Oct 2026 filter already caught; they
// must keep being caught, and now must also be kept off the client's desk.
const GENERIC_PITCHES = [
  "Hi, I came across your website and noticed it isn't ranking on the first page of Google for roofing in your area. Would you be interested in a free SEO audit?",
  "We are a web development company offering website redesign at affordable prices. Can I send you our portfolio and pricing?",
  "Your business has been pre-approved for up to $250,000 in working capital. Funds in 24 hours. Reply here to claim your funding offer.",
  "I can help you increase your website traffic and leads with our proven SEO services. Reply STOP to opt out.",
  "We provide virtual assistants for small businesses at $8/hour. Outsource your admin and scheduling to our trained offshore team.",
  "Our AI receptionist answers every call 24/7 and books appointments for you. Want a free demo?",
  "Hi, I would like to publish a guest post on your website. We pay $50 per do-follow link.",
  "Did you know your business may qualify for the Employee Retention Credit? ERC refunds up to $26,000 per employee. Book a 15 minute call: calendly.com/erc-team",
];

test("trade-aimed solicitations are held back from the client", () => {
  for (const m of TRADE_PITCHES) {
    const d = decide(m);
    assert.equal(d.action, "review", `NOT caught: ${m}`);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
    assert.equal(d.toReview, true, m);
  }
});

test("generic SEO/web/loan solicitations are held back from the client", () => {
  for (const m of GENERIC_PITCHES) {
    const d = decide(m);
    assert.equal(d.action, "review", `NOT caught: ${m}`);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
  }
});

test("a solicitation is never deleted — it always goes somewhere we can read it", () => {
  for (const m of [...TRADE_PITCHES, ...GENERIC_PITCHES]) {
    const d = decide(m);
    assert.equal(d.toReview, true, `would vanish: ${m}`);
    assert.ok(d.note.length > 0, m);
    assert.ok(d.reasons.length > 0, m);
  }
});

test("roofing vocabulary no longer buys a pitch a free pass", () => {
  // The bypass this change exists to close: lib/spam.ts subtracts 2 for
  // roofing words, so dressing a pitch in trade language used to lower its
  // score. Same pitch, with and without the trade framing.
  const generic = "We generate exclusive leads for small businesses. $75 per qualified appointment.";
  const dressed = "We generate exclusive roofing leads for contractors. $75 per qualified storm damage appointment.";
  assert.equal(decide(dressed).action, "review", "trade-dressed pitch slipped through");
  assert.notEqual(decide(generic).verdict, "ok");
});

// ------------------------------------------------- relayed-pitch homeowners ---
// The false-positive class the keyword screens cannot hear: a homeowner
// repeating a pitch that was made TO THEM. Every vendor word is in the text,
// but the person writing it wants work on their own roof. Before the
// readsLikeCustomerRelay guard, all six of these were held back from the
// client entirely. Under the roofing-only policy, uncertainty stays with Dave.

const RELAYED_BY_HOMEOWNER = [
  "A guy knocked on my door and said he does door-to-door canvassing for roofing companies after storms. Is that legit? I want a real inspection on my roof.",
  "Another company told me they offer customers financing and said my roof would be free. I'd rather get an honest quote. Can you come out?",
  "I got an email from someone selling exclusive storm damage leads to contractors, which made me realize I should just call a real roofer. My roof is leaking.",
  "Some outfit left a flyer saying they do Xactimate supplements for contractors. I just need my shingles repaired, can someone look at it?",
  "The salesman said his company has crews available and could do my tear-off next week for $75 a square. Is that a real price? I want a second quote.",
  "A rep from a dealer program came by pushing metal panels. I'd like your own quote on a standing seam roof for my house.",
];

test("a homeowner quoting someone else's pitch is preserved for Dave to review", () => {
  for (const m of RELAYED_BY_HOMEOWNER) {
    const d = decide(m);
    assert.equal(d.action, "review", m);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
    assert.equal(d.verdict, "check", `${m} — should be tagged, not clean`);
    assert.equal(d.subjectPrefix, "[Check] ", m);
    assert.equal(d.toReview, true, `${m} — we should still see it to tune the filter`);
  }
});

test("roofing customers with ambiguous business wording are preserved for Dave", () => {
  for (const m of [
    "My company does commercial cleaning for contractors. Our office building needs a new roof.",
  ]) {
    const d = decide(m);
    assert.equal(d.action, "review", m);
    assert.equal(d.toReview, true, m);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
  }
  assert.equal(decide("I run a roofing supply company but I don't install. Our warehouse roof is leaking, need a quote.").action, "deliver");
  assert.equal(decide("I'm a realtor and my clients need a roof inspection before closing.").action, "deliver");
});

test("the relay guard does not let an actual vendor through", () => {
  // Every pitch above, with homeowner-sounding framing bolted on. A vendor
  // speaking in the first person about what they sell overrides the guard.
  for (const m of TRADE_PITCHES) {
    const dressed = `A guy knocked on my door. My roof needs work and I want a quote. ${m}`;
    assert.equal(decide(dressed).action, "review", `relay framing bypassed the screen: ${m}`);
  }
  for (const m of [...TRADE_PITCHES, ...GENERIC_PITCHES]) {
    assert.equal(decide(m).action, "review", `demoted a real pitch: ${m}`);
  }
});

// ------------------------------------------------------------- bypass tries ---

test("letter-spaced and dotted keywords are still caught", () => {
  for (const m of [
    "We offer S.E.O services and can get you on the first page of Google.",
    "We generate exclusive r o o f i n g l e a d s for contractors, $75 per appointment.",
    "We supply shingles at w-h-o-l-e-s-a-l-e prices, factory direct. Our price list is attached.",
  ]) {
    assert.notEqual(decide(m).action, "deliver", `bypass worked: ${m}`);
  }
});

test("zero-width characters inside keywords are stripped", () => {
  const m = "We are a roo​fing CRM built for contrac​tors. 14 day free trial.";
  assert.notEqual(decide(m).action, "deliver");
});

test("a pitch hidden in the name fields is caught", () => {
  const d = decideLead(
    lead("Reaching out about a partnership.", {
      firstName: "Mike",
      lastName: "RoofLeads Pro — exclusive leads for contractors",
    })
  );
  assert.notEqual(d.action, "deliver");
});

test("a pitch in the address field is caught", () => {
  const d = decideLead(
    lead("Please see below.", { address: "We offer SEO services for roofing companies, free audit available" })
  );
  assert.notEqual(d.action, "deliver");
});

test("a very long message is still screened (no padding bypass)", () => {
  const padding = "We appreciate your time. ".repeat(400); // ~10k chars, over the cap
  const m = `We generate exclusive roofing leads for contractors, $75 per appointment. ${padding}`;
  assert.equal(decide(m).action, "review", "padding bypassed the screen");
});

test("a long genuine message is not filtered for being long", () => {
  const m =
    "Hi, we had the big storm come through Tuesday night and I am still working out what happened. " +
    "There is a wet spot on the ceiling in the back bedroom that keeps growing, and this morning I found " +
    "shingles in the yard and in the neighbor's driveway. The house is a two story in Douglasville, built " +
    "in 1998, and I think the roof is original. My insurance company wants photos before they send anyone. " +
    "I would rather have someone who knows roofs look at it first so I know what I am dealing with. " +
    "Please call in the afternoon, I work mornings. Thank you.";
  assert.equal(decide(m).action, "deliver");
  assert.equal(decide(m).verdict, "ok");
});

// ------------------------------------------------------------------- bots ---

test("a filled honeypot is the only thing that discards a submission", () => {
  const d = decideLead(lead("Need a roof quote."), { honeypot: "http://spam.example" });
  assert.equal(d.action, "drop");
  assert.equal(d.toReview, false);
});

test("submitting faster than a human now goes to review, not the bin", () => {
  // Used to be a silent drop; an autofilled form can beat a 3-second floor.
  const d = decideLead(lead("Need a roof quote."), { startedAt: Date.now() - 100 });
  assert.equal(d.action, "review");
  assert.equal(d.toReview, true, "a fast genuine submission would have been lost");
  assert.equal(d.toClient, false);
});

test("a gibberish name is treated as a bot but still kept", () => {
  const d = decideLead(lead("Hello", { firstName: "lxVlUceuVTNgiDbGWoQWdeoL", lastName: "" }));
  assert.equal(d.action, "review");
  assert.equal(d.toReview, true);
});

// ------------------------------------------------------------- rate limit ---

test("a burst from one address is routed to review, never rejected", () => {
  resetRateLimit();
  const ip = "203.0.113.7";
  let limited = 0;
  for (let i = 0; i < RATE_LIMIT.MAX_IN_WINDOW + 3; i++) if (overRateLimit(ip)) limited++;
  assert.equal(limited, 3, "limit did not kick in as expected");

  const d = decideLead(lead("Need a roof quote."), { overRateLimit: true });
  assert.equal(d.action, "review", "over-limit submissions must be kept, not dropped");
  assert.equal(d.toReview, true);
  resetRateLimit();
});

test("the rate limit window resets and unknown IPs are never limited", () => {
  resetRateLimit();
  const ip = "203.0.113.8";
  const t0 = 1_000_000;
  for (let i = 0; i < RATE_LIMIT.MAX_IN_WINDOW + 2; i++) overRateLimit(ip, t0);
  assert.equal(overRateLimit(ip, t0 + RATE_LIMIT.WINDOW_MS + 1), false, "window did not reset");
  assert.equal(overRateLimit(null), false);
  assert.equal(overRateLimit(undefined), false);
  resetRateLimit();
});

// ------------------------------------------------------------------- shape ---

test("empty and odd input never crashes and never drops", () => {
  for (const m of ["", " ", undefined, null]) {
    const d = decideLead({ email: "a@b.com", message: m });
    assert.notEqual(d.action, "drop");
  }
  assert.doesNotThrow(() => decideLead({}));
  assert.doesNotThrow(() => decideLead({ message: 42, firstName: {}, address: [] }));
});

test("generic nouns without roofing intent are held for Dave", () => {
  for (const w of ["website", "loan", "marketing", "funding", "app", "Google", "contractor", "wholesale", "leads"]) {
    assert.equal(decide(`Question about my ${w}.`).action, "review", w);
  }
});

test("a pitch that also trips the rate limit is still labelled a solicitation", () => {
  const d = decideLead(
    lead("We generate exclusive roofing leads for contractors, $75 per appointment."),
    { overRateLimit: true }
  );
  assert.equal(d.verdict, "solicitation", "label hid which rule to tune");
  assert.equal(d.action, "review");
});

// ------------------------------------------- answering-service pitches ---
// Nov 18 2026: "who answers the phone ... when your whole crew is up on a
// roof? If it's voicemail, that's where jobs slip away. I can show you a fix
// in 10 minutes. Worth it?" scored 0 on every screen and reached McKinley.

const PHONE_PITCHES = [
  "Hi, quick question: who answers the phone at McKinley Roofing and Restoration when your whole crew is up on a roof? If it's voicemail, that's where jobs slip away. I can show you a fix in 10 minutes. Worth it?\n\nTodd Abbott\nAutoMaxRevenue\ntodd@automaxrevenue.com",
  "Who answers the phone when your crew is up on a roof? If it's voicemail, you're losing jobs. I can show you a fix in 10 minutes. Worth it?",
  "Quick question - when you're on a job and the phone rings, who picks up? Most roofers miss 1 in 3 calls. We answer every call for you 24/7 and book the inspection on your calendar. Worth a 10 minute chat?",
  "Every missed call is a missed roof job. We set up missed-call text back for roofing companies so you never miss another lead.",
  "Hi, I wanted to introduce our AI receptionist built for roofers. It answers calls 24/7, qualifies storm leads and books inspections while your crew is on the roof. Can I send a quick demo?",
  "Are you missing calls while you're up on roofs? Our virtual receptionists answer your calls live, 24/7, for less than a part-time hire.",
  "Missed calls are costing you jobs. Our answering service picks up all your calls so leads stop slipping away.",
];

// Real customers complain about the phone too. These must go through clean —
// not held, and not even tagged [Check].
const PHONE_COMPLAINTS = [
  "I left a voicemail yesterday, nobody called back. Tree limb went through the roof, need a tarp today.",
  "I know your crew is probably up on a roof right now, but please call me back about an estimate when you can.",
  "Our receptionist will let you in. Commercial building on Bankhead Hwy needs the flat roof looked at.",
  "Can you return my call? Need an estimate for a roof replacement.",
];

test("answering-service / missed-call pitches are held back from the client", () => {
  for (const m of PHONE_PITCHES) {
    const d = decide(m);
    assert.equal(d.action, "review", `NOT caught: ${m}`);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
    assert.equal(d.subjectPrefix, "[Filtered: pitch] ", m);
  }
});

test("customers complaining about the phone go through clean", () => {
  for (const m of PHONE_COMPLAINTS) {
    const d = decide(m);
    assert.equal(d.verdict, "ok", `flagged a real customer: ${m}\n  -> ${d.reasons.join("; ")}`);
    assert.equal(d.subjectPrefix, "", m);
  }
});

// The old clean-by-default policy delivered these. Keep them, but only Dave
// sees them now; contact details and newClient=no do not establish roof intent.
const REVIEW_ONLY = [
  "Hi", "Call me", "Estimate please", "Can someone come out this week?",
  "siding", "Need new gutters", "My siding has storm damage, need repairs",
  "My window is leaking into the kitchen", "Roof", "Question for McKinley Roofing",
  "Your website says free estimates. Can I get one this week?",
  "My neighbor recommended you, he said you replaced his roof in two days.",
  "Please call about my warranty", "My insurance claim needs help",
  "We sell reporting software and business dashboards. Reply STOP to opt out.",
  "We have roofing products available. Are you interested?",
  "I install roofs. Do you need help?", "We repair roofs and need more work.",
  "I am a roofer looking for projects", "I can help roofing companies with estimates",
  "I can repair roofs for your company. Let me know if you need help.",
  "I am a roofer looking for work.", "Looking for a job repairing roofs.",
  "Need a job as a roofer. Available immediately.",
  "Interested in a roofing position with your company. Can you call me?",
  "Roof repairs and replacements at competitive rates. Call us for a quote.",
  "I am selling roof inspection drones. Would you like a quote?",
  "Do you have any roofing jobs available?", "We are available for roof repair work.",
  "I have shingles for sale. Need a quote?",
  "Want to buy shingles? Great prices available this week.",
  "We make signs for roofs. Can you call me?",
  "Your roof looks nice. Can you sponsor our charity event?",
  "Roofing is a great business. I need help with my computer.",
  "My driveway was damaged in the storm. Can you repair it?",
  "The storm damaged my pool. Need an inspection.",
  "My kitchen sink is leaking. Can you repair it?",
  "My air conditioner is leaking in the attic.",
  "No roof work needed. Can you fix my fence?",
  "We do not need a new roof. I want to discuss a charity sponsorship.",
  "Hail hit us last night, need an inspection ASAP",
  "We have a leak over the kitchen after the storm. Adjuster comes Friday.",
  "Second opinion on a hail claim please, my insurance says it's only cosmetic.",
];

test("non-roofing, generic, and uncertain inquiries go only to Dave", () => {
  for (const m of REVIEW_ONLY) {
    const d = decide(m, { newClient: "no" });
    assert.equal(d.action, "review", m);
    assert.equal(d.toReview, true, m);
    assert.equal(d.toClient, false, m);
    assert.equal(d.toGhl, false, m);
    assert.ok(d.reasons.length, m);
  }
});

test("roofing service and existing customer followups remain normal leads", () => {
  for (const m of [
    "Roof repair", "Roof replacement estimate", "Need a roof inspection",
    "My house needs a new roof", "Our warehouse needs roof replacement",
    "Shingles missing after the storm", "Roof warranty follow up for my house",
    "What is the status of my roof replacement?", "Our roof invoice needs a correction",
    "Your crew replaced my roof. Can you call about the warranty?",
    "Insurance adjuster wants a roof inspection before approving my claim",
  ]) assert.equal(decide(m).action, "deliver", m);
});

test("dedicated free roof inspection requests preserve their optional-notes flow", () => {
  for (const message of ["", "No additional notes."]) {
    const d = decide(message, { source: "inspection-modal", address: "123 Example Lane" });
    assert.equal(d.action, "deliver", message);
    assert.equal(d.toGhl, true);
  }
  for (const [message, extra] of [
    ["", { source: "inspection-modal" }],
    ["", { source: "contact-form", address: "123 Example Lane" }],
    ["Need siding", { source: "inspection-modal", address: "123 Example Lane" }],
    ["Call me", { source: "inspection-modal", address: "123 Example Lane" }],
    [GENERIC_PITCHES[0], { source: "inspection-modal", address: "123 Example Lane" }],
    ["", { source: "inspection-modal", address: "123 Example Lane", email: "", phone: "" }],
  ]) assert.equal(decide(message, extra).action, "review", message);
});

test("roofing words in a street address cannot establish customer intent", () => {
  for (const message of ["Estimate please", "Call me", "Need siding"]) {
    const d = decide(message, { address: "123 Roof Repair Road" });
    assert.equal(d.action, "review", message);
    assert.equal(d.toClient, false, message);
    assert.equal(d.toGhl, false, message);
  }
});
