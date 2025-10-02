// // components/DashboardShowcase.tsx (New Advanced Version)
// import React, { useRef } from 'react';
// import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
// import MiniAreaChart from './dashboard/MiniAreaChart';
// import MiniDonutChart from './dashboard/MiniDonutChart';
// import MiniBarChart from './dashboard/MiniBarChart';
// import { Users, Car, Rocket, Database, Wifi } from 'lucide-react';
//
// const DashboardShowcase = () => {
//   const ref = useRef<HTMLDivElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//
//   const mouseXSpring = useSpring(x, { stiffness: 100, damping: 20 });
//   const mouseYSpring = useSpring(y, { stiffness: 100, damping: 20 });
//
//   const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
//   const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);
//
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const width = rect.width;
//     const height = rect.height;
//     const mouseX = e.clientX - rect.left;
//     const mouseY = e.clientY - rect.top;
//     x.set(mouseX / width - 0.5);
//     y.set(mouseY / height - 0.5);
//   };
//
//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };
//
//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
//       className="w-full max-w-5xl mx-auto"
//     >
//       <div
//         style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
//         className="relative w-full aspect-[16/10] bg-card/60 backdrop-blur-2xl rounded-2xl border border-border p-4 md:p-6 shadow-2xl"
//       >
//         {/* Background Grid */}
//         <div className="absolute inset-0 bg-hero-grid-dark opacity-5"></div>
//
//         {/* Widgets Grid */}
//         <div className="grid grid-cols-6 grid-rows-4 gap-4 h-full">
//           {/* People Counting (Line Chart) */}
//           <div className="col-span-3 row-span-2 bg-muted/50 rounded-lg p-3 flex flex-col">
//             <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Users size={12}/><span>ترافیک افراد (لحظه‌ای)</span></h4>
//             <div className="flex-grow"><MiniAreaChart /></div>
//           </div>
//
//           {/* Traffic Counter (Donut Chart) */}
//           <div className="col-span-2 row-span-2 bg-muted/50 rounded-lg p-3 flex flex-col">
//             <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Car size={12}/><span>طبقه‌بندی خودروها</span></h4>
//             <div className="flex-grow"><MiniDonutChart /></div>
//           </div>
//
//           {/* Drone Telemetry */}
//           <div className="col-span-1 row-span-4 bg-muted/50 rounded-lg p-3 flex flex-col justify-around text-center">
//             <h4 className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Rocket size={12}/><span>پهپاد VTOL X1</span></h4>
//             <div><p className="text-2xl font-bold">120<span className="text-xs">m</span></p><p className="text-xs text-muted-foreground">ارتفاع</p></div>
//             <div><p className="text-2xl font-bold">45<span className="text-xs">km/h</span></p><p className="text-xs text-muted-foreground">سرعت</p></div>
//             <div><p className="text-2xl font-bold">85<span className="text-xs">%</span></p><p className="text-xs text-muted-foreground">باتری</p></div>
//             <div><p className="text-2xl font-bold">92<span className="text-xs">%</span></p><p className="text-xs text-muted-foreground">سیگنال</p></div>
//           </div>
//
//           {/* People by Location (Bar Chart) */}
//           <div className="col-span-3 row-span-2 bg-muted/50 rounded-lg p-3 flex flex-col">
//             <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-1"><Users size={12}/><span>تراکم افراد بر اساس مکان</span></h4>
//             <div className="flex-grow"><MiniBarChart /></div>
//           </div>
//
//           {/* Datalogger Status */}
//           <div className="col-span-2 row-span-2 bg-muted/50 rounded-lg p-3 flex flex-col justify-center items-center text-center">
//              <h4 className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2"><Database size={12}/><span>وضعیت دیتالاگرها</span></h4>
//              <Wifi size={48} className="text-secondary" style={{filter: 'drop-shadow(0 0 10px hsl(var(--secondary)))'}} />
//              <p className="mt-2 text-2xl font-bold">۵۱۲ <span className="text-sm">/ ۵۲۰</span></p>
//              <p className="text-xs text-muted-foreground">دستگاه آنلاین</p>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };
//
// export default DashboardShowcase;