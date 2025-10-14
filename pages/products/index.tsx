import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import fs from 'fs';
import path from 'path';
import ProductCard from '../../components/ProductCard';
import * as Icons from 'lucide-react';

// --- Types ---
type IconName = keyof typeof Icons;
interface Product {
    title: string;
    description: string;
    icon: IconName;
    link: string;
}
interface ProductsPageProps {
    products: Product[];
}

// --- Main Page Component ---
const ProductsPage: NextPage<ProductsPageProps> = ({ products }) => {
    const { t } = useTranslation('common');

    return (
        <div className="container mx-auto px-6 py-24 md:py-32">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
                <h1 className="text-5xl font-display font-extrabold mb-4">{t('nav.products')}</h1>
                <p className="text-xl text-muted-foreground mb-16 max-w-2xl mx-auto">
                    {t('products_page.subtitle', 'راهکارهای نوآورانه ما برای صنایع مختلف را کشف کنید.')}
                </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
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
    );
};

// --- THIS IS THE CRUCIAL FIX ---
export const getStaticProps: GetStaticProps<ProductsPageProps> = async ({ locale }) => {
    const currentLocale = locale ?? 'fa';

    // This logic is the same as in pages/index.tsx
    const homeTranslations = await import(`../../public/locales/${currentLocale}/home.json`);

    const productKeys = [ 'people_counting', 'traffic_counter', 'vtol_drone', 'datalogger', 'energy_management' , 'smart_hospital'];

    const products: Product[] = productKeys.map(key => {
        const productData = homeTranslations.products?.[key];
        if (!productData) {
            return { title: key, description: '...', icon: 'AlertTriangle' as IconName, link: '/' };
        }
        return {
            title: productData.title,
            description: productData.description,
            icon: { 'people_counting': 'Users', 'traffic_counter': 'Route', 'vtol_drone': 'Rocket', 'datalogger': 'Database', 'energy_management': 'BrainCircuit' ,'smart_hospital' : 'BrainCircuit'  }[key] as IconName,
            link: { 'people_counting': '/products/people-counting-system', 'traffic_counter': '/products/road-traffic-counter', 'vtol_drone': '/products/smart-vtol-drone', 'datalogger': '/products/industrial-dataloggers', 'energy_management': '/services'  , 'smart_hospital' : '/services' }[key] as string,
        };
    });

    return {
        props: {
            // This line is essential. It provides the i18next instance.
            ...(await serverSideTranslations(locale ?? 'fa', ['common', 'home'])),
            products,
        },
    };
};

export default ProductsPage;