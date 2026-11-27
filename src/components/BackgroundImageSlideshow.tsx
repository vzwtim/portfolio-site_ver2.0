import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  '/images/trip_eu_1.jpg',
  '/images/trip_eu_2.jpg',
  '/images/trip_eu_3.jpg',
  '/images/film_color_1.jpg',
  '/images/film_color_2.jpg',
];

const BackgroundImageSlideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // NOTE: no negative z-index here. The layout wrapper (ClientLayout) paints
  // a bg-white background, and a z-index:-1 layer falls behind that background
  // and disappears (whiteout). Keep the layer in normal stacking order, as in
  // the original design; the white content sections below are positioned and
  // later in the DOM, so they still paint above it.
  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-screen" aria-hidden="true">
      <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentImageIndex]}
            alt=""
            fill
            sizes="100vw"
            style={{ objectFit: 'cover' }}
            quality={80}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundImageSlideshow;
