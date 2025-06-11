import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps {
  images: { image: string; title: string; description: string }[];
  className?: string;
}

export default function Carousel({ images, className = "" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [isPaused, images.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className={`relative w-full h-44 sm:h-52 md:h-64 lg:h-72 mx-auto rounded-lg shadow-lg overflow-hidden ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <AnimatePresence mode="wait">
        {images.map((slide, index) =>
          index === currentIndex ? (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/20 p-4 sm:p-8 flex flex-col items-center text-white">
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-2xl font-bold"
                >
                  {slide.title}
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="mt-1 text-xs sm:text-lg text-center"
                >
                  {slide.description}
                </motion.p>
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition"
                >
                  &#9665;
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 sm:p-3 rounded-full hover:bg-gray-700 transition"
                >
                  &#9655;
                </button>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1 sm:space-x-2">
        {images.map((_, index) => (
          <span
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-transform ${
              index === currentIndex ? 'bg-white scale-125' : 'bg-gray-400'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
