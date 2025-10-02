import React, { useState, useEffect } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Function to generate random data points
const generateData = () => Array.from({ length: 12 }, () => ({ v: 30 + Math.random() * 70 }));

interface MiniAreaChartProps {
    color: string; // Expects a color string like 'hsl(var(--primary))'
}

const MiniAreaChart: React.FC<MiniAreaChartProps> = ({ color }) => {
    const [data, setData] = useState(generateData());
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient) return;

        const interval = setInterval(() => {
            setData(prevData => {
                const newData = [...prevData.slice(1)];
                newData.push({ v: 30 + Math.random() * 70 });
                return newData;
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [isClient]);

    if (!isClient) {
        return <div className="w-full h-full bg-muted/50 rounded-lg" />;
    }

    return (
        <div className="relative w-full h-full">
            {/*
        ==========================================================
         The New Gradient Shadow Effect
        ==========================================================
      */}
            <div
                className="absolute bottom-0 left-0 right-0 h-1/2"
                style={{
                    background: `radial-gradient(ellipse at bottom, ${color} 0%, transparent 80%)`,
                    opacity: 0.2,
                    filter: 'blur(20px)',
                }}
            />

            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 5 }}>
                    <defs>
                        <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
                        </linearGradient>
                    </defs>
                    <Area
                        type="monotone"
                        dataKey="v"
                        stroke={color}
                        strokeWidth={2.5}
                        fill={`url(#gradient-${color})`}
                        // Add a subtle drop-shadow to the line itself
                        style={{ filter: `drop-shadow(0 4px 8px ${color})` }}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MiniAreaChart;