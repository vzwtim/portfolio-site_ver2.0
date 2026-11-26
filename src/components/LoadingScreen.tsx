'use client';

import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React from 'react';

interface LoadingScreenProps {
  isLoading: boolean;
}

const containerVariants: Variants = {
  initial: { opacity: 1 },
  exit: {
    opacity: [1, 0.9, 0],
    filter: ['blur(0px)', 'blur(2px)'],
    scale: [1, 0.995, 0.99],
    transition: { duration: 0.5, ease: 'easeInOut', delay: 0 },
  },
};

const contentVariants: Variants = {
  initial: { opacity: 0, y: 16, scale: 0.95 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.33, 1, 0.68, 1] },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.65, ease: 'easeInOut', delay: 0.1 },
  },
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#471A16]"
          variants={containerVariants}
          initial="initial"
          exit="exit"
        >
          <motion.div
            className="relative flex flex-col items-center gap-1 sm:gap-1.5 text-white px-6 sm:px-10 text-center"
            variants={contentVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="relative w-[340px] sm:w-[480px] md:w-[820px] aspect-[14/5] drop-shadow-[0_18px_46px_rgba(0,0,0,0.48)]">
              <Image
                src="/images/babayudai_logo.svg"
                alt="babayudai logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <p className="text-[10px] sm:text-[11px] md:text-sm tracking-[0.26em] sm:tracking-[0.3em] uppercase text-white/85 leading-tight -mt-1">
              のぽーとふぉりおさいと
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;
