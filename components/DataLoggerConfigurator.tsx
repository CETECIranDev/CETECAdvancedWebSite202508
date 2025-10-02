// components/DataLoggerConfigurator.tsx
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptionSelector from './configurator/OptionSelector';
import Counter from './configurator/Counter';
import { ArrowLeft, ArrowRight, Database, Send } from 'lucide-react';

// Define types for configuration
interface Config {
  model: string;
  analogInputs: number;
  digitalInputs: number;
  relayOutputs: number;
  connectivity: string;
  samplingRate: string;
  memory: string;
}
// --- Types and Constants ---
export interface DataLoggerConfig { // Exporting for use in the parent page
  model: 'base' | 'pro';
  analogInputs: number;
  digitalInputs: number;
  relayOutputs: number;
  connectivity: 'none' | 'modbus' | 'lte';
  samplingRate: '1hz' | '10hz' | '100hz' | '1khz';
  memory: '32mb' | '64mb' | '128mb';
}

// Define pricing for each option
const PRICING = {
  model: { base: 1000, pro: 1500 },
  analogInputs: 50,
  digitalInputs: 25,
  relayOutputs: 40,
  connectivity: { none: 0, modbus: 200, lte: 400 },
  samplingRate: { '1hz': 0, '10hz': 100, '100hz': 250 },
  memory: { '32mb': 0, '64mb': 75, '128mb': 150 },
};


const STEPS = [
  "مدل پایه",
  "ورودی‌ها",
  "خروجی‌ها و ارتباطات",
  "ویژگی‌های نرم‌افزاری",
  "خلاصه و ارسال",
];
interface DataLoggerConfiguratorProps {
  initialConfig: DataLoggerConfig;
}

