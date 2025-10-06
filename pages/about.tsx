import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion, Variants, ViewportOptions } from 'framer-motion';
import { Target, Eye, Lightbulb, Users, Handshake, Link as LinkIcon } from 'lucide-react';
import Timeline from '../components/Timeline';
import ContactForms from '../components/ContactForms';
import FloatingShapes from '../components/FloatingShapes';
import Head from "next/head";


const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CETEC | قطب دانش و فناوری‌های مدرن",
    "alternateName": "Center of Excellence in Technologies",
    "url": "https://cetec.ir/",
    "logo": "https://cetec.ir/logo.png", // URL لوگوی شما
    "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+98-13-33328474",
        "contactType": "customer service"
    },
    "sameAs": [ // لینک شبکه‌های اجتماعی
        "https://www.linkedin.com/company/your-company",
    ]
};

// --- Animation Variants with Correct Types ---
const viewportSettings: ViewportOptions = { once: true, amount: 0.3 };

const fadeIn: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1] // Valid ease value
        }
    },
};

// --- Reusable ValueCard Component ---
const ValueCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <motion.div
        variants={fadeIn}
        initial="initial"
        whileInView="whileInView"
        viewport={viewportSettings}
        className="bg-card p-8 rounded-2xl border border-border text-center flex flex-col items-center"
    >
        <div className="bg-primary/10 text-primary p-4 rounded-full mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground flex-grow">{description}</p>
    </motion.div>
);

// --- Main Page Component ---
const AboutPage: NextPage = () => {
    const { t } = useTranslation('about');

    return (
        <>
            <Head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <title>CETEC | قطب دانش و فناوری‌های مدرن - هوش مصنوعی و الکترونیک</title>
                <meta
                    name="description"
                    content="شرکت CETEC، پیشرو در طراحی و تولید سامانه‌های هوشمند مبتنی بر هوش مصنوعی، اینترنت اشیا (IoT) و الکترونیک پیشرفته. راهکارهای نوآورانه برای آینده‌ای هوشمند."
                />
                <meta name="keywords" content="هوش مصنوعی, اینترنت اشیا, الکترونیک, پهپاد هوشمند, دیتالاگر صنعتی, CETEC, قطب دانش و فناوری" />
            </Head>
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
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto mt-4 text-muted-foreground font-light">
                        {t('hero.subtitle')}
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
                        viewport={viewportSettings}
                        className="bg-card border border-border p-10 rounded-3xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Target size={32} className="text-primary" />
                            <h2 className="text-3xl font-bold text-card-foreground">{t('mission.title')}</h2>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            {t('mission.text')}
                        </p>
                    </motion.div>
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={viewportSettings}
                        className="bg-card border border-border p-10 rounded-3xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Eye size={32} className="text-secondary" />
                            <h2 className="text-3xl font-bold text-card-foreground">{t('vision.title')}</h2>
                        </div>
                        <p className="text-lg text-muted-foreground">
                            {t('vision.text')}
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
                        viewport={viewportSettings}
                        className="text-4xl font-bold text-center mb-16 text-foreground"
                    >
                        {t('timeline_section.title')}
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
                        viewport={viewportSettings}
                        className="text-4xl font-bold text-center mb-16 text-foreground"
                    >
                        {t('values_section.title')}
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <ValueCard icon={<Lightbulb size={32} />} title={t('values.innovation.title')} description={t('values.innovation.description')} />
                        <ValueCard icon={<Users size={32} />} title={t('values.team.title')} description={t('values.team.description')} />
                        <ValueCard icon={<Handshake size={32} />} title={t('values.commitment.title')} description={t('values.commitment.description')} />
                        <ValueCard icon={<LinkIcon size={32} />} title={t('values.integrity.title')} description={t('values.integrity.description')} />
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
                        viewport={viewportSettings}
                        className="text-4xl font-bold text-center mb-16 text-foreground"
                    >
                        {t('forms_section.title')}
                    </motion.h2>
                    <motion.div
                        variants={fadeIn}
                        initial="initial"
                        whileInView="whileInView"
                        viewport={viewportSettings}
                    >
                        <ContactForms />
                    </motion.div>
                </div>
            </section>

        </motion.div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        // Load translations for 'common' (header/footer) and 'about' (page content)
        ...(await serverSideTranslations(locale ?? 'fa', ['common', 'about'])),
    },
});

export default AboutPage;