// Route-level tests for POST /api/lead — lib/lead-handler.ts.
//
// Run: node --import ./scripts/register-ts.mjs scripts/test-lead-route.mjs
//
// Every delivery channel is a fake: no network, no Resend, no GoHighLevel, no
// real mailbox, no test lead anywhere near the client. The fakes record what
// they were asked to send, which is the whole point — the two things that can
// silently lose a legitimate lead are WHERE a filtered submission is mailed
// and WHETHER we claim success when that mail did not go out.
//
// Companion to scripts/test-lead-decision.mjs, which tests the scoring.

import test from "node:test";
import assert from "node:assert/strict";
import { handleLead } from "../lib/lead-handler.ts";
import {
  DEFAULT_REVIEW_RECIPIENT,
  parseAddressList,
  resolveReviewDestination,
} from "../lib/review-destination.ts";

/** The client's own notification recipients, as configured on Vercel. */
const CLIENT_NOTIFY = "mckinleyrandr@gmail.com";

const SOLICITATION =
  "We generate exclusive roofing leads for contractors in Georgia. $75 per qualified storm damage appointment, no contracts. Want 20 this month?";
const GENUINE = "Roof is leaking over the kitchen in Villa Rica. Need a quote.";
/** Scores borderline: delivered to the client, tagged, copied to review. */
const BORDERLINE =
  "My company does commercial cleaning for contractors. Our office building needs a new roof.";

function req(body, { raw } = {}) {
  return new Request("https://mckinleyroofing.net/api/lead", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": "203.0.113.9" },
    body: raw ?? JSON.stringify(body),
  });
}

function harness(overrides = {}) {
  const sent = [];
  const ghlCalls = [];
  const deferred = [];
  const logs = { warn: [], error: [] };

  const channels = {
    async sendEmail(lead, options = {}) {
      sent.push({ lead, options });
      return true;
    },
    async createGhl(lead) {
      ghlCalls.push(lead);
      return { ghl: true };
    },
    overRateLimit: () => false,
    defer(work) {
      deferred.push(work());
    },
    productionRuntime: true,
    log: {
      warn: (...a) => logs.warn.push(a.map(String).join(" ")),
      error: (...a) => logs.error.push(a.map(String).join(" ")),
    },
    ...overrides,
    // Merged, not replaced, so a test can override one variable — including
    // overriding it to undefined — without unsetting the others.
    env: {
      RESEND_API_KEY: "test-key",
      LEAD_NOTIFY_EMAIL: CLIENT_NOTIFY,
      ...(overrides.env || {}),
    },
  };

  return { channels, sent, ghlCalls, deferred, logs };
}

const post = (message, overrides, extra = {}) => {
  const h = harness(overrides);
  return handleLead(
    req({ firstName: "Pat", lastName: "Jones", email: "pat@example.test", phone: "678-555-0100", message, source: "contact-form", ...extra }),
    h.channels
  ).then((res) => ({ ...h, res }));
};

// ================================================================ blocker 1 ==
// A configured review destination must never be able to send a confident
// solicitation back to the client.

test("a solicitation goes to OUR review mailbox, never the client's", async () => {
  const { res, sent, ghlCalls } = await post(SOLICITATION);
  assert.equal(res.body.filtered, true);
  assert.equal(sent.length, 1, "exactly one email: the review copy");
  assert.equal(sent[0].options.to, DEFAULT_REVIEW_RECIPIENT);
  assert.notEqual(sent[0].options.to, undefined, "undefined 'to' falls back to the CLIENT");
  assert.equal(ghlCalls.length, 0, "a solicitation must never reach GoHighLevel");
});

