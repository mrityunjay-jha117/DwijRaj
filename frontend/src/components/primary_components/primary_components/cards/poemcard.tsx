import { motion } from "framer-motion";

export type DwijPoem = {
  id: number;
  title: string;
  poetry: string;
  image: string;
  genre: string;
};

export default function PoemCard({
  poem,
  onClick,
}: {
  poem: DwijPoem;
  onClick?: () => void;
}) {
  const excerpt =
    poem.poetry
      .split("\n")
      .filter((line) => line.trim() !== "")
      .slice(0, 3)
      .join("\n") + " ...";
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onClick={onClick}
      className="w-full sm:w-[48%] lg:w-[32%]"
    >
      <div className="relative grayscale-90 group overflow-hidden rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800">
        <img
          src={poem.image}
          alt={poem.title}
          className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
          <h2 className="text-2xl font-extrabold text-white drop-shadow mb-2">
            {poem.title}
          </h2>
          <p className="text-sm text-neutral-200 whitespace-pre-line italic leading-snug">
            {excerpt}
          </p>
        </div>

        <div className="absolute top-3 right-3 z-10 bg-white/80 text-gray-900 text-xs font-medium px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
          {poem.genre}
        </div>
      </div>
    </motion.div>
  );
}
