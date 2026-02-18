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
];

export function getLocationBySlug(slug: string): LocationData | undefined {
    return locations.find((loc) => loc.slug === slug);
}
