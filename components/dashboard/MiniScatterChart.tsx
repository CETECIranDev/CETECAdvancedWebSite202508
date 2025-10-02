// components/dashboard/MiniScatterChart.tsx
import React from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = Array.from({ length: 50 }, () => ({
    x: 18 + Math.random() * 50, // Age
    y: Math.random() * 100, // Behavior Score
}));

const MiniScatterChart = () => (
    <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: -20 }}>
            <CartesianGrid stroke="hsl(var(--border) / 0.5)" strokeDasharray="3 3" />
            <XAxis type="number" dataKey="x" name="سن" unit=" سال" fontSize={10} stroke="hsl(var(--muted-foreground))" />
            <YAxis type="number" dataKey="y" name="امتیاز" fontSize={10} stroke="hsl(var(--muted-foreground))" />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: 'hsla(var(--card), 0.8)', borderColor: 'hsl(var(--border))' }} />
            <Scatter name="تحلیل رفتار" data={data} fill="hsl(var(--primary))" />
        </ScatterChart>
    </ResponsiveContainer>
);

export default MiniScatterChart;