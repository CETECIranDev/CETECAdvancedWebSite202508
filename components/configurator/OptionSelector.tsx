// components/configurator/OptionSelector.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface Option {
  value: string;
  label: string;
  description: string;
}

interface OptionSelectorProps {
  title: string;
  options: Option[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const OptionSelector: React.FC<OptionSelectorProps> = ({ title, options, selectedValue, onChange }) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-foreground">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <motion.div
            key={option.value}
            onClick={() => onChange(option.value)}
            className={`cursor-pointer p-4 rounded-lg border-2 transition-all ${
              selectedValue === option.value ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <p className="font-bold text-card-foreground">{option.label}</p>
            <p className="text-sm text-muted-foreground">{option.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OptionSelector;