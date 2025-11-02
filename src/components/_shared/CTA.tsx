import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 5px 15px -3px rgba(59, 130, 246, 0.4)"
    }
  };

  const underlineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        delay: 0.5,
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.section 
      className="cta relative py-20 px-4 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <motion.div variants={textVariants}>
          <motion.h2 
            className="cta-text text-4xl md:text-5xl font-bold text-gray-800 mb-6"
          >
            Let's build something{" "}
            <motion.span 
              className="relative inline-block text-blue-600"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              together
              <motion.div 
                className="absolute bottom-0 left-0 h-1 bg-blue-500 rounded-full"
                variants={underlineVariants}
              />
            </motion.span>
            !
          </motion.h2>
        </motion.div>
        
        <motion.div variants={buttonVariants}>
          <Link 
            to="/contact" 
            className="btn inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me
            </motion.span>
          </Link>
        </motion.div>
        
        <motion.div 
          className="mt-8 text-gray-600"
          variants={textVariants}
        >
          <p>I'm available for freelance projects and full-time positions</p>
        </motion.div>
      </div>
      
      {/* Floating elements animation */}
      <motion.div 
        className="absolute top-10 right-10 w-16 h-16 rounded-full bg-blue-200 opacity-20"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div 
        className="absolute bottom-10 left-10 w-12 h-12 rounded-full bg-indigo-200 opacity-20"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </motion.section>
  );
};