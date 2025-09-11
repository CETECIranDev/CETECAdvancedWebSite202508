// components/dashboard/MiniDonutChart.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'سواری', value: 65 },
  { name: 'سنگین', value: 25 },
  { name: 'موتور', value: 10 },
];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--muted-foreground))'];

const MiniDonutChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip
          cursor={{ fill: 'transparent' }}
          contentStyle={{
            backgroundColor: 'hsla(var(--card), 0.8)',
            borderColor: 'hsl(var(--border))',
            borderRadius: '0.5rem',
          }}
        />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={25}
          outerRadius={40}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default MiniDonutChart;