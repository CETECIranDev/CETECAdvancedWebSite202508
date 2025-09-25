// components/PartnerGrid.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
    { src: '/logos/company-a.png', alt: 'Company A' }, { src: '/logos/company-b.png', alt: 'Company B' },
    { src: '/logos/company-c.png', alt: 'Company C' }, { src: '/logos/company-d.png', alt: 'Company D' },
    { src: '/logos/company-e.png', alt: 'Company E' }, { src: '/logos/company-f.png', alt: 'Company F' },
    { src: '/logos/company-g.png', alt: 'Company G' }, { src: '/logos/company-h.png', alt: 'Company H' },
    { src: '/logos/company-i.png', alt: 'Company I' }, { src: '/logos/company-j.png', alt: 'Company J' },
    { src: '/logos/company-k.png', alt: 'Company K' }, { src: '/logos/company-l.png', alt: 'Company L' },
];

// Helper to determine neighbors in the grid layout (can be adjusted)
const getNeighbors = (index: number, columns: number) => {
    const neighbors = [];
    const isTopRow = index < columns;
    const isBottomRow = index >= logos.length - columns;
    const isLeftEdge = index % columns === 0;
    const isRightEdge = (index + 1) % columns === 0;

    if (!isTopRow) neighbors.push(index - columns); // Top
    if (!isBottomRow) neighbors.push(index + columns); // Bottom
    if (!isLeftEdge) neighbors.push(index - 1); // Left
    if (!isRightEdge) neighbors.push(index + 1); // Right

    return neighbors;
};

const PartnerGrid = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const columns = 4; // Adjust number of columns for layout

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {logos.map((logo, index) => {
                const isHovered = hoveredIndex === index;
                const isNeighbor = hoveredIndex !== null && getNeighbors(hoveredIndex, columns).includes(index);
                const isDimmed = hoveredIndex !== null && !isHovered && !isNeighbor;

                return (
                    <motion.div
                        key={logo.alt}
                        onHoverStart={() => setHoveredIndex(index)}
                        onHoverEnd={() => setHoveredIndex(null)}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="relative aspect-square flex items-center justify-center p-4"
                    >
                        <motion.div
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                                opacity: isDimmed ? 0.3 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="relative w-2/3 h-2/3"
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                layout="fill"
                                objectFit="contain"
                                className="filter grayscale transition-all duration-300"
                                style={{
                                    filter: (isHovered || isNeighbor) ? 'grayscale(0%)' : 'grayscale(100%)',
                                }}
                            />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default PartnerGrid;