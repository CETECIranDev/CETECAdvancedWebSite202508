// components/DashboardShowcase.tsx (Final "Awesome" Version)
import React, { useRef } from 'react';
import {motion, useMotionValue, useScroll, useSpring, useTransform, Variants} from 'framer-motion';
import MiniAreaChart from './dashboard/MiniAreaChart';
import MiniDonutChart from './dashboard/MiniDonutChart';
import MiniScatterChart from './dashboard/MiniScatterChart';
import { Users, Car, BrainCircuit, CheckCircle, Clock } from 'lucide-react';

// Animation variants for staggered entry
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};

const AIStatus: React.FC<{ modelName: string; status: 'فعال' | 'در حال آموزش' }> = ({ modelName, status }) => (
    <div className="flex justify-between items-center text-sm py-2">
        <div className="flex items-center gap-2">
            <BrainCircuit size={14} className="text-primary" />
            <span className="text-muted-foreground">{modelName}</span>
        </div>
        <div className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${status === 'فعال' ? 'bg-secondary/20 text-secondary' : 'bg-yellow-500/20 text-yellow-500'}`}>
            {status === 'فعال' ? <CheckCircle size={12} /> : <Clock size={12} />}
            <span>{status}</span>
        </div>
    </div>
);

const DashboardShowcase = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start end', 'end start'] });
    const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);


    const ref = useRef<HTMLDivElement>(null);
    const xMouse = useMotionValue(0);
    const yMouse = useMotionValue(0);

    const mouseXSpring = useSpring(xMouse, { stiffness: 100, damping: 20 });
    const mouseYSpring = useSpring(yMouse, { stiffness: 100, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        xMouse.set(mouseX / width - 0.5);
        yMouse.set(mouseY / height - 0.5);
    };

    const handleMouseLeave = () => {
        xMouse.set(0);
        yMouse.set(0);
    };


    return (
        <div ref={targetRef} className="relative h-[700px] w-full [perspective:2000px]">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
                // className="w-full max-w-5xl mx-auto"
                className="absolute inset-0 w-full "
            >

                <div
                    className="relative w-full h-full bg-card/30 backdrop-blur-2xl rounded-2xl border border-border/50 p-4 md:p-6 shadow-2xl"
                    style={{
                        transformStyle: 'preserve-3d',
                        boxShadow: '0 40px 80px -20px rgba(0,0,0,0.3)',

                    }}
                >
                    {/* Background elements with glow */}
                    <div
                        className="absolute inset-0 bg-hero-grid-dark opacity-10"
                        style={{
                            maskImage: 'radial-gradient(ellipse at center, white 0%, transparent 70%)',
                        }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center, hsla(var(--primary),0.1), transparent 60%)]" />
                    {/*<div className="grid grid-cols-2 sm:grid-cols-12 grid-rows-12 sm:grid-rows-6 gap-4 h-full" >*/}

                    {/* Widgets Grid with staggered animation */}
                    <motion.div
                        className="grid grid-cols-12 grid-rows-6 gap-4 h-full"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        {/* Main Chart: People Traffic */}
                        <motion.div variants={itemVariants} className="col-span-12 sm:col-span-7 row-span-3 bg-muted/30 rounded-lg p-3 flex flex-col border border-border/30 shadow-lg">
                            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Users size={12}/><span>ترافیک افراد (۲۴ ساعت گذشته)</span></h4>
                            <div className="flex-grow"><MiniAreaChart color="hsl(var(--primary))" /></div>
                        </motion.div>

                        {/* AI Model Status */}
                        <motion.div variants={itemVariants} className="col-span-12 sm:col-span-5 row-span-3 bg-muted/30 rounded-lg p-4 flex flex-col border border-border/30 shadow-lg">
                            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2"><BrainCircuit size={12}/><span>وضعیت مدل‌های AI</span></h4>
                            <div className="flex-grow flex flex-col justify-around divide-y divide-border/50">
                                <AIStatus modelName="تشخیص چهره" status="فعال" />
                                <AIStatus modelName="تحلیل رفتار" status="فعال" />
                                <AIStatus modelName="پیش‌بینی ترافیک" status="در حال آموزش" />
                            </div>
                        </motion.div>

                        {/* Vehicle Classification (Larger) */}
                        <motion.div variants={itemVariants} className="col-span-12 sm:col-span-5 row-span-3 bg-muted/30 rounded-lg p-3 flex flex-col border border-border/30 shadow-lg">
                            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Car size={12}/><span>طبقه‌بندی خودروها</span></h4>
                            <div className="flex-grow"><MiniDonutChart /></div>
                        </motion.div>

                        {/* Behavior Analysis (Scatter Plot) */}
                        <motion.div variants={itemVariants} className="col-span-12 sm:col-span-7 row-span-3 bg-muted/30 rounded-lg p-3 flex flex-col border border-border/30 shadow-lg">
                            <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Users size={12}/><span>خوشه‌بندی رفتار مشتریان</span></h4>
                            <div className="flex-grow"><MiniScatterChart /></div>
                        </motion.div>
                    </motion.div>
                   {/*</div>*/}
                </div>
            </motion.div>
        </div>
    );
};

export default DashboardShowcase;