import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
interface DataCardProps {
  image: string;
  title: string;
  description: string;
  showActions?: boolean;
  id?: string;
  image_size?: string;
}

export default function BlogCard({
  image,
  title,
  description,
  showActions,
  id,
  image_size = "h-52",
}: DataCardProps) {
  const navigate = useNavigate();
  // Function to call the backend delete route
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent the card's onClick (navigation) from firing.
    e.stopPropagation();
    if (!id) return;

    const token = localStorage.getItem("jwt");
    try {
      const res = await fetch(
        `https://my-app.mrityunjay-jha2005.workers.dev/api/v1/blog/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.ok) {
        console.log("Blog deleted successfully");
        // Optionally, trigger a refresh or update state to remove the deleted card.
      } else {
        const errorData = await res.json();
        console.error("Delete error:", errorData.message);
      }
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };
 return (
    <motion.div
      initial={{ opacity: 0, rotateY: -90, scale: 0.9 }}
      whileInView={{ 
        opacity: 1, 
        rotateY: 0, 
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 40, // Reduced for slower rotation
          damping: 20,   // Increased for smoother motion
          duration: 0.75    // Increased duration
        }
      }}
      whileHover={{ 
        translateY: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        transition: { duration: 0.4 }
      }}
      className="relative flex flex-col gap-3 p-5 bg-gradient-to-br from-[#2C3E50] to-[#3498DB] rounded-2xl overflow-visible perspective-1000"
      onClick={() => id && navigate(`/blog/${id}`)}
    >
      {/* Decorative elements */}
      <div className="absolute top-2 right-2 w-20 h-20 bg-yellow-300/10 rounded-full blur-2xl" />
      <div className="absolute bottom-2 left-2 w-32 h-32 bg-blue-300/10 rounded-full blur-2xl" />

      {/* Image container with more outward positioning */}
      <motion.div
        className="relative w-full -mt-16 mb-2" // Increased negative margin
        animate={{ 
          y: [0, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <motion.img
          alt={title}
          src={image}
          className={`${image_size} object-cover w-full rounded-xl border-4 border-white/80 shadow-lg`}
          whileHover={{ 
            scale: 1.05,
            transition: { duration: 0.3 }
          }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/80 to-transparent rounded-xl" />
      </motion.div>

      {/* Content section */}
      <motion.div 
        className="flex flex-col flex-1 items-center justify-center text-center px-4 py-3"
      >
        <h1 className="text-xl md:text-2xl font-bold text-white mb-2 line-clamp-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-white/80 line-clamp-3">
          {description}
        </p>
      </motion.div>

      {/* Updated action buttons with new style */}
      {showActions && (
        <div className="flex flex-row justify-center gap-4 mt-4">
          <motion.button
            className="relative w-1/2 h-11 rounded-full overflow-hidden bg-red-500 text-white font-medium group transition-all duration-500"
            whileTap={{ scale: 0.98 }}
            onClick={handleDelete}
          >
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-red-500 transition-colors duration-500">
              DELETE
            </span>
          </motion.button>
          
          <motion.button
            className="relative w-1/2 h-11 rounded-full overflow-hidden bg-[#27405E] text-white font-medium group transition-all duration-500"
            whileTap={{ scale: 0.98 }}
            onClick={(e) => {
              e.stopPropagation();
              if (id) navigate(`/update/${id}`);
            }}
          >
            <span className="absolute inset-0 bg-white transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
            <span className="relative z-10 group-hover:text-[#27405E] transition-colors duration-500">
              UPDATE
            </span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
