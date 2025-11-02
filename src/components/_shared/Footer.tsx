import { motion } from "framer-motion";
import { socialLinks } from "@/data";

export const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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

  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.9,
      rotate: -10
    }
  };

  const textVariants = {
    hover: {
      color: "#3b82f6",
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.footer 
      className="footer font-poppins bg-gradient-to-t from-slate-50 to-white py-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <motion.hr 
        className="border-slate-200 mb-6"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <div className="footer-container flex flex-col items-center space-y-6">
        <motion.p 
          className="text-slate-600 text-center"
          variants={itemVariants}
        >
          © 2025{" "}
          <motion.span 
            className="font-semibold cursor-pointer inline-block"
            variants={textVariants}
            whileHover="hover"
          >
            Abhishek Gupta
          </motion.span>
          . All rights reserved.
        </motion.p>

        <motion.div 
          className="flex gap-4 justify-center items-center"
          variants={itemVariants}
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.name}
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              className="block p-2 rounded-full hover:bg-slate-100 transition-colors duration-300"
            >
              <motion.img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain"
                whileHover={{ 
                  filter: "drop-shadow(0 0 8px rgba(59, 130, 246, 0.5))",
                  transition: { duration: 0.2 }
                }}
              />
            </motion.a>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-sm text-slate-500 mt-2"
          variants={itemVariants}
        >
          Full Stack Developer
        </motion.div>
      </div>
    </motion.footer>
  );
};