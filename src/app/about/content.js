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
  "I am a *creative game developer* and *systems engineer* focused on building immersive digital experiences within *Minecraft* and beyond. Passionate about pushing the boundaries of block-based engines, I focus on creating high-fidelity *mods*, *custom plugins*, and seamless *server architectures*.",
  "Over the years, I have worked on *custom game modes*, large-scale *multiplayer networks*, and complex *data-driven systems*. My work is heavily inspired by *cinematic game design*, performance optimization, and emotionally driven virtual worlds.",
  "As a technical creator, I specialize in *Java development*, *Fabric/Forge modding*, *game server infrastructure*, and visually immersive UI/UX for games. My design philosophy focuses on creating gameplay that feels *premium*, *smooth*, and *emotionally engaging*.",
  "I combine *backend engineering and game design* into one creative workflow. This allows me to build features that not only perform efficiently under heavy load but also create strong *visual impact* through custom rendering, cinematic camera work, and modern mechanics.",
  "My creative philosophy is built around *originality*, *performance*, and *atmosphere*. I believe virtual worlds should feel alive, visually expressive, and deeply connected to the player's actions while maintaining absolute stability."
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
  { role: "Freelance Developer",                       period: "2024 – Present" },
  { role: "Freelance Video Editor",                    period: "2022 – Present" },
  { role: "Freelance Photo Editor & Graphic Designer", period: "2020 – Present" },
];
