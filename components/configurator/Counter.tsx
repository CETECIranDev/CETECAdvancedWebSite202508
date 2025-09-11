// components/configurator/Counter.tsx
import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CounterProps {
  title: string;
  value: number;
  onChange: (newValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const Counter: React.FC<CounterProps> = ({ title, value, onChange, min = 0, max = 16, step = 1 }) => {
  return (
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="flex items-center gap-2">
        <button onClick={() => onChange(Math.max(min, value - step))} className="p-2 bg-muted rounded-full hover:bg-accent disabled:opacity-50" disabled={value <= min}>
          <Minus size={16} />
        </button>
        <span className="text-xl font-bold w-12 text-center">{value}</span>
        <button onClick={() => onChange(Math.min(max, value + step))} className="p-2 bg-muted rounded-full hover:bg-accent disabled:opacity-50" disabled={value >= max}>
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};

export default Counter;