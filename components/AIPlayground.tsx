import React,  { ReactNode , useState, useRef, useEffect } from 'react'; // <-- این خط حیاتی اضافه شد
import { motion, AnimatePresence } from 'framer-motion';
import { User, Car, Loader } from 'lucide-react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';

// Define the structure for a detected object
interface Detection {
  bbox: [number, number, number, number]; // [x, y, width, height]
  class: string;
  score: number;
}

// Now that 'React' is imported, 'JSX.Element' will be recognized.
const labelStyles: { [key: string]: { borderColor: string; textColor: string; icon: ReactNode } } = {
  person: {
    borderColor: 'hsl(var(--primary))',
    textColor: 'text-primary',
    icon: <User size={14} />,
  },
  car: {
    borderColor: 'hsl(var(--secondary))',
    textColor: 'text-secondary',
    icon: <Car size={14} />,
  },
};

const AIPlayground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>(['person', 'car']);

  // --- 1. Load the COCO-SSD model ---
  useEffect(() => {
    async function loadModel() {
      try {
        const loadedModel = await cocoSsd.load();
        setModel(loadedModel);
        setIsLoading(false);
        console.log("AI model loaded successfully.");
      } catch (err) {
        console.error("Failed to load AI model:", err);
      }
    }
    loadModel();
  }, []);

  // --- 2. Run detection on each video frame ---
  const detectFrame = async () => {
    if (!model || !videoRef.current || videoRef.current.paused || videoRef.current.ended) {
      return;
    }

    const predictions = await model.detect(videoRef.current);
    const filteredPredictions = predictions.filter(p => activeFilters.includes(p.class));
    setDetections(filteredPredictions as Detection[]);
    
    requestAnimationFrame(() => {
      detectFrame();
    });
  };
  
  // --- 3. Start detection when the video plays ---
  useEffect(() => {
    const video = videoRef.current;
    if (model && video) {
      video.addEventListener('play', detectFrame);
      return () => {
        // Clean up the event listener
        if (video) {
          video.removeEventListener('play', detectFrame);
        }
      };
    }
  }, [model, activeFilters]);

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };
  
  return (
    <div className="bg-card p-4 md:p-8 rounded-2xl border border-border shadow-2xl">
      <div className="relative w-full aspect-video overflow-hidden rounded-lg">
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 z-20">
            <Loader className="animate-spin text-primary" size={48} />
            <p className="mt-4 text-muted-foreground">در حال بارگذاری مدل هوش مصنوعی...</p>
          </div>
        )}
        <video
          ref={videoRef}
          src="/videos/street-scene-short.mp4"
          autoPlay
          loop
          muted
          playsInline
          crossOrigin="anonymous"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0">
          <AnimatePresence>
            {detections.map((detection, index) => (
              videoRef.current && ( // Ensure videoRef is available before calculating percentages
                <motion.div
                  key={`${detection.class}-${index}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.1 }}
                  className="absolute"
                  style={{
                    left: `${(detection.bbox[0] / videoRef.current.videoWidth) * 100}%`,
                    top: `${(detection.bbox[1] / videoRef.current.videoHeight) * 100}%`,
                    width: `${(detection.bbox[2] / videoRef.current.videoWidth) * 100}%`,
                    height: `${(detection.bbox[3] / videoRef.current.videoHeight) * 100}%`,
                    border: `2px solid ${labelStyles[detection.class]?.borderColor || 'hsl(var(--muted))'}`,
                    boxShadow: `0 0 10px ${labelStyles[detection.class]?.borderColor || 'hsl(var(--muted))'}`,
                  }}
                >
                  {labelStyles[detection.class] && (
                    <div
                      className={`absolute -top-7 left-0 flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-md ${labelStyles[detection.class].textColor}`}
                      style={{ backgroundColor: `hsla(var(--card), 0.8)` }}
                    >
                      {labelStyles[detection.class].icon}
                      {detection.class} ({(detection.score * 100).toFixed(0)}%)
                    </div>
                  )}
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <p className="font-semibold">فیلتر شناسایی:</p>
          <button
            onClick={() => toggleFilter('person')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
              activeFilters.includes('person') ? 'border-primary bg-primary/10' : 'border-border'
            }`}
          >
            <User size={16} className="text-primary" /> انسان‌ها
          </button>
          <button
            onClick={() => toggleFilter('car')}
            className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 transition-all ${
              activeFilters.includes('car') ? 'border-secondary bg-secondary/10' : 'border-border'
            }`}
          >
            <Car size={16} className="text-secondary" /> خودروها
          </button>
        </div>
        <div className="text-lg">
          <span className="font-bold">{detections.length}</span>
          <span className="text-muted-foreground"> آبجکت شناسایی شد</span>
        </div>
      </div>
    </div>
  );
};

export default AIPlayground;