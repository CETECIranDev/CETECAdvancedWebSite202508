import React, { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion, Variants, ViewportOptions } from 'framer-motion';
import { Users, BarChartBig, Cpu, Lock, ShoppingCart, Plane, Calendar, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import UseCaseGrid from '../../components/UseCaseGrid'
import LiveTrafficChart from '../../components/charts/LiveTrafficChart';
import StatCounter from '../../components/StatCounter';
import PricingCard from '../../components/PricingCard';
import BillingToggle from '../../components/BillingToggle';
import TechSpecCatalog from '../../components/TechSpecCatalog';

// --- Animation Variants ---
const viewportSettings: ViewportOptions = { once: true, amount: 0.3 };
const fadeIn: Variants = {
    initial: { opacity: 0, y: 30 },
    whileInView: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};
const staggerContainer: Variants = {
    whileInView: {
        transition: { staggerChildren: 0.1 },
    },
};

// 1. Change the type of 'icon' to accept a React Component Type
const StatCard: React.FC<{
    icon: React.ElementType; // Instead of React.ReactNode
    label: string;
    value: string | number;
    unit: string;
}> = ({ icon: Icon, label, value, unit }) => ( // 2. Rename prop to 'Icon' for rendering
    <motion.div variants={fadeIn} className="bg-card/50 backdrop-blur-lg border border-border p-6 rounded-2xl text-center">
        <div className="mx-auto w-fit mb-3">
            {/* 3. Render the Icon component with desired props */}
            <Icon size={32} className="text-secondary" />
        </div>
        {typeof value === 'number' ?
            <StatCounter to={value} duration={2.5} className="text-4xl font-bold text-foreground" suffix={unit.startsWith('%') ? '%' : ''} /> :
            <div className="text-4xl font-bold text-foreground">{value}</div>
        }
        <div className="text-muted-foreground">{label}</div>
        <div className="text-xs text-muted-foreground mt-1">{unit.startsWith('%') ? '' : unit}</div>
    </motion.div>
);


// --- Reusable Sub-components ---
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
    <motion.div variants={fadeIn} className="bg-card p-8 rounded-2xl border border-border text-center">
        <div className="mx-auto text-secondary mb-4 w-fit">{icon}</div>
        <h3 className="text-2xl font-bold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
    </motion.div>
);

