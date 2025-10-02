// components/dashboard/MiniDonutChart.tsx (New & Improved)
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import StatCounter from '../StatCounter'; // We'll reuse our StatCounter

const data = [
    { name: 'سواری', value: 485 },
    { name: 'سنگین', value: 190 },
    { name: 'موتور', value: 75 },
];
const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))'];

const totalVehicles = data.reduce((sum, entry) => sum + entry.value, 0);

const MiniDonutChart = () => {
    return (
        <div className="relative w-full h-full">
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
                        innerRadius="60%" // Creates the donut shape
                        outerRadius="80%"
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                        stroke="none"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                                style={{ filter: `drop-shadow(0 0 5px ${COLORS[index % COLORS.length]})` }} // Glow effect
                            />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <StatCounter to={totalVehicles} duration={3} className="text-4xl font-bold text-foreground" />
                <p className="text-sm text-muted-foreground">خودرو</p>
            </div>
        </div>
    );
};

export default MiniDonutChart;