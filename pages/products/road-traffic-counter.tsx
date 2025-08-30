// pages/products/road-traffic-counter.tsx
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { BarChart, Car, Truck, Zap, CloudRain, Sun, Snowflake, Download } from 'lucide-react';
import Link from 'next/link';
import StatCounter from '../../components/StatCounter';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import AnimatedRoad from '../../components/animations/AnimatedRoad'; // <-- کامپوننت جدید را import کنید

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: 'easeOut' },
};

const pieData = [
  { name: 'خودرو سواری', value: 65 },
  { name: 'کامیون', value: 25 },
  { name: 'اتوبوس و سایر', value: 10 },
];
const COLORS = ['#60A5FA', '#34D399', '#FBBF24']; // primary-dark, secondary-dark, yellow-400

const RoadTrafficCounterPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background-dark text-text-dark">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center text-white p-6 overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover -z-10 opacity-30">
          <source src="/videos/highway-traffic.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent -z-10"></div>

        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 0.2 }}>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            دقت در حرکت، هوشمندی در مدیریت
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4 text-subtle-dark font-light">
            سامانه تردد شمار جاده‌ای با لوپ القایی: زیربنای تصمیم‌گیری‌های هوشمند در حمل و نقل.
          </p>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-card-dark">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <StatCounter to={99.8} duration={2.5} prefix="" suffix="%" className="text-6xl font-bold text-primary-dark" />
              <p className="mt-2 text-lg text-subtle-dark">درصد دقت شمارش</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <StatCounter to={15} duration={2} prefix="" suffix="+ سال" className="text-6xl font-bold text-primary-dark" />
              <p className="mt-2 text-lg text-subtle-dark">عمر مفید لوپ‌های القایی</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={{ once: true }}>
              <StatCounter to={24} duration={1.5} suffix="/7" className="text-6xl font-bold text-primary-dark" />
              <p className="mt-2 text-lg text-subtle-dark">عملکرد بدون وقفه</p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            {/* ستون چپ: انیمیشن جدید */}
            <motion.div {...fadeIn} className="relative h-96 rounded-2xl border border-border">
            <AnimatedRoad />
            </motion.div>
            
            {/* ستون راست: متن توضیحات (بدون تغییر) */}
            <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold mb-6">تکنولوژی در دل آسفالت</h2>
            <p className="text-lg text-muted-foreground space-y-4">
                <span>لوپ‌های القایی، حلقه‌هایی از سیم مسی هستند که در زیر سطح جاده نصب می‌شوند. با عبور یک وسیله نقلیه فلزی از روی لوپ، میدان مغناطیسی آن تغییر می‌کند.</span>
                <span>این تغییر توسط دیتالاگر پیشرفته ما تشخیص داده شده و به یک سیگنال دیجیتال تبدیل می‌شود. سیستم ما قادر است بر اساس پروفایل سیگنال، نوع خودرو، سرعت و جهت حرکت را با دقت فوق‌العاده‌ای ثبت کند.</span>
            </p>
            </motion.div>
        </div>
        </section>

      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn} className="relative h-80 rounded-2xl bg-card-dark p-8 flex items-center justify-center border border-border-dark">
             {/* Placeholder for an animation showing the loop working */}
             <img src="/images/inductive-loop.svg" alt="Inductive Loop Animation" className="w-full" />
          </motion.div>
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold mb-6">تکنولوژی در دل آسفالت</h2>
            <p className="text-lg text-subtle-dark space-y-4">
              <span>لوپ‌های القایی، حلقه‌هایی از سیم مسی هستند که در زیر سطح جاده نصب می‌شوند. با عبور یک وسیله نقلیه فلزی از روی لوپ، میدان مغناطیسی آن تغییر می‌کند.</span>
              <span>این تغییر توسط دیتالاگر پیشرفته ما تشخیص داده شده و به یک سیگنال دیجیتال تبدیل می‌شود. سیستم ما قادر است بر اساس پروفایل سیگنال، نوع خودرو، سرعت و جهت حرکت را با دقت فوق‌العاده‌ای ثبت کند.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Built for Durability Section */}
      <section className="py-24 bg-card-dark">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 {...fadeIn} className="text-4xl font-bold mb-12">مقاوم برای هر شرایطی</motion.h2>
          <div className="flex justify-center items-center gap-8 md:gap-16">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="flex flex-col items-center gap-2 text-subtle-dark">
              <Sun size={48} />
              <span>گرمای شدید</span>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="flex flex-col items-center gap-2 text-subtle-dark">
              <CloudRain size={48} />
              <span>باران سیل‌آسا</span>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" className="flex flex-col items-center gap-2 text-subtle-dark">
              <Snowflake size={48} />
              <span>یخبندان</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data & Analytics Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeIn} className="text-4xl font-bold text-center mb-12">از داده خام تا بینش استراتژیک</motion.h2>
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <motion.div {...fadeIn} className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">طبقه‌بندی خودروها</h3>
              <p className="text-subtle-dark mb-6">سیستم ما به طور خودکار وسایل نقلیه را در دسته‌بندی‌های مختلف (سواری، وانت، کامیون، اتوبوس) قرار می‌دهد تا تحلیل دقیقی از ترکیب ترافیک ارائه دهد.</p>
              <div className="h-80 w-full text-sm">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
            <motion.div {...fadeIn} className="lg:col-span-3 bg-card-dark p-8 rounded-2xl border border-border-dark">
              <h3 className="text-2xl font-bold mb-4">گزارش‌های جامع</h3>
              <p className="text-subtle-dark mb-6">داشبورد تحلیلی ما گزارش‌های ساعتی، روزانه و سالانه از حجم ترافیک، سرعت متوسط و موارد دیگر را برای برنامه‌ریزی‌های کلان در اختیار شما قرار می‌دهد.</p>
              <BarChart size={150} className="mx-auto text-primary-dark" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center">
        <div className="container mx-auto px-6">
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold mb-4">آماده‌اید تا زیرساخت‌های خود را هوشمند کنید؟</h2>
            <p className="text-lg max-w-2xl mx-auto text-subtle-dark mb-8">
              با کارشناسان ما صحبت کنید و یک گزارش نمونه از داده‌های ترافیکی دریافت نمایید.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 bg-primary-dark hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              دریافت گزارش نمونه <Download className="group-hover:translate-y-0.5 transition-transform" />
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

export default RoadTrafficCounterPage;