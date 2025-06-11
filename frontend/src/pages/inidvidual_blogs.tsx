import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "../components/primary_components/dashboard/header";
import ImageSlider from "../components/primary_components/primary_components/slider/draggable_slider";
import Footer from "../components/primary_components/dashboard/footer";
import Error404 from "./error/coming_soon";
import HimeSkeleton from "../skeletons/userpage_skeleton"; // Import the skeleton component

export default function Blogi() {
  const { id: blogId } = useParams();
  const [BLOG, setBlogs] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("jwt");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      try {
        const response = await fetch(
          `https://my-app.mrityunjay-jha2005.workers.dev/api/v1/blog/${blogId}`,
          { headers }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch blog data");
        }
        const data = await response.json();
        setBlogs(data.blog);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [blogId]);
  return (
    <div className="bg-gradient-to-b from-[#e9ddd0] to-[#d4c3b3] min-h-screen flex flex-col">
      <Header />

      {loading ? (
        <div className="flex-grow">
          <HimeSkeleton />
        </div>
      ) : error ? (
        <div className="flex-grow">
          <Error404 />
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-grow"
        >
          {/* Hero Section - Adjusted heights */}
          <div className="relative w-full h-[45vh] md:h-[50vh] lg:h-[60vh]">
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              src={BLOG.blogHead}
              alt="Blog banner"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Title and Author Info Overlay - Improved mobile spacing */}
            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 lg:p-12 space-y-4">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair text-white font-bold tracking-wide"
              >
                {BLOG.title}
              </motion.h1>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-row sm:items-center gap-4"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={BLOG.author.image}
                    alt={BLOG.author.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium text-base sm:text-lg">
                      {BLOG.author.name}
                    </p>
                    <p className="text-white/80 text-xs sm:text-sm">
                      {BLOG.location.city}, {BLOG.location.country}
                    </p>
                  </div>
                </div>

                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="inline-flex items-center px-3 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm"
                >
                  ❤️ <span className="ml-1">{BLOG.likes}</span>
                </motion.span>
              </motion.div>
            </div>
          </div>

          {/* Content Section - Improved spacing and typography */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-lora">
                {BLOG.description1}
              </p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="my-8 sm:my-12 ml-auto w-full max-w-2xl rounded-lg sm:rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  aspectRatio: "16 / 9", // Maintain aspect ratio
                  maxHeight: "250px", // Limit the height for larger screens
                  height: "auto", // Ensure it adjusts dynamically
                }}
              >
                <ImageSlider images={BLOG.images} />
              </motion.div>

              <p className="text-base sm:text-lg md:text-xl text-gray-800 leading-relaxed font-lora mt-8">
                {BLOG.description2}
              </p>
            </motion.div>

            {/* Tags and Interactions - Mobile-optimized */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-8 sm:mt-12 space-y-6 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-4 sm:justify-between sm:items-center"
            >
              <div className="flex flex-wrap gap-2">
                {BLOG.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[#27405E] text-white rounded-full text-xs sm:text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 sm:gap-4 w-full justify-center sm:justify-start">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 bg-[#F96666] text-white text-sm sm:text-base rounded-full hover:bg-[#ff4444] transition-colors"
                >
                  Like
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 sm:flex-none px-4 sm:px-6 py-2 border-2 border-[#27405E] text-[#27405E] text-sm sm:text-base rounded-full hover:bg-[#27405E] hover:text-white transition-colors"
                >
                  Share
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      <Footer />
    </div>
  );
}
