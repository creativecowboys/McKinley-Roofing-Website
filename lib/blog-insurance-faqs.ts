// FAQ content for the roofing-insurance-claims article. Lives in a plain
// module (no 'use client') so the server page can build FAQPage schema from
// the same data the client component renders.

export interface BlogFAQ {
  question: string;
  answer: string;
}

export const insuranceClaimFaqs: BlogFAQ[] = [
  {
    question: 'Should I call a roofer or my insurance company first?',
    answer:
      'In most cases it pays to have a professional roof inspection before you file. A roofer can document the damage, tell you whether it is likely to exceed your deductible, and save you from filing a claim that gets denied. McKinley Roofing provides free inspections and photo documentation you can submit with your claim.',
  },
  {
    question: 'Will filing a roof claim raise my insurance rates?',
    answer:
      'A single weather-related claim usually has less impact on your premium than homeowners fear, because storm damage is considered an "act of God" rather than negligence. That said, every insurer weighs claims differently — which is another reason to confirm the damage justifies a claim before you file.',
  },
  {
    question: 'How long do I have to file a roof damage claim in Georgia?',
    answer:
      'Deadlines are set by your policy, and many give you six months to a year from the date of the storm. The problem is that hail and wind damage are easy to miss from the ground, so the clock can run out before you know you have damage. If a storm has passed through West Georgia, get an inspection promptly even if nothing looks wrong.',
  },
  {
    question: 'What is the difference between ACV and RCV coverage?',
    answer:
      'Replacement Cost Value (RCV) policies pay what it actually costs to replace your roof today, typically releasing recoverable depreciation after the work is complete. Actual Cash Value (ACV) policies subtract depreciation for the age and condition of your old roof and pay only the remainder — which can leave a large gap on an older roof. Check your declarations page to see which you carry.',
  },
  {
    question: 'Does homeowners insurance cover roof leaks?',
    answer:
      'Generally yes, when the leak is caused by a sudden covered event like wind or hail. Leaks caused by age, wear, or lack of maintenance are typically excluded. This is why documentation matters: an inspection that ties the leak to a specific storm event makes the difference between an approved and a denied claim.',
  },
];
