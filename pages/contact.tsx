import React from 'react';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { motion } from 'framer-motion';
import { MapPin, Mail, Phone } from 'lucide-react';
import ContactCard from '../components/ContactCard';
import ContactForms from '../components/ContactForms';
import Head from 'next/head';

const ContactPage = () => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@cetecelectronic.com');
    alert('ایمیل با موفقیت کپی شد!'); // You can replace this with a more elegant toast notification
  };

  return (

      <>
          <Head>
              <title>CETEC | قطب دانش و فناوری‌های مدرن - هوش مصنوعی و الکترونیک</title>
              <meta
                  name="description"
                  content="شرکت CETEC، پیشرو در طراحی و تولید سامانه‌های هوشمند مبتنی بر هوش مصنوعی، اینترنت اشیا (IoT) و الکترونیک پیشرفته. راهکارهای نوآورانه برای آینده‌ای هوشمند."
              />
              <meta name="keywords" content="هوش مصنوعی, اینترنت اشیا, الکترونیک, پهپاد هوشمند, دیتالاگر صنعتی, CETEC, قطب دانش و فناوری" />
        </Head>
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {/* Hero Section */}
      <section className="py-24 text-center bg-muted">
        <div className="container mx-auto px-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-4 text-foreground"
          >
            بیایید صحبت کنیم
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-muted-foreground"
          >
            ما همیشه برای شنیدن ایده‌ها، پاسخ به سوالات و شروع همکاری‌های جدید آماده‌ایم.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <ContactCard
              icon={<MapPin size={32} />}
              title="آدرس دفتر مرکزی"
              content="تهران، خیابان آزادی، دانشگاه صنعتی شریف، مرکز خدمات فناوری"
              actionText="نمایش روی نقشه"
              onActionClick={() => window.open('https://goo.gl/maps/YOUR_MAP_LINK_HERE', '_blank')}
              delay={0}
            />
            <ContactCard
              icon={<Mail size={32} />}
              title="ایمیل"
              content="CETECIran@gmail.com"
              actionText="کپی کردن ایمیل"
              onActionClick={handleCopyEmail}
              delay={0.1}
            />
            <ContactCard
              icon={<Phone size={32} />}
              title="تلفن تماس دفتر رشت."
              content="013 - 33328474 , 09190648842"
              actionText="تماس بگیرید"
              onActionClick={() => window.location.href = 'tel:+989190648842'}
              delay={0.2}
            />
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="h-[500px] w-full bg-muted">
        {/* Replace with an interactive map like Google Maps or Mapbox */}
        {/* For a lightweight solution, you can use an iframe from Google Maps */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.522818260654!2d51.35246761525968!3d35.71329388018698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00c3b8f1b9a9%3A0x948275493b8a1f6a!2sSharif%20University%20of%20Technology!5e0!3m2!1sen!2s!4v1670000000000"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale invert-[90%] contrast-[1.2]" // Modern dark-mode style for the map
        ></iframe>
      </section>

      {/* Form Section */}
      <section id="contact-form" className="py-24 bg-muted">
        <div className="container mx-auto px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-foreground"
          >
            پیام خود را بگذارید
          </motion.h2>
          <ContactForms />
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

export default ContactPage;