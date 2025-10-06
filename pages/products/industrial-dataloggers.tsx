// pages/products/industrial-dataloggers.tsx
import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Zap, Thermometer , ChevronDown } from 'lucide-react';
import DataLoggerConfigurator, { DataLoggerConfig } from '../../components/DataLoggerConfigurator'; // Import the component and the type
import Image from 'next/image';
import LiveIranMap from '../../components/LiveIranMap'; // <-- کامپوننت جدید را import کنید
import Head from 'next/head';
// --- Presets for different applications ---
const presets: { [key: string]: DataLoggerConfig } = {
  shock: {
    model: 'pro',
    analogInputs: 8,
    digitalInputs: 2,
    relayOutputs: 0,
    connectivity: 'none',
    samplingRate: '1khz',
    memory: '128mb',
  },
  power: {
    model: 'pro',
    analogInputs: 4,
    digitalInputs: 8,
    relayOutputs: 4,
    connectivity: 'modbus',
    samplingRate: '100hz',
    memory: '64mb',
  },
  industrial: {
    model: 'base',
    analogInputs: 2,
    digitalInputs: 4,
    relayOutputs: 2,
    connectivity: 'modbus',
    samplingRate: '10hz',
    memory: '32mb',
  },
};

// Application Card Component
const AppCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; isActive: boolean }> = 
({ icon, title, description, onClick, isActive }) => (
  <motion.div
    onClick={onClick}
    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
      isActive ? 'border-primary bg-primary/10 shadow-lg' : 'border-border bg-card hover:border-primary/50'
    }`}
    whileHover={{ y: -5 }}
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-lg ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-foreground'}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-foreground">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  </motion.div>
);


const IndustrialDataLoggersPage = () => {
  const [selectedApp, setSelectedApp] = useState<string>('industrial');
  const [showConfigurator, setShowConfigurator] = useState(false);

  const handleAppSelection = (appKey: string) => {
    setSelectedApp(appKey);
    setShowConfigurator(true); // Show the configurator after selection
  };

  return (
      <>
          <Head>
              <title>دیتالاگر صنعتی | ثبت و مانیتورینگ دقیق داده‌ها | CETEC</title>
              <meta
                  name="description"
                  content="دیتالاگرهای صنعتی و قابل برنامه‌ریزی CETEC برای ثبت و مانیتورینگ دقیق دما، رطوبت، ولتاژ و سایر پارامترهای حیاتی. راهکار قابل اعتماد برای صنایع مختلف."
              />
              <meta name="keywords" content="دیتالاگر صنعتی, ثبت کننده داده, مانیتورینگ صنعتی, دیتا لاگر, تجهیزات ابزار دقیق, CETEC" />

              {/* JSON-LD for Rich Snippets */}
              <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify({
                          "@context": "https://schema.org/",
                          "@type": "Product",
                          "name": "دیتالاگرهای صنعتی قابل تنظیم",
                          "image": "https://yourdomain.com/images/industrial-datalogger-hero.jpg", // آدرس کامل تصویر اصلی محصول
                          "description": "راهکارهای ماژولار و قابل تنظیم برای ثبت و مانیتورینگ داده‌های صنعتی با دقت و اطمینان بالا.",
                          "brand": {
                              "@type": "Brand",
                              "name": "CETEC"
                          },
                          "offers": {
                              "@type": "Offer",
                              "url": "https://yourdomain.com/products/industrial-dataloggers",
                              "priceCurrency": "IRR",
                              "price": "0",
                              "availability": "https://schema.org/InStock"
                          }
                      }) }}
              />
          </Head>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero Section */}
        {/*
        ==========================================================
         NEW HERO SECTION WITH INTERACTIVE LEAFLET MAP
        ==========================================================
      */}
        <section className="relative h-screen flex flex-col items-center justify-center text-center p-6 overflow-hidden">
            <div className="absolute inset-0 z-10 w-full h-full">
                <LiveIranMap />
            </div>

            {/* Gradient overlay to make text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent z-20"></div>

            <div className="relative z-30 mt-auto mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground"
                    style={{ textShadow: '0 2px 10px hsl(var(--background))' }}
                >
                    پوشش سراسری، داده‌های مطمئن
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground"
                    style={{ textShadow: '0 1px 5px hsl(var(--background))' }}
                >
                    دیتالاگرهای صنعتی ما در سراسر کشور، در حال ثبت و ارسال داده‌های حیاتی برای صنایع پیشرو هستند.
                </motion.p>
            </div>
        </section>


      <section className="relative py-24 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src="/images/industrial-background.jpg" layout="fill" objectFit="cover" alt="Industrial Background" className="opacity-10" />
        </div>
        <div className="container mx-auto px-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground"
          >
            داده‌برداری دقیق، کنترل هوشمند
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground"
          >
            دیتالاگرهای صنعتی ما برای ثبت مطمئن داده‌ها در سخت‌ترین شرایط طراحی شده‌اند. کاربرد خود را انتخاب کرده و محصول خود را پیکربندی کنید.
          </motion.p>
        </div>
      </section>

      {/* Application Selection Section */}
      <section className="pb-24">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">با انتخاب کاربرد خود شروع کنید</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <AppCard
              icon={<SlidersHorizontal />}
              title="مانیتورینگ لرزش و شوک"
              description="ثبت داده‌های سریع از سنسورهای شتاب‌سنج"
              onClick={() => handleAppSelection('shock')}
              isActive={selectedApp === 'shock'}
            />
            <AppCard
              icon={<Zap />}
              title="شبکه قدرت و فشار قوی"
              description="لاگ جریان، ولتاژ و پارامترهای شبکه"
              onClick={() => handleAppSelection('power')}
              isActive={selectedApp === 'power'}
            />
            <AppCard
              icon={<Thermometer />}
              title="فرآیندهای صنعتی عمومی"
              description="مانیتورینگ دما، فشار و سیگنال‌های استاندارد"
              onClick={() => handleAppSelection('industrial')}
              isActive={selectedApp === 'industrial'}
            />
          </div>
        </div>
      </section>

      {/* Configurator Section */}
      {showConfigurator && (
        <motion.section 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="pb-24"
        >
          <div className="container mx-auto px-6">
            <DataLoggerConfigurator key={selectedApp} initialConfig={presets[selectedApp]} />
          </div>
        </motion.section>
      )}
    </motion.div>
          </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default IndustrialDataLoggersPage;