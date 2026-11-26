
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

  return (
    <div className="fixed top-0 left-0 w-full h-screen" style={{ zIndex: -1 }} aria-hidden="true">
      <div className="absolute top-0 left-0 w-full h-full bg-black"></div>
      <AnimatePresence>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
        >
          <Image
            src={images[currentImageIndex]}
            alt="Background Image"
            layout="fill"
            objectFit="cover"
            quality={80}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default BackgroundImageSlideshow;
