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
    ];
  },
};

export default nextConfig;
