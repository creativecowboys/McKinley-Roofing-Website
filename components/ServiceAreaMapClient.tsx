'use client';

import dynamic from 'next/dynamic';

// Leaflet uses window at module load — must be dynamically imported with ssr:false
// and this wrapper must be a Client Component
const ServiceAreaMap = dynamic(() => import('./ServiceAreaMap'), { ssr: false });

export default function ServiceAreaMapClient() {
  return <ServiceAreaMap />;
}
