import React from 'react';
import { motion } from 'framer-motion';

const LANE_MARKINGS_COUNT = 10;
const CARS_COUNT = 15;
const STARS_COUNT = 50;

const AnimatedRoad = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-background rounded-2xl overflow-hidden [perspective:1000px]">
      <motion.div
        className="relative w-[300%] h-[300%] bg-gray-800"
        style={{
          transform: 'rotateX(75deg) translateY(100px)',
          // Correctly combined background images
          backgroundImage: `
            radial-gradient(ellipse at 50% 0%, hsl(var(--card)) 1%, transparent 80%),
            url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MCIgaGVpZHRoPSI1MCI+DQo8ZmlsdGVyIGlkPSJub2lzZSI+DQo8ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iMC44IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+DQo8ZmVDb2xvck1hdHJpeCB0eXBlPSJzYXR1cmF0ZSIgdmFsdWVzPSIwIi8+DQo8L2ZpbHRlcj4NCjxyZWN0IHdpZHRoPSI1MCIgaGVpZHRoPSI1MCIgZmlsdGVyPSJ1cmwoI25vaXNlKSIgb3BhY2l0eT0iMC4xNSIvPg0KPC9zdmc+')
          `,
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto, 100px 100px', // Apply sizes to corresponding images
        }}
      >
        {/* Starfield/Dust Particles */}
        {Array.from({ length: STARS_COUNT }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute w-1 h-1 bg-muted-foreground rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            initial={{ y: '-50%', scale: 0.5 }}
            animate={{ y: '150%' }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Lane Markings with Gradient */}
        {Array.from({ length: LANE_MARKINGS_COUNT }).map((_, i) => (
          <motion.div
            key={`marking-${i}`}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-24"
            style={{
              background: 'linear-gradient(to top, hsl(var(--muted-foreground)), transparent)',
            }}
            initial={{ y: '-100%', opacity: 0 }}
            animate={{ y: '150%', opacity: [0, 1, 1, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'linear',
              delay: (i / LANE_MARKINGS_COUNT) * 2.5,
            }}
          />
        ))}

        {/* Roadside Lines */}
        <div className="absolute left-[30%] top-0 w-1 h-full bg-muted-foreground/30" />
        <div className="absolute right-[30%] top-0 w-1 h-full bg-muted-foreground/30" />

        {/* Cars with better visuals */}
        {Array.from({ length: CARS_COUNT }).map((_, i) => {
          const isLeftLane = Math.random() > 0.5;
          const carColor = isLeftLane ? 'hsl(var(--primary))' : 'hsl(var(--secondary))';
          const duration = 2.5 + Math.random() * 3;

          return (
            <motion.div
              key={`car-${i}`}
              className="absolute w-4 h-10"
              style={{
                left: isLeftLane ? `${35 + Math.random() * 10}%` : `${55 + Math.random() * 10}%`,
              }}
              initial={{ y: '150%', scale: 0.8 }}
              animate={{ y: '-50%', scale: 1.2 }}
              transition={{
                duration,
                repeat: Infinity,
                repeatType: 'loop',
                ease: 'linear',
                delay: Math.random() * duration,
              }}
            >
              {/* Car Body */}
              <div
                className="w-full h-full rounded-t-lg rounded-b-md"
                style={{
                  backgroundColor: carColor,
                  boxShadow: `0 0 15px 4px ${carColor}`,
                }}
              />
              {/* Tail Lights */}
              <div className="absolute bottom-1 left-0 right-0 h-1 flex justify-around">
                <div className="w-1 h-full bg-red-500/80 rounded-full" style={{ boxShadow: '0 0 5px 1px #ff0000' }}/>
                <div className="w-1 h-full bg-red-500/80 rounded-full" style={{ boxShadow: '0 0 5px 1px #ff0000' }}/>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default AnimatedRoad;