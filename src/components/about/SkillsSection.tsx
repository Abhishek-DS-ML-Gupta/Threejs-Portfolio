import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data";

gsap.registerPlugin(ScrollTrigger);

export const SkillsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section heading
    gsap.fromTo(
      headingRef.current,
      { 
        opacity: 0, 
        y: 30,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      }
    );

    // Animate skill cards with stagger effect
    gsap.fromTo(
      skillRefs.current,
      { 
        opacity: 0, 
        scale: 0.8,
        rotation: 5
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 0.6,
        stagger: {
          each: 0.1,
          from: "random"
        },
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none"
        }
      }
    );

    // Add hover animations to skill cards
    skillRefs.current.forEach((skill) => {
      if (!skill) return;
      
      const front = skill.querySelector('.btn-front');
      const back = skill.querySelector('.btn-back');
      
      // Hover effect
      skill.addEventListener('mouseenter', () => {
        gsap.to(front, {
          scale: 1.1,
          rotation: 5,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(back, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      skill.addEventListener('mouseleave', () => {
        gsap.to(front, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        });
        
        gsap.to(back, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 flex flex-col gap-10">
      <h3 ref={headingRef} className="subhead-text">My Skills</h3>

      <article className="flex flex-wrap gap-10 justify-center">
        {skills.map((skill, index) => (
          <div 
            ref={el => skillRefs.current[index] = el}
            className="block-container w-20 h-20 cursor-pointer group" 
            key={skill.name}
          >
            <div className="btn-back rounded-xl transition-all duration-300 group-hover:shadow-lg" />
            <div className="btn-front rounded-xl flex justify-center items-center transition-all duration-300">
              <img
                src={skill.imageUrl}
                alt={skill.name}
                className="w-1/2 h-1/2 object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs font-semibold text-white bg-black/70 px-2 py-1 rounded-md">
                  {skill.name}
                </span>
              </div>
            </div>
          </div>
        ))}
      </article>
    </section>
  );
};