// components/InteractiveServices.tsx
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BrainCircuit, Zap, Rocket, Brain, FileText } from 'lucide-react';
import Image from 'next/image';

const services = [
  {
    icon: BrainCircuit,
    title: 'سامانه‌های نرم‌افزاری AI',
    description: 'ما با استفاده از آخرین تکنیک‌های داده‌کاوی، یادگیری ماشین و پردازش تصویر، سامانه‌های نرم‌افزاری هوشمندی را طراحی می‌کنیم که قادر به تحلیل ویدئو، تشخیص چهره و کمک به تصمیم‌گیری‌های پیچیده صنعتی هستند.',
    image: '/images/service-ai.svg',
  },
  {
    icon: Zap,
    title: 'سخت‌افزار و سیستم‌های کنترلی',
    description: 'تیم ما در طراحی و ساخت بردهای الکترونیکی پیشرفته، سیستم‌های نهفته (Embedded) و تجهیزات کنترلی برای داده‌برداری و پردازش زمان واقعی (Real-time) تخصص دارد.',
    image: '/images/service-hardware.svg',
  },
  {
    icon: Rocket,
    title: 'پهپادهای هوشمند',
    description: 'ما پهپادهای عمودپرواز (VTOL) خودران را با قابلیت‌های پیشرفته‌ای نظیر ردیابی سوژه، پردازش تصویر آنی، ناوبری هوشمند و ارتباطات بی‌سیم امن طراحی و تولید می‌کنیم.',
    image: '/images/service-drone.svg',
  },
  {
    icon: Brain,
    title: 'واسط مغز و کامپیوتر (BCI)',
    description: 'در لبه علم و فناوری، ما در حال توسعه سامانه‌هایی برای تحلیل سیگنال‌های مغزی (EEG) هستیم که تعامل مستقیم و بدون واسطه انسان با سیستم‌های کامپیوتری را ممکن می‌سازد.',
    image: '/images/service-bci.svg',
  },
  {
    icon: FileText,
    title: 'مشاوره و تحقیق صنعتی',
    description: 'ما به صنایع کمک می‌کنیم تا با استفاده از شبیه‌سازی‌های پیشرفته، مهندسی معکوس و بهینه‌سازی فرآیندها، محصولات بهتری تولید کرده و بهره‌وری خود را افزایش دهند.',
    image: '/images/service-consulting.svg',
  },
];

const ServiceItem: React.FC<{ service: typeof services[0], onInView: () => void }> = ({ service, onInView }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale }}
      className="h-screen flex flex-col justify-center"
      onViewportEnter={onInView}
    >
      <div className="flex items-center gap-4 mb-4">
        <service.icon className="text-primary-dark" size={32} />
        <h3 className="text-3xl font-bold">{service.title}</h3>
      </div>
      <p className="text-lg text-subtle-dark">{service.description}</p>
    </motion.div>
  );
};

const InteractiveServices = () => {
  const [activeServiceIndex, setActiveServiceIndex] = useState(0);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });

  return (
    <div ref={containerRef} className="relative container mx-auto px-6">
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed top-0 left-0 right-0 h-1 bg-primary-dark origin-left z-50" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Sticky Column (Visuals) */}
        <div className="hidden lg:block sticky top-0 h-screen">
          <div className="w-full h-full flex items-center justify-center">
            <div className="relative w-96 h-96">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0"
                  animate={{
                    opacity: activeServiceIndex === index ? 1 : 0,
                    scale: activeServiceIndex === index ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                >
                  <Image src={service.image} layout="fill" objectFit="contain" alt={service.title} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Scrollable Column (Content) */}
        <div>
          {services.map((service, index) => (
            <ServiceItem
              key={index}
              service={service}
              onInView={() => setActiveServiceIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveServices;