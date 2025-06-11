import { motion } from "framer-motion";

type Direction = "left" | "right";

interface StoryCardProps {
  imgSrc: string;
  textelement?: React.ReactNode;
  poetry?: React.ReactNode;
  direction?: Direction;
}

export const StoryCard = ({
  imgSrc,
  textelement,
  direction = "left",
  poetry,
}: StoryCardProps) => {
  const textX = direction === "left" ? -100 : 100;
  const imageX = direction === "left" ? 100 : -100;

  const layoutDirection =
    direction === "left" ? "md:flex-row" : "md:flex-row-reverse";

  return (
    <div
      className={`flex flex-col ${layoutDirection} h-full overflow-hidden rounded-2xl w-18/20 mx-auto gap-2`}
    >
      {/* TEXT SIDE */}
      <motion.div
        initial={{ x: textX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full md:w-2/5 h-[40%] md:h-full flex flex-col justify-end sm:flex-row sm:items-center sm:justify-center text-white"
      >
        {textelement}
      </motion.div>

      {/* IMAGE SIDE */}
      <motion.div
        initial={{ x: imageX, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full h-[60%] md:h-full md:w-3/5"
      >
        <div className="absolute top-0 bottom-0 right-0 h-full w-[45%] sm:w-36 md:w-40 lg:w-44 xl:w-48 bg-black/20 backdrop-blur-[4px] z-10 flex items-center justify-center">
          <p className="text-white text-[12px] sm:text-sm md:text-base lg:text-lg xl:text-xl font-medium text-right px-4">
            {poetry}
          </p>
        </div>

        <img
          src={imgSrc}
          alt="Poetry Illustration"
          className="w-full h-full object-cover shadow-2xl grayscale-90 sm:grayscale rounded-xl hover:grayscale-0 transition-all duration-500 ease-in-out"
        />
      </motion.div>
    </div>
  );
};
