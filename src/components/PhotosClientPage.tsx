'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollbarWidth } from '@/context/ScrollbarWidthContext';
import { optimizedImage } from '@/lib/optimizedImage';
import FadeInImage from './FadeInImage';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Photo {
  src: string;
  alt: string;
  dominantBgColor: string; // Background color for modal
}

const rawPhotos: Photo[] = [
  { src: '/images/trip_eu_1.jpg', alt: 'ヨーロッパの街並み。', dominantBgColor: '#ADD8E6' },
  { src: '/images/trip_eu_2.jpg', alt: 'アルハンブラ宮殿。', dominantBgColor: '#ecca9aff' },
  { src: '/images/trip_eu_3.jpg', alt: '巨大アーチえろい。', dominantBgColor: '#73643eff' },
  { src: '/images/trip_eu_4.jpg', alt: 'スカルパ。', dominantBgColor: '#484f49ff' },
  { src: '/images/trip_eu_5.jpg', alt: 'ベネチアの肥えたにゃお。', dominantBgColor: '#3a948bff' },
  { src: '/images/trip_japan_1.jpg', alt: '夏。海。', dominantBgColor: '#c6eeffff' },
  { src: '/images/trip_japan_10.jpg', alt: 'ゆらゆら。', dominantBgColor: '#ffffffff' },
  { src: '/images/trip_kumano_1.jpg', alt: 'つぼ湯が待ってる。', dominantBgColor: '#8B4513' },
  { src: '/images/trip_kumano_2.jpg', alt: 'お伊勢様。', dominantBgColor: '#34463491' },
  { src: '/images/trip_kumano_3.jpg', alt: 'かつての軍事拠点。', dominantBgColor: '#916553ff' },
  { src: '/images/trip_kumano_4.jpg', alt: '熊野古道。大門坂。', dominantBgColor: '#39503aff' },
  { src: '/images/trip_kumano_5.jpg', alt: '熊野古道。', dominantBgColor: '#3f3833ff' },
  { src: '/images/trip_kumano_6.jpg', alt: '日本の原生林。', dominantBgColor: '#453e38ff' },
  { src: '/images/trip_kyoto.JPG', alt: 'ゆく河の流れは絶えずして。', dominantBgColor: '#643b64ff' },
  { src: '/images/trip_snow.jpg', alt: 'おはよう。', dominantBgColor: '#F0F8FF' },
  { src: '/images/trip_tokaido_1.jpg', alt: '東海道完走。', dominantBgColor: '#000000ff' },
  { src: '/images/trip_tokaido_2.jpg', alt: 'よき眺めかな。', dominantBgColor: '#bcd688ff' },
  { src: '/images/trip_tokaido_3.jpg', alt: '箱根を超えて、一安心。', dominantBgColor: '#ae7236ff' },
  { src: '/images/trip_tokaido_4.jpg', alt: '関宿。おすすめ。', dominantBgColor: '#49170eff' },
  { src: '/images/trip_tokaido_5.jpg', alt: '鈴鹿の峠越え。', dominantBgColor: '#273a2dff' },
  { src: '/images/trip_usa_1.jpg', alt: 'ロス。', dominantBgColor: '#2b4f6dff' },
  { src: '/images/trip_usa_2.jpg', alt: 'シーランチ。', dominantBgColor: '#345250ff' },
  { src: '/images/trip_usa_3.jpg', alt: 'あついって。', dominantBgColor: '#ff0000ff' },
  { src: '/images/trip_usa_4.jpg', alt: 'でかいって。', dominantBgColor: '#00aaffff' },
  { src: '/images/trip_usa_5.jpg', alt: 'あめりかんどりーむ。', dominantBgColor: '#d3e049ff' },
  { src: '/images/trip_usa_6.jpg', alt: '金持ち。', dominantBgColor: '#2b7432ff' },
  { src: '/images/trip_usa_7.jpg', alt: 'ロケーション良し。', dominantBgColor: '#bc7ebaff' },
  { src: '/images/trip_usa_8.jpg', alt: 'わおん。', dominantBgColor: '#257cc4ff' },
  { src: '/images/film_bw_1.jpg', alt: 'ストライダー。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_2.jpg', alt: 'がらくた。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_3.jpg', alt: '水墨画の世界。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_4.jpg', alt: '。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_5.jpg', alt: '曳舟。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_6.jpg', alt: '神田。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_7.jpg', alt: '館山。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_8.jpg', alt: '空を飛べるらしい。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_9.jpg', alt: 'ななな。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_10.jpg', alt: 'やあ。', dominantBgColor: '#232024' },
  { src: '/images/film_bw_11.jpg', alt: 'SHIBUYA。', dominantBgColor: '#232024' },
  { src: '/images/film_color_1.jpg', alt: '隅田川。', dominantBgColor: '#6c394dff' },
  { src: '/images/film_color_2.jpg', alt: '夏の思い出。', dominantBgColor: '#578a57ff' },
  { src: '/images/film_color_3.jpg', alt: '青い空と白い雲、ホームタウン。', dominantBgColor: '#153715ff' },
  { src: '/images/film_color_4.jpg', alt: 'じうそんせ。', dominantBgColor: '#411010ff' },
  { src: '/images/film_color_5.jpg', alt: '大学のあ黄。', dominantBgColor: '#756c28ff' },
  { src: '/images/film_color_6.jpg', alt: 'ぼくのいえ。', dominantBgColor: '#765244ff' },
  { src: '/images/film_color_7.jpg', alt: 'ほしいいえ。', dominantBgColor: '#152911ff' },
  { src: '/images/film_color_8.jpg', alt: 'はしれはしれ。', dominantBgColor: '#000000ff' },
  { src: '/images/film_color_9.jpg', alt: 'ずがたかいぞ。', dominantBgColor: '#895858ff' },
  { src: '/images/film_color_10.jpg', alt: 'むこうじまへ逢いに。', dominantBgColor: '#6b5e5eff' },
  { src: '/images/film_color_11.jpg', alt: '巣鴨。', dominantBgColor: '#3d4848ff' },
  { src: '/images/film_color_12.jpg', alt: 'ほねほねざうるす。', dominantBgColor: '#333c44ff' },
  { src: '/images/film_color_13.jpg', alt: '今日の晩御飯は玉子焼き。', dominantBgColor: '#c8c48dff' },
  { src: '/images/film_color_14.jpg', alt: 'あらかわ。', dominantBgColor: '#554958ff' },
  { src: '/images/film_color_15.jpg', alt: 'ウサインボルト。', dominantBgColor: '#4d917aff' },
];

