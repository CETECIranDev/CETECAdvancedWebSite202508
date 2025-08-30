// components/ContactForms.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, UserPlus } from 'lucide-react';

type ContactFormData = {
  fullName: string;
  email: string;
  message: string;
};

type CollaborationFormData = {
  fullName: string;
  email: string;
  expertise: string;
  resume: FileList;
};

const ContactForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ContactFormData>();
  const onSubmit = (data: ContactFormData) => console.log(data); // Replace with actual submission logic

  return (
    <motion.form 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-subtle-dark mb-2">نام و نام خانوادگی</label>
        <input {...register("fullName", { required: true })} type="text" className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none" />
        {errors.fullName && <span className="text-red-400 text-sm mt-1">این فیلد الزامی است.</span>}
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-subtle-dark mb-2">ایمیل</label>
        <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} type="email" className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none" />
        {errors.email && <span className="text-red-400 text-sm mt-1">لطفا یک ایمیل معتبر وارد کنید.</span>}
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-subtle-dark mb-2">پیام شما</label>
        <textarea {...register("message", { required: true })} rows={4} className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none"></textarea>
        {errors.message && <span className="text-red-400 text-sm mt-1">این فیلد الزامی است.</span>}
      </div>
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-primary-dark hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
        ارسال پیام <Send size={18} />
      </button>
    </motion.form>
  );
};

const CollaborationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<CollaborationFormData>();
    const onSubmit = (data: CollaborationFormData) => console.log(data);

  return (
    <motion.form 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6"
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-subtle-dark mb-2">نام و نام خانوادگی</label>
        <input {...register("fullName", { required: true })} type="text" className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none" />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-subtle-dark mb-2">ایمیل</label>
        <input {...register("email", { required: true })} type="email" className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none" />
      </div>
      <div>
        <label htmlFor="expertise" className="block text-sm font-medium text-subtle-dark mb-2">حوزه تخصص</label>
        <input {...register("expertise", { required: true })} type="text" placeholder="مثال: هوش مصنوعی، مهندسی نرم‌افزار" className="w-full p-3 bg-background-dark border border-border-dark rounded-lg focus:ring-2 focus:ring-primary-dark focus:outline-none" />
      </div>
       <div>
        <label htmlFor="resume" className="block text-sm font-medium text-subtle-dark mb-2">رزومه (PDF)</label>
        <input {...register("resume", { required: true })} type="file" accept=".pdf" className="w-full text-sm text-subtle-dark file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-dark/20 file:text-primary-dark hover:file:bg-primary-dark/30" />
      </div>
      <button type="submit" className="w-full flex items-center justify-center gap-2 bg-secondary-dark hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg transition-all duration-300 shadow-lg">
        ارسال درخواست <UserPlus size={18} />
      </button>
    </motion.form>
  );
};


const ContactForms = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'collaboration'>('contact');

  return (
    <div id="contact-section" className="w-full max-w-2xl mx-auto">
      <div className="flex border-b border-border-dark mb-8">
        <button 
          onClick={() => setActiveTab('contact')}
          className={`px-6 py-3 text-lg font-semibold relative transition-colors ${activeTab === 'contact' ? 'text-primary-dark' : 'text-subtle-dark hover:text-text-dark'}`}
        >
          ارتباط با ما
          {activeTab === 'contact' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-dark" />}
        </button>
        <button 
          onClick={() => setActiveTab('collaboration')}
          className={`px-6 py-3 text-lg font-semibold relative transition-colors ${activeTab === 'collaboration' ? 'text-primary-dark' : 'text-subtle-dark hover:text-text-dark'}`}
        >
          همکاری با ما
          {activeTab === 'collaboration' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-dark" />}
        </button>
      </div>
      
      <div>
        {activeTab === 'contact' ? <ContactForm /> : <CollaborationForm />}
      </div>
    </div>
  );
};

export default ContactForms;