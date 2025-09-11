// components/PricingCard.tsx (New Interactive Version)
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PricingCardProps {
  planName: string;
  price: string;
  priceDescription: string;
  features: string[];
  isFeatured?: boolean;
  ctaText: string;
  ctaLink: string;
  delay?: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  planName,
  price,
  priceDescription,
  features,
  isFeatured = false,
  ctaText,
  ctaLink,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay }}
    >
      <Link href={ctaLink} className="block h-full">
        <div
          className={`group relative w-full h-full p-8 rounded-3xl border transition-all duration-300
            ${isFeatured
              ? 'border-primary bg-card shadow-2xl hover:shadow-[0_0_30px_hsl(var(--primary))]'
              : 'border-border bg-card/50 hover:border-muted-foreground/50'
            }
          `}
        >
          {isFeatured && (
            <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
              محبوب‌ترین
            </div>
          )}

          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold text-foreground">{planName}</h3>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={price}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="mt-4"
              >
                <p className="text-5xl font-extrabold tracking-tight text-foreground">{price}</p>
                <p className="mt-2 text-muted-foreground">{priceDescription}</p>
              </motion.div>
            </AnimatePresence>

            <ul className="mt-8 space-y-4 text-left flex-grow">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
            
            <div
              className={`mt-10 flex items-center justify-center gap-2 w-full py-3 px-6 text-center font-bold rounded-lg transition-all duration-300
                ${isFeatured
                  ? 'bg-primary text-primary-foreground group-hover:bg-primary/90'
                  : 'bg-muted text-foreground group-hover:bg-accent'
                }
              `}
            >
              <span>{ctaText}</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PricingCard;