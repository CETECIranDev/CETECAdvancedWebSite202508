import React, { useRef } from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Send, UserPlus } from 'lucide-react';

// --- Type Definitions for Form Data ---
type ContactFormData = {
  fullName: string;
  email: string;
  subject: string;
  message: string;
};

type CollaborationFormData = {
  fullName: string;
  email: string;
  expertise: string;
  resume: FileList;
};

// --- Contact Form Component ---
const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();
  const onSubmit: SubmitHandler<ContactFormData> = (data) => {
    // Replace with your actual form submission logic (e.g., API call)
    console.log("Contact Form Data:", data);
    alert('پیام شما با موفقیت ارسال شد!');
  };

  return (
    <motion.form 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-muted-foreground mb-2">نام و نام خانوادگی</label>
          <input {...register("fullName", { required: "نام کامل الزامی است." })} type="text" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">ایمیل</label>
          <input {...register("email", { required: "ایمیل الزامی است.", pattern: { value: /^\S+@\S+$/i, message: "فرمت ایمیل نامعتبر است." } })} type="email" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-muted-foreground mb-2">موضوع</label>
        <input {...register("subject", { required: "موضوع پیام الزامی است." })} type="text" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
        {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">پیام شما</label>
        <textarea {...register("message", { required: "متن پیام الزامی است." })} rows={5} className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all"></textarea>
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
        ارسال پیام <Send size={18} />
      </button>
    </motion.form>
  );
};

// --- Collaboration Form Component ---
const CollaborationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CollaborationFormData>();
    const onSubmit: SubmitHandler<CollaborationFormData> = (data) => {
      console.log("Collaboration Form Data:", data);
      alert('درخواست همکاری شما با موفقیت ارسال شد!');
    };

  return (
    <motion.form 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label htmlFor="collaboration-fullName" className="block text-sm font-medium text-muted-foreground mb-2">نام و نام خانوادگی</label>
          <input id="collaboration-fullName" {...register("fullName", { required: "نام کامل الزامی است." })} type="text" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>}
        </div>
        <div>
          <label htmlFor="collaboration-email" className="block text-sm font-medium text-muted-foreground mb-2">ایمیل</label>
          <input id="collaboration-email" {...register("email", { required: "ایمیل الزامی است." })} type="email" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="expertise" className="block text-sm font-medium text-muted-foreground mb-2">حوزه تخصص</label>
        <input {...register("expertise", { required: "حوزه تخصص الزامی است." })} type="text" placeholder="مثال: هوش مصنوعی، مهندسی نرم‌افزار" className="w-full p-3 bg-muted border border-border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition-all" />
        {errors.expertise && <p className="text-red-500 text-sm mt-1">{errors.expertise.message}</p>}
      </div>
       <div>
        <label htmlFor="resume" className="block text-sm font-medium text-muted-foreground mb-2">فایل رزومه (PDF)</label>
        <input {...register("resume", { required: "ارسال رزومه الزامی است." })} type="file" accept=".pdf" className="w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30 cursor-pointer" />
        {errors.resume && <p className="text-red-500 text-sm mt-1">{errors.resume.message}</p>}
      </div>
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
        ارسال درخواست <UserPlus size={18} />
      </button>
    </motion.form>
  );
};

// --- Main Tabs Component ---
const ContactForms = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'collaboration'>('contact');

  return (
    <div id="collaboration-form" className="w-full max-w-3xl mx-auto">
      <div className="flex border-b border-border mb-8">
        <button 
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 text-lg font-semibold relative transition-colors ${activeTab === 'contact' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          ارتباط با ما
          {activeTab === 'contact' && <motion.div layoutId="underline" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('collaboration')}
          className={`px-6 py-3 text-lg font-semibold relative transition-colors ${activeTab === 'collaboration' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        >
          همکاری با ما
          {activeTab === 'collaboration' && <motion.div layoutId="underline" className="absolute bottom-[-1px] left-0 right-0 h-1 bg-primary" />}
        </button>
      </div>
      
      <AnimatePresence mode="wait">
        <div key={activeTab}>
          {activeTab === 'contact' ? <ContactForm /> : <CollaborationForm />}
        </div>
      </AnimatePresence>
    </div>
  );
};

export default ContactForms;