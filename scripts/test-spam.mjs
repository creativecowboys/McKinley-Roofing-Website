// Unit test for the site's own lead scorer (lib/spam.ts). No network.
// Run: node --import ./scripts/register-ts.mjs scripts/test-spam.mjs
//
// JUNK is the real junk that reached McKinley's form Aug-Nov 2026 (from the
// GHL contact notes). Every one must be held for review by decideLead(), the
// same policy the /api/lead route runs.
// HOMEOWNERS are made-up but realistic inquiries, including ones that mention
// email, links, "your services" and documents. None may be filtered.

import test from "node:test";
import assert from "node:assert/strict";
import { assessLead } from "../lib/spam.ts";
import { decideLead } from "../lib/lead-decision.ts";
import { SAMPLES as JUNK } from "./samples-real.mjs";

const lead = (s) => ({
  firstName: s.firstName ?? "Pat", lastName: s.lastName ?? "Lee",
  email: s.email ?? "pat.lee@gmail.com", phone: "6785550142",
  address: s.address ?? "", newClient: "yes", message: s.message, source: "contact-form",
});
// The route's own decision: "review" means held off the client's desk.
const filtered = (s) => decideLead(lead(s), {}).action === "review";

const HOMEOWNERS = [
  "We have a leak over the kitchen after the storm last night. Insurance adjuster is coming Friday, can someone look before then?",
  "Hello, I'm interested in your services. Need a quote for a roof replacement, 2 story house in Douglasville. Email is best, I work nights.",
  "Please contact me by email at pat.lee@gmail.com, I can't take calls at work. Shingles blew off in the wind.",
  "Can you email me the estimate? My email is pat.lee@gmail.com",
  "I'm interested in your services. Please call me.",
  "Hi McKinley Roofing, my neighbor at 412 Oak St used you last year. Can you come look at my gutters?",
  "Here are photos of the damage: https://photos.app.goo.gl/abc123 — water stain on the ceiling after rain.",
  "I have the insurance adjuster's report and photos I can share with you. Claim was approved for a full replacement.",
  "Our HOA requires architectural shingles. Can you send a quote and the product sheet by email so I can submit it to the board?",
  "We just bought our first home and the inspection report says the roof has 5 years left. Can we get an estimate? I can share the inspection report.",
  "Property manager here, 12 rentals in Villa Rica. Looking for a roofing company for ongoing repairs. Would like to set up a call.",
  "Do you offer financing? Metal roof for a barn, about 2,000 sq ft.",
  "Is McKinley Roofing and Restoration able to do commercial flat roofs?",
  "Need a tarp on the roof ASAP, tree came down on it.",
];

test("every real junk submission from Aug-Nov 2026 is filtered", () => {
  for (const s of JUNK) assert.ok(filtered(s), s.tag);
});

test("realistic homeowner inquiries are never filtered", () => {
  for (const message of HOMEOWNERS) {
    const s = { message };
    assert.ok(!filtered(s), `${message}\n  ${JSON.stringify(decideLead(lead(s), {}).reasons)}`);
  }
});

test("the site's own name is not roofing intent", () => {
  const r = assessLead(lead({ message: "Hi McKinley Roofing and Restoration, we offer AI agents that answer your phones. Grab a time here: example.com/demo" }), {});
  assert.equal(r.verdict, "spam");
});

test("honeypot and fast submit are still bots", () => {
  assert.equal(assessLead(lead({ message: "roof leak" }), { honeypot: "x" }).verdict, "bot");
  assert.equal(assessLead(lead({ message: "roof leak" }), { startedAt: Date.now() }).verdict, "bot");
});
