// components/Footer.tsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Zap, Github, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  
  const { t } = useTranslation('common');
  const [views, setViews] = useState(0);
  useEffect(() => {
    fetch('/api/views/home')
      .then(res => res.json())
      .then(data => setViews(data.views));
  }, []);


  return (
    <footer className="bg-card-light dark:bg-card-dark mt-20 border-t border-border-light dark:border-border-dark relative">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary-light dark:text-primary-dark mb-4">
              <Zap size={28} />
              شرکت قطب دانش و فناوری های مدرن پارس
            </Link>
            <p className="max-w-md text-subtle-light dark:text-subtle-dark">
              پیشرو در ارائه راهکارهای نوین مبتنی بر هوش مصنوعی و اینترنت اشیا برای ساختن آینده‌ای هوشمندتر.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">لینک‌های سریع</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-primary-light dark:hover:text-primary-dark">درباره ما</Link></li>
              <li><Link href="/products" className="hover:text-primary-light dark:hover:text-primary-dark">محصولات</Link></li>
              <li><Link href="/contact" className="hover:text-primary-light dark:hover:text-primary-dark">تماس با ما</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">ما را دنبال کنید</h3>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark"><Twitter /></a>
              <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark"><Linkedin /></a>
              <a href="#" className="hover:text-primary-light dark:hover:text-primary-dark"><Github /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border-light dark:border-border-dark pt-8 text-center text-subtle-light dark:text-subtle-dark">
          <p>&copy; {new Date().getFullYear()} {t('CETEC') || 'شرکت قطب دانش و فناوری های مدرن پارس'}. {t('all Rights Reserved') || 'تمامی حقوق برای شرکت قطب دانش و فناوری های پارس محفوظ است.'}</p>
        </div>
      </div>
      <div className='text-[14px] border border-[#ffffff31] w-fit px-5 py-2 rounded-full absolute bottom-5 left-5 z-[9999999] backdrop-blur-lg'> تعداد بازدید : {views}</div>

    </footer>
  );
};

export default Footer;