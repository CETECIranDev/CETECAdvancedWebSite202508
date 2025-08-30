// components/ProductHighlight.tsx
import React from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductHighlightProps {
  title: string;
  description: string;
  image: string;
  link: string;
  reverse?: boolean; // To alternate image/text position
  delay?: number;
}

const HighlightContainer = styled(motion.div)<{ reverse?: boolean }>`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  gap: 4rem;
  margin-bottom: 8rem;
  text-align: ${({ reverse }) => (reverse ? 'right' : 'left')};

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 992px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
    margin-bottom: 5rem;
  }
`;

const ImageWrapper = styled(motion.div)`
  flex: 1;
  min-width: 400px;
  max-width: 550px;
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);

  img {
    border-radius: 20px;
    width: 100%;
    height: auto;
    display: block;
  }

  @media (max-width: 992px) {
    min-width: unset;
    max-width: 100%;
  }
`;

const ContentWrapper = styled(motion.div)`
  flex: 1;
  padding: 1.5rem 0;

  @media (max-width: 992px) {
    padding: 0;
  }
`;

const ProductTitle = styled(motion.h3)`
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  font-weight: 700;
`;

const ProductDescription = styled(motion.p)`
  font-size: 1.15rem;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1.8;
  margin-bottom: 2rem;
`;

const ViewProductButton = styled(motion.a)`
  display: inline-block;
  background: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`};
  color: white;
  padding: 0.9rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    filter: brightness(1.1);
  }
`;

export const ProductHighlight: React.FC<ProductHighlightProps> = ({
  title,
  description,
  image,
  link,
  reverse,
  delay = 0,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: delay + 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <HighlightContainer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      reverse={reverse}
    >
      <ImageWrapper
        variants={itemVariants}
        whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
      >
        <Image src={image} alt={title} width={600} height={400} objectFit="cover" />
      </ImageWrapper>
      <ContentWrapper variants={containerVariants}>
        <ProductTitle variants={itemVariants}>{title}</ProductTitle>
        <ProductDescription variants={itemVariants}>{description}</ProductDescription>
        <Link href={link} passHref>
          <ViewProductButton
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {'مشاهده محصول →'}
          </ViewProductButton>
        </Link>
      </ContentWrapper>
    </HighlightContainer>
  );
};