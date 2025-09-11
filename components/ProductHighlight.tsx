import React, { useRef } from 'react';
// Import the 'Variants' type from framer-motion
import { motion, useInView, useScroll, useTransform, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface ProductHighlightProps {
  title: string;
  description: string;
  image: string;
  link: string;
  reverse?: boolean;
  delay?: number;
}

// Explicitly type the variants object with the 'Variants' type
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: delay + 0.3,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      // Use a valid cubic-bezier array instead of a generic string
      ease: [0.22, 1, 0.36, 1], // This is an easeOutExpo curve
    },
  },
};

export const ProductHighlight: React.FC<ProductHighlightProps> = ({
  title,
  description,
  image,
  link,
  reverse,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]); // Reduced parallax effect

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      custom={delay} // Pass delay to variants
      className={`flex items-center gap-6 md:gap-12 lg:gap-16 mb-24 md:mb-32 ${
        reverse ? 'flex-col md:flex-row-reverse' : 'flex-col md:flex-row'
      }`}
    >
      {/* Image Column */}
      <motion.div variants={itemVariants} className="w-full md:w-1/2">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-border">
          <motion.div
            className="relative w-full aspect-[4/3]"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <motion.div style={{ y }} className="w-full h-full">
              <Image src={image} alt={title} layout="fill" objectFit="cover" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Column */}
      <motion.div
        variants={containerVariants}
        className={`w-full md:w-1/2 text-center ${reverse ? 'md:text-right' : 'md:text-left'}`}
      >
        <motion.h3 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-primary mb-4">
          {title}
        </motion.h3>
        <motion.p variants={itemVariants} className="text-lg text-muted-foreground mb-8">
          {description}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            href={link}
            className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
          >
            {'مشاهده محصول →'}
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};