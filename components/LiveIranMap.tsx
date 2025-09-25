// components/LiveIranMap.tsx
import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component with SSR turned off
const MapWithNoSSR = dynamic(() => import('./MapComponent'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-muted animate-pulse rounded-lg" />,
});

const LiveIranMap = () => {
    return <MapWithNoSSR />;
};

export default LiveIranMap;