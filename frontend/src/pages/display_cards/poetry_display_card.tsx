import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export type pankti = {
  id: number;
  title: string;
  poetry: string;
  image: string;
  genre: string;
};

type PoetryDisplayProps = {
  id: number;
};

export default function PoetryDisplay({ id }: PoetryDisplayProps) {
  const [dwijs, setDwij] = useState<pankti | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(`http://127.0.0.1:8787/api/v1/dwij/crud/${id}`);
      const json = await res.json();
      setDwij(json.dwij);
    }
    fetchData();
  }, [id]);

  if (!dwijs) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8 }}
      className="w-full max-w-4xl overflow-hidden mx-auto p-1 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent"
    >
      <motion.div
        className="relative min-h-[500px] rounded-2xl overflow-hidden bg-black border border-white/10"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background Image with Overlay */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={dwijs.image}
            alt={dwijs.title}
            className="w-full h-full object-cover filter grayscale"
          />
          <div className="absolute inset-0 bg-black/70 backdrop-blur-[1px]" />
        </motion.div>

        {/* Content Container */}
        <div className="relative z-10 h-full p-4 sm:p-6 flex flex-col">
          {/* Header Section */}
          <div className="space-y-4">
            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                {dwijs.title}
              </h2>

              <div className="flex items-center justify-between">
                <motion.span
                  className="px-3 py-1 rounded-full bg-white/10 text-white/90 text-xs sm:text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {dwijs.genre}
                </motion.span>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center group"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-white transition-colors"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          </div>

          {/* Poetry Section */}
          <motion.div
            className="mt-6 flex-grow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <pre className="text-sm min-h-300 sm:text-base lg:text-lg text-white/80 font-serif whitespace-pre-wrap leading-relaxed overflow-y-scroll scrollbar-hide max-h-[300px]">
              {dwijs.poetry}
            </pre>
          </motion.div>

          <hr className="h-2 w-4/6 mx-auto mt-10" />
        </div>
      </motion.div>
    </motion.div>
  );
}