const initialPhotos: Photo[] = rawPhotos.map((p) => ({ ...p, src: optimizedImage(p.src) }));

const NavigationButton = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
  <button
    onClick={(e) => {
      e.stopPropagation();
      onClick();
    }}
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === 'left' ? 'left-4' : 'right-4'
    } z-[1001] bg-black/30 text-white p-3 rounded-full hover:bg-black/50 transition-colors`}
  >
    {direction === 'left' ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
);

export default function PhotosClientPage() {
  const { scrollbarWidth } = useScrollbarWidth();
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  useEffect(() => {
    const updateSliderWidth = () => {
      if (sliderContainerRef.current) {
        setSliderWidth(sliderContainerRef.current.offsetWidth);
      }
    };

    updateSliderWidth();

    window.addEventListener('resize', updateSliderWidth);

    return () => {
      window.removeEventListener('resize', updateSliderWidth);
    };
  }, [selectedPhotoIndex]);


    const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const getTextColor = (bgColor: string) => {
    if (!bgColor.startsWith('#')) {
      return '#232024'; // Default to dark gray
    }
    const hex = bgColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    if (brightness > 180) {
      return '#232024'; // Very bright background -> dark text
    } else if (brightness > 60) {
      return '#FFFFFF'; // Mid-range background -> white text
    } else {
      return '#CCCCCC'; // Very dark background -> light gray text
    }
  };

  const openModal = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const goToNextPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prevIndex) => {
        if (prevIndex === null) return 0; // If somehow null, go to first photo
        return (prevIndex + 1) % initialPhotos.length;
      });
    }
  }, [selectedPhotoIndex]);

  const goToPrevPhoto = useCallback(() => {
    if (selectedPhotoIndex !== null) {
      setSelectedPhotoIndex((prevIndex) => {
        if (prevIndex === null) return initialPhotos.length - 1; // If somehow null, go to last photo
        return prevIndex === 0 ? initialPhotos.length - 1 : prevIndex - 1;
      });
    }
  }, [selectedPhotoIndex]);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (selectedPhotoIndex !== null) {
      if (event.key === 'ArrowRight') {
        goToNextPhoto();
      } else if (event.key === 'ArrowLeft') {
        goToPrevPhoto();
      } else if (event.key === 'Escape') {
        closeModal();
      }
    }
  }, [selectedPhotoIndex, goToNextPhoto, goToPrevPhoto, closeModal]);

  useEffect(() => {
    if (selectedPhotoIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedPhotoIndex, scrollbarWidth, handleKeyDown]);

  const currentPhoto = selectedPhotoIndex !== null ? initialPhotos[selectedPhotoIndex] : null;
  const slideWidth = sliderWidth * 0.8;
  const gap = sliderWidth * 0.1;

  return (
    <main className="bg-[#ffffff] text-[#232024] py-20 px-4 md:px-8 lg:px-16 min-h-screen">
      <div className="max-w-full mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-12 mt-24 text-center">
          Gallary
        </h1>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8 gap-px">
          {initialPhotos.map((photo, index) => (
            <div
              key={index}
              data-hover-image
              className="relative aspect-square overflow-hidden cursor-pointer"
              onClick={() => openModal(index)}
            >
              <FadeInImage
                src={photo.src}
                alt={photo.alt}
                width={300}
                height={300}
                quality={70}
                className="object-cover w-full h-full filter grayscale transition-all duration-300 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedPhotoIndex !== null && currentPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, backgroundColor: hexToRgba(currentPhoto.dominantBgColor, 0.8) }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000]"
            onClick={closeModal}
            transition={{ backgroundColor: { duration: 1.0, ease: "linear" } }}
          >
            <NavigationButton direction="left" onClick={goToPrevPhoto} />
            <NavigationButton direction="right" onClick={goToNextPhoto} />
            <div
              ref={sliderContainerRef}
              className="relative w-full h-full overflow-visible"
            >
              <motion.div
                className="flex h-full items-center"
                initial={{ x: -(selectedPhotoIndex * (slideWidth + gap)) + (sliderWidth - slideWidth) / 2 }}
                animate={{ x: -(selectedPhotoIndex * (slideWidth + gap)) + (sliderWidth - slideWidth) / 2 }}
                transition={{ type: 'tween', duration: 0.5 }}
              >
                {initialPhotos.map((photo, index) => {
                  const textColor = getTextColor(photo.dominantBgColor);
                  return (
                    <div
                      key={index}
                      className="flex-shrink-0 flex items-center justify-center transition-all duration-500"
                      style={{
                        width: slideWidth,
                        marginRight: gap,
                        opacity: index === selectedPhotoIndex ? 1 : 0.3,
                        transform: `scale(${index === selectedPhotoIndex ? 1 : 0.8})`,
                      }}
                    >
                      <div className="relative w-auto h-[80vh] rounded-lg overflow-hidden flex items-center justify-center">
                        <FadeInImage
                          src={photo.src}
                          alt={photo.alt}
                          width={1600}
                          height={1200}
                          quality={90}
                          className="object-contain w-auto h-full"
                        />
                        <div className="absolute bottom-0 left-0 p-4" style={{ color: textColor }}>
                          <h2 className="text-lg sm:text-xl font-normal" style={{ fontFamily: '"Shippori Mincho", serif' }}>{photo.alt}</h2>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
