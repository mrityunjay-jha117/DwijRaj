import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface NavItemProps {
  name: string;
  to: string;
  onClick?: () => void;
  className?: string;
}

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [booksOpen, setBooksOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setBooksOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);
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
  function NavItem({ name, to, onClick, className = "" }: NavItemProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        onClick?.();
        if (to !== "#") {
          navigate(to);
          setIsMobileMenuOpen(false);
        }
      }}
      className={`relative px-3 h-20 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-2 
                 border border-white/10 rounded-full overflow-hidden 
                 bg-gradient-to-r from-white/5 via-white/10 to-white/5
                 backdrop-blur-sm
                 transition-all duration-300 group 
                 hover:border-white/20 hover:from-white/10 hover:via-white/20 hover:to-white/10
                 hover:shadow-lg hover:shadow-white/10 ${className}`}
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent
                     transform group-hover:translate-x-full transition-transform duration-700"
        />
      </div>
      <span className="relative z-10 text-xs sm:text-sm md:text-base tracking-wide 
                     text-white/90 group-hover:text-white whitespace-nowrap 
                     font-medium transition-colors duration-300">
        {name}
      </span>
    </motion.button>
  );
}

  const books = [
    { name: "BHAGWAD GEETA", to: "/book/bhagwad-geeta" },
    { name: "RAMAYANA", to: "/book/ramayana" },
    { name: "MAHABHARATA", to: "/book/mahabharata" },
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky w-full top-0 z-50 transition-all duration-500  ${
        isScrolled ? "bg-black/90 shadow-md shadow-black/30" : "bg-black/70"
      } backdrop-blur-md`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <motion.h1
            variants={textVariants}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            onClick={() => navigate("/")}
            className="text-2xl sm:text-4xl md:text-6xl  
                   font-bold text-center bg-gradient-to-r tracking-wider from-white via-gray-200 to-gray-400 
                   bg-clip-text text-transparent"
          >
            KIRAN
          </motion.h1>

          {/* Always Visible Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">
            <NavItem
              name="DWIJ"
              to="/blog_page"
              className="text-xs sm:text-sm md:text-base"
            />

            {/* Mobile Menu Button - Only for Books */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                className="w-5 h-5 flex flex-col justify-center items-center gap-1"
              >
                <span
                  className={`w-4 h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`w-4 h-0.5 bg-white transition-all ${
                    isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </motion.div>
            </button>

            {/* Desktop Books Navigation */}
            <div className="hidden md:block relative" ref={dropdownRef}>
              <NavItem
                name="BOOKS"
                to="#"
                onClick={() => setBooksOpen((prev) => !prev)}
              />
              <AnimatePresence>
                {booksOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    className="absolute right-0 mt-4 w-60 bg-black/90 backdrop-blur-xl rounded-xl 
                             shadow-lg border border-white/40 overflow-hidden z-20"
                  >
                    {books.map((book) => (
                      <button
                        key={book.name}
                        onClick={() => {
                          navigate(book.to);
                          setBooksOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-xs sm:text-sm text-white hover:bg-white/10 
                                 transition-colors cursor-pointer duration-300"
                      >
                        {book.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Books Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className="md:hidden overflow-hidden mb-3"
            >
              <motion.ul
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
                  },
                  collapsed: {
                    transition: {
                      staggerChildren: 0.03,
                      staggerDirection: -1,
                    },
                  },
                }}
                className="py-3 px-2 space-y-1"
              >
                {books.map((book) => (
                  <motion.li
                    key={book.name}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      collapsed: { opacity: 0, x: -20 },
                    }}
                  >
                    <NavItem
                      name={book.name}
                      to={book.to}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="w-full text-sm justify-start px-4 py-2 rounded-md
                           hover:bg-white/10 transition-colors duration-200"
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
