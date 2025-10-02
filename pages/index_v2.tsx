import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
// We need to import the icons type for our Product interface
import * as Icons from 'lucide-react';
import AIPlayground from '../components/AIPlayground'; // <-- کامپوننت جدید را import کنید
import HeroAurora from '../components/HeroAurora';
import DashboardShowcase from '@/components/DashboardShowcaseFullWidth';
import NeuralNetworkCanvas from '@/components/NeuralNetworkCanvas';
import PartnerNetwork from "@/components/PartnerNetwork";

// 1. Define the type for an icon name from lucide-react
type IconName = keyof typeof Icons;

// 2. Define a specific interface for a single product
interface Product {
  title: string;
  description: string;
  icon: IconName;
  link: string;
}

// Define types for animation props
const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5,
};

// 3. Apply the 'Product[]' type to our products array
const products: Product[] = [
  { 
    title: "سامانه شمارش هوشمند افراد",
    description: "تحلیل دقیق و آنی جریان جمعیت با هوش مصنوعی.",
    icon: "Users",
    link: "/products/people-counting-system"
  },
  { 
    title: "تردد شمار جاده‌ای",
    description: "داده‌های دقیق ترافیکی با تکنولوژی لوپ‌های القایی.",
    icon: "Route",
    link: "/products/road-traffic-counter"
  },
  { 
    title: "پهپاد هوشمند عمود پرواز",
    description: "نظارت، بازرسی و نقشه‌برداری هوایی با دقت بی‌نظیر.",
    icon: "Rocket",
    link: "/products/smart-vtol-drone"
  },
  { 
    title: "دیتا لاگرهای صنعتی",
    description: "جمع‌آوری و ثبت داده‌های حیاتی با دقت و اطمینان بالا.",
    icon: "Database",
    link: "/products/industrial-dataloggers"
  },
  { 
    title: "مدیریت جامع انرژی و IoT",
    description: "بهینه‌سازی مصرف انرژی و کنترل هوشمند دستگاه‌ها.",
    icon: "BrainCircuit",
    link: "/products" // Link to general products page for now
  }
  ,
  { 
    title: "سامانه واسط مغز و رایانه ",
    description: "با بهره گیری از یادگیری عمیق برخط و پردازش سیگنال مغزی می توان دنیا را هدایت کرد",
    icon: "BrainCircuit",
    link: "/products" // Link to general products page for now
  }

];

const Home = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* 
        ==========================================================
         NEW HERO SECTION WITH NEURAL NETWORK CANVAS
        ==========================================================
      */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        
        {/* The canvas handles its own background */}
        <NeuralNetworkCanvas />

        {/* This gradient makes the text more readable at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background -z-10"></div>
        <HeroAurora />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <div 
            className="inline-block bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 text-sm"
          >
            <span className="text-primary font-semibold">نوآوری در هسته</span> | آینده را امروز بسازید
          </div>
          <h1 
            className="text-5xl md:text-7xl font-extrabold mb-6" 
            style={{ textShadow: '0 2px 15px hsl(var(--background))' }} // Shadow with background color for glow effect
          >
            مهندسی آینده هوشمند
          </h1>
          <p 
            className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-10"
            style={{ textShadow: '0 1px 8px hsl(var(--background))' }}
          >
            ما راهکارهای پیشرفته هوش مصنوعی، اینترنت اشیا و پهپادی را برای حل پیچیده‌ترین چالش‌های جهان ارائه می‌دهیم.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products" 
              className="group flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              اکتشاف محصولات <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-card/50 backdrop-blur-sm hover:bg-muted font-bold px-8 py-4 rounded-full transition-colors shadow-lg border border-border"
            >
              تماس با ما
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10"
        >
          <ChevronDown size={32} className="text-muted-foreground" />
        </motion.div>
      </section>

        {/* Dashboard Showcase Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div /* ... */ >
            <h2 className="text-4xl font-bold mb-4">داشبورد یکپارچه هوشمند</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground mb-16">
              تمام داده‌های سخت‌افزاری شما در یک پلتفرم نرم‌افزاری قدرتمند و زیبا. با حرکت موس، داشبورد را در فضای سه‌بعدی بچرخانید.
            </p>
          </motion.div>
          <DashboardShowcase /> {/* Renders the new, more complex dashboard */}
        </div>
      </section>
      
      {/* Products Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            <Cpu size={48} className="mx-auto text-primary" />
            <h2 className="text-4xl font-bold mt-4 mb-6">فناوری‌های تحول‌آفرین</h2>
            <p className="text-lg max-w-2xl mx-auto text-muted-foreground">
              از شمارش هوشمند جمعیت تا مدیریت انرژی با IoT، محصولات ما برای افزایش بهره‌وری و پایداری طراحی شده‌اند.
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
               <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Now TypeScript knows 'product' is of type 'Product' and not undefined */}
                <ProductCard 
                  title={product.title}
                  description={product.description}
                  icon={product.icon}
                  link={product.link}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
        {/* NEW: Connected Partner Hub Section */}

        <section className="py-24 bg-muted">
            <div className="container mx-auto px-6 text-center">
                <motion.h3 /* ... */ >اکوسیستم همکاران ما</motion.h3>
                <motion.p /* ... */ >ما با برترین سازمان‌ها و صنایع همکاری می‌کنیم تا راهکارهای یکپارچه و قدرتمندی خلق کنیم.</motion.p>
                <PartnerNetwork />
            </div>
        </section>
            {/* NEW: Interactive AI Playground Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold mb-4">فناوری ما را در عمل ببینید</h2>
            <p className="text-lg max-w-3xl mx-auto text-muted-foreground mb-12">
              این یک دموی زنده و شبیه‌سازی شده از قدرت پردازش تصویر ماست. با فیلترها بازی کنید و ببینید سیستم ما چگونه اشیاء را به صورت آنی دسته‌بندی می‌کند.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <AIPlayground />
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

export default Home;