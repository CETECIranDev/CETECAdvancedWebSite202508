import React from 'react';
import { GetStaticProps } from 'next/get-static-props';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { Users, BarChartBig, Cpu, Lock, ShoppingCart, Plane, Calendar } from 'lucide-react';
import LiveTrafficChart from '../../components/charts/LiveTrafficChart';
import Link from 'next/link';
import StatCounter from '../../components/StatCounter';

// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const staggerContainer = {
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Reusable components for this page with corrected color classes
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

// Main Page Component
const PeopleCountingPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-slate-100 dark:from-blue-950 dark:via-indigo-950 dark:to-slate-950 -z-10"></div>
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen -z-10">
          <source src="/videos/people-flow.mp4" type="video/mp4" />
        </video>
        
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}>
          <div className="inline-block bg-secondary/20 border border-secondary text-secondary rounded-full px-4 py-1 mb-6 text-sm font-medium">
            دقت بی‌نظیر، بینش عمیق
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight text-foreground">
            سامانه شمارش هوشمند افراد
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground">
            فضای خود را با داده‌های دقیق و تحلیل‌های قدرتمند مبتنی بر هوش مصنوعی بهینه‌سازی کنید.
          </p>
          <Link href="#dashboard" className="mt-10 inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
            مشاهده داشبورد زنده
          </Link>
        </motion.div>
      </section>

      {/* Live Dashboard Section */}
      <section id="dashboard" className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold text-center mb-4">داشبورد تحلیل آنی</h2>
            <p className="text-lg max-w-2xl mx-auto text-center text-muted-foreground mb-12">
              داده‌های فضای خود را به صورت زنده مشاهده و تحلیل کنید.
            </p>
          </motion.div>
          <div className="bg-card border border-border rounded-3xl p-4 md:p-8 shadow-2xl">
            <motion.div {...staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard icon={<Users size={32} />} label="تعداد افراد حاضر" value={137} unit="نفر" />
              <StatCard icon={<BarChartBig size={32} />} label="اوج ترافیک امروز" value="15:30" unit="ساعت" />
              <StatCard icon={<Calendar size={32} />} label="پرترددترین روز" value="پنجشنبه" unit="هفته" />
              <StatCard icon={<Cpu size={32} />} label="دقت شمارش" value={98.7} unit="%" />
            </motion.div>
            <motion.div {...fadeIn}>
              <LiveTrafficChart />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted text-foreground">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...staggerContainer}>
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
          <motion.div {...fadeIn} className="relative h-96">
            <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center p-8 border border-border">
              <img src="/images/ai-processing.svg" alt="AI Processing" className="w-2/3 animate-subtle-bob" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-24 bg-background text-foreground">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">کاربردها در صنایع مختلف</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <UseCaseCard icon={<ShoppingCart size={40} />} title="مراکز خرید و خرده‌فروشی" description="تحلیل رفتار مشتری، بهینه‌سازی چیدمان و مدیریت صف‌ها." />
            <UseCaseCard icon={<Plane size={40} />} title="فرودگاه‌ها و ترمینال‌ها" description="مدیریت جریان مسافران، تخصیص منابع و افزایش امنیت." />
            <UseCaseCard icon={<Calendar size={40} />} title="رویدادها و نمایشگاه‌ها" description="کنترل ظرفیت، مدیریت ایمنی و ارزیابی موفقیت رویداد." />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <motion.div {...fadeIn}>
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