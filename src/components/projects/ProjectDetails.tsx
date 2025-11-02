import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { arrow } from "@/assets/icons";
import { Link } from "react-router-dom";

interface ProjectDetailsProps {
  iconUrl: string;
  name: string;
  theme: string;
  description: string;
  link: string;
}

export const ProjectDetails = ({
  iconUrl,
  name,
  theme,
  description,
  link,
}: ProjectDetailsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP entrance animation
    gsap.fromTo(
      containerRef.current,
      {
        opacity: 0,
        y: 30,
        scale: 0.95,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.2)",
      }
    );

    // Cleanup
    return () => {
      gsap.killTweensOf(containerRef.current);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
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

  const iconVariants = {
    hover: {
      rotateY: 180,
      scale: 1.1,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const linkVariants = {
    hover: {
      x: 5,
      transition: {
        type: "spring",
        stiffness: 300,
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
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.article
      ref={containerRef}
      className="w-full lg:w-96 flex flex-col gap-6 p-6 rounded-2xl bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        ref={iconRef}
        className="block-container w-16 h-16 mx-auto"
        variants={itemVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <span className={`btn-back rounded-xl ${theme}`} />
        <motion.figure
          className="btn-front rounded-xl flex justify-center items-center"
          variants={iconVariants}
        >
          <img
            src={iconUrl}
            alt={name}
            className="w-1/2 h-1/2 object-contain"
          />
        </motion.figure>
      </motion.div>

      <motion.div className="flex flex-col gap-3" variants={itemVariants}>
        <motion.h4
          className="text-2xl font-poppins font-semibold"
          whileHover={{ x: 5, color: "#3b82f6" }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {name}
        </motion.h4>
        <motion.p
          className="text-slate-500 leading-relaxed"
          whileHover={{ x: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {description}
        </motion.p>
        <motion.div variants={itemVariants}>
          <Link
            ref={linkRef}
            to={link}
            target="_blank"
            className="font-semibold text-blue-600 flex items-center gap-2 font-poppins group"
          >
            <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
              Visit
            </motion.span>
            <motion.img
              variants={arrowVariants}
              whileHover="hover"
              src={arrow}
              alt="arrow"
              className="w-4 h-4 object-contain group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.article>
  );
};