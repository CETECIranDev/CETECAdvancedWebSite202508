// components/Timeline.tsx (Corrected Version)
import React from 'react'; // <--- این خط حیاتی اضافه شد
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const events: TimelineEvent[] = [
  { year: '۱۳۹۵', title: 'تاسیس و شروع ایده', description: 'شرکت با هدف توسعه راهکارهای نوین مبتنی بر اینترنت اشیا توسط تیمی از نخبگان دانشگاهی تاسیس شد.' },
  { year: '۱۳۹۷', title: 'اولین محصول: دیتا لاگر صنعتی', description: 'پس از دو سال تحقیق و توسعه، اولین نسل از دیتا لاگرهای صنعتی ما با موفقیت وارد بازار شد.' },
  { year: '۱۳۹۹', title: 'ورود به حوزه هوش مصنوعی', description: 'با گسترش تیم، تمرکز خود را بر روی ادغام هوش مصنوعی با سخت‌افزار قرار دادیم و پروژه شمارش هوشمند افراد کلید خورد.' },
  { year: '۱۴۰۱', title: 'معرفی پهپاد هوشمند VTOL', description: 'با دستیابی به فناوری‌های پیشرفته، از اولین پهپاد عمود پرواز هوشمند خود رونمایی کردیم.' },
  { year: 'آینده', title: 'پیش به سوی آینده‌ای پایدار', description: 'چشم‌انداز ما تبدیل شدن به رهبر منطقه‌ای در زمینه فناوری‌های سبز و مدیریت هوشمند انرژی است.' },
];

const TimelineItem: React.FC<{ event: TimelineEvent; index: number }> = ({ event, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  
  const isOdd = index % 2 !== 0;

  return (
    <div ref={ref} className={`flex items-center w-full my-6 ${isOdd ? 'flex-row-reverse md:flex-row-reverse' : 'md:flex-row'}`}>
      <div className="hidden md:block w-5/12"></div>
      <div className="relative w-1/12">
        <div className="w-1 h-full bg-border-dark mx-auto"></div>
        <motion.div
          style={{ scale: scrollYProgress }}
          className="absolute top-1/2 -mt-3 w-6 h-6 rounded-full bg-primary-dark border-4 border-card-dark"
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full md:w-5/12"
      >
        <div className={`p-6 rounded-2xl border border-border-dark bg-card-dark shadow-lg`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-text-dark">{event.title}</h3>
            <span className="text-sm font-semibold text-primary-dark">{event.year}</span>
          </div>
          <p className="text-subtle-dark">{event.description}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Timeline = () => {
  return (
    <div className="relative wrap overflow-hidden p-0 md:p-10 h-full">
      <div className="absolute border-2 border-opacity-20 border-border-dark h-full border hidden md:block" style={{ left: '50%' }}></div>
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} index={index} />
      ))}
    </div>
  );
};

export default Timeline;