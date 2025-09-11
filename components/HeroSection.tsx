// components/HeroSection.tsx (Final Corrected Version)
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ title, subtitle, ctaText, ctaLink }) => {
  return (
    <motion.div
      className="relative flex items-center justify-center min-h-[80vh] text-white text-center px-6 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-r from-primary-light via-secondary-light to-primary-dark dark:from-primary-dark dark:via-secondary-dark dark:to-primary-light bg-[length:200%_200%] animate-gradient-pulse"></div>
      <div className="z-10 max-w-4xl">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
          style={{ textShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl mb-10"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          {subtitle}
        </motion.p>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: 'backOut' }}
        >
          <Link href={ctaLink} className="inline-block bg-white text-primary-light dark:text-primary-dark font-bold text-lg px-10 py-4 rounded-full shadow-2xl transform transition-transform duration-300 hover:scale-105">
            {ctaText}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};