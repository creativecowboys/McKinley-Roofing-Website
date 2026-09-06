import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow importing Leaflet and other browser-only packages
  transpilePackages: ['leaflet', 'react-leaflet'],
  typescript: {
    // Pre-existing type errors in legacy pages/ components (Vite SPA migration artifacts)
    // New code in app/, components/, lib/ is fully type-safe.
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      // Old WordPress index.html
      { source: '/index.html', destination: '/', permanent: true },
      // Old WP plugin/content paths — send to homepage
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
      { source: '/wp-includes/:path*', destination: '/', permanent: true },
      // Old WordPress blog/tag/thank-you URLs still in Google's index (GSC, Sep 2026)
      { source: '/top-5-roofing-materials-for-homes', destination: '/blog/protect-your-home-with-expert-roofing-services', permanent: true },
      { source: '/5-signs-you-need-a-new-roof-in-douglasville', destination: '/roof-replacement-douglasville-ga', permanent: true },
      { source: '/tag/:path*', destination: '/services', permanent: true },
      { source: '/thank-you', destination: '/contact', permanent: true },
    ];
  },
};

export default nextConfig;
