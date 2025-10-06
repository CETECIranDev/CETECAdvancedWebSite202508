import React, { useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation, TFunction } from 'next-i18next'; // Import TFunction
import fs from 'fs';
import path from 'path';
import { motion, Variants, Transition } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Cpu } from 'lucide-react';
import * as Icons from 'lucide-react';

// Import all the showcase components
import InteractiveFlow from '../components/InteractiveFlow';
import PartnerNetwork from '../components/PartnerNetwork';
import ProductCard from '../components/ProductCard';
import AIPlayground from '../components/AIPlayground';
import DashboardShowcase from '../components/DashboardShowcaseFullWidth';
import NeuralNetworkCanvas from "@/components/NeuralNetworkCanvas";
import HeroAurora from "@/components/HeroAurora";

// --- Type Definitions ---
type IconName = keyof typeof Icons;
interface Product {
    title: string;
    description: string;
    icon: IconName;
    link: string;
}

interface HomeProps {
    products: Product[];
}

// --- Animation Variants ---
const pageVariants: Variants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 },
};

const pageTransition: Transition = {
    type: 'tween',
    ease: 'easeInOut', // Use a valid easing function string
    duration: 0.5,
};

// --- Main Home Component ---
const Home: NextPage<HomeProps> = ({ products }) => {

  

    const { t } = useTranslation('home');

    return (
        <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
        >
            {/* Hero Section with Interactive Flowchart */}
            <section className="relative h-screen flex flex-col overflow-hidden">
                {/* This gradient makes the text more readable at the bottom */}
                <NeuralNetworkCanvas />

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background -z-10"></div>
                <HeroAurora />

                <div className="container mx-auto px-6 pt-32 md:pt-40 text-center z-10">
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-block bg-card/50 backdrop-blur-sm border border-border rounded-full px-4 py-2 mb-6 text-sm">
                            <span className="text-primary font-semibold">{t('hero.badge')}</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-extrabold mb-6 text-foreground" style={{ textShadow: '0 0 30px hsl(var(--background)), 0 0 50px hsl(var(--background))' }}>
                            {t('hero.title')}
                        </h1>
                        <p className="text-lg md:text-xl max-w-3xl mx-auto text-muted-foreground mb-10">
                            {t('hero.subtitle')}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href="/products" className="group flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-8 py-4 rounded-full transition-all duration-300 shadow-lg">
                                {t('hero.primary_cta')} <ArrowRight className="group-hover:translate-x-1 transition-transform rtl:group-hover:-translate-x-1" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
                <div className="flex-grow relative mt-16 md:mt-24">
                    <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent_10%,white_50%,white_90%,transparent_100%)]">
                        <InteractiveFlow />
                    </div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-24 bg-muted">
                <div className="container mx-auto px-6 text-center">
                    <motion.h3 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl font-display font-bold mb-4 text-foreground">
                        {t('partners_section.title')}
                    </motion.h3>
                    <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
                        {t('partners_section.subtitle')}
                    </motion.p>
                    <PartnerNetwork />
                </div>
            </section>

            {/* Products Section */}
            <section className="py-24 bg-background">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                        <Cpu size={48} className="mx-auto text-primary" />
                        <h2 className="text-4xl font-display font-bold mt-4 mb-6">{t('products_section.title')}</h2>
                        <p className="text-lg max-w-2xl mx-auto text-muted-foreground">{t('products_section.subtitle')}</p>
                    </motion.div>
                    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div key={index} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <ProductCard title={product.title} description={product.description} icon={product.icon} link={product.link} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Playground Section */}
            <section className="py-24">
                <div className="container mx-auto px-6">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
                        <h2 className="text-4xl font-display font-bold mb-4">{t('ai_playground.title')}</h2>
                        <p className="text-lg max-w-3xl mx-auto text-muted-foreground mb-12">{t('ai_playground.subtitle')}</p>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        <AIPlayground />
                    </motion.div>
                </div>
            </section>

            {/* Dashboard Showcase Section */}
            <section className="py-24 bg-muted">
                <div className="container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} >
                        <h2 className="text-4xl font-display font-bold mb-4">{t('dashboard_showcase.title')}</h2>
                        <p className="text-lg max-w-3xl mx-auto text-muted-foreground mb-16">{t('dashboard_showcase.subtitle')}</p>
                    </motion.div>
                    <DashboardShowcase />
                </div>
            </section>

        </motion.div>
    );
};

export const getStaticProps: GetStaticProps<HomeProps> = async ({ locale }) => {
    const currentLocale = locale ?? 'fa';

    // Using the robust file reading method
    const filePath = path.join(process.cwd(), `public/locales/${currentLocale}/home.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const homeTranslations = JSON.parse(fileContent);

    const productKeys = ['people_counting', 'traffic_counter', 'vtol_drone', 'datalogger', 'energy_management'];

    const products: Product[] = productKeys.map(key => {
        const productData = homeTranslations.products?.[key];

        if (!productData) {
            console.warn(`Translation for product key "${key}" not found in locale "${currentLocale}".`);
            return {
                title: key.replace('_', ' '),
                description: 'Description not available.',
                icon: 'AlertTriangle' as IconName,
                link: '/',
            };
        }

        return {
            title: productData.title,
            description: productData.description,
            icon: { 'people_counting': 'Users', 'traffic_counter': 'Route', 'vtol_drone': 'Rocket', 'datalogger': 'Database', 'energy_management': 'BrainCircuit' }[key] as IconName,
            link: { 'people_counting': '/products/people-counting-system', 'traffic_counter': '/products/road-traffic-counter', 'vtol_drone': '/products/smart-vtol-drone', 'datalogger': '/products/industrial-dataloggers', 'energy_management': '/services' }[key] as string,
        };
    });

    return {
        props: {
            ...(await serverSideTranslations(currentLocale, ['common', 'home'])),
            products,
        },
    };
};

export default Home;