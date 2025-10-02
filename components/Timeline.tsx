// components/Timeline.tsx (Corrected Version)
import React from 'react'; // <--- این خط حیاتی اضافه شد
import { motion, useScroll } from 'framer-motion';
import { useRef } from 'react';
import { useTranslation } from 'next-i18next';

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}


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
    const { t } = useTranslation('about'); // 2. Use the hook

    const events = [
        { year: t('timeline.event1.year'), title: t('timeline.event1.title'), description: t('timeline.event1.description') },
        { year: t('timeline.event2.year'), title: t('timeline.event2.title'), description: t('timeline.event2.description') },
        { year: t('timeline.event3.year'), title: t('timeline.event3.title'), description: t('timeline.event3.description') },
        { year: t('timeline.event4.year'), title: t('timeline.event4.title'), description: t('timeline.event4.description') },
        { year: t('timeline.event5.year'), title: t('timeline.event5.title'), description: t('timeline.event5.description') },
    ];
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