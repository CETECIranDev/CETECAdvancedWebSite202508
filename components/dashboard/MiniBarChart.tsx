// components/dashboard/MiniBarChart.tsx
import React from 'react';
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'ورودی A', pv: 24 },
  { name: 'ورودی B', pv: 13 },
  { name: 'لابی', pv: 48 },
  { name: 'فروشگاه', pv: 39 },
];

const MiniBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
        <XAxis dataKey="name" fontSize={10} stroke="hsl(var(--muted-foreground))" />
        <Tooltip
          cursor={{ fill: 'hsla(var(--primary), 0.1)' }}
          contentStyle={{
            backgroundColor: 'hsla(var(--card), 0.8)',
            borderColor: 'hsl(var(--border))',
            borderRadius: '0.5rem',
          }}
        />
        <Bar dataKey="pv" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MiniBarChart;