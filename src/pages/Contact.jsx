import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

const Contact = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-3xl mx-auto pt-35 py-12 bg-gray-100 flex flex-col items-center dark:bg-gray-900"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-6"
      >
        Contact Us
      </motion.h1>
      <div className="space-y-6 text-lg text-gray-800 dark:text-gray-300">
        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <FiMail className="text-blue-600 dark:text-blue-400 text-2xl" />
          <span>contact: https://portfolio-mu-ivory-57.vercel.app/</span>
        </motion.div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-4"
        >
          <FiPhone className="text-blue-600 dark:text-blue-400 text-2xl" />
          <span>+998 91 398 79 42</span>
        </motion.div>

        <motion.div
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex items-center gap-4"
        >
          <FiMapPin className="text-blue-600 dark:text-blue-400 text-2xl" />
          <span>Kuvasay 6, Fergana, Uzbekistan</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
