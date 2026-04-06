// lib/landing-page-faqs.ts
// Service-specific FAQ sets for all 6 service types.
// Each FAQ is tailored to the service and city is injected dynamically.

export interface FAQ {
  question: string;
  answer: string;
}

type FAQFactory = (city: string) => FAQ[];

const FAQ_MAP: Record<string, FAQFactory> = {
  'roof-replacement': (city) => [
    {
      question: `How long does a roof replacement take in ${city}, GA?`,
      answer: `Most residential roof replacements in ${city}, GA are completed in one to two days. The exact timeline depends on the size and pitch of your roof, weather conditions, and the materials selected. McKinley Roofing will give you a clear schedule before work begins so you can plan accordingly.`,
    },
    {
      question: `What roofing materials does McKinley Roofing use for replacements?`,
      answer: `McKinley Roofing is an Owens Corning Preferred Contractor. We primarily install Owens Corning architectural shingles, which are available in a variety of colors and styles. These shingles come with some of the strongest manufacturer warranties available, and our workmanship warranty backs every installation.`,
    },
    {
      question: `Does McKinley Roofing offer financing for roof replacement in ${city}?`,
      answer: `Yes. We understand a roof replacement is a major investment. McKinley Roofing offers flexible financing options so ${city} homeowners can get the roof they need without delaying due to cost. Contact us to learn about current financing plans.`,
    },
    {
      question: `Is McKinley Roofing licensed and insured in Georgia?`,
      answer: `Absolutely. McKinley Roofing is fully licensed, insured, and bonded to work in the state of Georgia. We carry general liability and workers' compensation coverage, so you and your property are protected throughout the entire project.`,
    },
    {
      question: `How do I know if I need a full roof replacement or just a repair in ${city}?`,
      answer: `If your roof is over 20 years old, has widespread shingle damage, multiple active leaks, or significant granule loss, replacement is usually the more cost-effective long-term solution. McKinley Roofing provides free inspections in ${city} — we'll give you an honest assessment and never recommend replacement when a repair will do.`,
    },
  ],

  'roof-repair': (city) => [
    {
      question: `How quickly can McKinley Roofing respond to a roof repair in ${city}, GA?`,
      answer: `McKinley Roofing offers same-week scheduling for most roof repairs in ${city}, GA. For urgent situations involving active leaks, we prioritize emergency response to minimize interior water damage to your home.`,
    },
    {
      question: `What are the most common roof repairs for homes in ${city}, GA?`,
      answer: `The most common roof repairs we see in the ${city} area include missing or cracked shingles, failed flashing around chimneys and skylights, damaged valley sections, leaking pipe boots, and minor storm-related punctures. Most of these repairs can be completed in a single visit.`,
    },
    {
      question: `Will my homeowner's insurance cover roof repairs in ${city}?`,
      answer: `It depends on the cause of the damage. Insurance typically covers sudden and accidental damage — such as storm or hail damage — but not wear-and-tear deterioration. McKinley Roofing provides detailed photo documentation and damage reports to support your claim process.`,
    },
    {
      question: `How do I know if my roof repair was done right?`,
      answer: `McKinley Roofing performs a final inspection and provides before-and-after documentation for every repair. We stand behind our work with a Lifetime Workmanship Warranty, so if any issue arises from our work, we'll come back and make it right — no questions asked.`,
    },
    {
      question: `Can you repair just part of my roof, or does it all need to be replaced?`,
      answer: `In most cases, yes — we can repair the damaged section and match new shingles as closely as possible to your existing roof. Our honest approach means we'll always recommend the most cost-effective solution for ${city} homeowners, which is often a targeted repair rather than a full replacement.`,
    },
  ],

  'storm-damage-restoration': (city) => [
    {
      question: `What should I do immediately after storm damage to my roof in ${city}, GA?`,
      answer: `First, stay safe — don't attempt to inspect the roof yourself. Document any visible damage from the ground with photos. Call McKinley Roofing for emergency tarping to prevent further water intrusion, then contact your insurance company to open a claim. We can assist you through the entire process.`,
    },
    {
      question: `Does McKinley Roofing work with insurance companies for storm claims in ${city}?`,
      answer: `Yes. McKinley Roofing has extensive experience working with all major insurance carriers. We'll provide a detailed damage report, help document all affected areas, and can coordinate directly with your adjuster to ensure nothing is missed in your claim for your ${city} property.`,
    },
    {
      question: `How long does storm damage restoration take in ${city}, GA?`,
      answer: `Emergency tarping is typically completed within 24–48 hours of a storm event. Full restoration timelines depend on the scope of damage and material availability, but McKinley Roofing works efficiently to return your home to pre-storm condition as quickly as possible.`,
    },
    {
      question: `What types of storm damage does McKinley Roofing repair in ${city}?`,
      answer: `We handle all types of storm-related roof damage including wind damage, hail damage, falling tree limbs, and debris impacts. We also repair or replace gutters, siding, and fascia boards that are commonly damaged during Georgia storms.`,
    },
    {
      question: `Will I need to replace my whole roof after a storm, or can it be repaired?`,
      answer: `It depends on the extent of the damage. McKinley Roofing provides a thorough, no-pressure inspection to assess whether a repair or full replacement is the right call. Many Georgia storm events cause localized damage that can be repaired without replacing the entire roof — we'll always recommend the most appropriate scope of work.`,
    },
  ],

  'gutter-installation': (city) => [
    {
      question: `What type of gutters does McKinley Roofing install in ${city}, GA?`,
      answer: `McKinley Roofing installs seamless aluminum gutters that are fabricated on-site to fit your home's exact dimensions. Seamless gutters have fewer joints than sectional gutters, which dramatically reduces the chances of leaks. We offer 5-inch and 6-inch K-style profiles in a wide range of colors to match your home's exterior.`,
    },
    {
      question: `Why is seamless gutter installation important for homes in ${city}, GA?`,
      answer: `${city} and the greater West Georgia area experiences heavy rainfall seasons. Properly sized, seamless gutters are essential for directing water away from your foundation, landscaping, and siding. Undersized or clogged gutters can lead to basement flooding, erosion, and wood rot — all expensive problems that proper installation prevents.`,
    },
    {
      question: `How long does gutter installation take in ${city}?`,
      answer: `A standard residential gutter installation in ${city} typically takes one day. Larger homes or projects that include downspout extensions and gutter guard installation may take slightly longer. McKinley Roofing will provide an accurate timeline at the time of your free estimate.`,
    },
    {
      question: `Does McKinley Roofing install gutter guards or leaf protection?`,
      answer: `Yes. We offer gutter protection systems (leaf guards) as an add-on to gutter installation. These are especially valuable during Georgia's leaf-fall seasons and keep debris from clogging your gutters and downspouts throughout the year.`,
    },
    {
      question: `Can McKinley Roofing combine gutter installation with a new roof in ${city}?`,
      answer: `Absolutely — and we recommend it. Installing new gutters alongside a roof replacement or repair ensures a complete, integrated water management system for your ${city} home. Bundling both services often saves time and cost compared to scheduling them separately.`,
    },
  ],

  'siding-installation': (city) => [
    {
      question: `What siding materials does McKinley Roofing install in ${city}, GA?`,
      answer: `McKinley Roofing installs vinyl siding, fiber cement siding, and wood composite siding. Each material has different advantages in terms of durability, appearance, and maintenance requirements. Our team can walk ${city} homeowners through the best option for their budget, climate exposure, and aesthetic goals.`,
    },
    {
      question: `How long does siding installation take for a home in ${city}, GA?`,
      answer: `Siding installation timelines vary based on the size of your home and the material chosen. Most standard residential re-siding projects in ${city} are completed within 2–5 days. We'll give you a detailed project timeline before work begins so there are no surprises.`,
    },
    {
      question: `Is a house wrap or moisture barrier necessary under new siding in ${city}?`,
      answer: `Yes, absolutely. McKinley Roofing always installs a proper moisture barrier and house wrap beneath new siding. Georgia's heat and humidity make moisture management critical — without it, siding can trap moisture against the sheathing, leading to mold, rot, and structural damage over time.`,
    },
    {
      question: `Can McKinley Roofing match new siding panels to my existing siding in ${city}?`,
      answer: `For partial siding repairs, we work to match the existing material, color, and profile as closely as possible. For full re-siding projects, we'll help ${city} homeowners choose from our complete range of styles and colors to achieve the look they want.`,
    },
    {
      question: `Does McKinley Roofing offer a warranty on siding installation in ${city}?`,
      answer: `Yes. Every siding project comes with our Lifetime Workmanship Warranty. In addition, most siding materials come with their own manufacturer's warranty covering product defects. McKinley Roofing will explain both warranty coverages clearly before your project begins.`,
    },
  ],

  'roof-maintenance': (city) => [
    {
      question: `How often should I schedule roof maintenance in ${city}, GA?`,
      answer: `Most roofing professionals recommend a professional inspection and maintenance visit at least once a year — ideally in the spring after winter weather and before Georgia's peak storm season. Homes surrounded by trees or in areas that experience severe weather may benefit from twice-yearly visits.`,
    },
    {
      question: `What does McKinley Roofing's roof maintenance service include for ${city} homeowners?`,
      answer: `Our maintenance visits include a full surface inspection of all shingles, flashing, and ridge cap; valley and gutter debris removal; re-sealing of pipe boots, vents, and skylights; flashing inspection and spot repairs; an attic moisture and ventilation check; and a written condition report with photos so you know exactly what we found.`,
    },
    {
      question: `Does regular roof maintenance affect my Owens Corning warranty in ${city}?`,
      answer: `Yes — and this is critically important. Many Owens Corning warranty programs require documented regular maintenance to remain valid. McKinley Roofing's maintenance visits are designed to meet those requirements and keep your warranty active for the full warranty period.`,
    },
    {
      question: `How much does roof maintenance cost in ${city}, GA?`,
      answer: `Roof maintenance pricing varies based on roof size and complexity. However, the cost of a maintenance visit is a fraction of what deferred damage can cost — a $300–$500 annual checkup regularly prevents $3,000–$15,000 in avoidable repairs. Contact McKinley Roofing for a free estimate for your ${city} home.`,
    },
    {
      question: `Can McKinley Roofing identify small problems before they become major repairs in ${city}?`,
      answer: `That's exactly the purpose of our maintenance program. Catching a failing pipe boot seal, a few lifted shingles, or minor flashing separation early — before the next rainstorm hits — is what prevents small issues from becoming full interior water damage events. Our ${city} customers consistently tell us that maintenance visits save them significant money long-term.`,
    },
  ],
};

export function getFAQs(serviceSlug: string, cityName: string): FAQ[] {
  const factory = FAQ_MAP[serviceSlug];
  if (!factory) return [];
  return factory(cityName);
}
