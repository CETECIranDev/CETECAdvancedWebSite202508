// components/PartnerNetwork.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Zap } from 'lucide-react';

const logos = [
    // Define positions for a nice, balanced layout (x, y percentages)
    { src: '/logos/company-a.png', alt: 'Company A', pos: [20, 15] },
    { src: '/logos/company-b.png', alt: 'Company B', pos: [80, 25] },
    { src: '/logos/company-c.png', alt: 'Company C', pos: [5, 50] },
    { src: '/logos/company-d.png', alt: 'Company D', pos: [95, 55] },
    { src: '/logos/company-e.png', alt: 'Company E', pos: [30, 85] },
    { src: '/logos/company-f.png', alt: 'Company F', pos: [70, 80] },
    { src: '/logos/company-g.png', alt: 'Company G', pos: [50, 5] },
    { src: '/logos/company-h.png', alt: 'Company H', pos: [50, 95] },
];

const PartnerNetwork = () => {
    const [activeIndex, setActiveIndex] = useState(-1);

    // This effect creates the pulsing animation
    useEffect(() => {
        const interval = setInterval(() => {
            // Pick a random logo to activate
            setActiveIndex(Math.floor(Math.random() * logos.length));
        }, 2000); // Pulse every 2 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="w-full h-[500px] flex items-center justify-center">
            <div className="relative w-full h-full max-w-4xl">
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-24 h-24 bg-primary/10 border-2 border-primary rounded-full flex items-center justify-center">
                        <Zap size={40} className="text-primary" />
                    </div>
                </div>

                {/* Connection Lines rendered with SVG */}
                <svg className="absolute inset-0 w-full h-full">
                    {logos.map((logo, index) => (
                        <motion.line
                            key={`line-${index}`}
                            x1="50%"
                            y1="50%"
                            x2={`${logo.pos[0]}%`}
                            y2={`${logo.pos[1]}%`}
                            stroke="hsl(var(--border))"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1, delay: index * 0.1 }}
                        />
                    ))}
                </svg>

                {/* Pulsing effect */}
                {activeIndex !== -1 && (
                    <motion.div
                        className="absolute top-1/2 left-1/2 w-24 h-24 bg-primary/20 rounded-full -translate-x-1/2 -translate-y-1/2"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 8, opacity: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        onAnimationComplete={() => setActiveIndex(-1)} // Reset after animation
                    />
                )}


                {/* Partner Logos */}
                {logos.map((logo, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <motion.div
                            key={logo.alt}
                            className="absolute w-24 h-24 p-4"
                            style={{
                                top: `${logo.pos[1]}%`,
                                left: `${logo.pos[0]}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        >
                            <motion.div
                                className="relative w-full h-full bg-card rounded-full border border-border flex items-center justify-center"
                                animate={{
                                    scale: isActive ? 1.15 : 1,
                                    borderColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--border))',
                                }}
                                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.alt}
                                    layout="fill"
                                    objectFit="contain"
                                    className="p-3 filter grayscale"
                                    style={{
                                        filter: isActive ? 'grayscale(0%)' : 'grayscale(100%)',
                                        opacity: isActive ? 1 : 0.6
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
};

export default PartnerNetwork;