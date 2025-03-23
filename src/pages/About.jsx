import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      initial={{ x: "100vw" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pt-35 max-w-6xl mx-auto px-6 py-12 bg-gray-100 dark:bg-gray-900"
    >
      <motion.h1
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6"
      >
        About Our Image Gallery
      </motion.h1>
      <motion.p
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-gray-700 dark:text-gray-300 text-lg text-center"
      >
        This platform allows you to explore, like, and download high-quality
        images powered by Unsplash API. You can save your favorite images, 
        switch between light and dark modes, and enjoy a seamless experience.
      </motion.p>
    </motion.div>
  );
};
export default About;
