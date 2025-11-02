import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Lenis from "@studio-freight/lenis";
import "react-vertical-timeline-component/style.min.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { experiences } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const timelineElementsRef = useRef<(HTMLDivElement | null)[]>([]);

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
        y: 50,
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

    // Animate section description
    gsap.fromTo(
      descriptionRef.current,
      {
        opacity: 0,
        y: 30,
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

    // Animate timeline container
    gsap.fromTo(
      timelineRef.current,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Animate individual timeline elements
    gsap.fromTo(
      timelineElementsRef.current,
      {
        opacity: 0,
        x: -50,
        scale: 0.9,
      },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      }
    );

    // Parallax effect on timeline elements
    gsap.to(timelineElementsRef.current, {
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

  const timelineElementVariants = {
    hover: {
      scale: 1.02,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 15,
      },
    },
    tap: {
      scale: 0.98,
    },
  };

  const iconVariants = {
    hover: {
      rotate: 360,
      scale: 1.1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
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
        <article className="flex flex-col gap-6 mb-12">
          <motion.h3
            ref={titleRef}
            className="subhead-text text-3xl md:text-4xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Work <span className="text-blue-600">Experience</span>
          </motion.h3>
          <motion.p
            ref={descriptionRef}
            className="text-slate-600 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            I've worked with all sorts of companies, leveling up my skills and
            teaming up with smart people. Here's the rundown:
          </motion.p>
        </article>

        <motion.div
          ref={timelineRef}
          className="flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <VerticalTimeline>
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.company_name}
                ref={(el) => (timelineElementsRef.current[index] = el)}
                variants={timelineElementVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <VerticalTimelineElement
                  date={exp.date}
                  iconStyle={{ background: exp.iconBg }}
                  icon={
                    <motion.div
                      className="flex justify-center items-center w-full h-full"
                      variants={iconVariants}
                      whileHover="hover"
                    >
                      <img
                        src={exp.icon}
                        alt={exp.company_name}
                        className="w-7/12 h-7/12 object-contain"
                      />
                    </motion.div>
                  }
                  contentStyle={{
                    borderBottom: `8px solid ${exp.iconBg}`,
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                  }}
                  contentArrowStyle={{
                    borderRight: `8px solid ${exp.iconBg}`,
                  }}
                >
                  <article>
                    <motion.h4
                      className="text-black text-xl font-poppins font-semibold"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {exp.title}
                    </motion.h4>
                    <motion.p
                      className="text-black-500 font-medium text-base m-0"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {exp.company_name}
                    </motion.p>
                  </article>

                  <motion.ul
                    className="my-5 list-disc ml-5 space-y-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {exp.points.map((point, pointIndex) => (
                      <motion.li
                        key={point}
                        className="text-black-500/50 font-normal pl-1 text-sm"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 + pointIndex * 0.05 }}
                        whileHover={{ x: 5, color: "#3b82f6" }}
                      >
                        {point}
                      </motion.li>
                    ))}
                  </motion.ul>
                </VerticalTimelineElement>
              </motion.div>
            ))}
          </VerticalTimeline>
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