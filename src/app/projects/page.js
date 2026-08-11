import { Suspense } from "react";
import Cursor from "../../components/Cursor";
import Navbar from "../../components/Navbar";
import ProjectsPage from "../../views/projects";
import { getProjects } from "@/lib/brain";

export const metadata = {
  title:       "Projects — Case Studies & Client Work by Sarang",
  description: "Explore detailed case studies of Sarang's freelance projects — website development, video editing, and design work with client testimonials and tech breakdowns.",
  keywords:    ["portfolio projects", "case studies", "freelance work", "client projects"],
  alternates:  { canonical: "https://sarang-space.site/projects" },
  openGraph: {
    title: "Projects — Sarang | Case Studies & Client Work",
    description: "Detailed case studies of web development, video editing, and design projects by Sarang.",
  },
};

export default function Page() {
  const obsidianProjects = getProjects();
  return (
    <main>
      <div className="grain-overlay" />
      <Cursor />
      <Navbar />
      <div className="relative z-10">
        <Suspense fallback={<div className="min-h-screen bg-[#060606]" />}>
          <ProjectsPage initialProjects={obsidianProjects} />
        </Suspense>
      </div>
    </main>
  );
}