const DataLoggerConfigurator: React.FC<DataLoggerConfiguratorProps> = ({ initialConfig }) => {
  const [step, setStep] = useState(0);
  const [config, setConfig] = useState<DataLoggerConfig>(initialConfig);

  // When the initialConfig prop changes, reset the state
  useEffect(() => {
    setConfig(initialConfig);
    setStep(0); // Go back to the first step
  }, [initialConfig]);


  const updateConfig = <K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const totalPrice = useMemo(() => {
    let price = 0;
    price += PRICING.model[config.model as keyof typeof PRICING.model];
    price += config.analogInputs * PRICING.analogInputs;
    price += config.digitalInputs * PRICING.digitalInputs;
    price += config.relayOutputs * PRICING.relayOutputs;
    price += PRICING.connectivity[config.connectivity as keyof typeof PRICING.connectivity];
    price += PRICING.samplingRate[config.samplingRate as keyof typeof PRICING.samplingRate];
    price += PRICING.memory[config.memory as keyof typeof PRICING.memory];
    return price;
  }, [config]);

  const direction = 1; // For animation direction

  return (
    <div className="w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Visual Representation & Price */}
      <div className="sticky top-24">
        <h2 className="text-3xl font-bold mb-4 text-foreground">دیتالاگر سفارشی شما</h2>
        <div className="relative w-full aspect-square bg-card border border-border rounded-2xl flex items-center justify-center p-8">
          <Database size={128} className="text-primary opacity-20" />
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute text-center"
          >
            <p className="text-lg font-semibold">{STEPS[step]}</p>
            <p className="text-sm text-muted-foreground">{step + 1} از {STEPS.length}</p>
          </motion.div>
        </div>
        <div className="mt-6 p-6 bg-muted rounded-xl">
          <p className="text-muted-foreground">قیمت تخمینی:</p>
          <motion.p key={totalPrice} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-4xl font-bold text-primary">
            {totalPrice.toLocaleString('fa-IR')} تومان
          </motion.p>
        </div>
      </div>

      {/* Right Column: Configuration Steps */}
      <div className="relative overflow-hidden p-8 bg-card border border-border rounded-2xl min-h-[600px]">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-8 left-8 right-8"
          >
            {step === 0 && (
              <OptionSelector title="مدل پایه را انتخاب کنید" options={[ { value: 'base', label: 'DL-100 Base', description: 'برای کاربردهای عمومی' }, { value: 'pro', label: 'DL-200 Pro', description: 'پردازنده قوی‌تر و ماژولار' } ]} selectedValue={config.model} onChange={(v) => updateConfig('model', v)} />
            )}
            {step === 1 && (
              <div className="space-y-8">
                <Counter title="تعداد ورودی آنالوگ (0-10V)" value={config.analogInputs} onChange={(v) => updateConfig('analogInputs', v)} />
                <Counter title="تعداد ورودی دیجیتال" value={config.digitalInputs} onChange={(v) => updateConfig('digitalInputs', v)} />
              </div>
            )}
            {step === 2 && (
                <div className="space-y-8">
                    <Counter title="تعداد خروجی رله" value={config.relayOutputs} onChange={(v) => updateConfig('relayOutputs', v)} />
                    <OptionSelector title="پروتکل ارتباطی" options={[ { value: 'none', label: 'بدون ارتباط', description: 'فقط ذخیره‌سازی محلی' }, { value: 'modbus', label: 'Modbus RTU', description: 'استاندارد صنعتی' }, { value: 'lte', label: 'شبکه 4G/LTE', description: 'انتقال داده بی‌سیم' } ]} selectedValue={config.connectivity} onChange={(v) => updateConfig('connectivity', v)} />
                </div>
            )}
            {step === 3 && (
                <div className="space-y-8">
                    <OptionSelector title="نرخ نمونه‌برداری" options={[ { value: '1hz', label: '۱ هرتز', description: 'مناسب فرآیندهای کند' }, { value: '10hz', label: '۱۰ هرتز', description: 'استاندارد' }, { value: '100hz', label: '۱۰۰ هرتز', description: 'برای داده‌های سریع' } ]} selectedValue={config.samplingRate} onChange={(v) => updateConfig('samplingRate', v)} />
                    <OptionSelector title="حافظه داخلی" options={[ { value: '32mb', label: '۳۲ مگابایت', description: 'حدود ۱ میلیون رکورد' }, { value: '64mb', label: '۶۴ مگابایت', description: 'حدود ۲ میلیون رکورد' }, { value: '128mb', label: '۱۲۸ مگابایت', description: 'حدود ۴ میلیون رکورد' } ]} selectedValue={config.memory} onChange={(v) => updateConfig('memory', v)} />
                </div>
            )}
            {step === 4 && (
                <div>
                    <h2 className="text-2xl font-bold mb-4">خلاصه سفارش شما</h2>
                    <ul className="space-y-2 text-muted-foreground">
                        <li><strong>مدل:</strong> {config.model === 'base' ? 'DL-100 Base' : 'DL-200 Pro'}</li>
                        <li><strong>ورودی آنالوگ:</strong> {config.analogInputs} عدد</li>
                        <li><strong>ورودی دیجیتال:</strong> {config.digitalInputs} عدد</li>
                        <li><strong>خروجی رله:</strong> {config.relayOutputs} عدد</li>
                        <li><strong>ارتباطات:</strong> {config.connectivity}</li>
                        <li><strong>نرخ نمونه‌برداری:</strong> {config.samplingRate}</li>
                        <li><strong>حافظه:</strong> {config.memory}</li>
                    </ul>
                    <p className="mt-6 text-sm text-muted-foreground">برای دریافت پیش‌فاکتور نهایی و مشاوره فنی، اطلاعات خود را وارد کرده و درخواست را ارسال کنید.</p>
                    {/* Add a simple contact.json form here */}
                    <form className="mt-4 space-y-4">
                        <input type="text" placeholder="نام و نام خانوادگی" className="w-full p-3 bg-muted rounded-lg border border-border" />
                        <input type="email" placeholder="ایمیل" className="w-full p-3 bg-muted rounded-lg border border-border" />
                        <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-3 rounded-lg">ارسال درخواست <Send size={18} /></button>
                    </form>
                </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="absolute bottom-8 left-8 right-8 flex justify-between">
            <button onClick={() => setStep(s => Math.max(0, s - 1))} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-muted hover:bg-accent disabled:opacity-50" disabled={step === 0}>
                <ArrowLeft size={16} /> قبلی
            </button>
            <button onClick={() => setStep(s => Math.min(STEPS.length - 1, s + 1))} className="flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50" disabled={step === STEPS.length - 1}>
                بعدی <ArrowRight size={16} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default DataLoggerConfigurator;