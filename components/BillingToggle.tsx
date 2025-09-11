// components/BillingToggle.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface BillingToggleProps {
  billingCycle: 'monthly' | 'yearly';
  setBillingCycle: (cycle: 'monthly' | 'yearly') => void;
}

const BillingToggle: React.FC<BillingToggleProps> = ({ billingCycle, setBillingCycle }) => {
  return (
    <div className="relative w-72 mx-auto flex items-center p-1 bg-muted rounded-full">
      <button
        onClick={() => setBillingCycle('monthly')}
        className={`w-1/2 py-2 text-center rounded-full relative z-10 transition-colors ${
          billingCycle === 'monthly' ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        ماهانه
      </button>
      <button
        onClick={() => setBillingCycle('yearly')}
        className={`w-1/2 py-2 text-center rounded-full relative z-10 transition-colors ${
          billingCycle === 'yearly' ? 'text-foreground' : 'text-muted-foreground'
        }`}
      >
        سالانه (۲۰٪ تخفیف)
      </button>
      <motion.div
        className="absolute top-1 left-1 bottom-1 w-[calc(50%-0.25rem)] bg-card rounded-full shadow-md"
        layoutId="billing-toggle-highlight"
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        animate={{ x: billingCycle === 'monthly' ? 0 : '100%' }}
      />
    </div>
  );
};

export default BillingToggle;