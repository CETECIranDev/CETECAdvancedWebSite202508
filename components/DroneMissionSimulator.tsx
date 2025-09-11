// components/DroneMissionSimulator.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, TowerControl, Wind, Thermometer } from 'lucide-react';

interface Waypoint {
  id: number;
  label: string;
  position: { top: string; left: string };
  info: {
    title: string;
    details: string;
    icon: React.ReactNode;
  };
}

const waypoints: Waypoint[] = [
  { id: 1, label: 'A', position: { top: '20%', left: '30%' }, info: { title: 'بازرسی توربین بادی', details: 'بررسی سلامت پره‌ها و بدنه', icon: <Wind /> } },
  { id: 2, label: 'B', position: { top: '50%', left: '75%' }, info: { title: 'نظارت بر دکل مخابراتی', details: 'چک کردن آنتن‌ها و اتصالات', icon: <TowerControl /> } },
  { id: 3, label: 'C', position: { top: '70%', left: '15%' }, info: { title: 'نقشه‌برداری حرارتی', details: 'شناسایی نقاط داغ در پنل‌های خورشیدی', icon: <Thermometer /> } },
];

const DroneMissionSimulator = () => {
  const [dronePosition, setDronePosition] = useState({ top: '50%', left: '50%' });
  const [activeWaypoint, setActiveWaypoint] = useState<Waypoint | null>(null);

  const flyToWaypoint = (waypoint: Waypoint) => {
    setActiveWaypoint(waypoint);
    setDronePosition(waypoint.position);
  };

  return (
    <div className="bg-card p-4 md:p-6 rounded-2xl border border-border shadow-2xl">
      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden">
        {/* Map Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: "url('/images/map-satellite.jpg')" }}
        />
        <div className="absolute inset-0 bg-primary/10"></div>
        
        {/* Drone Icon */}
        <motion.div
          className="absolute text-primary z-10"
          animate={{
            top: dronePosition.top,
            left: dronePosition.left,
          }}
          transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          style={{ transform: 'translate(-50%, -50%)' }}
        >
          <Rocket size={32} style={{ filter: 'drop-shadow(0 0 5px hsl(var(--primary)))' }} />
        </motion.div>
        
        {/* Waypoints */}
        {waypoints.map(wp => (
          <motion.button
            key={wp.id}
            className="absolute w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm border-2 flex items-center justify-center font-bold text-foreground"
            style={{
              top: wp.position.top,
              left: wp.position.left,
              transform: 'translate(-50%, -50%)',
              borderColor: activeWaypoint?.id === wp.id ? 'hsl(var(--secondary))' : 'hsl(var(--border))',
            }}
            onClick={() => flyToWaypoint(wp)}
            whileHover={{ scale: 1.2 }}
          >
            {wp.label}
          </motion.button>
        ))}
      </div>
      
      {/* Info Card */}
      <div className="mt-4 h-20 flex items-center justify-center bg-muted p-4 rounded-lg">
        <AnimatePresence mode="wait">
          {activeWaypoint ? (
            <motion.div
              key={activeWaypoint.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-4 text-center"
            >
              <div className="text-secondary">{activeWaypoint.info.icon}</div>
              <div>
                <p className="font-bold text-foreground">{activeWaypoint.info.title}</p>
                <p className="text-sm text-muted-foreground">{activeWaypoint.info.details}</p>
              </div>
            </motion.div>
          ) : (
             <p className="text-muted-foreground">برای شروع ماموریت، روی یک نقطه کلیک کنید.</p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DroneMissionSimulator;