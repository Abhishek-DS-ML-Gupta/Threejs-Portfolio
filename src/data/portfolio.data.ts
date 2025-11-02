import { meta, shopify, starbucks, tesla } from "@/assets/images";
import {
  car,
  contact,
  css,
  estate,
  express,
  git,
  github,
  html,
  javascript,
  linkedin,
  mongodb,
  motion,
  mui,
  nextjs,
  nodejs,
  react,
  redux,
  sass,
  summiz,
  tailwindcss,
  threads,
  typescript,
} from "@/assets/icons";

export const skills = [
  {
    imageUrl: react,
    name: "React",
    type: "Frontend",
  },
  {
    imageUrl: nextjs,
    name: "Next.js",
    type: "Frontend",
  },
  {
    imageUrl: typescript,
    name: "TypeScript",
    type: "Frontend",
  },
  {
    imageUrl: tailwindcss,
    name: "Tailwind CSS",
    type: "Frontend",
  },
  {
    imageUrl: nodejs,
    name: "Node.js",
    type: "Backend",
  },
  {
    imageUrl: express,
    name: "Express",
    type: "Backend",
  },
  {
    imageUrl: mongodb,
    name: "MongoDB",
    type: "Database",
  },
  {
    imageUrl: redux,
    name: "Redux",
    type: "State Management",
  },
  {
    imageUrl: git,
    name: "Git",
    type: "Version Control",
  },
  {
    imageUrl: github,
    name: "GitHub",
    type: "Version Control",
  },
  {
    imageUrl: motion,
    name: "Framer Motion",
    type: "Animation",
  },
  {
    imageUrl: mui,
    name: "Material-UI",
    type: "Frontend",
  },
  {
    imageUrl: javascript,
    name: "JavaScript",
    type: "Frontend",
  },
  {
    imageUrl: html,
    name: "HTML",
    type: "Frontend",
  },
  {
    imageUrl: css,
    name: "CSS",
    type: "Frontend",
  },
  {
    imageUrl: sass,
    name: "Sass",
    type: "Frontend",
  },
];

export const experiences = [
  {
    title: "Senior Full Stack Developer",
    company_name: "TechCorp Solutions",
    icon: meta,
    iconBg: "#a2d2ff",
    date: "January 2023 - Present",
    points: [
      "Led development of scalable web applications using React, Node.js, and MongoDB.",
      "Implemented CI/CD pipelines reducing deployment time by 40%.",
      "Mentored junior developers and conducted code reviews to maintain code quality.",
      "Collaborated with product teams to define technical requirements and deliverables.",
    ],
  },
  {
    title: "Full Stack Developer",
    company_name: "Digital Innovations",
    icon: shopify,
    iconBg: "#b7e4c7",
    date: "June 2021 - December 2022",
    points: [
      "Developed and maintained multiple client projects using MERN stack.",
      "Optimized application performance resulting in 30% faster load times.",
      "Integrated third-party APIs and payment gateways.",
      "Participated in agile development processes and sprint planning.",
    ],
  },
  {
    title: "Frontend Developer",
    company_name: "WebCraft Studios",
    icon: starbucks,
    iconBg: "#accbe1",
    date: "March 2020 - May 2021",
    points: [
      "Built responsive user interfaces using React and modern CSS frameworks.",
      "Collaborated with UX designers to implement pixel-perfect designs.",
      "Developed reusable component libraries for team efficiency.",
      "Conducted user testing and implemented feedback for improved UX.",
    ],
  },
  {
    title: "Junior Web Developer",
    company_name: "StartUp Labs",
    icon: tesla,
    iconBg: "#fbc3bc",
    date: "August 2019 - February 2020",
    points: [
      "Assisted in developing and maintaining company websites and web applications.",
      "Gained experience in version control with Git and collaborative workflows.",
      "Learned and implemented best practices for web development.",
      "Participated in team meetings and contributed to project planning.",
    ],
  },
  // New entries added below
  {
    title: "Client Portfolio",
    company_name: "Excellitude Pvt. Ltd.",
    icon: meta,
    iconBg: "#a2d2ff",
    date: "2022 - 2023",
    points: [
      "Developed a comprehensive client portfolio showcasing company projects and services.",
      "Implemented responsive design and interactive features for enhanced user experience.",
      "Integrated with backend systems to display dynamic content.",
      "Optimized for performance and SEO to increase online visibility.",
    ],
  },
  {
    title: "Award Portfolio",
    company_name: "Excellitude Pvt. Ltd.",
    icon: meta,
    iconBg: "#a2d2ff",
    date: "2023",
    points: [
      "Created an award portfolio to highlight company achievements and recognitions.",
      "Designed visually appealing layouts with animations and transitions.",
      "Implemented filtering and search functionality for easy navigation.",
      "Ensured cross-browser compatibility and mobile responsiveness.",
    ],
  },
  {
    title: "Naaptol Restaurant Agent",
    company_name: "Naaptol ",
    icon: shopify,
    iconBg: "#b7e4c7",
    date: "2021 - 2022",
    points: [
      "Developed a restaurant recommendation agent using Python and machine learning algorithms.",
      "Integrated with Naaptol's API to fetch restaurant data and user preferences.",
      "Implemented collaborative filtering to provide personalized recommendations.",
      "Built a user-friendly interface for browsing and rating restaurants.",
    ],
  },
];

export const socialLinks = [
  {
    name: "Contact",
    iconUrl: contact,
    link: "/contact",
  },
  {
    name: "GitHub",
    iconUrl: github,
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
  {
    name: "LinkedIn",
    iconUrl: linkedin,
    link: "https://www.linkedin.com/in/abhishek-gupta-0442132b6/",
  },
];

export const projects = [
  {
    iconUrl: estate,
    theme: "btn-back-blue",
    name: "Real Estate Platform",
    description:
      "A comprehensive real estate platform with property listings, virtual tours, and agent management system",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
  {
    iconUrl: summiz,
    theme: "btn-back-green",
    name: "E-Commerce Dashboard",
    description:
      "Analytics dashboard for e-commerce businesses with real-time sales tracking and inventory management",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
  {
    iconUrl: threads,
    theme: "btn-back-red",
    name: "Task Management App",
    description:
      "Collaborative task management application with real-time updates and team collaboration features",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },

  // New projects added below
  {
    iconUrl: estate,
    theme: "btn-back-blue",
    name: "Client Portfolio",
    description:
      "Comprehensive portfolio showcasing client projects and services for Excellitude Pvt. Ltd.",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
  {
    iconUrl: summiz,
    theme: "btn-back-green",
    name: "Award Portfolio",
    description:
      "Interactive portfolio highlighting company achievements and recognitions for Excellitude Pvt. Ltd.",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
  {
    iconUrl: car,
    theme: "btn-back-black",
    name: "Naaptol Restaurant Agent",
    description:
      "Python-based restaurant recommendation system with machine learning algorithms for Naaptol.com",
    link: "https://github.com/Abhishek-DS-ML-Gupta",
  },
];