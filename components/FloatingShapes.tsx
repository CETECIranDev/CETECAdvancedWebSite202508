// components/FloatingShapes.tsx (Corrected Colors)
import React from 'react';
import { motion } from 'framer-motion';

const Shape: React.FC<{
  children: React.ReactNode;
  initialX: string;
  initialY: string;
  duration: number;
  delay: number;
  size: number;
  color: string; // Now we pass the color variable
}> = ({ children, initialX, initialY, duration, delay, size, color }) => {
  return (
    <motion.div
      className="absolute"
      style={{
        width: size,
        height: size,
        left: initialX,
        top: initialY,
        color: color, // Use the color variable here
      }}
      animate={{
        y: [0, -20, 0, 20, 0],
        x: [0, 10, 0, -10, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

const FloatingShapes = () => {
  const shapes = [
    // Circles (Bubbles)
    { type: 'circle', initialX: '10%', initialY: '20%', duration: 15, delay: 0, size: 80, color: 'hsl(var(--primary))' },
    { type: 'circle', initialX: '80%', initialY: '30%', duration: 20, delay: 3, size: 120, color: 'hsl(var(--secondary))' },
    { type: 'circle', initialX: '15%', initialY: '80%', duration: 18, delay: 5, size: 60, color: 'hsl(var(--primary))' },

    // Squares
    { type: 'square', initialX: '90%', initialY: '70%', duration: 22, delay: 1, size: 50, color: 'hsl(var(--secondary))' },
    { type: 'square', initialX: '5%', initialY: '50%', duration: 16, delay: 4, size: 70, color: 'hsl(var(--primary))' },

    // Triangles
    { type: 'triangle', initialX: '50%', initialY: '10%', duration: 19, delay: 2, size: 90, color: 'hsl(var(--secondary))' },
  ];

  const getShapeComponent = (shape: (typeof shapes)[0]) => {
    // We get the opacity from the CSS variable we defined
    const opacity = 'var(--floating-shape-opacity)';
    
    switch (shape.type) {
      case 'circle':
        return <div className="w-full h-full rounded-full bg-current" style={{ opacity }} />;
      case 'square':
        return <div className="w-full h-full bg-current" style={{ opacity }} />;
      case 'triangle':
        return <div className="w-full h-full bg-current" style={{ opacity, clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden -z-10">
      {shapes.map((shape, index) => (
        <Shape
          key={index}
          initialX={shape.initialX}
          initialY={shape.initialY}
          duration={shape.duration}
          delay={shape.delay}
          size={shape.size}
          color={shape.color} // Pass the color variable to the Shape component
        >
          {getShapeComponent(shape)}
        </Shape>
      ))}
    </div>
  );
};

export default FloatingShapes;