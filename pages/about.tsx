import React from 'react';
// Corrected import path for GetStaticProps
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion, Variants, ViewportOptions } from 'framer-motion';
import { Target, Eye, Lightbulb, Users, Handshake, Link as LinkIcon } from 'lucide-react';
import Timeline from '../components/Timeline';
import ContactForms from '../components/ContactForms';
import FloatingShapes from '../components/FloatingShapes';
// The unused 'Link' import is removed.

// 1. Define the viewport options with the correct type
const viewportSettings: ViewportOptions = { once: true, amount: 0.3 };

// 2. Define animation variants with the correct type. 'viewport' is a prop, not a variant.
const fadeIn: Variants = {
  initial: { opacity: 0, y: 30 },
  whileInView: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.7, 
      ease: [0.22, 1, 0.36, 1] // Using a valid cubic-bezier
    } 
  },
};

// Reusable ValueCard component for this page
const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <motion.div 
    variants={fadeIn} 
    initial="initial"
    whileInView="whileInView"
    viewport={viewportSettings} // 3. Apply the correctly typed viewport prop
    className="bg-card p-8 rounded-2xl border border-border text-center flex flex-col items-center"
  >
    <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">{icon}</div>
    <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground flex-grow">{description}</p>
  </motion.div>
);

const AboutPage = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="bg-background text-foreground"
    >
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center text-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/20 via-slate-900/20 to-background -z-10 dark:from-indigo-950 dark:via-slate-900 dark:to-background"></div>
        <FloatingShapes />
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }} 
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground">
            ما آینده را مهندسی می‌کنیم
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4 text-muted-foreground font-light">
            داستان ما، داستان اشتیاق به نوآوری و تعهد به ساختن دنیایی هوشمندتر و پایدارتر است.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
          <motion.div 
            variants={fadeIn} 
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
            className="bg-card border border-border p-10 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <Target size={32} className="text-primary" />
              <h2 className="text-3xl font-bold text-card-foreground">ماموریت ما</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              توسعه و ارائه راهکارهای یکپارچه و هوشمند مبتنی بر IoT و AI برای افزایش بهره‌وری، ایمنی و پایداری در صنایع کلیدی کشور.
            </p>
          </motion.div>
          <motion.div 
            variants={fadeIn} 
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
            className="bg-card border border-border p-10 rounded-3xl"
          >
            <div className="flex items-center gap-4 mb-4">
              <Eye size={32} className="text-secondary" />
              <h2 className="text-3xl font-bold text-card-foreground">چشم‌انداز ما</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              تبدیل شدن به رهبر منطقه‌ای در ارائه فناوری‌های هوشمند و سبز، و ایجاد تاثیری مثبت و ماندگار بر جامعه و محیط زیست.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn} 
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
            className="text-4xl font-bold text-center mb-16 text-foreground"
          >
            مسیر توسعه ما
          </motion.h2>
          <Timeline />
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn} 
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
            className="text-4xl font-bold text-center mb-16 text-foreground"
          >
            ارزش‌های بنیادین ما
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard icon={<Lightbulb size={32} />} title="نوآوری بی‌پایان" description="ما همواره در جستجوی راه‌های جدید و بهتر برای حل مسائل هستیم." />
            <ValueCard icon={<Users size={32} />} title="تیم متخصص" description="قدرت ما در تخصص، همکاری و اشتیاق مشترک تیم‌مان نهفته است." />
            <ValueCard icon={<Handshake size={32} />} title="تعهد به مشتری" description="موفقیت مشتریان، موفقیت ماست. ما شریک قابل اعتماد آنها هستیم." />
            <ValueCard icon={<LinkIcon size={32} />} title="یکپارچگی و شفافیت" description="صداقت و شفافیت در تمام تعاملات ما، از اصول خدشه‌ناپذیر ماست." />
          </div>
        </div>
      </section>

      {/* Contact & Collaboration Section */}
      <section id="collaboration-form" className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            variants={fadeIn} 
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
            className="text-4xl font-bold text-center mb-16 text-foreground"
          >
            به ما بپیوندید یا با ما در ارتباط باشید
          </motion.h2>
          <motion.div 
            variants={fadeIn}
            initial="initial"
            whileInView="whileInView"
            viewport={viewportSettings} // Apply the prop
          >
            <ContactForms />
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

export default AboutPage;