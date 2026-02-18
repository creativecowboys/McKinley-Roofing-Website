'use client';

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon
const createCustomIcon = () => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
      <div style="position: relative;">
        <div style="
          width: 40px;
          height: 40px;
          background-color: #DC2626;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 4px solid white;
          box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          color: white;
          font-size: 20px;
          font-weight: bold;
        ">📍</div>
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
    });
};

interface ServiceAreaMapProps {
    className?: string;
}

const ServiceAreaMap: React.FC<ServiceAreaMapProps> = ({ className = '' }) => {
    const [isMounted, setIsMounted] = useState(false);

    // West Georgia coordinates (centered around Carrollton)
    const centerPosition: [number, number] = [33.5801, -85.0766];

    // Service area cities with coordinates
    const serviceCities = [
        { name: 'Carrollton', position: [33.5801, -85.0766] as [number, number], isHQ: true },
        { name: 'Villa Rica', position: [33.7321, -84.9188] as [number, number] },
        { name: 'Douglasville', position: [33.7515, -84.7477] as [number, number] },
        { name: 'Newnan', position: [33.3807, -84.7997] as [number, number] },
    ];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        // Render a placeholder while the map loads (prevents SSR issues)
        return (
            <div className={`bg-slate-200 rounded-3xl h-[600px] w-full flex items-center justify-center ${className}`}>
                <div className="text-slate-500 text-lg">Loading map...</div>
            </div>
        );
    }

    return (
        <div className={`relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white ${className}`}>
            <MapContainer
                center={centerPosition}
                zoom={10}
                scrollWheelZoom={false}
                style={{ height: '600px', width: '100%' }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Service area circle (30-mile radius) */}
                <Circle
                    center={centerPosition}
                    radius={48280} // 30 miles in meters
                    pathOptions={{
                        fillColor: '#DC2626',
                        fillOpacity: 0.1,
                        color: '#DC2626',
                        weight: 2,
                        opacity: 0.5,
                    }}
                />

                {/* Markers for each service city */}
                {serviceCities.map((city) => (
                    <Marker
                        key={city.name}
                        position={city.position}
                        icon={createCustomIcon()}
                    >
                        <Popup>
                            <div className="text-center p-2">
                                <h3 className="font-bold text-lg text-slate-900">
                                    {city.name}
                                    {city.isHQ && ' 🏢'}
                                </h3>
                                {city.isHQ && (
                                    <p className="text-sm text-red-600 font-semibold mt-1">
                                        McKinley Roofing HQ
                                    </p>
                                )}
                                <p className="text-sm text-slate-600 mt-1">
                                    Professional roofing services
                                </p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Service area overlay info */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 z-10">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                        📍
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 text-lg mb-1">
                            Proudly Serving West Georgia
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            30-mile service radius including Carrollton, Villa Rica, Newnan, Douglasville & surrounding communities
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceAreaMap;
