import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// --- Type Definitions ---
// 1. Define a specific type for the location status
type LocationStatus = 'آنلاین' | 'آفلاین';

// 2. Define the structure of our location data
interface Location {
    position: [number, number];
    name: string;
    city: string;
    status: LocationStatus;
}

// 3. Create a custom type for the Leaflet Icon prototype to include the private property
type LeafletIconPrototype = L.Icon.Default & { _getIconUrl?: string };

// Sample data for datalogger locations with the correct type
const locations: Location[] = [
    { position: [35.715, 51.404], name: 'مرکز داده اصلی', city: 'تهران', status: 'آنلاین' },
    { position: [32.653, 51.666], name: 'سنسور لرزش سد زاینده‌رود', city: 'اصفهان', status: 'آنلاین' },
    { position: [29.617, 52.533], name: 'ایستگاه پمپاژ نفت', city: 'شیراز', status: 'آنلاین' },
    { position: [38.079, 46.290], name: 'خط تولید تراکتورسازی', city: 'تبریز', status: 'آنلاین' },
    { position: [36.315, 59.567], name: 'نیروگاه بادی بینالود', city: 'مشهد', status: 'آنلاین' },
    { position: [31.327, 48.692], name: 'پالایشگاه نفت', city: 'اهواز', status: 'آفلاین' },
    { position: [27.186, 56.280], name: 'اسکله شهید رجایی', city: 'بندرعباس', status: 'آنلاین' },
    { position: [34.090, 47.065], name: 'مانیتورینگ خطوط لوله', city: 'کرمانشاه', status: 'آنلاین' },
    { position: [34.640, 50.876], name: 'گلخانه هوشمند', city: 'قم', status: 'آنلاین' },
    { position: [37.271, 49.588], name: 'ایستگاه هواشناسی', city: 'رشت', status: 'آنلاین' },
    { position: [30.285, 57.078], name: 'معدن مس سرچشمه', city: 'کرمان', status: 'آنلاین' },
    { position: [28.974, 50.839], name: 'پتروشیمی بوشهر', city: 'بوشهر', status: 'آفلاین' },
    { position: [36.565, 53.059], name: 'کارخانه صنایع چوب', city: 'ساری', status: 'آنلاین' },
    { position: [31.897, 54.367], name: 'نیروگاه خورشیدی', city: 'یزد', status: 'آنلاین' },
    { position: [25.294, 60.679], name: 'پست مرزی', city: 'چابهار', status: 'آنلاین' },
];

const MapComponent = () => {
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const isDarkMode = document.documentElement.classList.contains('dark');
        setIsDark(isDarkMode);

        // This is needed to fix the default icon path issue with Leaflet in React
        // 4. Use the custom type instead of 'as any'
        const iconPrototype: LeafletIconPrototype = L.Icon.Default.prototype;
        delete iconPrototype._getIconUrl;

        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        });
    }, []);

    // 5. The function now expects a specific 'LocationStatus' type
    const createPulsingIcon = (status: LocationStatus) => {
        const color = status === 'آنلاین' ? 'hsl(var(--secondary))' : 'hsl(var(--destructive))';
        return L.divIcon({
            className: 'custom-pulsing-icon',
            html: `<div class="pulsing-dot" style="background-color: ${color}; box-shadow: 0 0 12px ${color};"></div>`,
            iconSize: [12, 12],
        });
    };

    const darkMapUrl = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    const lightMapUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
    const mapUrl = isDark ? darkMapUrl : lightMapUrl;

    return (
        <MapContainer
            center={[34.0, 53.5]}
            zoom={6}
            style={{ height: '100%', width: '100%', borderRadius: '1rem', backgroundColor: 'hsl(var(--muted))' }}
            scrollWheelZoom={false}
            zoomControl={false}
            dragging={false}
            doubleClickZoom={false}
            attributionControl={false}
        >
            <TileLayer url={mapUrl} />
            {locations.map((loc, index) => (
                // 6. No need for 'as any' here anymore because 'loc.status' is correctly typed
                <Marker key={index} position={loc.position} icon={createPulsingIcon(loc.status)}>
                    <Popup>
                        <div className="font-sans">
                            <p className="font-bold">{loc.name} - {loc.city}</p>
                            <p>وضعیت: <span className={loc.status === 'آنلاین' ? 'text-green-500' : 'text-red-500'}>{loc.status}</span></p>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default MapComponent;