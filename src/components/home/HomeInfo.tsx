import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { arrow } from "@/assets/icons";

interface HomeInfoProps {
  currentStage: number;
}

export const HomeInfo = ({ currentStage }: HomeInfoProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP animations for stage transitions
  useEffect(() => {
    if (!contentRef.current) return;

    // Animate content entrance
    gsap.fromTo(
      contentRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.2)",
      }
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(contentRef.current);
    };
  }, [currentStage]);

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const arrowVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
      },
    },
  };

  let content = <></>;

  if (currentStage === 1)
    content = (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative"
      >
        <motion.h1
          variants={itemVariants}
          className="sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5"
        >
          Hi, I'm
          <motion.span
            variants={itemVariants}
            className="font-semibold mx-2 text-white inline-block"
            whileHover={{ scale: 1.1, color: "#93c5fd" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Abhishek
          </motion.span>
          <motion.span
            variants={itemVariants}
            className="inline-block origin-bottom-right"
            animate={{ rotate: [0, 20, 0] }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            👋
          </motion.span>
          <br />
          <motion.span variants={itemVariants}>
            A Full Stack Developer from India
          </motion.span>
        </motion.h1>
      </motion.div>
    );

  if (currentStage === 2) {
    content = (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="info-box"
      >
        <motion.p variants={itemVariants} className="font-medium sm:text-xl text-center">
          Worked with many companies <br /> and picked up many skills along the
          way
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/about"
            className="neo-brutalism-white neo-btn flex items-center justify-center"
          >
            <motion.span variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex items-center">
              Learn more
              <motion.img
                variants={arrowVariants}
                whileHover="hover"
                src={arrow}
                alt="arrow"
                className="w-4 h-4 object-contain ml-2"
              />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (currentStage === 3) {
    content = (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="info-box"
      >
        <motion.p variants={itemVariants} className="font-medium text-center sm:text-xl">
          Led multiple projects to success over the years. <br /> Curious about
          the impact?
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/projects"
            className="neo-brutalism-white neo-btn flex items-center justify-center"
          >
            <motion.span variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex items-center">
              Visit my portfolio
              <motion.img
                variants={arrowVariants}
                whileHover="hover"
                src={arrow}
                alt="arrow"
                className="w-4 h-4 object-contain ml-2"
              />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  if (currentStage === 4) {
    content = (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="info-box"
      >
        <motion.p variants={itemVariants} className="font-medium sm:text-xl text-center">
          Need a project done or looking for a dev? <br /> I'm just a few
          keystrokes away
        </motion.p>

        <motion.div variants={itemVariants}>
          <Link
            to="/contact"
            className="neo-brutalism-white neo-btn flex items-center justify-center"
          >
            <motion.span variants={buttonVariants} whileHover="hover" whileTap="tap" className="flex items-center">
              Let's talk
              <motion.img
                variants={arrowVariants}
                whileHover="hover"
                src={arrow}
                alt="arrow"
                className="w-4 h-4 object-contain ml-2"
              />
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
      <motion.div
        ref={contentRef}
        key={currentStage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {content}
      </motion.div>
    </div>
  );
};