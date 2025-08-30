import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js'; // Import your tailwind config

// --- Tailwind Theme Integration ---
// Resolve the full Tailwind theme object once
const fullConfig = resolveConfig(tailwindConfig);

// Helper function to extract HSL values from Tailwind's theme config
const getHslColorValue = (colorName: string): string => {
  // Access the color from the resolved theme, e.g., 'primary', 'secondary'
  const colorPath = colorName.split('-');
  let colorValue = fullConfig.theme.colors as any;
  for (const part of colorPath) {
    colorValue = colorValue[part];
    if (!colorValue) return 'hsl(0 0% 0%)'; // Fallback to black
  }
  // If the color has a DEFAULT key (e.g., primary.DEFAULT)
  if (typeof colorValue === 'object' && colorValue.DEFAULT) {
    colorValue = colorValue.DEFAULT;
  }
  // The value is in the format 'hsl(var(--...))', we need the variable name
  const match = colorValue.match(/var\((--[^)]+)\)/);
  if (match) {
    // Return a CSS variable reference that Recharts can use directly in styles
    return `hsl(var(${match[1]}))`;
  }
  return 'hsl(0 0% 0%)'; // Fallback
};

// Define chart colors based on the theme
const chartColors = {
  secondary: getHslColorValue('secondary'),
  mutedForeground: getHslColorValue('muted-foreground'),
  border: getHslColorValue('border'),
  card: getHslColorValue('card'),
  foreground: getHslColorValue('foreground'),
};

// --- Custom Tooltip Component ---
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div 
        style={{
          backgroundColor: `hsla(var(--card), 0.8)`,
          backdropFilter: 'blur(4px)',
          border: `1px solid ${chartColors.border}`,
          color: chartColors.foreground,
        }}
        className="p-3 rounded-lg shadow-lg"
      >
        <p className="font-bold">{`ساعت: ${label}`}</p>
        <p style={{ color: chartColors.secondary }}>{`تعداد افراد: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Data Generation ---
const generateInitialData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: `${String(i + 7).padStart(2, '0')}:00`,
    'تعداد افراد': Math.floor(Math.random() * 80) + 20,
  }));
};

// --- Main Chart Component ---
const LiveTrafficChart: React.FC = () => {
  const [data, setData] = useState(generateInitialData());
  const [isClient, setIsClient] = useState(false);

  // Ensure this component only renders on the client to avoid SSR issues with data generation
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastHour = parseInt(newData[newData.length - 1].time.split(':')[0]);
        newData.push({
          time: `${String((lastHour + 1) % 24).padStart(2, '0')}:00`,
          'تعداد افراد': Math.floor(Math.random() * 150) + 50,
        });
        return newData;
      });
    }, 2500); // Update every 2.5 seconds

    return () => clearInterval(interval);
  }, [isClient]);

  // Prevent rendering on the server to avoid hydration errors with the chart
  if (!isClient) {
    return <div style={{ width: '100%', height: '400px' }} className="bg-muted rounded-lg animate-pulse"></div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={chartColors.secondary} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={chartColors.secondary} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke={chartColors.mutedForeground} axisLine={false} tickLine={false} />
        <YAxis stroke={chartColors.mutedForeground} axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke={chartColors.border} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--primary), 0.1)' }}/>
        <Area
          type="monotone"
          dataKey="تعداد افراد"
          stroke={chartColors.secondary}
          strokeWidth={2}
          fill="url(#chartGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LiveTrafficChart;