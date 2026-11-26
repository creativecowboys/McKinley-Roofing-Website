/**
 * Positive customer intent, after the existing solicitation screens pass.
 * A company name, form source, contact details or a bare trade word does not
 * establish a roofing request. Unclear inquiries are kept for Dave to review.
 */
export function hasRoofingCustomerIntent(
  message: string,
  address: string,
  context: { source: string; hasContact: boolean }
): boolean {
  // The dedicated form explicitly offers a free roof inspection and makes
  // notes optional. Preserve that request when it includes a property address
  // and a way to reply. Source alone never qualifies, and the caller runs all
  // pitch/bot screens before this gate. A substantive message must stand on
  // its own rather than being overridden by the form source.
  if (context.source === 'inspection-modal' && context.hasContact &&
      /\d/.test(address) && /[a-z]/i.test(address) &&
      /^(?:\s*|\s*no additional notes\.?\s*)$/i.test(message)) {
    return true;
  }
  // Street names can contain Roof/Shingle/etc.; address vocabulary must not
  // turn an unrelated message into a roofing customer request.
  const text = message
    .replace(/[‘’ʼ]/g, "'")
    .replace(/mc\s?kinley(?: roofing)?(?: (?:and|&) restoration)?/gi, ' ')
    .replace(/\S+@\S+|(?:https?:\/\/|www\.)\S+/gi, ' ');

  // Roofing vocabulary in an offer to sell work is not customer intent.
  // Even if another screen misses it, "I install roofs" / "we can help"
  // must not qualify just because install/repair also describe customer jobs.
  const providerVoice = /\b(?:we|i|our (?:company|team|crews?)) (?:(?:am|are) )?(?:can |could |will |would )?(?:offer(?:ing)?|provid(?:e|ing)|supply(?:ing)?|sell(?:ing)?|generat(?:e|ing)|help(?:ing)?|install(?:ing)?|repair(?:ing)?|replac(?:e|ing)|perform(?:ing)?|partner(?:ing)?)\b|\b(?:for sale|competitive (?:rates|prices)|(?:call|contact) us for (?:a )?(?:quote|estimate)|available for (?:roof|roofing|repair|work))\b/i;
  const employment = /\b(?:jobs|employment|positions?|careers?|resume|résumé|job application|job opportunit(?:y|ies))\b|\b(?:(?:looking|applying|apply) for|seeking|need|want) (?:a |an |the |new )?(?:work|job|projects|clients|opportunities)\b/i;
  const noRoofWork = /\bno (?:new )?roof(?:ing)?(?: work)? (?:is )?(?:needed|required)|\b(?:do not|don't|not) (?:need|want|looking for)\b[^.!?\n]{0,50}\broof(?:ing)?\b/i;
  if (providerVoice.test(text) || employment.test(text) || noRoofWork.test(text)) return false;

  const roofing = /\b(?:roofs?|roofing|roofers?|re-?roof(?:ed|ing)?|shingles?|flashing|skylights?)\b/i;
  const workRequest = /\b(?:quote|estimate|inspect(?:ion|ed)?|repairs?|replac(?:e|ement|ing)|install(?:ation)?|re-?roof(?:ed|ing)?|tarp|colors?)\b/i;
  const directRequest = /\b(?:needs?|requires?|want|looking for|would like|like to) (?:an? |the |my |our |new |metal |shingle |flat |commercial |residential |replacement |another |good |reliable |honest |architectural )*(?:roofs?|roofers?|roofing|shingles?|flashing|skylights?)\b|\bhow much[^.!?\n]{0,50}\broofs?\b|\b(?:do you|can you|able to) do (?:metal |shingle |flat |commercial |residential )*roofs?\b/i;
  const propertyProblem = /\b(?:flagged|leak(?:s|ing)?|damag(?:e|ed)|missing|loose|lifted|blew off|blown off|fell|fallen|hole|old|worn|water|wet|limb|tree|hail|storm)\b/i;
  const followup = /\b(?:warranty|appointment|scheduled|schedule|status|follow[ -]?up|invoice|payment|job|work|estimate|quote)\b/i;
  const ownRoof = /\b(?:my|our) (?:new |metal |shingle |flat )?(?:roof|roofing|shingles|flashing|skylight)\b/i;

  // Keep topic and requested work/problem together. A roof noun in a greeting
  // or anecdote must not turn an unrelated request to call/help into a lead.
  for (const sentence of text.split(/[.!?\n]+/)) {
    if (!roofing.test(sentence)) continue;
    if (workRequest.test(sentence) || directRequest.test(sentence) || propertyProblem.test(sentence)) return true;
    if (/\bneeds?\b/i.test(sentence) && /\b(?:replaced|repaired|installed)\b/i.test(sentence)) return true;
    if (ownRoof.test(sentence) && followup.test(sentence)) return true;
    if (/\b(?:warranty|status|follow[ -]?up)\b/i.test(sentence) && /\b(?:my|our)\b/i.test(sentence)) return true;
  }
  // A named own-property roofing job can carry context into its next sentence,
  // e.g. "Your crew replaced my roof. Can you call about the warranty?"
  if (ownRoof.test(text) && followup.test(text)) return true;
  // A customer may put the financing question before the described roof job.
  // Require both the buyer's question and an explicit roof-for-property link.
  if (/\b(?:do you offer|do you have|can i get) financing\b/i.test(text) &&
      /\broof (?:for|on) (?:a|an|my|our|the) (?:house|home|barn|building|church|garage|warehouse)\b/i.test(text)) return true;

  // Damage without an explicit roofing component is uncertain: a storm can
  // damage a pool or driveway, and an indoor leak can come from plumbing.
  // Dave preserves and reviews these instead of guessing the service.
  return false;
}
