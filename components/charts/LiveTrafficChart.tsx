import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// This is the correct deep import for the ContentType generic type
import { ContentType } from 'recharts/types/component/Tooltip';
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';

// --- Tailwind Theme Integration (remains the same) ---
type ColorValue = string | { [key: string]: ColorValue };
type ThemeColors = { [key: string]: ColorValue };
const fullConfig = resolveConfig(tailwindConfig);

const getHslColorValue = (colorName: string): string => {
  const colorPath = colorName.split('-');
  let colorValue: ColorValue = fullConfig.theme.colors as unknown as ThemeColors;
  for (const part of colorPath) {
    if (typeof colorValue === 'object' && colorValue !== null && !Array.isArray(colorValue)) {
      colorValue = colorValue[part];
    } else {
      return 'hsl(0 0% 0%)';
    }
  }
  if (typeof colorValue === 'object' && colorValue !== null && 'DEFAULT' in colorValue) {
    colorValue = colorValue.DEFAULT;
  }
  if (typeof colorValue !== 'string') {
      return 'hsl(0 0% 0%)';
  }
  const match = colorValue.match(/var\((--[^)]+)\)/);
  if (match) {
    return `hsl(var(${match[1]}))`;
  }
  return 'hsl(0 0% 0%)';
};

// --- Custom Tooltip Component (FINALLY CORRECTLY TYPED) ---
// We define our custom tooltip as a function that matches the ContentType generic.
const CustomTooltip: ContentType<number, string> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div 
        style={{
          backgroundColor: `hsla(var(--card), 0.8)`,
          backdropFilter: 'blur(4px)',
          border: `1px solid ${getHslColorValue('border')}`,
          color: getHslColorValue('foreground'),
        }}
        className="p-3 rounded-lg shadow-lg"
      >
        <p className="font-bold">{`ساعت: ${label}`}</p>
        <p style={{ color: getHslColorValue('secondary') }}>{`تعداد افراد: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- Data Generation (remains the same) ---
const generateInitialData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: `${String(i + 7).padStart(2, '0')}:00`,
    'تعداد افراد': Math.floor(Math.random() * 80) + 20,
  }));
};

// --- Main Chart Component (remains the same) ---
const LiveTrafficChart: React.FC = () => {
  const [data, setData] = useState(generateInitialData());
  const [isClient, setIsClient] = useState(false);

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
    }, 2500);
    return () => clearInterval(interval);
  }, [isClient]);

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
            <stop offset="5%" stopColor={getHslColorValue('secondary')} stopOpacity={0.4}/>
            <stop offset="95%" stopColor={getHslColorValue('secondary')} stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis dataKey="time" stroke={getHslColorValue('muted-foreground')} axisLine={false} tickLine={false} />
        <YAxis stroke={getHslColorValue('muted-foreground')} axisLine={false} tickLine={false} />
        <CartesianGrid strokeDasharray="3 3" stroke={getHslColorValue('border')} />
        {/* Pass the correctly typed component to the 'content' prop */}
        <Tooltip content={CustomTooltip} cursor={{ fill: 'hsla(var(--primary), 0.1)' }}/>
        <Area
          type="monotone"
          dataKey="تعداد افراد"
          stroke={getHslColorValue('secondary')}
          strokeWidth={2}
          fill="url(#chartGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LiveTrafficChart;