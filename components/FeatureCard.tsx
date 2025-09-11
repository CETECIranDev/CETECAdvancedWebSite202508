// components/FeatureCard.tsx (Updated)
import React from 'react';
import styled from 'styled-components';
import { motion, HTMLMotionProps } from 'framer-motion';

interface FeatureCardProps extends HTMLMotionProps<"div"> {
  title: string;
  description: string;
  icon: string; // Emoji, SVG, or Image path
}

const CardContainer = styled(motion.div)`
  background-color: ${({ theme }) => theme.colors.cardBackground};
  border-radius: 20px; // More rounded
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1); // Stronger shadow
  transition: all 0.4s ease;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.borderColor}; // Subtle border

  &:hover {
    transform: translateY(-15px) scale(1.02); // More pronounced lift
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); // Stronger shadow on hover
    background-color: ${({ theme }) => theme.mode === 'dark' ? '#222' : '#f0f0f0'}; // Subtle background change
  }
`;

const IconWrapper = styled(motion.div)`
  font-size: 3.5rem; // Larger icon
  margin-bottom: 1.5rem;
  line-height: 1;
`;

const FeatureTitle = styled.h3`
  font-size: 1.7rem; // Larger title
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 0.8rem;
  font-weight: 700;
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.7;
`;

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon,
  ...props
}) => {
  return (
    <CardContainer {...props} whileHover={{ y: -15, scale: 1.02 }}>
      <IconWrapper
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: props.transition?.delay || 0.1 }}
      >
        {icon}
      </IconWrapper>
      <FeatureTitle>{title}</FeatureTitle>
      <FeatureDescription>{description}</FeatureDescription>
    </CardContainer>
  );
};