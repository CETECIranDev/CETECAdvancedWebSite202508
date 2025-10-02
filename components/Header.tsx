import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Sun, Moon, Zap, Menu, X, Users, Rocket, Route } from 'lucide-react';

interface HeaderProps {
    toggleTheme: () => void;
    currentTheme: string;
    isMounted: boolean;
}

const productsData = [
    { name_fa: 'شمارش هوشمند افراد', name_en: 'Smart People Counting', href: '/products/people-counting-system', icon: Users },
    { name_fa: 'تردد شمار جاده‌ای', name_en: 'Road Traffic Counter', href: '/products/road-traffic-counter', icon: Route },
    { name_fa: 'دیتالاگرهای صنعتی', name_en: 'Industrial Data Loggers', href: '/products/industrial-dataloggers', icon: Route },
    { name_fa: 'پهپاد هوشمند VTOL', name_en: 'Smart VTOL Drone', href: '/products/smart-vtol-drone', icon: Rocket },
];

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme, isMounted }) => {
    const { t, i18n } = useTranslation('common');
    const router = useRouter();
    const { scrollY } = useScroll();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        return scrollY.onChange((latest) => setIsScrolled(latest > 50));
    }, [scrollY]);

    const handleLanguageChange = (newLocale: string) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };

    const navItems = [
        { href: '/', label: t('nav.home') },
        { href: '/services', label: t('nav.services') },
        { href: '/about', label: t('nav.about') },
        { href: '/contact', label: t('nav.contact') },
        { href: '/lab', label: t('nav.lab') },
    ];


    const isRtl = i18n.language === 'fa';

    return (
        <>
            <motion.header
                className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl transition-all duration-300 border ${
                    isScrolled
                        ? 'bg-card/70 backdrop-blur-xl border-border'
                        : 'bg-transparent backdrop-blur-none border-transparent'
                }`}
            >
                <div className="px-6 py-3 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <motion.div whileHover={{ rotate: 15 }}><Zap size={28} /></motion.div>
                        <span>{t('company_name')}</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-2">
                        <div className="group relative">
                            <Link href="/products" className="font-semibold text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                                {t('nav.products')}
                            </Link>
                            <div className={`absolute top-full pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto ${isRtl ? 'left-1/2 -translate-x-1/2' : 'right-1/2 translate-x-1/2'}`}>
                                <div className="bg-card rounded-xl shadow-2xl border border-border w-64 p-2">
                                    {productsData.map(product => (
                                        <Link key={product.href} href={product.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted">
                                            <product.icon className="text-primary" size={20} />
                                            <span>{isRtl ? product.name_fa : product.name_en}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {navItems.map((item) => (
                            <Link key={item.href} href={item.href} className="font-semibold text-foreground px-4 py-2 rounded-lg hover:bg-muted transition-colors">
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:flex items-center border border-border rounded-full p-1">
                            <button onClick={() => handleLanguageChange('fa')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${i18n.language === 'fa' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>FA</button>
                            <button onClick={() => handleLanguageChange('en')} className={`px-3 py-1 rounded-full text-sm font-semibold transition-colors ${i18n.language === 'en' ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}>EN</button>
                        </div>
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-muted transition-colors">
                            {isMounted ? (currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
                        </button>
                        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}><Menu size={20} /></button>
                    </div>
                </div>
            </motion.header>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ x: isRtl ? "-100%" : "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: isRtl ? "-100%" : "100%" }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed inset-0 bg-background z-[100] p-6 md:hidden"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="font-bold text-lg">{t('nav.menu_title', 'Menu')}</span>
                            <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
                        </div>
                        <nav className="flex flex-col gap-6 text-2xl font-semibold">
                            <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>{t('nav.products')}</Link>
                            {navItems.map((item) => (
                                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
                            ))}
                        </nav>
                        <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
                            <button onClick={() => handleLanguageChange('fa')} className={`px-4 py-2 rounded-full text-lg font-semibold ${i18n.language === 'fa' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>FA</button>
                            <button onClick={() => handleLanguageChange('en')} className={`px-4 py-2 rounded-full text-lg font-semibold ${i18n.language === 'en' ? 'bg-primary text-primary-foreground' : 'bg-card'}`}>EN</button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Header;