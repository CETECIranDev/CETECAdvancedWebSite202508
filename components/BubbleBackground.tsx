// components/BubbleBackground.tsx
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const bubbleAnimation = keyframes`
  0% {
    transform: translateY(0) translateX(0) scale(1);
    opacity: 0.8;
  }
  100% {
    transform: translateY(-100vh) translateX(50vw) scale(1.5);
    opacity: 0;
  }
`;

const BubbleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  z-index: 0; /* Ensure bubbles are in the background */
`;

interface BubbleProps {
  size: string;
  left: string;
  animationDelay: string;
  animationDuration: string;
  color: string;
}

const Bubble = styled(motion.div)<BubbleProps>`
  position: absolute;
  bottom: -100px;
  background-color: ${({ color }) => color};
  border-radius: 50%;
  opacity: 0.8;
  animation: ${bubbleAnimation} ${({ animationDuration }) => animationDuration} infinite ease-in-out;
  animation-delay: ${({ animationDelay }) => animationDelay};
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  left: ${({ left }) => left};
  filter: blur(2px); /* Soften the bubbles */
`;

export const BubbleBackground: React.FC = () => {
  const bubbles = Array.from({ length: 20 }).map((_, i) => {
    const size = `${Math.random() * 80 + 20}px`; // 20px to 100px
    const left = `${Math.random() * 100}%`;
    const animationDelay = `${Math.random() * 10}s`; // 0s to 10s
    const animationDuration = `${Math.random() * 20 + 10}s`; // 10s to 30s
    const color = `rgba(var(--bubble-color-rgb), ${Math.random() * 0.3 + 0.1})`; // Dynamic opacity
    return { size, left, animationDelay, animationDuration, color, key: i };
  });

  return (
    <BubbleContainer>
      {bubbles.map((bubble) => (
        <Bubble
          key={bubble.key}
          size={bubble.size}
          left={bubble.left}
          animationDelay={bubble.animationDelay}
          animationDuration={bubble.animationDuration}
          color={bubble.color}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.8, scale: 1 }}
          transition={{ duration: 0.5, delay: parseFloat(bubble.animationDelay) / 2 }}
        />
      ))}
    </BubbleContainer>
  );
};