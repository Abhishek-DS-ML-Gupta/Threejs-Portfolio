import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logoRef = useRef<SVGSVGElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP animations
  useGSAP(() => {
    // Logo animation - professional reveal
    const logoTl = gsap.timeline();
    logoTl
      .from(logoRef.current, {
        duration: 1.2,
        scale: 0,
        rotation: -180,
        opacity: 0,
        ease: "back.out(1.7)",
      })
      .from(
        ".logo-circle",
        {
          duration: 0.8,
          drawSVG: "0%",
          ease: "power2.inOut",
        },
        "-=0.6"
      )
      .from(
        ".logo-letter",
        {
          duration: 0.6,
          scale: 0,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.4"
      );

    // Logo text animation
    gsap.from(logoTextRef.current, {
      duration: 1,
      x: -30,
      opacity: 0,
      ease: "power3.out",
      delay: 0.5,
    });

    // Navigation links animation
    gsap.from(linkRefs.current, {
      duration: 0.8,
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: "power3.out",
      delay: 0.7,
    });

    // Logo hover animation
    const logoHover = gsap.to([logoRef.current, logoTextRef.current], {
      rotation: 5,
      scale: 1.05,
      duration: 0.4,
      paused: true,
      ease: "power2.inOut",
    });

    const logoContainer = logoRef.current?.parentElement;
    logoContainer?.addEventListener("mouseenter", () => logoHover.play());
    logoContainer?.addEventListener("mouseleave", () => logoHover.reverse());

    // Link hover animations
    linkRefs.current.forEach((link) => {
      if (!link) return;

      // Create underline element
      const underline = document.createElement("div");
      underline.className = "absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0";
      link.appendChild(underline);

      const linkHover = gsap.to(underline, {
        scaleX: 1,
        duration: 0.3,
        paused: true,
        ease: "power2.inOut",
      });

      link.addEventListener("mouseenter", () => linkHover.play());
      link.addEventListener("mouseleave", () => linkHover.reverse());
    });

    // Mobile menu animation
    const mobileMenuTl = gsap.timeline({ paused: true });
    mobileMenuTl
      .to(mobileMenuRef.current, {
        height: "auto",
        opacity: 1,
        duration: 0.5,
        ease: "power3.inOut",
      })
      .from(".mobile-link", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: "power2.out",
      });

    // Update mobile menu animation based on state
    if (isMenuOpen) {
      mobileMenuTl.play();
    } else {
      mobileMenuTl.reverse();
    }

    // Hamburger menu animation
    const menuButtonTl = gsap.timeline({ paused: true });
    const topLine = menuButtonRef.current?.querySelector(".line-top");
    const middleLine = menuButtonRef.current?.querySelector(".line-middle");
    const bottomLine = menuButtonRef.current?.querySelector(".line-bottom");

    if (topLine && middleLine && bottomLine) {
      menuButtonTl
        .to(topLine, {
          rotation: 45,
          y: 8,
          duration: 0.3,
          ease: "power2.inOut",
        })
        .to(
          middleLine,
          {
            opacity: 0,
            duration: 0.2,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          bottomLine,
          {
            rotation: -45,
            y: -8,
            duration: 0.3,
            ease: "power2.inOut",
          },
          "-=0.3"
        );
    }

    if (isMenuOpen) {
      menuButtonTl.play();
    } else {
      menuButtonTl.reverse();
    }

    // Cleanup
    return () => {
      logoContainer?.removeEventListener("mouseenter", () => logoHover.play());
      logoContainer?.removeEventListener("mouseleave", () => logoHover.reverse());
      
      linkRefs.current.forEach((link) => {
        if (!link) return;
        const underline = link.querySelector("div");
        if (underline) {
          link.removeChild(underline);
        }
      });
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Projects", path: "/projects" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "py-3 bg-white/95 backdrop-blur-md shadow-md" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Professional SVG Logo with text */}
        <NavLink to="/" className="flex items-center">
          <svg
            ref={logoRef}
            width="50"
            height="50"
            viewBox="0 0 100 100"
            className="cursor-pointer"
          >
            {/* Outer circle */}
            <circle
              className="logo-circle"
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#000"
              strokeWidth="4"
              strokeDasharray="283"
              strokeDashoffset="283"
            />
            
            {/* Inner design - geometric pattern */}
            <path
              className="logo-letter"
              d="M30 50 L50 30 L70 50 L50 70 Z"
              fill="none"
              stroke="#000"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0"
            />
            
            {/* Center letter A */}
            <text
              className="logo-letter"
              x="50"
              y="55"
              textAnchor="middle"
              fontSize="28"
              fontWeight="bold"
              fill="#000"
              opacity="0"
            >
              A
            </text>
          </svg>
          <span
            ref={logoTextRef}
            className="ml-3 text-xl font-bold text-black"
          >
            Abhishek
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link, index) => (
            <NavLink
              key={link.name}
              to={link.path}
              ref={(el) => (linkRefs.current[index] = el)}
              className={({ isActive }) =>
                `relative font-medium text-lg ${
                  isActive ? "text-black" : "text-gray-700"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button - Black */}
        <button
          ref={menuButtonRef}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={toggleMenu}
        >
          <div className="line-top w-6 h-0.5 bg-black transition-all duration-300"></div>
          <div className="line-middle w-6 h-0.5 bg-black transition-all duration-300"></div>
          <div className="line-bottom w-6 h-0.5 bg-black transition-all duration-300"></div>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        ref={mobileMenuRef}
        className="md-hidden overflow-hidden h-0 opacity-0 bg-white/95 backdrop-blur-md"
      >
        <div className="px-6 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `mobile-link block py-2 font-medium text-lg ${
                  isActive ? "text-black" : "text-gray-700"
                }`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};