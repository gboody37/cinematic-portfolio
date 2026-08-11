// ─────────────────────────────────────────────
//  ABOUT SECTION — edit everything here
// ─────────────────────────────────────────────

import {
  SiReact, SiNextdotjs, SiJavascript, SiTailwindcss,
  SiFlutter, SiShopify, SiPython, SiCplusplus,
  SiDavinciresolve, SiFigma,
  SiHtml5, SiCss, SiTypescript, SiPhp, SiGo, SiRust, SiSwift, SiKotlin,
  SiGit, SiDocker, SiNodedotjs, SiExpress, SiMongodb, SiPostgresql, SiMysql, SiRedis,
  SiVercel, SiNetlify, SiPostman,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import {
  TbCut, TbSql, TbPhoto,
  TbBrandAdobeAfterEffect, TbBrandAdobePremier,
  TbBrandAdobePhotoshop, TbBrandAdobeIllustrator,
} from "react-icons/tb";

export const SECTION = {
  label: "About Me",
};

export const HEADING = {
  line1: "Crafting",
  line2: "the",
  line3: "invisible.",   // ghost (outline) style
};

// *word* = highlighted/bold in BlurText
export const BIO = [
  "I am a *BTEC student* and a *professional network engineer*, highly skilled in designing, configuring, and deploying complex network topologies using tools like *Cisco Packet Tracer*.",
  "Alongside my networking expertise, I am a *professional AI specialist*. I leverage a massive ecosystem of advanced AI tools to build intelligent systems, automate workflows, and push the boundaries of modern technology.",
  "My skill set extends deep into the creative realm. I am highly proficient in the *Adobe Creative Cloud* suite—using Premiere Pro, After Effects, and Photoshop to merge robust technical engineering with cinematic visual design.",
  "I pride myself on being *good at everything*. Whether it's configuring intricate network routing, deploying state-of-the-art AI models, or crafting high-fidelity video edits, I master every tool I touch to deliver perfect results."
];

export const RESUME_URL = "/resume.pdf";

export const TECH = [
  { name: "React",          icon: SiReact },
  { name: "Next.js",        icon: SiNextdotjs },
  { name: "JavaScript",     icon: SiJavascript },
  { name: "TypeScript",     icon: SiTypescript },
  { name: "HTML5",          icon: SiHtml5 },
  { name: "CSS3",           icon: SiCss },
  { name: "Tailwind CSS",   icon: SiTailwindcss },
  { name: "Node.js",        icon: SiNodedotjs },
  { name: "Express",        icon: SiExpress },
  { name: "Flutter",        icon: SiFlutter },
  { name: "Shopify Liquid", icon: SiShopify },
  { name: "Python",         icon: SiPython },
  { name: "Java",           icon: FaJava },
  { name: "C++",            icon: SiCplusplus },
  { name: "PHP",            icon: SiPhp },
  { name: "Go",             icon: SiGo },
  { name: "Rust",           icon: SiRust },
  { name: "Swift",          icon: SiSwift },
  { name: "Kotlin",         icon: SiKotlin },
  { name: "SQL",            icon: TbSql },
  { name: "MongoDB",        icon: SiMongodb },
  { name: "PostgreSQL",     icon: SiPostgresql },
  { name: "MySQL",          icon: SiMysql },
  { name: "Redis",          icon: SiRedis },
  { name: "Git",            icon: SiGit },
  { name: "Docker",         icon: SiDocker },
  { name: "Vercel",         icon: SiVercel },
  { name: "Netlify",        icon: SiNetlify },
  { name: "Postman",        icon: SiPostman },
];

export const CREATIVE = [
  { name: "After Effects",   icon: TbBrandAdobeAfterEffect },
  { name: "Premiere Pro",    icon: TbBrandAdobePremier },
  { name: "DaVinci Resolve", icon: SiDavinciresolve },
  { name: "CapCut",          icon: TbCut },
  { name: "Photoshop",       icon: TbBrandAdobePhotoshop },
  { name: "Lightroom",       icon: TbPhoto },
  { name: "Figma",           icon: SiFigma },
  { name: "Illustrator",     icon: TbBrandAdobeIllustrator },
];

export const EXPERIENCE = [
  { role: "Professional Network Engineer", period: "2024 – Present" },
  { role: "AI Specialist",                 period: "2023 – Present" },
  { role: "Professional Video Editor",     period: "2022 – Present" },
];
