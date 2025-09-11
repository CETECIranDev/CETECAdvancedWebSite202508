// components/DroneTelemetryUI.tsx
import React, { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Battery, Satellite, ArrowUp, ArrowDown } from 'lucide-react';

// Custom hook to simulate fluctuating values
const useFluctuatingValue = (initialValue: number, min: number, max: number, interval: number) => {
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    const timer = setInterval(() => {
      setValue(v => {
        const newValue = v + (Math.random() - 0.5) * (max - min) * 0.1;
        return Math.max(min, Math.min(max, newValue));
      });
    }, interval);
    return () => clearInterval(timer);
  }, [initialValue, min, max, interval]);
  return value;
};

const DroneTelemetryUI = () => {
  const altitude = useFluctuatingValue(120, 115, 125, 1500);
  const speed = useFluctuatingValue(45, 42, 48, 2000);
  const battery = useFluctuatingValue(85, 0, 100, 5000);
  const signal = useFluctuatingValue(92, 85, 100, 3000);

  // For the artificial horizon animation
  const roll = useSpring(0, { stiffness: 100, damping: 20 });
  const pitch = useSpring(0, { stiffness: 100, damping: 20 });

  useEffect(() => {
    const animateHorizon = () => {
      roll.set((Math.random() - 0.5) * 10); // Random roll between -5 and 5 degrees
      pitch.set((Math.random() - 0.5) * 5); // Random pitch between -2.5 and 2.5 degrees
    };
    const interval = setInterval(animateHorizon, 3000);
    return () => clearInterval(interval);
  }, [roll, pitch]);

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl relative bg-black">
      {/* FPV Video Background */}
      <video
        src="/videos/drone-fpv.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover opacity-80"
      />

      {/* HUD Overlay */}
      <div className="absolute inset-0 text-white font-mono p-4 md:p-6 flex flex-col justify-between pointer-events-none">
        {/* Top Bar: Status */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
              <Battery size={16} className={battery > 20 ? 'text-green-400' : 'text-red-500'} />
              <span>{battery.toFixed(0)}%</span>
            </div>
            <div className="flex items-center gap-2 text-sm backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
              <Satellite size={16} className="text-blue-400" />
              <span>GPS: {signal.toFixed(0)}%</span>
            </div>
          </div>
          <div className="text-sm backdrop-blur-sm bg-red-600/50 px-3 py-1 rounded-full">
            ● REC
          </div>
        </div>

        {/* Center: Artificial Horizon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48">
          <motion.div
            className="w-full h-full"
            style={{
              rotate: roll,
              y: useTransform(pitch, [-5, 5], [-20, 20]),
            }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 w-full h-0.5 bg-cyan-400" />
            <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-cyan-400" />
            <div className="absolute top-1/2 left-1/2 w-24 h-24 border-2 border-cyan-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>

        {/* Bottom Bar: Telemetry Data */}
        <div className="flex justify-between items-end">
          {/* Altitude */}
          <div className="text-center backdrop-blur-sm bg-black/30 p-3 rounded-lg">
            <p className="text-xs text-cyan-400">ALTITUDE (m)</p>
            <p className="text-4xl font-bold">{altitude.toFixed(1)}</p>
          </div>
          {/* Speed */}
          <div className="text-center backdrop-blur-sm bg-black/30 p-3 rounded-lg">
            <p className="text-xs text-cyan-400">SPEED (km/h)</p>
            <p className="text-4xl font-bold">{speed.toFixed(1)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DroneTelemetryUI;