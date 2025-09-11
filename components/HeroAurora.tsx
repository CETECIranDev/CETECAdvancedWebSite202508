import React from 'react';
import { motion } from 'framer-motion';

const HeroAurora = () => {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[600px] [mask-image:linear-gradient(to_bottom,white,transparent)]">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)),transparent_50%)]"
          animate={{
            transform: ['translateX(-20%) translateY(10%)', 'translateX(20%) translateY(-10%)', 'translateX(-20%) translateY(10%)'],
          }}
          transition={{ duration: 15, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--secondary)),transparent_50%)]"
          animate={{
            transform: ['translateX(10%) translateY(-15%)', 'translateX(-10%) translateY(15%)', 'translateX(10%) translateY(-15%)'],
          }}
          transition={{ duration: 18, ease: 'easeInOut', repeat: Infinity, delay: 3 }}
        />
      </div>
    </div>
  );
};

export default HeroAurora;