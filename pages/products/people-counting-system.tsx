import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Import 'Variants' and 'ViewportOptions' for correct typing
import { motion, Variants, ViewportOptions } from 'framer-motion';
import { Users, BarChartBig, Cpu, Lock, ShoppingCart, Plane, Calendar, ChevronDown } from 'lucide-react';
import LiveTrafficChart from '../../components/charts/LiveTrafficChart';
import Link from 'next/link';
import StatCounter from '../../components/StatCounter';
import Image from 'next/image'; // Import Next.js Image component
import PricingCard from '../../components/PricingCard'; // <-- کامپوننت جدید را import کنید
import { useState } from 'react'; // <-- Import useState
import BillingToggle from '../../components/BillingToggle'; // <-- کامپوننت جدید را import کنید



const pricingPlans = [
  {
    planName: "پایه | سخت‌افزار",
    pricing: {
      monthly: { price: "تماس بگیرید", description: "برای هر دستگاه" },
      yearly: { price: "تماس بگیرید", description: "برای هر دستگاه (قرارداد سالانه)" },
    },
    features: [ "دستگاه شمارشگر با دقت بالا", "قابلیت شمارش ورود و خروج", "اتصال از طریق شبکه (Ethernet)", "گارانتی یک ساله سخت‌افزار" ],
    ctaText: "دریافت پیش‌فاکتور",
    ctaLink: "/contact",
  },
  {
    planName: "حرفه‌ای | نرم‌افزار",
    pricing: {
      monthly: { price: "تماس بگیرید", description: "ماهانه / برای هر لایسنس" },
      yearly: { price: "تماس بگیرید", description: "سالانه / برای هر لایسنس" },
    },
    features: [ "تمام ویژگی‌های پلن پایه", "لایسنس نرم‌افزار تحت وب", "داشبورد تحلیلی و گزارش‌دهی", "قابلیت تخمین جنسیت", "قابلیت تخمین محدوده سنی", "پشتیبانی فنی استاندارد" ],
    isFeatured: true,
    ctaText: "شروع کنید",
    ctaLink: "/contact",
  },
  {
    planName: "سازمانی | راهکار جامع",
    pricing: {
      monthly: { price: "سفارشی", description: "برای پروژه‌های بزرگ" },
      yearly: { price: "سفارشی", description: "برای پروژه‌های بزرگ" },
    },
    features: [ "تمام ویژگی‌های پلن حرفه‌ای", "تحلیل پیشرفته مسیر حرکت (Path Tracking)", "نمودارهای حرارتی (Heatmaps)", "دسترسی به API برای یکپارچه‌سازی", "پشتیبانی ویژه و اختصاصی", "نصب و راه‌اندازی در محل" ],
    ctaText: "مشاوره با کارشناس",
    ctaLink: "/contact",
  }
];



// 1. Define the viewport options with the correct type
const viewportSettings: ViewportOptions = { once: true, amount: 0.3 };

// 2. Define animation variants with the correct type and a valid 'ease' value
const fadeIn: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] // Use a valid cubic-bezier for easeOutExpo
    } 
  },
};

const staggerContainer: Variants = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Reusable components with correct animation props
const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number; unit: string }> = ({ icon, label, value, unit }) => (
  <motion.div variants={fadeIn} className="bg-card/50 backdrop-blur-lg border border-border p-6 rounded-2xl text-center">
    <div className="text-secondary mx-auto w-fit mb-3">{icon}</div>
    {typeof value === 'number' ? 
      <StatCounter to={value} duration={2.5} className="text-4xl font-bold text-foreground" suffix={unit.startsWith('%') ? '%' : ''} /> :
      <div className="text-4xl font-bold text-foreground">{value}</div>
    }
    <div className="text-muted-foreground">{label}</div>
    <div className="text-xs text-muted-foreground mt-1">{unit.startsWith('%') ? '' : unit}</div>
  </motion.div>
);

const Feature: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div variants={fadeIn} className="flex items-start gap-4">
    <div className="bg-primary/10 text-primary p-3 rounded-lg">{icon}</div>
    <div>
      <h3 className="text-xl font-bold text-foreground">{title}</h3>
      <p className="text-muted-foreground mt-1">{description}</p>
    </div>
  </motion.div>
);

const UseCaseCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div variants={fadeIn} className="bg-background p-8 rounded-2xl text-center">
        <div className="mx-auto text-secondary mb-4 w-fit">{icon}</div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
    </motion.div>
);

