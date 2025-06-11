import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.footer
      ref={footerRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-gradient-to-b from-black via-black to-gray-900
                 min-h-[16rem] sm:min-h-[20rem] md:min-h-[24rem] 
                 flex flex-col items-center justify-center gap-6 md:gap-8 
                 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20"
    >
      {/* Decorative line */}
      <motion.div
        variants={lineVariants}
        className="w-16 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {/* Main text */}
      <motion.div
        variants={textVariants}
        className="text-4xl sm:text-6xl lg:text-7xl 
             font-bold text-center leading-tight
             bg-gradient-to-r from-gray-600 via-gray-400 to-gray-600 
             bg-clip-text text-transparent"
      >
        Thank you
      </motion.div>

      {/* Decorative line */}
      <motion.div
        variants={lineVariants}
        className="w-16 sm:w-24 md:w-32 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
      />

      {/* Additional content */}
      <motion.div
        variants={textVariants}
        className="text-sm sm:text-base tracking-wide md:text-lg text-gray-400 text-center 
                   max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
      >
        <p>
          कर्मण्ये वाधिकारस्ते मा फलेषु कदाचन ।
          <br />
          मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥
        </p>
      </motion.div>
    </motion.footer>
  );
}