// Each row: what LEAD_SPAM_NOTIFY_EMAIL is set to -> where review mail goes.
const DESTINATIONS = [
  ["unset", undefined, DEFAULT_REVIEW_RECIPIENT],
  ["empty", "", DEFAULT_REVIEW_RECIPIENT],
  ["blank separators", "  ,  ;  ", DEFAULT_REVIEW_RECIPIENT],
  ["the client's own address", CLIENT_NOTIFY, DEFAULT_REVIEW_RECIPIENT],
  ["an address on the client's domain", "caitlyn@mckinleyroofing.net", DEFAULT_REVIEW_RECIPIENT],
  ["a stranger", "someone@gmail.com", DEFAULT_REVIEW_RECIPIENT],
  ["not an address at all", "howdy[at]creativecowboys.co", DEFAULT_REVIEW_RECIPIENT],
  ["ours", "howdy@creativecowboys.co", "howdy@creativecowboys.co"],
  ["ours, mixed case", "HOWDY@CreativeCowboys.CO", "howdy@creativecowboys.co"],
  ["ours with a display name", "Review Desk <Review@CreativeCowboys.co>", "review@creativecowboys.co"],
  ["ours on a subdomain", "ops@mail.creativecowboys.co", "ops@mail.creativecowboys.co"],
  ["two of ours, semicolon separated", "a@creativecowboys.co; b@creativecowboys.co", "a@creativecowboys.co, b@creativecowboys.co"],
  [
    "mixed: client + ours keeps only ours",
    'Caitlyn <CAITLYN@MCKINLEYROOFING.NET>, "Jones, Pat" <pat@example.test>, howdy@creativecowboys.co',
    "howdy@creativecowboys.co",
  ],
  ["ours + junk keeps only ours", "not-an-email, howdy@creativecowboys.co", "howdy@creativecowboys.co"],
];

test("review mail only ever goes to an authorized Creative Cowboys address", async () => {
  for (const [label, configured, expected] of DESTINATIONS) {
    const { sent } = await post(SOLICITATION, {
      env: { LEAD_SPAM_NOTIFY_EMAIL: configured },
    });
    assert.equal(sent.length, 1, label);
    assert.equal(sent[0].options.to, expected, label);
  }
});

test("no configured value can route a solicitation to any client recipient", async () => {
  const clientList = "Caitlyn <Caitlyn@McKinleyRoofing.net>, MCKINLEYRANDR@GMAIL.COM, jacob@mckinleyroofing.net";
  for (const [label, configured] of DESTINATIONS) {
    const { sent } = await post(SOLICITATION, {
      env: { LEAD_SPAM_NOTIFY_EMAIL: configured, LEAD_NOTIFY_EMAIL: clientList },
    });
    const to = parseAddressList(sent[0].options.to);
    for (const recipient of parseAddressList(clientList)) {
      assert.ok(!to.includes(recipient), `${label}: solicitation would reach ${recipient}`);
    }
    assert.ok(to.length > 0, `${label}: nowhere to send it`);
  }
});

test("case-insensitive overlap with a client recipient on our own domain is dropped", () => {
  const d = resolveReviewDestination("LEADS@CreativeCowboys.co", "leads@creativecowboys.co");
  assert.equal(d.to, DEFAULT_REVIEW_RECIPIENT);
  assert.equal(d.source, "fallback");
  assert.equal(d.rejected, 1);
});

test("the configured value is never written to the log", async () => {
  const secretish = "caitlyn@mckinleyroofing.net";
  const { logs } = await post(SOLICITATION, { env: { LEAD_SPAM_NOTIFY_EMAIL: secretish } });
  const everything = [...logs.warn, ...logs.error].join("\n");
  assert.ok(!everything.includes(secretish), "a rejected review address leaked into the log");
  assert.ok(!everything.includes("mckinleyroofing.net"), "the domain leaked into the log");
  assert.ok(everything.includes("source=fallback"), "the fallback was not reported at all");
});

test("resolveReviewDestination reports what it did without quoting addresses", () => {
  const ok = resolveReviewDestination("howdy@creativecowboys.co", CLIENT_NOTIFY);
  assert.deepEqual(
    { source: ok.source, accepted: ok.accepted, rejected: ok.rejected },
    { source: "configured", accepted: 1, rejected: 0 }
  );

  const partial = resolveReviewDestination(
    "howdy@creativecowboys.co, caitlyn@mckinleyroofing.net",
    CLIENT_NOTIFY
  );
  assert.equal(partial.source, "partial");
  assert.equal(partial.to, "howdy@creativecowboys.co");
  assert.equal(partial.rejected, 1);
  for (const reason of partial.reasons) assert.ok(!reason.includes("@"), reason);
});

test("parseAddressList handles the shapes a recipient list actually comes in", () => {
  assert.deepEqual(parseAddressList("a@b.co,c@d.co"), ["a@b.co", "c@d.co"]);
  assert.deepEqual(parseAddressList("a@b.co; c@d.co"), ["a@b.co", "c@d.co"]);
  assert.deepEqual(parseAddressList("Name <A@B.co>"), ["a@b.co"]);
  assert.deepEqual(parseAddressList('"Jones, Pat" <pat@b.co>, x@y.co'), ["pat@b.co", "x@y.co"]);
  assert.deepEqual(parseAddressList("a@b.co, A@B.CO"), ["a@b.co"], "not de-duplicated");
  assert.deepEqual(parseAddressList("  ,  , "), []);
  assert.deepEqual(parseAddressList(undefined), []);
  assert.deepEqual(parseAddressList(null), []);
  assert.deepEqual(parseAddressList(42), []);
  assert.deepEqual(parseAddressList("plain text"), []);
});

