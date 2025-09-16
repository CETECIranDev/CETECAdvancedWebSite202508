// components/ContactCard.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  actionText?: string;
  onActionClick?: () => void;
  delay?: number;
}

const ContactCard: React.FC<ContactCardProps> = ({ icon, title, content, actionText, onActionClick, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-card p-8 rounded-2xl border border-border flex flex-col items-center text-center"
    >
      <div className="bg-primary/10 text-primary p-4 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground flex-grow">{content}</p>
      {actionText && onActionClick && (
        <button
          onClick={onActionClick}
          className="mt-6 font-semibold text-primary hover:underline"
        >
          {actionText}
        </button>
      )}
    </motion.div>
  );
};

export default ContactCard;