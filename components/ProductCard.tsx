// components/ProductCard.tsx (New Advanced Version)
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import * as Icons from 'lucide-react';
import { ArrowRight } from 'lucide-react';

type IconName = keyof typeof Icons;

interface ProductCardProps {
  title: string;
  description: string;
  icon: IconName;
  link: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, icon, link }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const IconComponent = Icons[icon] as React.ElementType;

  return (
    <Link href={link} className="w-full h-full">
      <motion.div
        ref={divRef}
        onMouseMove={onMouseMove}
        initial={{ background: "transparent" }}
        whileHover={{ background: "rgba(100, 100, 100, 0.1)" }} // Subtle background on hover
        className="group relative w-full h-full rounded-2xl border border-border-dark p-8 text-center transition-all duration-300"
        style={
            {
            '--spotlight-color': 'hsl(var(--primary))',
            background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsla(var(--primary), 0.15), transparent 40%)`
            } as React.CSSProperties
        }
      >
        <div className="relative z-10 flex flex-col items-center h-full">
          {/* Icon */}
          <div className="bg-primary-dark/10 p-4 rounded-full transition-transform duration-300 group-hover:scale-110">
            {IconComponent && <IconComponent className="h-10 w-10 text-primary-dark" />}
          </div>

          {/* Title */}
          <h3 className="mt-6 text-2xl font-bold text-text-dark">
            {title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-subtle-dark flex-grow">
            {description}
          </p>

          {/* "View Details" on hover */}
          <div className="mt-6 flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <span>مشاهده جزئیات</span>
            <ArrowRight size={18} />
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProductCard;