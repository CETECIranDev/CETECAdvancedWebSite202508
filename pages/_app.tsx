// pages/_app.tsx
import React, { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps, router }: AppProps) {
  const [theme, setTheme] = useState('light');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const storedTheme = localStorage.getItem('theme') || 'light';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, isMounted]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header toggleTheme={toggleTheme} currentTheme={theme} isMounted={isMounted} />
      <AnimatePresence mode="wait">
        <main className="flex-grow" key={router.route}>
          <Component {...pageProps} />
        </main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export default appWithTranslation(MyApp);