// --- Main Page Component ---
const PeopleCountingPage: NextPage = () => {
    const { t } = useTranslation('people-counting-system');
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

    // Dynamically create plans from translation file
    // --- THIS IS THE FIX ---
    // We use `t` with the `{ returnObjects: true }` option and cast the result to string[]
    const pricingPlans = ['base', 'professional', 'enterprise'].map(planKey => {
        const features = t(`plans.${planKey}.features`, { returnObjects: true }) as string[];

        return {
            planName: t(`plans.${planKey}.name`),
            badge: t(`plans.${planKey}.badge`, { defaultValue: null }),
            pricing: {
                monthly: { price: t(`plans.${planKey}.price_monthly`), description: t(`plans.${planKey}.desc_monthly`) },
                yearly: { price: t(`plans.${planKey}.price_yearly`), description: t(`plans.${planKey}.desc_yearly`) },
            },
            features: Array.isArray(features) ? features : [], // Ensure it's an array
            isFeatured: planKey === 'professional',
            ctaText: t(`plans.${planKey}.cta`),
            ctaLink: '/contact',
        };
    });

    return (
        <>
        <Head>
            <title>سامانه شمارش هوشمند افراد | تحلیل جمعیت با هوش مصنوعی | CETEC</title>
            <meta
                name="description"
                content="با سامانه شمارش هوشمند افراد CETEC، آمار دقیق تردد، جنسیت و سن را با دقت بالا دریافت کنید. راهکار هوشمند برای مدیریت فضاهای تجاری، رویدادها و مراکز عمومی."
            />
            <meta name="keywords" content="شمارش هوشمند افراد, شمارشگر جمعیت, تحلیل ویدئویی, تشخیص جنسیت و سن, هوش مصنوعی, بینایی ماشین, CETEC" />

            {/* JSON-LD for Rich Snippets */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify({
                        "@context": "https://schema.org/",
                        "@type": "Product",
                        "name": "سامانه شمارش هوشمند افراد",
                        "image": "https://yourdomain.com/images/people-counting-hero.jpg", // آدرس کامل تصویر اصلی محصول
                        "description": "سامانه پیشرفته مبتنی بر هوش مصنوعی برای شمارش و تحلیل دقیق جمعیت در فضاهای مختلف.",
                        "brand": {
                            "@type": "Brand",
                            "name": "CETEC"
                        },
                        "offers": {
                            "@type": "Offer",
                            "url": "https://yourdomain.com/products/people-counting-system",
                            "priceCurrency": "IRR",
                            "price": "0", // چون قیمت تماس بگیرید است، صفر می‌گذاریم
                            "availability": "https://schema.org/InStock"
                        }
                    }) }}
            />
        </Head>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center text-center p-6 overflow-hidden">
                <video key="people-counting-video" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-0">
                    <source src="/videos/street-scene-short.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, ease: 'easeOut' }} className="z-20 text-white">
                    <div className="inline-block bg-secondary/20 border border-secondary text-secondary rounded-full px-4 py-1 mb-6 text-sm font-medium">{t('hero.badge')}</div>
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>{t('hero.title')}</h1>
                    <p className="text-xl md:text-2xl max-w-3xl mx-auto" style={{ textShadow: '0 1px 5px rgba(0,0,0,0.5)' }}>{t('hero.subtitle')}</p>
                    <Link href="#dashboard" className="mt-10 inline-block bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">{t('hero.cta')}</Link>
                </motion.div>
                <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} className="absolute bottom-10 z-20"><ChevronDown size={32} className="text-white/70" /></motion.div>
            </section>

            {/* Live Dashboard Section */}
            <section id="dashboard" className="py-24 bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
                        <h2 className="text-4xl font-bold text-center mb-4">{t('dashboard_section.title')}</h2>
                        <p className="text-lg max-w-2xl mx-auto text-center text-muted-foreground mb-12">{t('dashboard_section.subtitle')}</p>
                    </motion.div>
                    <div className="bg-card border border-border rounded-3xl p-4 md:p-8 shadow-2xl">
                        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* 4. Pass the component itself, not an instance */}
                            <StatCard icon={Users} label={t('stats.present')} value={137} unit={t('stats.person_unit')} />
                            <StatCard icon={BarChartBig} label={t('stats.peak_traffic')} value={"15:30"} unit={t('stats.hour_unit')} />
                            <StatCard icon={Calendar} label={t('stats.busiest_day')} value={t('plans.enterprise.name').includes('سازمانی') ? "پنجشنبه" : "Thursday"} unit={t('stats.day_unit')} />
                            <StatCard icon={Cpu} label={t('stats.accuracy')} value={98.7} unit={t('stats.percent_unit')} />
                        </motion.div>
                        <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}><LiveTrafficChart /></motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-muted text-foreground">
                <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
                    <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
                        <h2 className="text-4xl font-bold mb-8">{t('features_section.title')}</h2>
                        <div className="space-y-8">
                            <Feature icon={<Cpu size={28} />} title={t('features.ai.title')} description={t('features.ai.description')} />
                            <Feature icon={<Lock size={28} />} title={t('features.privacy.title')} description={t('features.privacy.description')} />
                            <Feature icon={<BarChartBig size={28} />} title={t('features.reporting.title')} description={t('features.reporting.description')} />
                        </div>
                    </motion.div>
                    <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="relative h-96">
                        <div className="w-full h-full bg-card rounded-2xl flex items-center justify-center p-8 border border-border">
                            <Image src="/images/ai-processing.svg" alt={t('features.ai.title')} width={400} height={300} className="w-2/3 h-auto animate-subtle-bob" />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/*
        ==========================================================
         NEW: Interactive Tech Spec Catalog Section
        ==========================================================
      */}
            <section className="py-24 bg-muted">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold text-center mb-16 text-foreground"
                    >
                        {t('tech_specs_section.title')}
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.7 }}
                    >
                        <TechSpecCatalog />
                    </motion.div>
                </div>
            </section>

            {/*/!* Use Cases Section *!/*/}
            {/*<section className="py-24 bg-background text-foreground">*/}
            {/*    <div className="container mx-auto px-6">*/}
            {/*        <h2 className="text-4xl font-bold text-center mb-12">{t('use_cases_section.title')}</h2>*/}
            {/*        <motion.div variants={staggerContainer} initial="initial" whileInView="whileInView" viewport={viewportSettings} className="grid grid-cols-1 md:grid-cols-3 gap-8">*/}
            {/*            <UseCaseCard icon={<ShoppingCart size={40} />} title={t('use_cases.retail.title')} description={t('use_cases.retail.description')} />*/}
            {/*            <UseCaseCard icon={<Plane size={40} />} title={t('use_cases.transport.title')} description={t('use_cases.transport.description')} />*/}
            {/*            <UseCaseCard icon={<Calendar size={40} />} title={t('use_cases.events.title')} description={t('use_cases.events.description')} />*/}
            {/*        </motion.div>*/}
            {/*    </div>*/}
            {/*</section>*/}



            {/* NEW: Interactive Use Cases Section */}
            <section className="py-24 bg-background text-foreground">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">{t('use_cases_section.title')}</h2>
                    <UseCaseGrid />
                </div>
            </section>



            {/* Pricing Section */}
            <section id="pricing" className="py-24 bg-muted">
                <div className="container mx-auto px-6">
                    <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
                        <h2 className="text-4xl font-bold text-center mb-4">{t('pricing_section.title')}</h2>
                        <p className="text-lg max-w-2xl mx-auto text-center text-muted-foreground mb-12">{t('pricing_section.subtitle')}</p>
                        <BillingToggle billingCycle={billingCycle} setBillingCycle={setBillingCycle} />
                    </motion.div>
                    <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch">
                        {pricingPlans.map((plan, index) => (
                            <PricingCard key={plan.planName} planName={plan.planName} price={plan.pricing[billingCycle].price} priceDescription={plan.pricing[billingCycle].description} features={plan.features} isFeatured={plan.isFeatured} ctaText={plan.ctaText} ctaLink={plan.ctaLink} delay={index * 0.1} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-24">
                <div className="container mx-auto px-6 text-center">
                    <motion.div variants={fadeIn} initial="initial" whileInView="whileInView" viewport={viewportSettings}>
                        <h2 className="text-4xl font-bold mb-4">{t('final_cta.title')}</h2>
                        <p className="text-lg max-w-2xl mx-auto text-muted-foreground mb-8">{t('final_cta.subtitle')}</p>
                        <Link href="/contact" className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">{t('final_cta.cta')}</Link>
                    </motion.div>
                </div>
            </section>
        </motion.div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
    props: {
        ...(await serverSideTranslations(locale ?? 'fa', ['common', 'people-counting-system'])),
    },
});

export default PeopleCountingPage;