import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Import 'Variants' and 'ViewportOptions' for correct typing
import { motion, Variants, ViewportOptions } from 'framer-motion';
import { Map, Wind, Eye, BatteryCharging, Download, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import InteractiveAnatomy from '../../components/InteractiveAnatomy';
import Image from 'next/image'; // Import Next.js Image component
import DroneTelemetryUI from '../../components/DroneTelemetryUI'; // <-- کامپوننت جدید را import کنید

// 1. Define the viewport options with the correct type
const viewportSettings: ViewportOptions = { once: true, amount: 0.2 };

// 2. Define animation variants with the correct type and a valid 'ease' value
const fadeIn: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] // Use a valid cubic-bezier
    } 
  },
};

const CapabilityCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    variants={fadeIn}
    initial="initial"
    whileInView="whileInView"
    viewport={viewportSettings}
    className="bg-card p-8 rounded-2xl border border-border text-center flex flex-col items-center"
  >
    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground flex-grow">{description}</p>
  </motion.div>
);

const SmartVtolDronePage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background text-foreground">
      {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center p-6 overflow-hidden">
        
        {/* 1. Video Background Layer */}
        <video 
          key="drone-fpv-video"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/drone-fpv.mp4" type="video/mp4" />
        </video>

        {/* 2. Darkening Overlay & Gradient Layer */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>

        {/* 3. Content Layer */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className="z-20 text-white"
        >
          <div className="inline-block bg-primary/20 border border-primary text-primary rounded-full px-4 py-1 mb-6 text-sm font-medium">
            نسل جدید پرواز هوشمند
          </div>
          <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter" style={{ textShadow: '0 2px 15px rgba(0,0,0,0.5)' }}>
            HORIZON VTOL X1
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4" style={{ textShadow: '0 1px 8px rgba(0,0,0,0.5)' }}>
            پهپاد هوشمند عمود پرواز: فراتر از مرزهای نظارت و نقشه‌برداری هوایی
          </p>
          <Link href="#telemetry-ui" className="mt-10 inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
            مشاهده رابط کاربری زنده
          </Link>
        </motion.div>
        
        {/* 4. Scroll Down Indicator */}
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 z-20"
        >
          <ChevronDown size={32} className="text-white/70" />
        </motion.div>
      </section>


      {/* Innovation Intro */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
          >
            <h2 className="text-4xl font-bold mb-6">
              پرواز و فرود عمودی.
              <br />
              <span className="text-primary">انعطاف‌پذیری بی‌نهایت.</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              فناوری VTOL به پهپاد Horizon X1 اجازه می‌دهد تا مانند یک هلیکوپتر از هر مکانی بلند شود و فرود آید، و سپس مانند یک هواپیما با سرعت و مداومت بالا پرواز کند. این یعنی دسترسی به مناطقی که قبلاً غیرممکن بود.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="relative h-80 rounded-2xl flex items-center justify-center"
          >
            {/* Using next/image to fix the warning */}
            <Image src="/images/vtol-animation.svg" layout="fill" objectFit="contain" alt="VTOL Animation" />
          </motion.div>
        </div>
      </section>

            {/* NEW: Live Telemetry UI Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4 text-foreground">
              تجربه کنترل کامل
            </h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground mb-12">
              این یک شبیه‌سازی زنده از رابط کاربری تله‌متری پهپاد Horizon X1 است. پایداری، دقت و جریان داده آنی را در عمل احساس کنید.
            </p>
          </motion.div>
          <motion.div
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="max-w-4xl mx-auto"
          >
            <DroneTelemetryUI />
          </motion.div>
        </div>
      </section>

      
      {/* Interactive Anatomy Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="text-4xl font-bold mb-20"
          >
            آناتومی یک پرنده شکاری
          </motion.h2>
          <InteractiveAnatomy />
        </div>
      </section>
      
      {/* Key Capabilities Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="text-4xl font-bold text-center mb-16"
          >
            ساخته شده برای ماموریت‌های ناممکن
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CapabilityCard icon={<Eye size={32} />} title="ناوبری هوشمند AI" description="سیستم اجتناب از موانع سه‌بعدی و دنبال کردن خودکار اهداف با هوش مصنوعی." />
            <CapabilityCard icon={<Map size={32} />} title="نقشه‌برداری دقیق" description="ایجاد مدل‌های سه‌بعدی و نقشه‌های ارتوموزائیک با دقت سانتی‌متری." />
            <CapabilityCard icon={<Wind size={32} />} title="مقاومت در برابر باد" description="پایداری کامل در بادهایی با سرعت 60 کیلومتر بر ساعت." />
            <CapabilityCard icon={<BatteryCharging size={32} />} title="مداومت پروازی بالا" description="بیش از 45 دقیقه پرواز مداوم برای پوشش مناطق وسیع." />
          </div>
        </div>
      </section>

      {/* Tech Specs Table */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="text-4xl font-bold text-center mb-12"
          >
            مشخصات فنی
          </motion.h2>
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="max-w-3xl mx-auto bg-card border border-border rounded-2xl overflow-hidden"
          >
            <div className="divide-y divide-border">
              <div className="grid grid-cols-3 p-4"><span className="font-bold text-muted-foreground col-span-1">وزن برخاست</span><span className="col-span-2">7.5 کیلوگرم</span></div>
              <div className="grid grid-cols-3 p-4"><span className="font-bold text-muted-foreground col-span-1">مداومت پروازی</span><span className="col-span-2">45-55 دقیقه</span></div>
              <div className="grid grid-cols-3 p-4"><span className="font-bold text-muted-foreground col-span-1">حداکثر سرعت</span><span className="col-span-2">100 کیلومتر بر ساعت</span></div>
              <div className="grid grid-cols-3 p-4"><span className="font-bold text-muted-foreground col-span-1">دوربین اصلی</span><span className="col-span-2">سنسور 1 اینچ، 20 مگاپیکسل، ویدیو 4K</span></div>
              <div className="grid grid-cols-3 p-4"><span className="font-bold text-muted-foreground col-span-1">محدوده ارتباطی</span><span className="col-span-2">15 کیلومتر (HD Video Link)</span></div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 text-center bg-muted">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
          >
            <h2 className="text-4xl font-bold mb-4">آسمان، دیگر محدودیت نیست.</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">
              برای دریافت کاتالوگ فنی کامل و مشاوره با کارشناسان ما، همین امروز اقدام کنید.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              دریافت کاتالوگ <Download className="group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default SmartVtolDronePage;