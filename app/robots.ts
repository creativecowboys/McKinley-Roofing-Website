import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/_next/',
        '/*?wordfence_lh=',
        '/wp-admin/',
        '/wp-content/',
        '/wp-includes/',
        '/*.php$',
      ],
    },
    sitemap: 'https://www.mckinleyroofing.net/sitemap.xml',
  };
}
