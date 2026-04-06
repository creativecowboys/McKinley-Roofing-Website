import type { Metadata } from 'next';
import BlogProtectYourHomePage from '@/_pages/BlogProtectYourHomePage';

export const metadata: Metadata = {
  title: 'Protect Your Home with Expert Roofing Services',
  description:
    'McKinley Roofing explains why expert roof care is essential — covering repair, storm damage restoration, full replacement, and gutter services in Douglasville, GA.',
  openGraph: {
    title: 'Protect Your Home with Expert Roofing Services',
    description:
      'Expert roofing services protect your family and your investment. Learn from McKinley Roofing about repair, replacement, and storm restoration in West Georgia.',
    images: ['/blog_hero_roofing.png'],
    type: 'article',
  },
};

export default function Page() {
  return <BlogProtectYourHomePage />;
}
