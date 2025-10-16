// components/UseCaseGrid.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Plane, Building, BookOpen, Train, Landmark, School, Banknote } from 'lucide-react';
import { useTranslation } from 'next-i18next';

// Define the structure for all use cases
const allUseCases = {
    retail: [
        { icon: <ShoppingCart />, key: 'use_cases.retail.malls' },
        { icon: <Banknote />, key: 'use_cases.retail.banks' },
    ],
    transport: [
        { icon: <Plane />, key: 'use_cases.transport.airports' },
        { icon: <Train />, key: 'use_cases.transport.stations' },
    ],
    cultural: [
        { icon: <Landmark />, key: 'use_cases.cultural.museums' },
        { icon: <BookOpen />, key: 'use_cases.cultural.libraries' },
        { icon: <School />, key: 'use_cases.cultural.universities' },
    ],
    urban: [
        { icon: <Building />, key: 'use_cases.urban.offices' },
        { icon: <Building />, key: 'use_cases.urban.smart_cities' },
    ],
};

type Category = keyof typeof allUseCases;

const UseCaseCard: React.FC<{ icon: React.ReactNode; title: string; description: string; delay: number }> =
    ({ icon, title, description, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className="bg-card p-6 rounded-2xl border border-border text-center"
        >
            <div className="mx-auto w-fit text-primary mb-4">{icon}</div>
            <h4 className="text-lg font-bold text-foreground">{title}</h4>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </motion.div>
    );

const UseCaseGrid = () => {
    const [activeCategory, setActiveCategory] = useState<Category>('retail');
    const { t } = useTranslation('people-counting-system');

    const categories: { key: Category; label: string }[] = [
        { key: 'retail', label: t('categories.retail') },
        { key: 'transport', label: t('categories.transport') },
        { key: 'cultural', label: t('categories.cultural') },
        { key: 'urban', label: t('categories.urban') },
    ];

    return (
        <div>
            {/* Tabs for categories */}
            <div className="flex justify-center flex-wrap gap-4 mb-12">
                {categories.map(cat => (
                    <button
                        key={cat.key}
                        onClick={() => setActiveCategory(cat.key)}
                        className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                            activeCategory === cat.key ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid of use cases */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {allUseCases[activeCategory].map((useCase, index) => (
                        <UseCaseCard
                            key={useCase.key}
                            icon={useCase.icon}
                            title={t(`${useCase.key}.title`)}
                            description={t(`${useCase.key}.description`)}
                            delay={index * 0.1}
                        />
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default UseCaseGrid;