// ================================================================ blocker 2 ==
// If the review mailbox did not take the submission, nothing did. Say so.

test("review email accepted -> ok", async () => {
  const { res } = await post(SOLICITATION);
  assert.deepEqual(res, {
    status: 200,
    body: { ok: true, email: true, ghl: false, filtered: true },
  });
});

test("review email returns false -> retryable failure, not a fake success", async () => {
  const { res, logs } = await post(SOLICITATION, { sendEmail: async () => false });
  assert.equal(res.status, 503);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.retryable, true);
  assert.ok(res.body.error, "the form needs something to show");
  assert.ok(
    logs.error.join("\n").includes("REVIEW SEND FAILED"),
    "a lost submission must be loud in the log"
  );
});

test("review email throws -> retryable failure, not a crash and not a fake success", async () => {
  const { res } = await post(SOLICITATION, {
    sendEmail: async () => {
      throw new Error("resend down");
    },
  });
  assert.equal(res.status, 503);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.retryable, true);
});

test("review mail unconfigured in production -> retryable failure", async () => {
  const { res, sent } = await post(SOLICITATION, {
    env: { RESEND_API_KEY: undefined },
    productionRuntime: true,
  });
  assert.equal(sent.length, 0, "nothing was attempted");
  assert.equal(res.status, 503);
  assert.equal(res.body.ok, false);
});

test("review mail unconfigured OFF production -> graceful dev success, logged", async () => {
  const { res, sent, logs } = await post(SOLICITATION, {
    env: { RESEND_API_KEY: undefined },
    productionRuntime: false,
  });
  assert.equal(sent.length, 0);
  assert.equal(res.status, 200);
  assert.equal(res.body.ok, true);
  assert.equal(res.body.email, false);
  assert.ok(logs.warn.join("\n").includes("not configured"));
});

test("the leads most at risk of a false positive are never reported as accepted when the send fails", async () => {
  // Autofilled/too-fast, gibberish name, and IP-burst submissions are routed to
  // review even though they may well be real. If the review mail fails these
  // are exactly the ones that would vanish.
  const cases = [
    ["too fast (autofill)", { ts: Date.now() - 50 }, {}],
    ["gibberish name", {}, { firstName: "lxVlUceuVTNgiDbGWoQWdeoL", lastName: "" }],
    ["over rate limit", {}, {}, { overRateLimit: () => true }],
  ];
  for (const [label, extra, fields, extraChannels = {}] of cases) {
    const { res } = await post(GENUINE, { sendEmail: async () => false, ...extraChannels }, { ...extra, ...fields });
    assert.equal(res.status, 503, label);
    assert.equal(res.body.ok, false, `${label}: a real lead was silently dropped`);
  }
});

test("a genuine lead that is too fast still goes to review, not to the client", async () => {
  const { res, sent, ghlCalls } = await post(GENUINE, {}, { ts: Date.now() - 50 });
  assert.equal(res.body.filtered, true);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].options.to, DEFAULT_REVIEW_RECIPIENT);
  assert.equal(ghlCalls.length, 0);
});

// ====================================================== deliver path intact ==

test("a genuine lead reaches the client and GoHighLevel", async () => {
  const { res, sent, ghlCalls, deferred } = await post(GENUINE);
  assert.deepEqual(res, {
    status: 200,
    body: { ok: true, email: true, ghl: true, filtered: false },
  });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].options.to, undefined, "client mail must use LEAD_NOTIFY_EMAIL");
  assert.equal(sent[0].options.subjectPrefix, "");
  assert.equal(ghlCalls.length, 1);
  assert.equal(deferred.length, 0, "a clean lead needs no review copy");
});

