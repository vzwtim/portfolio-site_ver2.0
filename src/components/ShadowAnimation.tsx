'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SakuraPetal from './SakuraPetal';
// import { useCursor } from '@/context/CursorContext'; // removed
// import useRepelEffect from '@/hooks/useRepelEffect'; // removed

const ShadowAnimation: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const reducedMotion = useReducedMotion();
  const numberOfPetals = 12;

  // useRepelEffect related hooks removed

  return (
    <div className="footerScene">
      <div className="footerLandscape relative w-full overflow-hidden" aria-hidden="true">
      <div className="footerWorld">
      {/* 背景画像 */}
      <motion.img
        src="/images/back.svg"
        alt="Panoramic Silhouette Landscape"
        className="footerPanorama block"
        style={{ width: '100%', height: 'auto', marginTop: 0 }}
      />

      {/* 花びら（モバイル非表示） */}
      <div className="footerPetals hidden md:block">
        {!reducedMotion && Array.from({ length: numberOfPetals }).map((_, i) => (
          <SakuraPetal key={i} />
        ))}
      </div>

      {/* 配置するSVGファイル */}
      {/* 鹿 (deer_1.svg) */}
      <motion.img
        src="/images/deer_1.svg"
        alt="Deer Silhouette"
        className="absolute"
        style={{
          top: '57%',
          left: '11%',
          width: '8.33%',
          height: '15%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* 犬 (dog_1.svg) */}
      <motion.img
        src="/images/dog_1.svg"
        alt="Dog Silhouette"
        className="absolute"
        style={{
          top: '46%',
          left: '75%',
          width: '4.16%',
          height: '10%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* 猫 (cat_3.svg) */}
      <motion.img
        src="/images/cat_3.svg"
        alt="Cat Silhouette"
        className="absolute"
        style={{
          top: '39%',
          left: '64%',
          width: '3%',
          height: '5%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      {/* 木 (tree.svg) */}
      <motion.img
        src="/images/tree.svg"
        alt="Tree Silhouette"
        className="absolute"
        style={{ top: '15.625%', left: '65%', width: '16.66%', height: '62.5%' }}
      />
      <motion.img
        src="/images/tree.svg"
        alt="Tree Silhouette 2"
        className="absolute"
        style={{ top: '35%', left: '13%', width: '12%', height: '35%' }}
      />

      {/* 鹿 (deer_3.svg) */}
      <motion.img
        src="/images/deer_3.svg"
        alt="Deer Silhouette 2"
        className="absolute"
        style={{
          top: '60%',
          left: '80%',
          width: '7%',
          height: '25%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* 犬 (dog_3.svg) */}
      <motion.img
        src="/images/dog_3.svg"
        alt="Dog Silhouette 2"
        className="absolute"
        style={{
          top: '84%',
          left: '89%',
          width: '3%',
          height: '7%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* 猫 (cat_11.svg) */}
      <motion.img
        src="/images/cat_11.svg"
        alt="Cat Silhouette 2"
        className="absolute"
        style={{
          top: '51%',
          left: '4%',
          width: '3.33%',
          height: '6%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* 猫 (cat_4.svg) */}
      <motion.img
        src="/images/cat_4.svg"
        alt="Cat Silhouette 3"
        className="absolute"
        style={{
          top: '81%',
          left: '35%',
          width: '2.5%',
          height: '5%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* sit_1.svg */}
      <motion.img
        src="/images/sit_1.svg"
        alt="Sit Silhouette"
        className="absolute transform scale-x-[-1]"
        style={{
          top: '77%',
          left: '87%',
          width: '3%',
          height: '10%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />
      {/* walk_1.svg */}
      <motion.img
        src="/images/walk_1.svg"
        alt="Walk Silhouette"
        className="absolute"
        style={{
          top: '75%',
          left: '31%',
          width: '3%',
          height: '9%',
        }}
        whileHover={reducedMotion ? undefined : { scale: 1.1, y: -5 }}
        transition={{ type: 'spring', stiffness: 300 }}
      />

      {/* 鳥の配置 */}
      <motion.img src="/images/bird_1.svg" alt="Bird 1" className="absolute" style={{ top: '43%', left: '38%', width: '1.3%', height: 'auto' }} whileHover={reducedMotion ? undefined : { scale: 1.2, y: -10 }} transition={{ type: 'spring', stiffness: 300 }} />
      <motion.img src="/images/bird_5.svg" alt="Bird 2" className="absolute" style={{ top: '48%', left: '37%', width: '1.3%', height: 'auto' }} whileHover={reducedMotion ? undefined : { scale: 1.2, y: -10 }} transition={{ type: 'spring', stiffness: 300 }} />
      <motion.img src="/images/bird_7.svg" alt="Bird 3" className="absolute" style={{ top: '45%', left: '35%', width: '1.2%', height: 'auto' }} whileHover={reducedMotion ? undefined : { scale: 1.2, y: -10 }} transition={{ type: 'spring', stiffness: 300 }} />
      <motion.img src="/images/bird_1.svg" alt="Bird 4" className="absolute" style={{ top: '26%', left: '82%', width: '1.8%', height: 'auto' }} whileHover={reducedMotion ? undefined : { scale: 1.2, y: -10 }} transition={{ type: 'spring', stiffness: 300 }} />
      <motion.img src="/images/bird_5.svg" alt="Bird 5" className="absolute" style={{ top: '30%', left: '85%', width: '1.5%', height: 'auto' }} whileHover={reducedMotion ? undefined : { scale: 1.2, y: -10 }} transition={{ type: 'spring', stiffness: 300 }} />

      </div>
      </div>
      {children}
    </div>
  );
};

export default ShadowAnimation;
