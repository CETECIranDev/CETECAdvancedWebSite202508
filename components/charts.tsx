// components/charts/SmartPeopleCounterChart.tsx
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// داده‌های شبیه‌سازی شده
const generateData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    name: `${i + 8}:00`,
    'تعداد افراد': Math.floor(Math.random() * (150 - 50 + 1)) + 50,
  }));
};

const SmartPeopleCounterChart: React.FC<{ theme: string }> = ({ theme }) => {
  const [data, setData] = useState(generateData());

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData.slice(1)];
        const lastHour = parseInt(newData[newData.length - 1].name.split(':')[0]);
        newData.push({
          name: `${(lastHour + 1) % 24}:00`,
          'تعداد افراد': Math.floor(Math.random() * (150 - 50 + 1)) + 50,
        });
        return newData;
      });
    }, 3000); // هر 3 ثانیه داده جدید

    return () => clearInterval(interval);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className="w-full h-96 p-4 bg-card-light dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark">
      <h3 className="text-xl font-bold mb-4 text-center">📊 تحلیل ترافیک لحظه‌ای افراد</h3>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={isDark ? '#27AE60' : '#2ECC71'} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={isDark ? '#27AE60' : '#2ECC71'} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke={isDark ? '#E5E7EB' : '#1F2937'} />
          <YAxis stroke={isDark ? '#E5E7EB' : '#1F2937'} />
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#30363D' : '#E5E7EB'} />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? '#161B22' : '#FFFFFF',
              borderColor: isDark ? '#30363D' : '#E5E7EB',
            }}
          />
          <Area type="monotone" dataKey="تعداد افراد" stroke={isDark ? '#27AE60' : '#2ECC71'} fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SmartPeopleCounterChart;