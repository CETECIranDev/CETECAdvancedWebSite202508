// components/dashboard/MiniAreaChart.tsx (Corrected Version)
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Function to generate random data
const generateData = () => Array.from({ length: 10 }, () => ({ v: Math.random() * 100 }));

// This component no longer accepts a 'color' prop
const MiniAreaChart: React.FC = () => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => setData(generateData()), 2000);
    return () => clearInterval(interval);
  }, []);

  // We define the color using a CSS variable directly
  const chartColor = "hsl(var(--primary))";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="miniChartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area 
          type="monotone" 
          dataKey="v" 
          stroke={chartColor} 
          strokeWidth={2} 
          fill="url(#miniChartGradient)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MiniAreaChart;