import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AboutIntro = () => {
  const [isWaving, setIsWaving] = useState(false);

  // Trigger wave animation on mount and periodically
  useEffect(() => {
    setIsWaving(true);
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 1000);
    }, 5000);
    
    return () => clearInterval(waveInterval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const headingVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.3
      }
    }
  };

  const nameVariants = {
    hover: {
      scale: 1.05,
      textShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  const waveVariants = {
    wave: {
      rotate: [0, 20, 0],
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.article 
      className="flex flex-col gap-6 max-w-3xl"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 
        className="head-text text-4xl md:text-5xl font-bold"
        variants={headingVariants}
      >
        Hello, I'm{" "}
        <motion.span 
          className="blue-gradient_text font-semibold drop-shadow cursor-pointer inline-block"
          variants={nameVariants}
          whileHover="hover"
        >
          Abhishek
        </motion.span>{" "}
        <motion.span
          animate={isWaving ? "wave" : ""}
          variants={waveVariants}
          className="inline-block origin-bottom-right"
        >
          👋
        </motion.span>
      </motion.h1>
      
      <motion.div 
        className="text-slate-600 text-lg leading-relaxed"
        variants={textVariants}
      >
        <p className="mb-4">
          Full Stack Developer based in India, specializing in building modern web applications 
          with cutting-edge technologies and creating exceptional user experiences.
        </p>
      </motion.div>

    </motion.article>
  );
};