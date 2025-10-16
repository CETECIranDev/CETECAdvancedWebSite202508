// components/TechSpecCatalog.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Camera, HardDrive, Bot, Users, BarChart, Server, LayoutDashboard, FileText, Settings2 } from 'lucide-react';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

type Category = 'hardware' | 'software' | 'features';

const SpecItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <div className="flex items-center gap-4">
        <div className="text-primary flex-shrink-0">{icon}</div>
        <span className="text-muted-foreground">{text}</span>
    </div>
);

const TechSpecCatalog = () => {
    const { t } = useTranslation('people-counting-system');
    const [activeTab, setActiveTab] = useState<Category>('hardware');

    const content = {
        hardware: {
            title: t('tech_specs_section.hardware_title'),
            image: '/images/spec-hardware.png', // Image of the PCB/Processor
            specs: [
                { icon: <Cpu size={24} />, text: t('tech_specs.hardware.cpu') },
                { icon: <Camera size={24} />, text: t('tech_specs.hardware.camera') },
                { icon: <HardDrive size={24} />, text: t('tech_specs.hardware.storage') },
            ]
        },
        software: {
            title: t('tech_specs_section.software_title'),
            image: '/images/spec-ai.svg', // Image of a neural network
            specs: [
                { icon: <Bot size={24} />, text: t('tech_specs.software.detection') },
                { icon: <Users size={24} />, text: t('tech_specs.software.demographics') },
                { icon: <Server size={24} />, text: t('tech_specs.software.edge_computing') },
            ]
        },
        features: {
            title: t('tech_specs_section.features_title'),
            image: '/images/spec-dashboard.png', // Image of the dashboard UI
            specs: [
                { icon: <LayoutDashboard size={24} />, text: t('tech_specs.features.dashboard') },
                { icon: <FileText size={24} />, text: t('tech_specs.features.reporting') },
                { icon: <Settings2 size={24} />, text: t('tech_specs.features.customization') },
            ]
        },
    };

    return (
        <div className="w-full max-w-4xl mx-auto h-[500px] flex rounded-2xl bg-card border border-border shadow-2xl overflow-hidden">
            {/* Tabs Column (Right side for RTL) */}
            <div className="flex flex-col justify-center gap-2 p-4 bg-muted/50 border-s border-border">
                {(['hardware', 'software', 'features'] as Category[]).map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`relative w-full p-4 rounded-lg text-right transition-colors ${
                            activeTab === tab ? 'bg-primary/10' : 'hover:bg-accent'
                        }`}
                    >
            <span className={`font-bold ${activeTab === tab ? 'text-primary' : 'text-foreground'}`}>
              {content[tab].title}
            </span>
                        {activeTab === tab && (
                            <motion.div
                                layoutId="active-tab-indicator"
                                className="absolute top-0 bottom-0 -end-px w-1 bg-primary rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8 items-center overflow-hidden">
                {/* Specs List Column (Right side) */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {content[activeTab].specs.map(spec => (
                                <SpecItem key={spec.text} icon={spec.icon} text={spec.text} />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Visual Column (Left side) */}
                <div className="relative w-full h-full hidden md:flex items-center justify-center">
                    <AnimatePresence>
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0"
                        >
                            <Image
                                src={content[activeTab].image}
                                alt={content[activeTab].title}
                                layout="fill"
                                objectFit="contain"
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TechSpecCatalog;