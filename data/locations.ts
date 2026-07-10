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
    },
];

export function getLocationBySlug(slug: string): LocationData | undefined {
    return locations.find((loc) => loc.slug === slug);
}
