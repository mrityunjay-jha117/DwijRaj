import { useEffect, useState } from "react";
import { motion} from "framer-motion";

type DwijPoem = {
  title: string;
  poetry: string;
  image: string;
  genre: string;
};

export default function PoetryCard() {
  const [poem, setPoem] = useState<DwijPoem | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    async function fetchPoem() {
      try {
        const res = await fetch(
          "http://127.0.0.1:8787/api/v1/dwij/bulk/random"
        );
        const json = await res.json();
        if (json.data) {
          setPoem(json.data);
        }
      } catch (err) {
        console.error("Failed to load poem", err);
      }
    }
    fetchPoem();
  }, []);

  // Enhanced loading state
  if (!poem) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.97, 1, 0.97],
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="flex flex-col items-center justify-center min-h-[300px] gap-6"
      >
        <div className="relative w-16 h-16">
          <motion.div
            className="absolute inset-0 border-4 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-0 border-4 border-t-white rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <motion.span
          className="text-lg sm:text-xl text-white/70 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          कविता ला रहे हैं...
        </motion.span>
      </motion.div>
    );
  }

  const excerpt =
    poem.poetry
      .split("\n")
      .filter((line) => line.trim() !== "")
      .slice(0, 4)
      .join("\n") + " ...";

   return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="w-[92%] xs:w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] xl:w-[65%] 
                 mx-auto my-4 xs:my-6 sm:my-8 perspective-1000"
    >
      <motion.div
        whileHover={{
          scale: 1.02,
          rotateX: 2,
          rotateY: -2,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="relative rounded-lg xs:rounded-xl sm:rounded-2xl overflow-hidden transform-gpu
                   shadow-[0_10px_30px_rgba(0,0,0,0.25)]
                   before:absolute before:inset-0 before:bg-black/5 before:z-10"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Keep existing gradient border animation */}

        {/* Main content container */}
        <div className="relative bg-gradient-to-b from-gray-900 to-black">
          {/* Image container with responsive height */}
          <motion.div className="relative overflow-hidden">
            <motion.img
              src={poem.image}
              alt={poem.title}
              className="w-full min-h-[200px] h-[30vh] xs:h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh]
                       object-cover object-center transition-opacity duration-300"
              animate={{
                scale: isHovered ? 1.1 : 1,
                filter: isHovered ? "brightness(1.2)" : "brightness(1)",
              }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              onLoad={() => setIsLoaded(true)}
              style={{ opacity: isLoaded ? 1 : 0 }}
            />

            {/* Enhanced gradient overlay for better text readability */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t 
                       from-black via-black/60 to-transparent"
              animate={{
                opacity: isHovered ? 0.9 : 0.8,
              }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>

          {/* Content section with improved spacing */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 
                     p-3 xs:p-4 sm:p-6 md:p-8
                     transform-gpu backdrop-blur-[2px]"
            animate={{
              y: isHovered ? -4 : 0,
              opacity: isHovered ? 1 : 0.95,
            }}
            transition={{ duration: 0.4 }}
          >
            <motion.h2
              className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl
                       font-bold leading-snug xs:leading-tight sm:leading-relaxed
                       tracking-normal xs:tracking-wide
                       bg-gradient-to-r from-white via-gray-200 to-white
                       bg-clip-text text-transparent
                       drop-shadow-lg mb-2 xs:mb-3 sm:mb-4"
              animate={{
                scale: isHovered ? 1.02 : 1,
                letterSpacing: isHovered ? "0.01em" : "0",
              }}
              transition={{ duration: 0.4 }}
            >
              {poem.title}
            </motion.h2>

            <motion.p
              className="whitespace-pre-line 
                       text-xs xs:text-sm sm:text-base md:text-lg
                       font-medium italic leading-relaxed text-gray-200
                       line-clamp-2 xs:line-clamp-3 sm:line-clamp-4
                       max-w-[95%] xs:max-w-[90%] mx-auto"
              animate={{
                y: isHovered ? 0 : 2,
                opacity: isHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {excerpt}
            </motion.p>

            {/* Genre tag with improved mobile styling */}
            <motion.div className="mt-2 xs:mt-3 sm:mt-4 md:mt-6 text-center">
              <motion.span
                className="inline-block px-2 xs:px-3 sm:px-4 
                         py-1 xs:py-1.5
                         text-2xs xs:text-xs sm:text-sm md:text-base
                         rounded-full bg-white/10 backdrop-blur-sm
                         text-white/90 font-medium border border-white/20
                         hover:bg-white/20 transition-colors duration-300
                         shadow-lg shadow-black/20"
                whileHover={{ scale: 1.05 }}
                animate={{
                  y: isHovered ? -2 : 0,
                }}
              >
                {poem.genre}
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
