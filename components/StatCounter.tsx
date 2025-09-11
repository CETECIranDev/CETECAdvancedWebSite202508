// components/StatCounter.tsx
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface StatCounterProps {
  from?: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const StatCounter: React.FC<StatCounterProps> = ({ from = 0, to, duration = 2, className, prefix = '', suffix = '' }) => {
  const count = useMotionValue(from);
  const rounded = useTransform(count, latest => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      animate(count, to, { duration });
    }
  }, [inView, count, to, duration]);

  return (
    <div ref={ref} className={className}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </div>
  );
};

export default StatCounter;