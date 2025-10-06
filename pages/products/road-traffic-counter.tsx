import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Import 'Variants' and 'ViewportOptions' for correct typing
import { motion, Variants, ViewportOptions } from 'framer-motion';
// Unused imports are removed
import { BarChart, CloudRain, Sun, Snowflake, Download, ChevronDown  } from 'lucide-react';
import Link from 'next/link';
import StatCounter from '../../components/StatCounter';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import AnimatedRoad from '../../components/animations/AnimatedRoad'; // Assuming AnimatedRoad is created
import Image from 'next/image'; // Import Next.js Image component
import Head from 'next/head';

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

const pieData = [
  { name: 'خودرو سواری', value: 65 },
  { name: 'کامیون', value: 25 },
  { name: 'اتوبوس و سایر', value: 10 },
];
const COLORS = ['#60A5FA', '#34D399', '#FBBF24'];

const RoadTrafficCounterPage = () => {

    return (
        <>
        <Head>
            <title>تردد شمار جاده‌ای با لوپ القایی | شمارش دقیق خودرو | CETEC</title>
            <meta
                name="description"
                content="سامانه تردد شمار جاده‌ای CETEC با استفاده از لوپ‌های القایی، داده‌های دقیق و قابل اعتمادی از حجم ترافیک، سرعت و طبقه‌بندی خودروها ارائه می‌دهد."
            />
            <meta name="keywords" content="تردد شمار جاده ای, لوپ القایی, شمارشگر خودرو, مدیریت ترافیک, حمل و نقل هوشمند, CETEC" />

            {/* JSON-LD for Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": "سامانه تردد شمار جاده‌ای با لوپ القایی",
                        "image": "https://yourdomain.com/images/road-traffic-hero.jpg", // آدرس کامل تصویر اصلی محصول
                        "description": "سیستم قابل اطمینان برای جمع‌آوری داده‌های ترافیکی دقیق در جاده‌ها و بزرگراه‌ها.",
                        "brand": {
                            "@type": "Brand",
                            "name": "CETEC"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://yourdomain.com/products/road-traffic-counter",
                            "priceCurrency": "IRR",
                            "price": "0",
                            "availability": "https://schema.org/InStock"
                        }
                    }) }}
            />
        </Head>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background text-foreground">
      {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center text-center p-6 overflow-hidden">
        
        {/* 1. Video Background Layer */}
        <video 
          key="road-traffic-video"
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="/videos/highway-traffic-night.mp4" type="video/mp4" />
        </video>

        {/* 2. Darkening Overlay & Gradient Layer */}
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>

        {/* 3. Content Layer */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1, ease: 'easeOut' }}
          className="z-20 text-white"
        >
          <div className="inline-block bg-primary/20 border border-primary text-primary rounded-full px-4 py-1 mb-6 text-sm font-medium">
            دقت، اطمینان، پایداری
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            دقت در حرکت، هوشمندی در مدیریت
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>
            سامانه تردد شمار جاده‌ای با لوپ القایی: زیربنای تصمیم‌گیری‌های هوشمند در حمل و نقل.
          </p>
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

      {/* Stats Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
              <StatCounter to={99.8} duration={2.5} prefix="" suffix="%" className="text-6xl font-bold text-primary" />
              <p className="mt-2 text-lg text-muted-foreground">درصد دقت شمارش</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
              <StatCounter to={15} duration={2} prefix="" suffix="+ سال" className="text-6xl font-bold text-primary" />
              <p className="mt-2 text-lg text-muted-foreground">عمر مفید لوپ‌های القایی</p>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
              <StatCounter to={24} duration={1.5} suffix="/7" className="text-6xl font-bold text-primary" />
              <p className="mt-2 text-lg text-muted-foreground">عملکرد بدون وقفه</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="relative h-96 rounded-2xl border border-border">
             <AnimatedRoad />
          </motion.div>
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
            <h2 className="text-4xl font-bold mb-6">تکنولوژی در دل آسفالت</h2>
            <p className="text-lg text-muted-foreground space-y-4">
              <span>لوپ‌های القایی، حلقه‌هایی از سیم مسی هستند که در زیر سطح جاده نصب می‌شوند. با عبور یک وسیله نقلیه فلزی از روی لوپ، میدان مغناطیسی آن تغییر می‌کند.</span>
              <span>این تغییر توسط دیتالاگر پیشرفته ما تشخیص داده شده و به یک سیگنال دیجیتال تبدیل می‌شود. سیستم ما قادر است بر اساس پروفایل سیگنال، نوع خودرو، سرعت و جهت حرکت را با دقت فوق‌العاده‌ای ثبت کند.</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Built for Durability Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6 text-center">
          <motion.h2 variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="text-4xl font-bold mb-12">مقاوم برای هر شرایطی</motion.h2>
          <div className="flex justify-center items-center gap-8 md:gap-16">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="flex flex-col items-center gap-2 text-muted-foreground">
              <Sun size={48} />
              <span>گرمای شدید</span>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="flex flex-col items-center gap-2 text-muted-foreground">
              <CloudRain size={48} />
              <span>باران سیل‌آسا</span>
            </motion.div>
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="flex flex-col items-center gap-2 text-muted-foreground">
              <Snowflake size={48} />
              <span>یخبندان</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Data & Analytics Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="text-4xl font-bold text-center mb-12">از داده خام تا بینش استراتژیک</motion.h2>
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="lg:col-span-2">
              <h3 className="text-2xl font-bold mb-4">طبقه‌بندی خودروها</h3>
              <p className="text-muted-foreground mb-6">سیستم ما به طور خودکار وسایل نقلیه را در دسته‌بندی‌های مختلف (سواری، وانت، کامیون، اتوبوس) قرار می‌دهد تا تحلیل دقیقی از ترکیب ترافیک ارائه دهد.</p>
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
            <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="lg:col-span-3 bg-card p-8 rounded-2xl border border-border">
              <h3 className="text-2xl font-bold mb-4">گزارش‌های جامع</h3>
              <p className="text-muted-foreground mb-6">داشبورد تحلیلی ما گزارش‌های ساعتی، روزانه و سالانه از حجم ترافیک، سرعت متوسط و موارد دیگر را برای برنامه‌ریزی‌های کلان در اختیار شما قرار می‌دهد.</p>
              {/* Using next/image to fix the warning */}
              <div className="relative w-full h-48">
                <Image src="/images/report-analytics.svg" layout="fill" objectFit="contain" alt="Report Analytics" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 text-center bg-muted">
        <div className="container mx-auto px-6">
          <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
            <h2 className="text-4xl font-bold mb-4">آماده‌اید تا زیرساخت‌های خود را هوشمند کنید؟</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">
              با کارشناسان ما صحبت کنید و یک گزارش نمونه از داده‌های ترافیکی دریافت نمایید.
            </p>
            <Link href="/contact" className="group inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
              دریافت گزارش نمونه <Download className="group-hover:translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
        </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default RoadTrafficCounterPage;