test("email and GoHighLevel fail independently", async () => {
  const both = { env: { GHL_API_TOKEN: "t", GHL_LOCATION_ID: "l" } };

  let r = await post(GENUINE, { ...both, sendEmail: async () => false });
  assert.deepEqual(r.res.body, { ok: true, email: false, ghl: true, filtered: false }, "ghl alone");

  r = await post(GENUINE, { ...both, createGhl: async () => ({ ghl: false }) });
  assert.deepEqual(r.res.body, { ok: true, email: true, ghl: false, filtered: false }, "email alone");

  r = await post(GENUINE, {
    ...both,
    sendEmail: async () => {
      throw new Error("resend down");
    },
  });
  assert.equal(r.res.body.ok, true, "a thrown mailer must not block GoHighLevel");
  assert.equal(r.res.body.ghl, true);

  r = await post(GENUINE, {
    ...both,
    createGhl: async () => {
      throw new Error("ghl down");
    },
  });
  assert.equal(r.res.body.ok, true, "a thrown CRM must not block the email");
  assert.equal(r.res.body.email, true);
});

test("both channels failing while configured is an honest 502", async () => {
  const { res } = await post(GENUINE, {
    env: { GHL_API_TOKEN: "t", GHL_LOCATION_ID: "l" },
    sendEmail: async () => false,
    createGhl: async () => ({ ghl: false }),
  });
  assert.equal(res.status, 502);
  assert.equal(res.body.ok, false);
  assert.equal(res.body.retryable, true);
});

test("nothing configured at all is a graceful local success", async () => {
  const { res } = await post(GENUINE, {
    env: { RESEND_API_KEY: undefined, LEAD_NOTIFY_EMAIL: undefined },
    sendEmail: async () => false,
    createGhl: async () => ({ ghl: false }),
    productionRuntime: false,
  });
  assert.equal(res.status, 200);
  assert.equal(res.body.ok, true);
});

// ===================================================== the borderline copy ==

test("a borderline lead reaches the client tagged, and the review copy is deferred", async () => {
  const { res, sent, ghlCalls, deferred } = await post(BORDERLINE);

  assert.equal(res.body.ok, true);
  assert.equal(res.body.filtered, false, "borderline leads are delivered, not filtered");
  assert.equal(ghlCalls.length, 1);

  const toClient = sent.find((s) => s.options.to === undefined);
  assert.ok(toClient, "the client did not get the borderline lead");
  assert.equal(toClient.options.subjectPrefix, "[Check] ");

  assert.equal(deferred.length, 1, "the review copy was abandoned instead of deferred");
  await Promise.all(deferred);

  const copy = sent.find((s) => s.options.subjectPrefix === "[Check — copy] ");
  assert.ok(copy, "no review copy was sent");
  assert.equal(copy.options.to, DEFAULT_REVIEW_RECIPIENT);
});

test("a failing review copy never fails a real lead", async () => {
  let call = 0;
  const { res, deferred, logs } = await post(BORDERLINE, {
    sendEmail: async () => {
      call += 1;
      if (call === 1) return true; // the client's copy
      throw new Error("resend down"); // the review copy
    },
  });
  assert.equal(res.body.ok, true);
  await Promise.all(deferred);
  assert.ok(logs.error.join("\n").includes("review copy failed"));
});

// ================================================================== bots ====

test("a filled honeypot sends nothing anywhere", async () => {
  const { res, sent, ghlCalls, deferred } = await post(GENUINE, {}, { website: "http://spam.example" });
  assert.deepEqual(res, {
    status: 200,
    body: { ok: true, email: false, ghl: false, filtered: true },
  });
  assert.equal(sent.length, 0);
  assert.equal(ghlCalls.length, 0);
  assert.equal(deferred.length, 0);
});

// ================================================================== shape ====

test("a malformed or unusable request is rejected before any channel is touched", async () => {
  const h1 = harness();
  const r1 = await handleLead(req(null, { raw: "{not json" }), h1.channels);
  assert.equal(r1.status, 400);
  assert.equal(h1.sent.length, 0);

  const h2 = harness();
  const r2 = await handleLead(req({ firstName: "Pat", message: "Need a roof" }), h2.channels);
  assert.equal(r2.status, 400, "no email and no phone is not actionable");
  assert.equal(h2.sent.length, 0);
  assert.equal(h2.ghlCalls.length, 0);

  const h3 = harness();
  const r3 = await handleLead(req(null, { raw: "[1,2,3]" }), h3.channels);
  assert.equal(r3.status, 400, "a JSON array is not a submission");
});

test("odd field types never crash the route", async () => {
  const h = harness();
  const res = await handleLead(
    req({ firstName: {}, lastName: [], email: "a@b.co", phone: 42, message: null, source: 7 }),
    h.channels
  );
  assert.equal(res.status, 200);
  assert.equal(res.body.ok, true);
});
