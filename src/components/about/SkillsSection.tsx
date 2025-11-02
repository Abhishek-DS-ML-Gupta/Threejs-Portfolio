import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import { skills } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const skillsContainerRef = useRef<HTMLDivElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Animate section title
    gsap.fromTo(
      titleRef.current,
      {
        opacity: 0,
        y: 30,
        skewY: 2,
      },
      {
        opacity: 1,
        y: 0,
        skewY: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate skills container
    gsap.fromTo(
      skillsContainerRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate individual skills with stagger
    gsap.fromTo(
      skillRefs.current,
      {
        opacity: 0,
        scale: 0.8,
        rotation: 5,
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax effect on scroll
    gsap.to(skillRefs.current, {
      yPercent: -20,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const skillVariants = {
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
      rotate: -5,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 flex flex-col gap-16 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 -z-10"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-600"></div>

      <div className="container mx-auto px-6">
        <motion.h3
          ref={titleRef}
          className="subhead-text text-3xl md:text-4xl font-bold text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My <span className="text-blue-600">Skills</span>
        </motion.h3>

        <motion.p
          className="text-center text-slate-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Technologies and tools I specialize in to create exceptional digital experiences
        </motion.p>

        <motion.div
          ref={skillsContainerRef}
          className="flex flex-wrap justify-center gap-8 md:gap-12"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              ref={(el) => (skillRefs.current[index] = el)}
              className="block-container w-24 h-24 md:w-28 md:h-28 relative group"
              variants={skillVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* Back of the card */}
              <motion.div
                className="btn-back absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-white font-bold text-center px-2">
                  {skill.name}
                </span>
              </motion.div>

              {/* Front of the card */}
              <motion.div
                className="btn-front absolute inset-0 rounded-2xl bg-white shadow-md flex items-center justify-center overflow-hidden"
                whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-1/2 h-1/2 object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </motion.div>

              {/* Skill name indicator */}
              <motion.div
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs font-medium py-1 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                {skill.name}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating elements animation */}
      <motion.div
        className="absolute top-20 right-10 w-16 h-16 rounded-full bg-blue-200 opacity-20"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-12 h-12 rounded-full bg-indigo-200 opacity-20"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </section>
  );
};