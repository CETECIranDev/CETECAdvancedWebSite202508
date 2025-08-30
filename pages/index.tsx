import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// 'useTranslation' is removed as it's not used
import { motion, Variants, Transition } from 'framer-motion'; // Import 'Transition' type
import Link from 'next/link';
import { ArrowRight, Cpu, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import FloatingShapes from '../components/FloatingShapes';

// Define types for animation props
const pageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -10 },
};

// This is where the fix is applied
const pageTransition: Transition = {
  type: 'tween',
  ease: 'easeInOut', // Use a valid easing function
  duration: 0.5,
};

// The list of all products
const products = [
  { 
    title: "سامانه شمارش هوشمند افراد",
    description: "تحلیل دقیق و آنی جریان جمعیت با هوش مصنوعی.",
    icon: "Users" as const,
    link: "/products/people-counting-system"
  },
  { 
    title: "تردد شمار جاده‌ای",
    description: "داده‌های دقیق ترافیکی با تکنولوژی لوپ‌های القایی.",
    icon: "Route" as const,
    link: "/products/road-traffic-counter"
  },
  { 
    title: "پهپاد هوشمند عمود پرواز",
    description: "نظارت، بازرسی و نقشه‌برداری هوایی با دقت بی‌نظیر.",
    icon: "Rocket" as const,
    link: "/products/smart-vtol-drone"
  },
  { 
    title: "دیتا لاگرهای صنعتی",
    description: "جمع‌آوری و ثبت داده‌های حیاتی با دقت و اطمینان بالا.",
    icon: "Database" as const,
    link: "/products" // Link to general products page for now
  },
  { 
    title: "مدیریت جامع انرژی و IoT",
    description: "بهینه‌سازی مصرف انرژی و کنترل هوشمند دستگاه‌ها.",
    icon: "BrainCircuit" as const,
    link: "/products" // Link to general products page for now
  }
];

const Home = () => {
  // const { t } = useTranslation('common'); // This was unused and is now removed.

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition} // Now uses the correctly typed object
    >
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-hero-grid-light dark:bg-hero-grid-dark opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background"></div>
        <FloatingShapes /> 

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="z-10"
        >
          <div className="inline-block bg-card border border-border rounded-full px-4 py-2 mb-6 text-sm">
            <span className="text-primary font-semibold">نوآوری در هسته</span> | آینده را امروز بسازید
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            مهندسی آینده هوشمند
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-10">
            ما راهکارهای پیشرفته هوش مصنوعی، اینترنت اشیا و پهپادی را برای حل پیچیده‌ترین چالش‌های جهان ارائه می‌دهیم.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products" 
              className="group flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg"
            >
              اکتشاف محصولات <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-card hover:bg-muted font-bold px-8 py-4 rounded-full transition-colors shadow-lg border border-border"
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
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default Home;