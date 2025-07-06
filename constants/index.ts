import { FaYoutube, FaFacebook } from "react-icons/fa";
import { PiTelegramLogo } from "react-icons/pi";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Stripe",
    image: "stripe.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
] as const;

export const SOCIALS = [
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/henok-eshetu-284bba2b3/",
  },
  {
    name: "Github",
    icon: RxGithubLogo,
    link: "https://github.com/HenokEshetu",
  },
  {
    name: "Telegram",
    icon: PiTelegramLogo,
    link: "https://t.me/sulamatis_temeleshi",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js 14",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
  {
    skill_name: "PostgreSQL",
    image: "postgresql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "MySQL",
    image: "mysql.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Prisma",
    image: "prisma.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Graphql",
    image: "graphql.png",
    width: 80,
    height: 80,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "React Native",
    image: "reactnative.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Tauri",
    image: "tauri.png",
    width: 70,
    height: 70,
  },
  {
    skill_name: "Docker",
    image: "docker.png",
    width: 70,
    height: 70,
  },

  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [
  {
    skill_name: "Go",
    image: "go.png",
    width: 60,
    height: 60,
  },
] as const;

export const PROJECTS = [
  {
    title: "Real-time Cyber Threat Intelligence Platform",
    description:
      "I build systems that turn raw threat data into actionable intelligence. My Cyber Threat Intelligence (CTI) work focuses on real-time monitoring, dark web feed integration, and automated threat classification to support incident response and proactive defense. I’ve developed platforms that aggregate indicators from diverse sources (e.g., OSINT, internal logs, threat feeds) and visualize them in intuitive dashboards. My implementations often leverage technologies like Rust, Python, NestJS, GraphQL, and React, emphasizing performance, scalability, and clarity. \nKey features I’ve delivered include IOC tracking, threat enrichment, alert triaging, and customizable feed ingestion pipelines — all designed to empower cybersecurity teams to respond faster and smarter.",
    image:
      "https://github.com/Enqute/Movie-Management-System/blob/main/Screenshot%20From%202025-06-27%2013-55-59.png?raw=true",
    link: "https://github.com/HenokEshetu/Real-time_Threat_Intelligence_Frontend",
  },
  {
    title: "Syslog Analyzer Dashboard",
    description:
      "Syslog Analyzer – A high-performance log processing tool that ingests, analyzes, and alerts on syslog data in real-time. Built in Go with Elasticsearch and Redis, it parses RFC 5424 logs, detects anomalies (brute-force attacks, DDoS), and triggers Slack/email alerts. Features include IP reputation checks, automated CVE matching, and Kibana dashboards. Handles 10K+ logs/sec with Kubernetes-ready Docker deployment. Reduces incident response time by 70% through smart correlation and threat detection. (Go, Elasticsearch, Redis, Docker, Prometheus). Immerse yourself in an awe-inspiring digital experience that blends cutting-edge design with the mysteries of the universe.",
    image: "/projects/project-3.png",
    link: "https://github.com/HenokEshetu/Syslog_Analyzer",
  },
  {
    title: "System Engineering Automation Tools",
    description:
      "As a system engineer, I develop cross-platform automation tools that streamline routine tasks, improve operational reliability, and ensure secure system management. My work includes scripting for user account management, log rotation, secure backups, system updates, and multi-OS environment setup — using Python, Bash, Rust, Go, and PowerShell. These tools are designed with real-world resilience in mind: they detect OS platforms dynamically, handle errors gracefully, and support both interactive and scheduled (cron/timer) execution. Whether managing Linux servers, automating Windows backups, or building self-healing update scripts, my solutions aim to reduce manual overhead and increase system uptime.",
    image: "/projects/project-2.png",
    link: "https://github.com/HenokEshetu/System-Engineer-Automation-tools",
  },
  {
    title: "DeepNet - Network Traffic Analysis",
    description:
      "DeepNet is a Rust-based cybersecurity toolkit designed to provide low-level packet inspection, custom scanning, and intelligent threat surface analysis. Built with performance and precision in mind, DeepNet leverages raw packet crafting, efficient parallelism, and protocol-aware parsing to identify open ports, suspicious behavior, and potential vulnerabilities. The project supports multiple scanning modes (TCP SYN, TCP Connect, UDP) and interfaces directly with network hardware via pnet_datalink, making it ideal for systems where precision and speed matter — such as embedded defense appliances or high-performance monitoring agents.",
    image:
      "https://github.com/Enqute/Movie-Management-System/blob/main/Screenshot%20From%202025-07-05%2022-03-06.png?raw=true",
    link: "https://github.com/HenokEshetu/DeepNet",
  },
  {
    title: "Secure Note Taking App",
    description:
      "A secure note-taking app built with React.js and SpringBoot. It allows users to create, read, update, and delete notes while ensuring data is stored securely with a great cryptographic application which have a certificate authority and great key management.",
    image: "https://img.youtube.com/vi/QkF1usPAFcA/hqdefault.jpg",
    link: "https://github.com/HenokEshetu/notetakingappfrontend",
  },
  {
    title: "Portfolio Website",
    description:
      "A personal portfolio website built with Next.js and Tailwind CSS. It showcases my projects, skills, and experience in a visually appealing and interactive manner.",
    image: "/portfolio.png",
    link: "https://github.com/HenokEshetu/Portfolio",
  },
] as const;

// export const FOOTER_DATA = [
//   {
//     title: "Community",
//     data: [
//       {
//         name: "YouTube",
//         icon: FaYoutube,
//         link: "https://youtube.com",
//       },
//       {
//         name: "GitHub",
//         icon: RxGithubLogo,
//         link: "https://github.com",
//       },
//       {
//         name: "Discord",
//         icon: RxDiscordLogo,
//         link: "https://discord.com",
//       },
//     ],
//   },
//   {
//     title: "Social Media",
//     data: [
//       {
//         name: "Instagram",
//         icon: RxInstagramLogo,
//         link: "https://instagram.com",
//       },
//       {
//         name: "Twitter",
//         icon: RxTwitterLogo,
//         link: "https://twitter.com",
//       },
//       {
//         name: "Linkedin",
//         icon: RxLinkedinLogo,
//         link: "https://linkedin.com",
//       },
//     ],
//   },
//   {
//     title: "About",
//     data: [
//       {
//         name: "Become Sponsor",
//         icon: null,
//         link: "https://youtube.com",
//       },
//       {
//         name: "Learning about me",
//         icon: null,
//         link: "https://example.com",
//       },
//       {
//         name: "Contact Me",
//         icon: null,
//         link: "mailto:contact@example.com",
//       },
//     ],
//   },
// ] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "/#about-me",
  },
  {
    title: "Skills",
    link: "/#skills",
  },
  {
    title: "Projects",
    link: "/#projects",
  },
  {
    title: "Blog",
    link: "/blog",
  },
  {
    title: "Contact Me",
    link: "/#contact",
  },
] as const;

export const LINKS = {
  sourceCode: "https://github.com/HenokEshetu/Portfolio",
};
