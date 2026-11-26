# Roofing customer routing

`app/api/lead/route.ts` sends every website form through `handleLead` and
`decideLead`. Only clear roofing customer inquiries receive the normal client
email and GoHighLevel contact/opportunity.

The existing honeypot remains the only discard path. Solicitations, possible
bots, borderline screen results, employment/provider offers, non-roofing work,
and unclear inquiries go only to `dave@creativecowboys.co`. A `[Check]` subject
now means Dave-only review; it no longer sends to the client or GoHighLevel.

`lib/roofing-intent.ts` requires an explicit roofing component plus customer
request, property problem, or existing roofing-job followup. Short requests
such as “Roof leaking” and “Roof repair” qualify. Siding/gutters-only requests,
generic estimates, insurance claims without roofing context, and storm/indoor
damage without a roofing component stay with Dave. Street names, the site's
company name, and `newClient` cannot establish roofing customer intent.

The dedicated Free Roof Inspection form preserves its optional-notes flow:
`inspection-modal` plus a numbered property address, reply contact, and empty
or default notes qualifies after all other screens pass. A substantive message
must establish roofing intent itself. The source is form context, not identity
verification, and cannot override a pitch/bot/borderline verdict.

Review delivery is awaited. If Dave's sole preservation email fails in
production, the response is retryable HTTP 503; the form shows its existing
retry/phone fallback. Unclear legitimate customers remain recoverable in
Dave's review inbox. This deliberately favors manual review when intent is
uncertain; no content heuristic guarantees that every submission is genuine.

Offline verification (no email, CRM, or network calls):

```sh
node --import ./scripts/register-ts.mjs --test scripts/test-lead-decision.mjs scripts/test-lead-route.mjs scripts/test-pitch.mjs scripts/test-spam.mjs
./node_modules/.bin/tsc --noEmit --incremental false
```

The handler tests exercise the implementation used by POST with fake delivery
channels, including Dave-only recipients, no CRM calls, filtered responses,
review failures, genuine roofing delivery, inspection requests, and honeypots.
Old clean-by-default/borderline-delivery expectations intentionally change to
review for vague, other-service, or ambiguous messages.
