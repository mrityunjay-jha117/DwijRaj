import { motion } from "framer-motion";
import Footer from "../components/primary_components/dashboard/footer";
import Header from "./thussaheader";
import { StorySection } from "./story/storysection";
export default function PoetryLayout() {
  return (
    <div className="bg-black min-h-screen text-white font-serif overflow-x-hidden">
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row min-h-screen w-full overflow-hidden">
        {/* Left Image Section */}
        <motion.div className="relative w-full md:w-3/5 h-[40vh] md:h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute bottom-[10%] sm:bottom-32 md:bottom-40 left-[4%] sm:left-8 md:left-10 flex flex-col items-start"
            >
              <div className="flex flex-row items-end sm:items-center justify-start space-x-2 sm:space-x-3 md:space-x-4">
                <div className=" text-gray-400 text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-wide leading-none">
                  Path
                </div>
                <div className="flex flex-col font-extrabold leading-tight tracking-wide text-lg sm:text-3xl md:text-4xl lg:text-5xl">
                  <div className="flex-1 text-xs sm:text-3xl md:text-4xl lg:text-5xl justify-start">kathin</div>
                  <div className="flex-1 text-gray-400 justify-end">ik hathi</div>
                </div>
              </div>

              {/* Poem lines */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl font-extrabold mt-2 sm:mt-4 md:mt-6 leading-snug"
              >
                mrityu varan ya jeevan sukhi <br />
                antim yudh ab ye sahi <br />
                hai shesh kuch bhi ab nahi <br />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.img
            src="images/4.jpg"
            alt="Poetry Illustration"
            initial={{ scale: 1.1, opacity: 0 }}
            whileInView={{ scale: 1.3, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover shadow-2xl"
          />
        </motion.div>

        {/* Poetry Text Section */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full md:w-2/5 min-h-[40vh] md:h-screen flex flex-col justify-between bg-black/10 px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-8 md:py-12"
        >
          <motion.div
            className="flex-1 w-full md:w-4/5 mx-auto flex flex-col justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            <motion.p
              className="text-sm sm:text-base md:text-lg lg:text-xl w-full sm:w-4/5 mx-auto leading-relaxed sm:leading-relaxed md:leading-loose text-left"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Haathon ki lakeerein na <br />
              karma ka karm maanta <br />
              Amrit ke mulya shwed Mera <br />
              itna hi mai jaanta <br />
              dhadhakti raakh se utha <br />
              Pawan ki veg pe sawar hun <br />
              Mai khara swarna hun na madhav <br />
              mai jalne ko taiyaar hun <br />
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            className="flex flex-row md:flex-col justify-center md:justify-end items-center gap-4 sm:gap-6 md:gap-3 mt-6 sm:mt-8 md:mt-0 md:absolute md:bottom-10 md:right-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            {["↑", "↓"].map((arrow, idx) => (
              <motion.button
                key={idx}
                whileHover={{
                  scale: 1.15,
                  backgroundColor: "#78909C",
                  color: "#fff",
                }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white text-black text-base sm:text-lg md:text-xl font-bold shadow-lg transition-all"
              >
                {arrow}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
      </main>

      {/* Books Section */}
      <section className="px-4 sm:px-6 md:px-8 lg:px-10 py-12 sm:py-16 md:py-20 lg:py-24">
        <motion.div
          className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-12 lg:gap-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 1 }}
        >
          <div className="w-full lg:w-2/5 flex gap-4 sm:gap-6 flex-row justify-around items-center">
            {[1, 2].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: false, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 * idx }}
                className="bg-white h-40 sm:h-52 md:h-64 lg:h-80 w-1/2 rounded-lg shadow-2xl"
              />
            ))}
          </div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 1.1 }}
            className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight">
              Books I am <br />
              <span className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl">
                Writing...
              </span>
            </h1>
          </motion.div>
        </motion.div>
      </section>

      <StorySection />

      <Footer />
    </div>
  );
}
