import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion'; // 1. Variants را import کنید

interface AnimatedSectionProps {
  children: React.ReactNode;
  variants?: Variants; // 2. از تایپ Variants استفاده کنید
  threshold?: number;
}

const defaultVariants: Variants = { // 3. به متغیر هم تایپ بدهید
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  variants = defaultVariants,
  threshold = 0.2,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};