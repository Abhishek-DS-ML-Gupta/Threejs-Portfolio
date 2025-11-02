import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Html } from "@react-three/drei";

export const Loader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current || !circleRef.current) return;

    // Create main timeline
    const tl = gsap.timeline({ repeat: -1 });

    // Animate container entrance
    tl.fromTo(
      containerRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
    );

    // Animate circle rotation
    tl.to(
      circleRef.current,
      { rotation: 360, duration: 2, ease: "none" },
      "-=0.3"
    );

    // Animate dots in sequence
    dotsRef.current.forEach((dot, i) => {
      if (!dot) return;
      
      tl.to(
        dot,
        {
          scale: 1.5,
          backgroundColor: "#3b82f6",
          duration: 0.3,
          ease: "power2.inOut",
        },
        i * 0.1
      ).to(
        dot,
        {
          scale: 1,
          backgroundColor: "#93c5fd",
          duration: 0.3,
          ease: "power2.inOut",
        },
        i * 0.1 + 0.3
      );
    });

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <Html center>
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center space-y-6 p-8 rounded-2xl bg-white/80 backdrop-blur-sm shadow-xl"
      >
        <div className="relative w-24 h-24">
          {/* Outer rotating circle */}
          <div
            ref={circleRef}
            className="absolute inset-0 border-4 border-blue-200 border-t-blue-500 rounded-full"
          />
          
          {/* Animated dots */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              ref={(el) => (dotsRef.current[i] = el)}
              className="absolute top-0 left-1/2 w-3 h-3 bg-blue-300 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${i * 45}deg) translate(0, -40px)`,
              }}
            />
          ))}
        </div>
        
        {/* Loading text with animation */}
        <div className="flex space-x-1">
          {["L", "o", "a", "d", "i", "n", "g"].map((char, i) => (
            <span
              key={i}
              className="text-lg font-semibold text-blue-600 inline-block"
              style={{
                animation: `pulse 1.4s infinite ease-in-out`,
                animationDelay: `${i * 0.1}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes pulse {
          0%, 80%, 100% {
            transform: scale(1);
            opacity: 0.7;
          }
          40% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </Html>
  );
};