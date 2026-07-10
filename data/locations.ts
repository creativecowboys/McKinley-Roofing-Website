export interface LocationData {
    slug: string;
    city: string;
    state: string;
    county: string;
    lat: number;
    lng: number;
    metaTitle: string;
    metaDescription: string;
    headline: string;
    subheadline: string;
    nearbyAreas: string[];
    isHQ?: boolean;
    // ── Optional unique-content fields (differentiate a page from the shared
    // template so Google indexes it instead of treating it as a duplicate) ──
    // Free-form local intro paragraphs rendered in an "About {city}" section.
    localIntro?: string[];
    // Specific neighborhoods / subdivisions served, shown as a local-detail list.
    neighborhoods?: string[];
    // City-specific FAQs (rendered on-page AND emitted as FAQPage schema).
    localFaqs?: { question: string; answer: string }[];
}

export const locations: LocationData[] = [
    {
        slug: 'carrollton-ga',
        city: 'Carrollton',
        state: 'GA',
        county: 'Carroll County',
        lat: 33.5801,
        lng: -85.0766,
        isHQ: true,
        metaTitle: 'Roofing Contractor in Carrollton, GA | McKinley Roofing',
        metaDescription:
            'McKinley Roofing is Carrollton, GA\'s trusted local roofing contractor. Roof repair, replacement, storm damage & gutters. Owens Corning Preferred. Free inspection.',
        headline: 'Roofing Services in Carrollton, GA',
        subheadline:
            'Your local, family-owned roofing experts serving Carrollton and Carroll County. Quality craftsmanship backed by Owens Corning Preferred certification.',
        nearbyAreas: ['Villa Rica', 'Bremen', 'Temple', 'Whitesburg', 'Bowdon'],
        localIntro: [
            "Carrollton is the heart of Carroll County, and it's one of the West Georgia communities McKinley Roofing is proud to serve. From the historic homes surrounding Adamson Square downtown to the newer subdivisions spreading out toward the University of West Georgia and Highway 61, we help Carrollton homeowners protect their biggest investment with roofing built to last.",
            "As both a college town and the county seat, Carrollton has a real mix of roofing needs — century-old homes near the Square that call for careful, craftsman-level repairs, rental properties around UWG, and fast-growing neighborhoods topped with newer architectural shingles. West Georgia's severe spring storms, summer hail, and straight-line winds don't discriminate, and we inspect for the specific damage each type of roof tends to hide.",
            "Being local means we know the Carroll County permitting process, we're familiar with the neighborhoods off the GreenBelt and out toward Oak Mountain, and we can get to you quickly when a storm rolls through. You get a roofer who treats Carrollton like home — because to us, it is.",
        ],
        neighborhoods: [
            'Downtown Carrollton',
            'Adamson Square',
            'Sunset Hills',
            'Oak Mountain',
            'Northside',
            'University of West Georgia area',
            'Bowdon Junction',
        ],
        localFaqs: [
            {
                question: 'Do you offer emergency roof repair in Carrollton?',
                answer:
                    "Yes. We serve Carrollton and Carroll County and can typically be on-site for emergency roof repairs and storm-damage inspections the same day. If you have an active leak or storm damage, call (678) 983-4455 and we'll prioritize getting your home protected right away.",
            },
            {
                question: 'Do you repair older and historic homes near downtown Carrollton?',
                answer:
                    "Absolutely. The homes around Adamson Square and the older parts of Carrollton often need a more careful hand — matching existing lines, working around aged decking, and getting the flashing right. We're happy to inspect an older roof and give you honest options, whether that's a targeted repair or a full replacement.",
            },
            {
                question: 'How much does a new roof cost in Carrollton, GA?',
                answer:
                    "It depends on the size and pitch of your roof, the materials you choose, and whether there's hidden decking damage underneath. We provide free, no-obligation inspections and detailed written estimates so there are no surprises — and if the damage is storm-related, we'll help you file an insurance claim to offset the cost.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Carroll County?',
                answer:
                    "Yes. Storm and hail damage is one of the most common reasons Carrollton homeowners call us. We document the damage, meet your adjuster on-site, and work directly with your insurance company so your claim reflects the full scope of what's needed. Most homeowners pay only their deductible.",
            },
        ],
    },
    {
        slug: 'douglasville-ga',
        city: 'Douglasville',
        state: 'GA',
        county: 'Douglas County',
        lat: 33.7515,
        lng: -84.7477,
        metaTitle: 'Roofing Contractor in Douglasville, GA | McKinley Roofing',
        metaDescription:
            'Need a roofer in Douglasville, GA? McKinley Roofing offers roof repair, replacement, storm damage restoration & gutters. Owens Corning Preferred. Free inspection.',
        headline: 'Roofing Services in Douglasville, GA',
        subheadline:
            'Serving Douglasville and Douglas County with honest, high-quality roofing solutions. Family-owned and locally trusted since day one.',
        nearbyAreas: ['Lithia Springs', 'Villa Rica', 'Dallas', 'Austell', 'Powder Springs'],
        localIntro: [
            "Douglasville is our home base, and it's where McKinley Roofing got its start. As Douglas County's population has grown along the I-20 corridor, so has the demand for honest, high-quality roofing — and we've built our reputation one roof at a time, from the historic homes near downtown Douglasville to the newer subdivisions out toward Chapel Hill Road and Highway 5.",
            "West Georgia weather is hard on roofs. Douglasville sits squarely in an area that sees severe spring and summer thunderstorms, damaging hail, and the occasional straight-line wind event rolling in off the metro Atlanta line. We inspect Douglasville roofs for the specific wear those storms cause — lifted or missing shingles, granule loss, cracked flashing around chimneys, and hidden leaks that show up months later as ceiling stains.",
            "Because we're local, we know the Douglas County permitting process, we work directly with the major insurance carriers our neighbors use, and we can usually be on-site for an emergency inspection the same day. When a storm rolls through Douglasville, you want a roofer who's already down the road — not one driving in from another county.",
        ],
        neighborhoods: [
            'Downtown Douglasville',
            'Chapel Hill',
            'Tributary',
            'Anneewakee Trails',
            'Mirror Lake',
            'Stewarts Mill',
            'Fairplay',
        ],
        localFaqs: [
            {
                question: 'Do you offer emergency roof repair in Douglasville?',
                answer:
                    "Yes. Douglasville is our home base, so we can typically be on-site for emergency roof repairs and storm-damage inspections the same day. If you have an active leak, tarp needs, or storm damage, call us at (678) 983-4455 and we'll prioritize getting your home protected.",
            },
            {
                question: 'How much does a new roof cost in Douglasville, GA?',
                answer:
                    "Roof replacement cost in Douglasville depends on the size and pitch of your roof, the materials you choose, and whether there's underlying decking damage. We provide free, no-obligation inspections and detailed written estimates so you know exactly what you're paying for — and if the damage is storm-related, we'll help you file an insurance claim to offset the cost.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Douglas County?',
                answer:
                    "Absolutely. Storm and hail damage is one of the most common reasons Douglasville homeowners call us. We document the damage, meet your adjuster on-site, and coordinate directly with your insurance company so your claim reflects the full scope of what's needed. Most homeowners pay only their deductible.",
            },
            {
                question: 'Are you licensed and insured to work in Douglasville?',
                answer:
                    'Yes — McKinley Roofing is fully licensed and insured in Georgia, and we carry both general liability and workers’ compensation coverage. We’re also an Owens Corning Preferred Contractor, which lets us back your new roof with strong manufacturer and labor warranties.',
            },
        ],
    },
    {
        slug: 'villa-rica-ga',
        city: 'Villa Rica',
        state: 'GA',
        county: 'Carroll & Douglas Counties',
        lat: 33.7321,
        lng: -84.9188,
        metaTitle: 'Roofing Contractor in Villa Rica, GA | McKinley Roofing',
        metaDescription:
            'McKinley Roofing serves Villa Rica, GA with expert roof repair, replacement, storm damage & gutter services. Owens Corning Preferred contractor. Free inspection.',
        headline: 'Roofing Services in Villa Rica, GA',
        subheadline:
            'Trusted roofing contractor serving Villa Rica and the surrounding Carroll and Douglas County communities. Quality over quantity — every time.',
        nearbyAreas: ['Carrollton', 'Douglasville', 'Bremen', 'Dallas', 'Temple'],
        localIntro: [
            "Villa Rica — the historic \"City of Gold\" — sits right along the I-20 corridor, straddling both Carroll and Douglas counties. From established homes near the downtown Mill Amphitheater to the sprawling Mirror Lake master-planned community, McKinley Roofing serves the whole city with honest, high-quality roofing.",
            "Villa Rica has grown fast, and a lot of that growth came in waves — which means entire neighborhoods of architectural-shingle roofs are now aging into the same repair-and-replacement window at once. Add West Georgia's hail, high winds, and severe I-20-corridor thunderstorms, and regular inspections matter. We check for lifted shingles, granule loss, and the hidden leaks that show up months after a storm.",
            "Because we already work on both sides of the county line, serving Villa Rica is second nature. We know the local permitting, we can be on-site quickly, and we bring the same Quality-over-Quantity approach to every roof — whether it's a starter home or a lakefront property in Mirror Lake.",
        ],
        neighborhoods: [
            'Downtown Villa Rica',
            'Mirror Lake',
            'The Fairways at Mirror Lake',
            'Northwoods at Mirror Lake',
            'Watermist at Mirror Lake',
            'Fairfield Plantation',
            'Stockmar Road corridor',
        ],
        localFaqs: [
            {
                question: 'Do you serve the Mirror Lake community in Villa Rica?',
                answer:
                    "Yes — Mirror Lake is one of the areas we serve most in Villa Rica. Many of its homes are now at the age where builder-grade roofs start showing wear, so we do a lot of inspections, repairs, and replacements there. We're happy to take a look and tell you honestly where your roof stands.",
            },
            {
                question: 'Do you offer emergency roof repair in Villa Rica?',
                answer:
                    "We do. We serve Villa Rica on both the Carroll and Douglas County sides and can usually be on-site the same day for emergency repairs and storm-damage inspections. Call (678) 983-4455 if you have an active leak or storm damage and we'll get you protected quickly.",
            },
            {
                question: 'How much does a new roof cost in Villa Rica, GA?',
                answer:
                    "Cost comes down to the size and pitch of your roof, your material choice, and any decking damage hiding underneath. We provide free inspections and clear written estimates so you know exactly what you're paying for — and if it's storm damage, we'll help you file an insurance claim to bring your out-of-pocket cost down.",
            },
            {
                question: 'Do you help with storm-damage insurance claims around Villa Rica?',
                answer:
                    "Absolutely. We document the damage, meet your adjuster on-site, and coordinate directly with your insurance carrier so nothing gets missed — no matter which county your Villa Rica home falls in. In most cases homeowners pay only their deductible.",
            },
        ],
    },
    {
        slug: 'newnan-ga',
        city: 'Newnan',
        state: 'GA',
        county: 'Coweta County',
        lat: 33.3807,
        lng: -84.7997,
        metaTitle: 'Roofing Contractor in Newnan, GA | McKinley Roofing',
        metaDescription:
            'McKinley Roofing provides expert roofing services in Newnan, GA. Roof repair, replacement, storm damage & gutters. Owens Corning Preferred. Free inspection.',
        headline: 'Roofing Services in Newnan, GA',
        subheadline:
            'Serving Newnan and Coweta County with premium roofing solutions. From storm damage to full replacements, we protect what matters most.',
        nearbyAreas: ['Peachtree City', 'Sharpsburg', 'Senoia', 'Fayetteville', 'Tyrone'],
        localIntro: [
            "Newnan — long known as the \"City of Homes\" for its beautiful historic architecture around the downtown Court Square — is one of Coweta County's proudest communities, and McKinley Roofing is honored to serve it. From antebellum homes near downtown to fast-growing subdivisions out toward Ashley Park, we protect Newnan roofs with premium materials and craftsmanship.",
            "Newnan understands storm damage better than almost anywhere in the region. In March 2021, an EF-4 tornado tore a mile-wide path straight through the city with winds over 170 mph, damaging or destroying more than 1,700 homes across Coweta County. Years later, we still find roofs with lingering wind and hail damage — or rushed post-storm repairs that never held up. We inspect thoroughly and tell you the truth about what your roof needs.",
            "Insurance experience matters enormously here, and it's one of our strengths. We document damage carefully, meet adjusters on-site, and make sure Newnan homeowners get the full scope of what their policy owes them — while getting the work done right the first time.",
        ],
        neighborhoods: [
            'Downtown Newnan / Court Square',
            'Ashley Park',
            'White Oak',
            'Woodland Farms',
            'Mountain Creek',
            'Windsong',
        ],
        localFaqs: [
            {
                question: 'Do you handle tornado and storm damage in Newnan?',
                answer:
                    "Yes — storm and wind damage is one of the biggest reasons Newnan homeowners call us, and Coweta County has seen more than its share since the 2021 tornado. We inspect for wind, hail, and impact damage, document everything for your insurance company, and coordinate the full repair or replacement. If you suspect damage, a free inspection is the smart first step.",
            },
            {
                question: 'Do you offer emergency roof repair in Newnan?',
                answer:
                    "We do. If you have an active leak, missing shingles, or fresh storm damage in Newnan or anywhere in Coweta County, call (678) 983-4455. We can typically get on-site the same day to tarp, secure, and assess your roof before the damage spreads.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Coweta County?',
                answer:
                    "Absolutely — it's one of the things we do best. We meet your adjuster on-site, document the full extent of the damage, and work directly with your carrier so your claim reflects everything that's actually needed. Most Newnan homeowners end up paying only their deductible.",
            },
            {
                question: 'How much does a new roof cost in Newnan, GA?',
                answer:
                    "It depends on your roof's size and pitch, the materials you pick, and whether there's underlying decking damage. We provide free inspections and detailed written estimates up front — and when the damage is storm-related, we'll help you file a claim so insurance covers the bulk of the cost.",
            },
        ],
    },
    {
        slug: 'bremen-ga',
        city: 'Bremen',
        state: 'GA',
        county: 'Haralson County',
        lat: 33.7237,
        lng: -85.1455,
        metaTitle: 'Roofing Contractor in Bremen, GA | McKinley Roofing',
        metaDescription:
            'McKinley Roofing serves Bremen, GA with trusted roof repair, replacement, storm damage & gutter installation. Owens Corning Preferred. Free inspection.',
        headline: 'Roofing Services in Bremen, GA',
        subheadline:
            'Proud to serve Bremen and Haralson County with honest, expert roofing services. Local knowledge, premium materials, and workmanship you can count on.',
        nearbyAreas: ['Carrollton', 'Tallapoosa', 'Buchanan', 'Waco', 'Temple'],
        localIntro: [
            "Bremen is a small Haralson County town with a big history — once known as the \"Clothing Center of the South\" for its thriving textile industry, and still anchored by a historic downtown and landmarks like the old Sewell Mill. McKinley Roofing is proud to bring honest, big-city-quality roofing to this tight-knit West Georgia community.",
            "A lot of Bremen's homes have been standing for decades, which means aging roofs, older decking, and outdated flashing that West Georgia's storms are quick to expose. That's actually where a local, honest roofer earns their keep — we'll tell you plainly whether a targeted repair will get you several more good years or whether a full replacement is the smarter investment.",
            "Because we work throughout Haralson and neighboring Carroll County, getting to Bremen is easy for us, and we treat every neighbor like a neighbor. Owens Corning Preferred materials, real warranties, and workmanship you can count on — that's the McKinley standard, whether your home is off the Highway 27 corridor or tucked into an older part of town.",
        ],
        neighborhoods: [
            'Downtown Bremen',
            'Bush Creek',
            'Sewell Mill area',
            'Highway 27 corridor',
            'Waco',
            'Tallapoosa',
        ],
        localFaqs: [
            {
                question: 'My Bremen home is older — should I repair or replace the roof?',
                answer:
                    "It depends on the roof's age, the condition of the decking underneath, and how widespread the wear is. Many older Bremen homes can get several more good years from a well-done repair; others are past that point. We do a free, honest inspection and lay out both options with clear pricing so you can decide what makes sense — we never push a replacement you don't need.",
            },
            {
                question: 'Do you offer emergency roof repair in Bremen?',
                answer:
                    "Yes. We serve Bremen and Haralson County and can usually be on-site the same day for emergency repairs and storm-damage inspections. If you've got an active leak or storm damage, call (678) 983-4455 and we'll get your home secured quickly.",
            },
            {
                question: 'How much does a new roof cost in Bremen, GA?',
                answer:
                    "Cost depends on the size and pitch of your roof, your material choice, and any hidden decking damage — which is more common on older homes. We provide free inspections and detailed written estimates so there are no surprises, and we'll help with an insurance claim if the damage is storm-related.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Haralson County?',
                answer:
                    "We do. We document the damage, meet your adjuster on-site, and work directly with your insurance company so your Bremen home's claim reflects the full scope of what's needed. In most cases, homeowners pay only their deductible.",
            },
        ],
    },
    {
        slug: 'dallas-ga',
        city: 'Dallas',
        state: 'GA',
        county: 'Paulding County',
        lat: 33.9237,
        lng: -84.8405,
        metaTitle: 'Roofing Contractor in Dallas, GA | McKinley Roofing',
        metaDescription:
            'Need a roofer in Dallas, GA? McKinley Roofing offers roof repair, replacement, storm damage restoration & gutters in Paulding County. Free inspection.',
        headline: 'Roofing Services in Dallas, GA',
        subheadline:
            'Serving Dallas and Paulding County with the quality and integrity McKinley Roofing is known for. Your roof is our priority.',
        nearbyAreas: ['Hiram', 'Acworth', 'Powder Springs', 'Douglasville', 'Rockmart'],
        localIntro: [
            "Dallas is the seat of Paulding County — one of the fastest-growing counties in the entire country — and home to some of West Georgia's best-known master-planned communities, including Seven Hills and Bentwater. McKinley Roofing serves Dallas homeowners with the quality and integrity our name is built on.",
            "Rapid growth has a hidden side effect for roofs: entire subdivisions were built within a few years of each other, which means thousands of Dallas homes are hitting the age where builder-grade shingles start to fail — all around the same time. Layer in West Georgia's hail and high winds, and proactive inspections become well worth it. We check for storm damage, worn shingles, and flashing issues before they turn into interior leaks.",
            "We know the Paulding County permitting process and we're familiar with the big HOA neighborhoods and their architectural guidelines, so we make replacements smooth and compliant. Fast local response, premium Owens Corning materials, and warranties that actually mean something.",
        ],
        neighborhoods: [
            'Seven Hills',
            'Bentwater',
            'Edenwood',
            'Lost Creek',
            'Downtown Dallas',
        ],
        localFaqs: [
            {
                question: 'Do you work in HOA communities like Seven Hills and Bentwater?',
                answer:
                    "Yes — we do a lot of roofing in Dallas's master-planned neighborhoods. We're familiar with the kind of architectural and color guidelines HOAs enforce, and we help make sure your new roof meets them so the whole process stays smooth and approved.",
            },
            {
                question: 'Do you offer emergency roof repair in Dallas?',
                answer:
                    "We do. We serve Dallas and Paulding County and can typically be on-site the same day for emergency repairs and storm-damage inspections. Call (678) 983-4455 if you have an active leak or storm damage and we'll get your home protected fast.",
            },
            {
                question: 'How much does a new roof cost in Dallas, GA?',
                answer:
                    "It comes down to your roof's size and pitch, the materials you choose, and whether there's decking damage underneath. We provide free inspections and detailed written estimates up front — and if the damage is storm-related, we'll help you file an insurance claim to offset the cost.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Paulding County?',
                answer:
                    "Absolutely. We document the damage, meet your adjuster on-site, and coordinate directly with your insurance carrier so your Dallas home's claim reflects the full scope of what's needed. Most homeowners pay only their deductible.",
            },
        ],
    },
    {
        slug: 'hiram-ga',
        city: 'Hiram',
        state: 'GA',
        county: 'Paulding County',
        lat: 33.8748,
        lng: -84.7635,
        metaTitle: 'Roofing Services in Hiram, GA | McKinley Roofing',
        metaDescription:
            'McKinley Roofing provides expert roof repair, replacement, and storm damage restoration in Hiram, Georgia. Family-owned, Owens Corning Preferred. Get a free inspection today.',
        headline: 'Roofing Services in Hiram, GA',
        subheadline:
            'Serving Hiram and Paulding County with honest, expert roofing — the McKinley way. Quality over quantity, on every single roof.',
        nearbyAreas: ['Dallas', 'Powder Springs', 'Acworth', 'Douglasville', 'Villa Rica'],
        localIntro: [
            "Hiram is a fast-growing Paulding County community built up around the busy US-278 (Jimmy Lee Smith Parkway) retail corridor, about 25 miles northwest of Atlanta. McKinley Roofing serves Hiram's homeowners and businesses alike with honest, expert roofing — the McKinley way.",
            "Most of Hiram's neighborhoods went up over the last couple of decades, so the area is full of newer traditional homes and townhomes whose original architectural-shingle roofs are now reaching the age where wear, wind damage, and worn flashing start to appear. West Georgia's hail and severe storms speed that timeline up, which is why we recommend a free inspection before a small issue becomes an interior leak.",
            "Along the 278 corridor we also handle commercial roofing for the shops, offices, and retail buildings that keep Hiram humming. Whether it's a townhome, a single-family home, or a storefront, you get fast local response, premium Owens Corning materials, and workmanship backed by real warranties.",
        ],
        neighborhoods: [
            'Downtown Hiram',
            'US-278 / Jimmy Lee Smith Parkway corridor',
            "Darby's Run",
            'Hiram Pavilion area',
            'Newer subdivisions toward Dallas',
        ],
        localFaqs: [
            {
                question: 'Do you do commercial roofing along the 278 corridor in Hiram?',
                answer:
                    "Yes. In addition to homes, we handle commercial roofing for retail, office, and mixed-use buildings along the US-278 corridor in Hiram. Reach out at (678) 983-4455 and we'll schedule an inspection and put together a clear, written scope for your property.",
            },
            {
                question: 'My Hiram home was built recently — could it already need roof work?',
                answer:
                    "It can. Many Hiram homes are 15 to 25 years old now, which is exactly when builder-grade architectural shingles start to show their age — and a single hailstorm can shorten that timeline. A free inspection is the easiest way to know where your roof really stands before any leaks start.",
            },
            {
                question: 'Do you offer emergency roof repair in Hiram?',
                answer:
                    "We do. We serve Hiram and Paulding County and can usually be on-site the same day for emergency repairs and storm-damage inspections. If you have an active leak or storm damage, call (678) 983-4455 and we'll get your property secured quickly.",
            },
            {
                question: 'Do you help with storm-damage insurance claims in Paulding County?',
                answer:
                    "Absolutely. We document the damage, meet your adjuster on-site, and work directly with your insurance company so your Hiram claim reflects the full scope of what's needed. Most homeowners pay only their deductible.",
            },
        ],
    },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
    return locations.find((loc) => loc.slug === slug);
}
