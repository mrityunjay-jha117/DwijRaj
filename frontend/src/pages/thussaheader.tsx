import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "About", path: "/about" },
    { label: "Poems", path: "/blog_page" },
    { label: "Reviews", path: "/reviews" },
  ];

  return (
    <header className="sticky w-full z-50 flex flex-col">
      {/* Main Header */}
      <div className="w-full flex flex-col md:flex-row h-16 sm:h-20 bg-white backdrop-blur-xl shadow-md">
        <div className="w-full md:w-3/5 h-full text-black">
          <div className="flex items-center h-full px-4 sm:px-8 relative">
            <div className="w-full flex justify-center md:justify-start items-center">
              <motion.span
                className="text-2xl md:text-4xl cursor-pointer font-extrabold tracking-widest"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                onClick={()=>navigate("/home")}
              >
                DWIJ RAJ
              </motion.span>
            </div>

            <button
              className="md:hidden absolute right-4 focus:outline-none"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6 text-black"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <nav className="hidden cursor-pointer md:flex gap-16 text-lg font-medium ml-auto">
              {navItems.map((item, i) => (
                <motion.button
                  key={i}
                  onClick={() => navigate(item.path)}
                  className="hover:text-[#455A64] transition-colors bg-transparent border-none cursor-pointer"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>

        <motion.div
          className="hidden md:flex w-full md:w-2/5 h-full bg-black items-center justify-end pr-[8%]"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <button className="text-lg text-black bg-white rounded-3xl px-6 py-2 font-medium transition hover:bg-gray-200">
            Subscribe
          </button>
        </motion.div>
      </div>

      {/* Mobile Dropdown Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 bg-white/90 z-40 flex flex-col items-center justify-center backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            <button
              className="absolute top-6 right-6 text-black hover:text-gray-600 focus:outline-none"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <motion.nav
              className="flex flex-col gap-8 text-xl font-semibold text-[#455A64]"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {navItems.map((item, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  className="hover:text-black transition-colors bg-transparent border-none cursor-pointer"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                className="mt-4 bg-black text-white text-lg px-8 py-3 rounded-full hover:bg-gray-800 transition"
                onClick={() => setMenuOpen(false)}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                Subscribe
              </motion.button>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Header;
