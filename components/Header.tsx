// components/Header.tsx (New Advanced Version)
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Sun, Moon, Zap, Menu, X, Users, Rocket, Route, BrainCircuit, Database } from 'lucide-react';

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: string;
  isMounted: boolean;
}

const products = [
  { name: 'شمارش هوشمند افراد', href: '/products/people-counting-system', icon: Users },
  { name: 'پهپاد هوشمند VTOL', href: '/products/smart-vtol-drone', icon: Rocket },
  { name: 'تردد شمار جاده‌ای', href: '/products/road-traffic-counter', icon: Route },
  { name: 'دیتا لاگرهای صنعتی', href: '/products/industrial-dataloggers', icon: Database },
  { name: 'مدیریت جامع انرژی و IoT', href: '/products/energy-iot-ai-management', icon: BrainCircuit },
  { name: 'دستگاه مولد فانکشن قابل حمل', href: '/products/portable-function-generator', icon: Route },
  // Add other products here as their pages are created
];

const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme, isMounted }) => {
  const { i18n } = useTranslation('common');
  const router = useRouter();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const changeLanguage = (lang: 'fa' | 'en') => {
    router.push(router.pathname, router.asPath, { locale: lang });
  };

  const navItems = [
    { href: '/', label: 'خانه' },
    { href: '/services', label: 'خدمات' },
    { href: '/about', label: 'درباره ما' },
    { href: '/lab', label: 'آزمایشگاه دانش' },
    { href: '/contact', label: 'تماس با ما' },
  ];

  return (
    <>
      {/* Main Header for Desktop */}
      <motion.header
        className={`fixed top-4 left-0 right-0 z-50 mx-auto w-[95%] max-w-6xl transition-all duration-300`}
        animate={{
        
        }}
      >
        <div className="border-border-light dark:border-border-dark rounded-2xl px-6 py-3 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-light dark:text-primary-dark">
            <motion.div whileHover={{ rotate: 15 }}><Zap size={28} /></motion.div>
            قطب دانش و فناوری
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Products Dropdown */}
            <div className="group relative">
              <Link href="/products" className="font-semibold text-text-light dark:text-text-dark px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                محصولات
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-2xl border border-border-light dark:border-border-dark w-64 p-2">
                  {products.map(product => (
                    <Link key={product.href} href={product.href} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                      <product.icon className="text-primary-dark" size={20} />
                      <span>{product.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="font-semibold text-text-light dark:text-text-dark px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center border border-border-light dark:border-border-dark rounded-full p-1">
              <button onClick={() => changeLanguage('fa')} className={`px-3 py-1 rounded-full text-sm font-semibold ${i18n.language === 'fa' ? 'bg-primary-dark text-white' : ''}`}>FA</button>
              <button onClick={() => changeLanguage('en')} className={`px-3 py-1 rounded-full text-sm font-semibold ${i18n.language === 'en' ? 'bg-primary-dark text-white' : ''}`}>EN</button>
            </div>
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              {isMounted ? (currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />) : <div className="w-5 h-5" />}
            </button>
            <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}><Menu size={20} /></button>
          </div>
        </div>
      </motion.header>
      
      {/* Mobile Off-canvas Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-background-light dark:bg-background-dark z-[100] p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-12">
              <span className="font-bold text-lg">منو</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <nav className="flex flex-col gap-6 text-2xl font-semibold">
              <Link href="/products" onClick={() => setIsMobileMenuOpen(false)}>محصولات</Link>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>{item.label}</Link>
              ))}
            </nav>
             <div className="absolute bottom-6 left-6 right-6 flex justify-center gap-4">
               <button onClick={() => changeLanguage('fa')} className={`px-4 py-2 rounded-full text-lg font-semibold ${i18n.language === 'fa' ? 'bg-primary-dark text-white' : 'bg-card-light dark:bg-card-dark'}`}>FA</button>
               <button onClick={() => changeLanguage('en')} className={`px-4 py-2 rounded-full text-lg font-semibold ${i18n.language === 'en' ? 'bg-primary-dark text-white' : 'bg-card-light dark:bg-card-dark'}`}>EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;