const PeopleCountingPage = () => {
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Hero Section */}
       <section className="relative h-screen flex items-center justify-center text-center p-6 overflow-hidden">
        
        {/* 1. Video Background Layer */}
        <video 
          key="people-counting-video" // Adding a key can help with re-renders
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/street-scene-short.mp4" type="video/mp4" />
          {/* Add more formats for better browser compatibility if needed */}
        </video>

        {/* 2. Darkening Overlay & Gradient Layer */}
        {/* This is crucial for text readability */}
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>

        {/* 3. Content Layer */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className="z-20 text-white" // Ensure text is white to be visible on the dark overlay
        >
          <div className="inline-block bg-secondary/20 border border-secondary text-secondary rounded-full px-4 py-1 mb-6 text-sm font-medium">
            دقت بی‌نظیر، بینش عمیق
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            سامانه شمارش هوشمند افراد
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            فضای خود را با داده‌های دقیق و تحلیل‌های قدرتمند مبتنی بر هوش مصنوعی بهینه‌سازی کنید.
          </p>
          <Link href="#dashboard" className="mt-10 inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
            مشاهده داشبورد زنده
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

      {/* Live Dashboard Section */}
      <section id="dashboard" className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
          >
            <h2 className="text-4xl font-bold text-center mb-4">داشبورد تحلیل آنی</h2>
            <p className="text-lg max-w-2xl mx-auto text-center text-muted-foreground mb-12">
              داده‌های فضای خود را به صورت زنده مشاهده و تحلیل کنید.
            </p>
          </motion.div>
          <div className="bg-card border border-border rounded-3xl p-4 md:p-8 shadow-2xl">
            <motion.div 
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportSettings}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            >
              <StatCard icon={<Users size={32} />} label="تعداد افراد حاضر" value={137} unit="نفر" />
              <StatCard icon={<BarChartBig size={32} />} label="اوج ترافیک امروز" value="15:30" unit="ساعت" />
              <StatCard icon={<Calendar size={32} />} label="پرترددترین روز" value="پنجشنبه" unit="هفته" />
              <StatCard icon={<Cpu size={32} />} label="دقت شمارش" value={98.7} unit="%" />
            </motion.div>
            <motion.div 
              variants={fadeIn}
              initial="initial"
              whileInView="whileInView"
              viewport={viewportSettings}
            >
              <LiveTrafficChart />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted text-foreground">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
          >
            <h2 className="text-4xl font-bold mb-8">طراحی شده برای عملکرد و امنیت</h2>
            <div className="space-y-8">
              <Feature 
                icon={<Cpu size={28} />} 
                title="هوش مصنوعی پیشرفته" 
                description="استفاده از آخرین مدل‌های یادگیری عمیق برای تشخیص و شمارش دقیق افراد در شرایط نوری و تراکمی مختلف."
              />
              <Feature 
                icon={<Lock size={28} />} 
                title="حفظ کامل حریم خصوصی" 
                description="سیستم به صورت آنی داده‌ها را پردازش کرده و هیچ‌گونه تصویر یا اطلاعات هویتی از افراد ذخیره نمی‌کند."
              />
              <Feature 
                icon={<BarChartBig size={28} />} 
                title="گزارش‌دهی جامع" 
                description="دسترسی به گزارش‌های تحلیلی، نمودارهای حرارتی (Heatmaps) و الگوهای رفتاری برای تصمیم‌گیری هوشمندانه."
              />
            </div>
          </motion.div>
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="relative h-96"
          >
            <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center p-8 border border-border">
              {/* Using next/image to fix the warning */}
              <Image 
                src="/images/ai-processing.svg" 
                alt="AI Processing" 
                width={400} 
                height={300} 
                className="w-2/3 h-auto animate-subtle-bob" 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="text-4xl font-bold text-center mb-12"
          >
            کاربردها در صنایع مختلف
          </motion.h2>
          <motion.div 
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <UseCaseCard icon={<ShoppingCart size={40} />} title="مراکز خرید و خرده‌فروشی" description="تحلیل رفتار مشتری، بهینه‌سازی چیدمان و مدیریت صف‌ها." />
            <UseCaseCard icon={<Plane size={40} />} title="فرودگاه‌ها و ترمینال‌ها" description="مدیریت جریان مسافران، تخصیص منابع و افزایش امنیت." />
            <UseCaseCard icon={<Calendar size={40} />} title="رویدادها و نمایشگاه‌ها" description="کنترل ظرفیت، مدیریت ایمنی و ارزیابی موفقیت رویداد." />
          </motion.div>
        </div>
      </section>
      

            {/* NEW: Interactive Pricing Section */}
      <section id="pricing" className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="text-4xl font-bold text-center mb-4">پلن‌های منعطف برای نیازهای شما</h2>
            <p className="text-lg max-w-2xl mx-auto text-center text-muted-foreground mb-12">
              از یک دستگاه ساده تا یک راهکار جامع سازمانی، ما پلن مناسب شما را داریم.
            </p>
            <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
          </motion.div>
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
            {pricingPlans.map((plan, index) => (
              <PricingCard
                key={plan.planName}
                planName={plan.planName}
                price={plan.pricing[billingCycle].price}
                priceDescription={plan.pricing[billingCycle].description}
                features={plan.features}
                isFeatured={plan.isFeatured}
                ctaText={plan.ctaText}
                ctaLink={plan.ctaLink}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings}
          >
            <h2 className="text-4xl font-bold mb-4">کسب و کار خود را هوشمند کنید</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">
              برای دریافت مشاوره تخصصی و مشاهده دموی زنده سامانه، با ما تماس بگیرید.
            </p>
            <Link href="/contact" className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              درخواست دمو
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

export default PeopleCountingPage;