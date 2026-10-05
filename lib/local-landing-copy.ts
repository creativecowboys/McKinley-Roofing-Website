// Unique body copy for Newnan and Carrollton service pages.
// These pages otherwise share one template with only the city name swapped.
// Facts are limited to what already appears in data/locations.ts and the
// business overview (Douglasville base, services, Owens Corning Preferred,
// warranties, insurance help, free inspections, seamless gutters).

export interface LocalLandingLink {
  href: string;
  label: string;
}

export interface LocalLandingCopy {
  /** Replaces the shared city-swap intro when present. */
  metaDescription: string;
  heading: string;
  paragraphs: string[];
  links: LocalLandingLink[];
  faqs: { question: string; answer: string }[];
}

const newnanHub = { href: '/locations/newnan-ga', label: 'Roofing companies in Newnan, GA' };
const carrolltonHub = { href: '/locations/carrollton-ga', label: 'Roofing company in Carrollton, GA' };

export const LOCAL_LANDING_COPY: Record<string, LocalLandingCopy> = {
  'roof-repair-newnan-ga': {
    metaDescription:
      'Roof repair in Newnan, GA for leaks, missing shingles, and wind damage. McKinley Roofing serves Coweta County from Douglasville. Free inspection.',
    heading: 'Roof repair for Newnan and Coweta County homes',
    paragraphs: [
      'Roof repair in Newnan, GA is rarely the same job twice. Houses around the downtown Court Square — the historic streets that earned Newnan the nickname “City of Homes” — usually leak at chimney flashing, step flashing, or dried-out pipe boots while the shingle field still looks intact from the yard. Newer roofs toward Ashley Park, White Oak, and Woodland Farms fail differently: wind lifts the tabs, hail bruises the mat, and a stain shows up inside weeks later.',
      'Coweta County weather is part of the repair history here. In March 2021 an EF-4 tornado cut a mile-wide path through Newnan with winds over 170 mph and damaged or destroyed more than 1,700 homes across the county. Inspections still turn up leftover wind damage and quick repairs that never held. McKinley Roofing starts with a full look at the roof, not a single wet spot, so a Newnan homeowner can tell a targeted repair from a roof that needs to be replaced.',
      'We are a family-owned roofing company based in Douglasville, and Newnan is one of the Coweta County cities we serve. Repair work covers missing or cracked shingles, flashing at chimneys and vents, open valleys, and active leaks. When the damage is from a storm, we document it for the insurance claim. For an active leak, call (678) 983-4455 — we can typically get on-site the same day to secure the roof.',
    ],
    links: [
      newnanHub,
      { href: '/roof-replacement-newnan-ga', label: 'Roof replacement in Newnan, GA' },
      { href: '/storm-damage-restoration-newnan-ga', label: 'Storm damage restoration in Newnan, GA' },
      { href: '/gutter-installation-newnan-ga', label: 'Gutter installation in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'What roof repairs do Newnan homes usually need?',
        answer:
          'Around the Court Square, repairs are often flashing and pipe-boot leaks on older houses. In newer subdivisions such as Ashley Park, White Oak, and Woodland Farms, we more often repair wind-lifted shingles and hail bruises. A free inspection shows which of those is actually going on.',
      },
      {
        question: 'Can a Newnan roof be repaired after the 2021 tornado?',
        answer:
          'Sometimes. The March 2021 EF-4 tornado damaged or destroyed more than 1,700 homes in Coweta County, and some roofs were patched in a hurry. If the decking is sound and the damage is local, a repair can be the right fix. If the field is worn out or the patches have failed, we will say so and price a replacement instead.',
      },
    ],
  },

  'roof-replacement-newnan-ga': {
    metaDescription:
      'Roof replacement in Newnan, GA with Owens Corning materials and a written estimate. McKinley Roofing serves Coweta County. Free inspection. (678) 983-4455.',
    heading: 'Roof replacement in Newnan, from Court Square to Ashley Park',
    paragraphs: [
      'Roof replacement in Newnan, GA usually comes up for one of two houses. Downtown and the older blocks of the City of Homes have roofs that have been repaired in layers — patched flashing, mismatched shingles, and decking that has taken on water more than once. Out toward Ashley Park, White Oak, Woodland Farms, Mountain Creek, and Windsong, whole neighborhoods were roofed around the same time, so the architectural shingles age out together.',
      'Storm history matters on a replacement, too. The March 2021 EF-4 tornado tore a mile-wide path through Newnan with winds over 170 mph. Some homes were replaced properly afterward. Others got a partial fix that is failing now, or still carry hail and wind damage from later Coweta County storms. McKinley Roofing inspects before recommending a tear-off. If a repair will honestly last, that is what we recommend.',
      'When a replacement is the right scope, we are an Owens Corning Preferred Contractor, which means the shingles are installed to the manufacturer’s standard and the job can carry both a manufacturer warranty and a labor warranty. The crew is based in Douglasville and serves Newnan and the rest of Coweta County. The visit starts as a free inspection and a written estimate. If insurance is involved, we document the damage and meet the adjuster on-site.',
    ],
    links: [
      newnanHub,
      { href: '/roof-repair-newnan-ga', label: 'Roof repair in Newnan, GA' },
      { href: '/storm-damage-restoration-newnan-ga', label: 'Storm damage restoration in Newnan, GA' },
      { href: '/gutter-installation-newnan-ga', label: 'Gutter installation in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'When should a Newnan homeowner replace the roof instead of repairing it?',
        answer:
          'Replacement is usually the better spend when the roof is old, the shingles have widespread granule loss, leaks keep coming back, or storm damage covers more than a small area. Older Court Square houses and newer subdivision roofs fail for different reasons. We inspect for free and tell you which path fits the roof in front of us.',
      },
      {
        question: 'Do you replace roofs in Newnan neighborhoods outside downtown?',
        answer:
          'Yes. Besides the Court Square, we work in Ashley Park, White Oak, Woodland Farms, Mountain Creek, and Windsong, and in nearby Coweta communities such as Sharpsburg and Senoia. Call (678) 983-4455 if you are not sure your street is in range.',
      },
    ],
  },

  'storm-damage-restoration-newnan-ga': {
    metaDescription:
      'Storm damage restoration in Newnan, GA. McKinley Roofing inspects wind and hail damage in Coweta County and helps document insurance claims. Free inspection.',
    heading: 'Storm and wind damage on Newnan roofs',
    paragraphs: [
      'Newnan has a specific storm history, not a generic one. In March 2021 an EF-4 tornado crossed the city on a mile-wide path with winds over 170 mph and damaged or destroyed more than 1,700 homes in Coweta County. Years later, roof inspections in Newnan still find two leftovers from that event: damage that was never fully opened up, and repairs that were rushed on while the county was overwhelmed.',
      'Later hail and wind storms hit the same houses. A roof over White Oak or Mountain Creek can look fine from the driveway and still have bruised shingles, lifted tabs, and flashing that pulled away from a chimney. Downtown, an older roof may only show the problem as a ceiling stain after the next hard rain. Storm damage restoration in Newnan starts with photos and a written scope, because that is what an insurance claim actually needs.',
      'McKinley Roofing is based in Douglasville and works storm claims across Coweta County. We inspect, document wind, hail, and impact damage, and meet the adjuster on the roof when you want us there. Most homeowners in this situation pay their deductible once the carrier approves the scope. If water is coming in now, call (678) 983-4455 so the roof can be secured before the next storm.',
    ],
    links: [
      newnanHub,
      { href: '/roof-repair-newnan-ga', label: 'Roof repair in Newnan, GA' },
      { href: '/roof-replacement-newnan-ga', label: 'Roof replacement in Newnan, GA' },
      { href: '/gutter-installation-newnan-ga', label: 'Gutter installation in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'Does McKinley Roofing still work on tornado damage in Newnan?',
        answer:
          'Yes. The 2021 EF-4 tornado is still part of the roofing work in Coweta County because some repairs from that period have failed, and later storms have added new damage. We inspect and tell you whether the roof needs a repair, a replacement, or documentation for a claim.',
      },
      {
        question: 'Will you meet the insurance adjuster in Newnan?',
        answer:
          'Yes. We document the damage and can meet the adjuster on-site so the claim matches what the roof actually needs. That help is part of how we handle storm damage for Newnan homeowners.',
      },
    ],
  },

  'gutter-installation-newnan-ga': {
    metaDescription:
      'Seamless gutter installation in Newnan, GA. McKinley Roofing directs Coweta County rainfall away from the roof and foundation. Free estimate. (678) 983-4455.',
    heading: 'Gutter installation for Newnan houses',
    paragraphs: [
      'Gutter installation in Newnan, GA has to deal with two kinds of eaves. Older homes near the Court Square often have fascia and soffits that were not built for a modern seamless run, and downspouts that dump water against a brick foundation. Newer houses in Ashley Park, Windsong, and Mountain Creek have longer runs and roof valleys that throw a lot of water at once during a Coweta County downpour.',
      'McKinley Roofing installs seamless gutter systems, fabricated to the house rather than pieced together from short sections: a layout matched to the property, durable gutter material, and downspouts that move water away from the structure. Where the downspouts discharge matters as much as the gutter size.',
      'Gutters are often done with roof repair or roof replacement, because a new shingle roof still leaks into the walls if the water never leaves the foundation. We are based in Douglasville and serve Newnan and Coweta County. Call (678) 983-4455 to schedule a look at the existing gutters and the roof edge together.',
    ],
    links: [
      newnanHub,
      { href: '/roof-repair-newnan-ga', label: 'Roof repair in Newnan, GA' },
      { href: '/roof-replacement-newnan-ga', label: 'Roof replacement in Newnan, GA' },
      { href: '/roof-maintenance-newnan-ga', label: 'Roof maintenance in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'Do you install gutters on older homes in downtown Newnan?',
        answer:
          'Yes. Court Square and the older parts of Newnan often need a layout that follows existing fascia, not a one-size run. We install seamless gutters and set the downspouts so water is carried away from the foundation.',
      },
      {
        question: 'Can gutters be replaced at the same time as a Newnan roof?',
        answer:
          'Yes, and it is a practical time to do it. Roof repair or roof replacement already puts a crew at the eaves. Combining the gutter work keeps the water path — shingles, drip edge, and downspouts — consistent.',
      },
    ],
  },

  'siding-installation-newnan-ga': {
    metaDescription:
      'Siding installation and repair in Newnan, GA for storm-damaged and aging exteriors. McKinley Roofing serves Coweta County. Free inspection. (678) 983-4455.',
    heading: 'Siding installation and repair in Newnan',
    paragraphs: [
      'Siding in Newnan takes the same weather the roof does. Wind off a Coweta County storm pulls panels loose, and the March 2021 tornado corridor left exteriors that were patched beside roofs that were only partly repaired. Closer to the Court Square, older houses need siding and trim work that respects what is already on the wall. Farther out, Ashley Park and similar subdivisions are more often a straightforward panel or section replacement.',
      'McKinley Roofing installs and repairs siding as part of exterior work, not as a separate company. Vinyl, fiber cement, and wood composite are the materials we already install. The useful question on a Newnan house is whether the wall got wet behind the cladding. If it did, the siding job and the roof leak are the same project.',
      'We are family-owned, based in Douglasville, and we serve Newnan in Coweta County. A free inspection can cover the roof and the siding together so you are not hiring two contractors to argue about which one let the water in. Call (678) 983-4455.',
    ],
    links: [
      newnanHub,
      { href: '/roof-repair-newnan-ga', label: 'Roof repair in Newnan, GA' },
      { href: '/storm-damage-restoration-newnan-ga', label: 'Storm damage restoration in Newnan, GA' },
      { href: '/roof-replacement-newnan-ga', label: 'Roof replacement in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'Do you repair siding that was damaged in the Newnan tornado?',
        answer:
          'We repair and replace storm-damaged siding in Newnan, including houses that were only partly restored after the 2021 EF-4 tornado. If the roof was damaged in the same event, we can inspect both and document what an insurance claim still needs.',
      },
    ],
  },

  'roof-maintenance-newnan-ga': {
    metaDescription:
      'Roof maintenance in Newnan, GA: inspections, gutter cleaning, and small repairs before the next Coweta County storm. McKinley Roofing. Free inspection.',
    heading: 'Roof maintenance for Newnan homeowners',
    paragraphs: [
      'Roof maintenance in Newnan, GA is how a small problem stays small. On a Court Square house, that is often a cracked seal at a chimney or a pipe boot that has dried out. In Ashley Park, White Oak, and Woodland Farms, it is more often a few lifted shingles and valleys packed with debris after a storm. Either one lets water in long before the whole roof looks failed.',
      'Our maintenance visits follow the same checklist we use across West Georgia: inspect the shingles, flashing, and ridge, clean debris from valleys and gutters, reseal vulnerable penetrations, and write down what we found. Coweta County’s storm history is a reason to do that on a schedule. Roofs that were repaired after the 2021 tornado deserve a second look, because a patch that held for a year may not hold through the next hail event.',
      'McKinley Roofing is an Owens Corning Preferred Contractor based in Douglasville. Maintenance does not replace a free inspection when you already see a leak — call (678) 983-4455 for that — but it is the right call when the roof is quiet and you want it to stay that way.',
    ],
    links: [
      newnanHub,
      { href: '/roof-repair-newnan-ga', label: 'Roof repair in Newnan, GA' },
      { href: '/gutter-installation-newnan-ga', label: 'Gutter installation in Newnan, GA' },
      { href: '/roof-replacement-newnan-ga', label: 'Roof replacement in Newnan, GA' },
    ],
    faqs: [
      {
        question: 'How often should a Newnan roof be inspected?',
        answer:
          'Once a year is a sound baseline in Coweta County, and sooner after a hail or wind storm. Homes with heavy tree cover, and roofs repaired after the 2021 tornado, are worth checking even if nothing is leaking yet.',
      },
    ],
  },

  'roof-repair-carrollton-ga': {
    metaDescription:
      'Roof repair in Carrollton, GA for leaks, older downtown roofs, and storm damage. McKinley Roofing serves Carroll County. Free inspection. (678) 983-4455.',
    heading: 'Roof repair in Carrollton and Carroll County',
    paragraphs: [
      'Roof repair in Carrollton, GA splits along the age of the house. Near Adamson Square and the older blocks downtown, the leak is often flashing, a tired pipe boot, or a valley on a roof that has already been patched once. Those houses need a careful repair so the new work matches the lines that are already there. Out toward the University of West Georgia, Highway 61, Sunset Hills, and Oak Mountain, the typical call is wind-lifted architectural shingles after a spring storm.',
      'Carrollton is both the Carroll County seat and a college town, so the roofs are a mix of owner-occupied houses and rentals around UWG. A rental that “had a leak last semester” and a Northside house with granule loss in the gutters are different repairs. We inspect the attic side and the roof side before we recommend a scope. West Georgia hail and straight-line wind show up here every storm season, and they do not announce themselves from the ground.',
      'McKinley Roofing is family-owned and based in Douglasville. We repair missing shingles, flashing, valleys, and active leaks across Carrollton and Carroll County, and we can typically be on-site the same day when water is coming in. Storm damage is documented if you need to open a claim. Call (678) 983-4455.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-replacement-carrollton-ga', label: 'Roof replacement in Carrollton, GA' },
      { href: '/gutter-installation-carrollton-ga', label: 'Gutter installation in Carrollton, GA' },
      { href: '/storm-damage-restoration-carrollton-ga', label: 'Storm damage restoration in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'Do you repair older roofs near Adamson Square?',
        answer:
          'Yes. Downtown Carrollton and Adamson Square often need flashing and shingle repairs on older roofs, not a full tear-off. We inspect first and tell you if a repair will hold or if the decking and the shingle field are too far gone.',
      },
      {
        question: 'Do you repair roofs around the University of West Georgia?',
        answer:
          'Yes. We serve the UWG area, Highway 61, Sunset Hills, Oak Mountain, Northside, and Bowdon Junction, along with the rest of Carrollton. Call (678) 983-4455 for a free inspection.',
      },
    ],
  },

  'roof-replacement-carrollton-ga': {
    metaDescription:
      'Roof replacement in Carrollton, GA with Owens Corning materials and a written estimate. McKinley Roofing serves Carroll County. Free inspection.',
    heading: 'Roof replacement for Carrollton houses',
    paragraphs: [
      'Roof replacement in Carrollton, GA is a different project on a century-old house by Adamson Square than it is on a subdivision roof off Highway 61. Downtown, the decking, the chimney, and the flashing details decide the job. In newer areas — Oak Mountain, Sunset Hills, Northside, and the neighborhoods spreading toward the University of West Georgia — the shingles are often the original architectural layer, now losing granules and failing in the same spots after hail.',
      'We do not treat replacement as the default. McKinley Roofing inspects and will recommend roof repair when that is the honest fix. Replacement is the recommendation when the roof is at the end of its life, when storm damage is spread across the slopes, or when repeated patches are costing more than a new roof. You get a written estimate after the free inspection, not a guess from the curb.',
      'Installations use Owens Corning materials. We are an Owens Corning Preferred Contractor, so the roof is installed to their standard and can carry manufacturer and labor warranties. The company is based in Douglasville and serves Carrollton and Carroll County, including Temple, Whitesburg, and Bowdon nearby. If a storm caused the loss, we document it and meet the adjuster.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-repair-carrollton-ga', label: 'Roof repair in Carrollton, GA' },
      { href: '/gutter-installation-carrollton-ga', label: 'Gutter installation in Carrollton, GA' },
      { href: '/storm-damage-restoration-carrollton-ga', label: 'Storm damage restoration in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'What does a Carrollton roof replacement include?',
        answer:
          'A free inspection, a written estimate, tear-off of the old roofing, and installation with Owens Corning materials by an Owens Corning Preferred Contractor. Manufacturer and labor warranties are part of that work. The exact scope depends on the decking we find underneath.',
      },
      {
        question: 'Do you replace roofs on both older and newer Carrollton homes?',
        answer:
          'Yes. We replace roofs on older houses around Adamson Square and on newer roofs in Oak Mountain, Sunset Hills, Northside, Bowdon Junction, and the University of West Georgia area. The inspection decides the scope, not the neighborhood.',
      },
    ],
  },

  'storm-damage-restoration-carrollton-ga': {
    metaDescription:
      'Storm damage restoration in Carrollton, GA. Wind and hail inspections and insurance documentation across Carroll County. Free inspection.',
    heading: 'Hail and wind damage in Carrollton',
    paragraphs: [
      'Carrollton’s storm problem is hail, high wind, and straight-line storms rolling across Carroll County — not a single famous tornado. A spring storm can bruise shingles across Oak Mountain and leave a rental near the University of West Georgia with missing tabs, while a downtown roof only shows a lifted ridge cap. Storm damage restoration in Carrollton starts with an inspection that names what the storm did, slope by slope.',
      'Insurance is usually the reason people call. We photograph the damage, write down the scope, and meet the adjuster on the roof so the claim is not limited to whatever was visible from the yard. Older houses around Adamson Square hide damage in flashing. Newer architectural roofs hide it as granule loss that looks like normal wear unless someone is on the roof.',
      'McKinley Roofing is family-owned in Douglasville and serves Carrollton and Carroll County. If the roof is leaking after a storm, call (678) 983-4455. We can typically be on-site the same day to secure it, then sort out whether the lasting fix is a repair or a replacement.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-repair-carrollton-ga', label: 'Roof repair in Carrollton, GA' },
      { href: '/roof-replacement-carrollton-ga', label: 'Roof replacement in Carrollton, GA' },
      { href: '/gutter-installation-carrollton-ga', label: 'Gutter installation in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'What storm damage do you see most in Carrollton?',
        answer:
          'Hail bruises, wind-lifted shingles, and flashing that pulled loose. Downtown roofs and newer subdivision roofs show that damage in different places. We inspect both and document what an insurance claim needs.',
      },
    ],
  },

  'gutter-installation-carrollton-ga': {
    metaDescription:
      'Gutter installation in Carrollton, GA. Seamless gutters and downspouts for Carroll County homes, installed by McKinley Roofing. Free estimate. (678) 983-4455.',
    heading: 'Gutter installation in Carrollton, GA',
    paragraphs: [
      'Gutter installation in Carrollton, GA is a drainage job, not a cosmetic one. Carroll County gets hard spring and summer rain, and a gutter that overflows at the first valley dumps that water into fascia, siding, and the foundation. Downtown, around Adamson Square, the eaves are older and the downspouts were often aimed at the flower bed. In Oak Mountain, Sunset Hills, Northside, and along Highway 61, the runs are longer and the roof sheds more water at once.',
      'McKinley Roofing installs seamless gutter systems made for the house: a layout matched to the roof, durable material, and downspouts that discharge away from the foundation. Sectional gutters leak at every joint once the sealant gives up, which is the failure we replace most often on Carrollton houses. Where trees along the GreenBelt and older lots fill the troughs with debris, we will say so — a new gutter still needs a clear path.',
      'This work pairs naturally with roof repair and roof replacement, because the drip edge and the gutter are one water line. We are a family-owned company based in Douglasville, serving Carrollton and Carroll County. If you are comparing gutter installation in Carrollton, call (678) 983-4455 and we will look at the existing gutters and the roof edge together. There is no charge for that inspection.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-repair-carrollton-ga', label: 'Roof repair in Carrollton, GA' },
      { href: '/roof-replacement-carrollton-ga', label: 'Roof replacement in Carrollton, GA' },
      { href: '/roof-maintenance-carrollton-ga', label: 'Roof maintenance in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'Who installs gutters in Carrollton, GA?',
        answer:
          'McKinley Roofing installs seamless gutters in Carrollton and Carroll County. We are based in Douglasville and also handle roof repair and roof replacement, so the gutter and the roof edge can be planned together. Call (678) 983-4455 for a free look.',
      },
      {
        question: 'Do Carrollton’s older downtown homes need a different gutter layout?',
        answer:
          'Often, yes. Houses around Adamson Square have fascia and corners that a stock sectional system does not follow well. We fabricate seamless runs to the house and aim the downspouts away from the foundation. Newer neighborhoods such as Oak Mountain and Sunset Hills are usually a longer, simpler run.',
      },
      {
        question: 'Can you add gutters during a Carrollton roof replacement?',
        answer:
          'Yes. Replacing the roof is the clean time to reset the drip edge and hang new gutters. You can also book gutter installation on its own if the shingles are still in good shape.',
      },
    ],
  },

  'siding-installation-carrollton-ga': {
    metaDescription:
      'Siding installation and repair in Carrollton, GA for older downtown homes and newer subdivisions. McKinley Roofing serves Carroll County. Free inspection.',
    heading: 'Siding installation and repair in Carrollton',
    paragraphs: [
      'Siding in Carrollton follows the same split as the roofs. Near Adamson Square, exterior walls are older — wood, earlier vinyl, and trim that has been painted many times — and a repair has to match what is there. Toward Oak Mountain, Sunset Hills, and the newer streets off Highway 61, the work is more often impact damage from a storm or a section of siding that has pulled off the wall.',
      'We install vinyl, fiber cement, and wood composite siding, and we repair sections when the whole wall does not need to come off. If wind drove rain behind the cladding, the siding and the roof should be looked at together. That is common after the straight-line winds Carroll County sees in the spring.',
      'McKinley Roofing is based in Douglasville and serves Carrollton as a full exterior contractor, not only a shingle crew. Call (678) 983-4455 to set a free inspection of the siding and the roof.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-repair-carrollton-ga', label: 'Roof repair in Carrollton, GA' },
      { href: '/storm-damage-restoration-carrollton-ga', label: 'Storm damage restoration in Carrollton, GA' },
      { href: '/gutter-installation-carrollton-ga', label: 'Gutter installation in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'Do you repair siding on older homes in downtown Carrollton?',
        answer:
          'Yes. Adamson Square and the older parts of Carrollton often need section repairs and trim work rather than a full re-side. We will tell you which scope the wall actually needs after an inspection.',
      },
    ],
  },

  'roof-maintenance-carrollton-ga': {
    metaDescription:
      'Roof maintenance in Carrollton, GA. Inspections, valley and gutter cleaning, and small repairs across Carroll County. McKinley Roofing. Call (678) 983-4455.',
    heading: 'Roof maintenance in Carrollton, GA',
    paragraphs: [
      'Roof maintenance in Carrollton, GA is aimed at the problems this county actually produces. Tree litter along the GreenBelt and on older downtown lots packs valleys and gutters. Hail season marks shingles that still look acceptable from the street. A pipe boot on a rental near the University of West Georgia splits and drips into a closet before anyone calls it a roof problem.',
      'A maintenance visit includes a look at shingles, flashing, and the ridge, debris removed from valleys and gutters, resealing at vents and pipe boots, and a written note of what we found. That record matters if a later storm becomes an insurance claim, because you can show the roof’s condition before the event. It also matters on an Owens Corning roof, where keeping up with the roof is part of protecting the warranty.',
      'We are an Owens Corning Preferred Contractor, family-owned, and based in Douglasville. Carrollton and Carroll County are inside the area we already serve. Maintenance is for a roof that is not in crisis. If you already have a leak, skip the checkup and call (678) 983-4455 for roof repair.',
    ],
    links: [
      carrolltonHub,
      { href: '/roof-repair-carrollton-ga', label: 'Roof repair in Carrollton, GA' },
      { href: '/gutter-installation-carrollton-ga', label: 'Gutter installation in Carrollton, GA' },
      { href: '/roof-replacement-carrollton-ga', label: 'Roof replacement in Carrollton, GA' },
    ],
    faqs: [
      {
        question: 'What is included in roof maintenance in Carrollton?',
        answer:
          'We inspect the shingles, flashing, and ridge, clear debris from valleys and gutters, reseal pipe boots and vents, and leave you a written account of the roof’s condition. Small repairs can be handled during the visit when they are part of that scope.',
      },
    ],
  },
};
