// components/InteractiveAnatomy.tsx

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Zap, Shield, BatteryCharging } from 'lucide-react';
import Image from 'next/image';

const features = [
  { id: 1, title: 'دوربین 4K با گیمبال 3 محوره', description: 'تصاویر و ویدیوهای فوق‌العاده باکیفیت و بدون لرزش برای بازرسی‌های دقیق.', icon: <Camera />, position: { top: '40%', left: '50%' } },
  { id: 2, title: 'موتورهای Brushless قدرتمند', description: 'توان بالا و صدای کم برای پرواز پایدار در بادهای شدید و عملیات‌های حساس.', icon: <Zap />, position: { top: '35%', left: '20%' } },
  { id: 3, title: 'بدنه مقاوم از فیبر کربن', description: 'سبک، مقاوم در برابر ضربه و شرایط نامساعد جوی برای ماموریت‌های سخت.', icon: <Shield />, position: { top: '60%', left: '70%' } },
  { id: 4, title: 'باتری هوشمند با مداومت بالا', description: 'بیش از 45 دقیقه پرواز مداوم با یک بار شارژ برای پوشش مناطق گسترده.', icon: <BatteryCharging />, position: { top: '75%', left: '30%' } },
];

const InteractiveAnatomy = () => {
  const [activeFeature, setActiveFeature] = useState(features[0]);

  return (
    <div className="relative w-full max-w-4xl mx-auto aspect-[16/9]">
      <Image src="/images/drone-anatomy.svg" layout="fill" objectFit="contain" alt="Drone Anatomy" />
      
      {features.map(feature => (
        <motion.button
          key={feature.id}
          className="absolute w-8 h-8 rounded-full bg-primary-dark/50 backdrop-blur-sm border-2 border-primary-dark flex items-center justify-center"
          style={{ top: feature.position.top, left: feature.position.left, transform: 'translate(-50%, -50%)' }}
          onClick={() => setActiveFeature(feature)}
          animate={{ scale: activeFeature.id === feature.id ? 1.5 : 1 }}
          whileHover={{ scale: 1.2 }}
        >
          <div className="w-3 h-3 bg-primary-dark rounded-full"></div>
        </motion.button>
      ))}

      <AnimatePresence>
        <motion.div
          key={activeFeature.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute -bottom-24 left-0 right-0 mx-auto w-11/12 md:w-2/3 bg-card-dark/80 backdrop-blur-lg p-4 rounded-xl border border-border-dark flex items-center gap-4"
        >
          <div className="text-primary-dark">{activeFeature.icon}</div>
          <div>
            <h4 className="font-bold">{activeFeature.title}</h4>
            <p className="text-sm text-subtle-dark">{activeFeature.description}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default InteractiveAnatomy;