// pages/services.tsx (New and Improved)
import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import InteractiveServices from '../components/InteractiveServices';
import Link from 'next/link';

const ServicesPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-background-dark text-text-dark">
      {/* Intro Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            توانمندی‌های ما، راهکارهای شما
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4 text-subtle-dark font-light">
            با اسکرول، با مجموعه‌ای از خدمات تخصصی ما که برای توانمندسازی کسب‌وکار شما طراحی شده‌اند، آشنا شوید.
          </p>
        </motion.div>
      </section>

      {/* Interactive Services Section */}
      <InteractiveServices />

      {/* Outro/CTA Section */}
      <section className="h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold mb-6">پروژه بعدی شما از اینجا شروع می‌شود.</h2>
          <p className="text-xl max-w-2xl mx-auto text-subtle-dark mb-10">
            آماده‌اید تا ایده‌های خود را به واقعیت تبدیل کنید؟ تیم ما برای همکاری با شما آماده است.
          </p>
          <Link href="/contact" className="inline-block bg-primary-dark hover:bg-blue-500 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-lg">
            شروع گفتگو
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common'])),
  },
});

export default ServicesPage;