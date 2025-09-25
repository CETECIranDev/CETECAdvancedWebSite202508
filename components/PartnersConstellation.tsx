import React, { useRef, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const logos = [
    { src: '/logos/company-a.png', alt: 'Company A' },
    { src: '/logos/company-b.png', alt: 'Company B' },
    { src: '/logos/company-c.png', alt: 'Company C' },
    { src: '/logos/company-d.png', alt: 'Company D' },
    { src: '/logos/company-e.png', alt: 'Company E' },
    { src: '/logos/company-f.png', alt: 'Company F' },
    { src: '/logos/company-g.png', alt: 'Company G' },
    { src: '/logos/company-h.png', alt: 'Company H' },
    { src: '/logos/company-i.png', alt: 'Company I' },
    { src: '/logos/company-j.png', alt: 'Company J' },
    { src: '/logos/company-k.png', alt: 'Company K' },
    { src: '/logos/company-l.png', alt: 'Company L' },
];

interface LogoNodeData {
    src: string;
    alt: string;
    position: [number, number, number]; // [x, y, z]
}

const LogoNode: React.FC<{
    node: LogoNodeData;
    onHoverStart: () => void;
    onHoverEnd: () => void;
    isDimmed: boolean;
}> = ({ node, onHoverStart, onHoverEnd, isDimmed }) => {
    const [x, y, z] = node.position;
    return (
        <motion.div
            className="absolute top-1/2 left-1/2" // Positioned relative to the center of the sphere
            style={{
                width: 80,
                height: 80,
                x: '-50%',
                y: '-50%',
                transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                transformStyle: 'preserve-3d',
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15, delay: Math.random() * 1 }}
            whileHover={{ scale: 1.5, z: z + 50 }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
        >
            <motion.div
                animate={{ opacity: isDimmed ? 0.3 : 1 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full rounded-full bg-card/50 backdrop-blur-sm border border-border flex items-center justify-center"
            >
                <Image src={node.src} alt={node.alt} width={48} height={48} objectFit="contain" />
            </motion.div>
        </motion.div>
    );
};

const PartnersConstellation = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
    const rotationRef = useRef({ y: 0 });

    // Continuous rotation animation
    React.useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            if (containerRef.current) {
                rotationRef.current.y += 0.001; // Slower, smoother speed
                containerRef.current.style.transform = `rotateY(${rotationRef.current.y}rad)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const nodes = useMemo(() => {
        const numNodes = logos.length;
        const radius = 250;
        const nodesArray: LogoNodeData[] = [];
        for (let i = 0; i < numNodes; i++) {
            const phi = Math.acos(-1 + (2 * i) / numNodes);
            const theta = Math.sqrt(numNodes * Math.PI) * phi;
            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);
            nodesArray.push({ ...logos[i], position: [x, y, z] });
        }
        return nodesArray;
    }, []);

    return (
        <div className="w-full h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
            <div
                ref={containerRef}
                className="relative"
                style={{ transformStyle: 'preserve-3d', width: '500px', height: '500px' }}
            >
                {/* The Edges (lines) */}
                <svg
                    viewBox="-250 -250 500 500"
                    className="absolute inset-0 w-full h-full"
                    style={{ transform: 'translateZ(-250px)' }} // Push back to center of sphere
                >
                    <g>
                        {nodes.map((nodeA, i) =>
                            nodes.slice(i + 1, i + 3).map((nodeB, j) => (
                                <line
                                    key={`${i}-${j}`}
                                    x1={nodeA.position[0]}
                                    y1={nodeA.position[1]}
                                    x2={nodeB.position[0]}
                                    y2={nodeB.position[1]}
                                    stroke="hsl(var(--border))"
                                    strokeWidth={0.5}
                                />
                            ))
                        )}
                    </g>
                </svg>

                {/* The Nodes (logos) */}
                {nodes.map((node) => (
                    <LogoNode
                        key={node.alt}
                        node={node}
                        onHoverStart={() => setHoveredLogo(node.alt)}
                        onHoverEnd={() => setHoveredLogo(null)}
                        isDimmed={hoveredLogo !== null && hoveredLogo !== node.alt}
                    />
                ))}
            </div>
        </div>
    );
};

export default PartnersConstellation;