"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage({ initialProjects = [] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allFull, setAllFull] = useState(null);
  
  const catParam = searchParams.get("cat");
  
  const getInitialCategory = () => {
    if (!catParam) return "ALL";
    const c = catParam.toLowerCase();
    if (c.includes("web") || c.includes("site")) return "WEBSITE";
    if (c.includes("design") || c.includes("poster") || c.includes("photo") || c.includes("pic")) return "DESIGNS";
    if (c.includes("video") || c.includes("motion") || c.includes("film") || c.includes("edit")) return "VIDEOS";
    return "ALL";
  };
  
  const [activeCategory, setActiveCategory] = useState(getInitialCategory());

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      const normalizeCategory = (cat) => {
        const c = (cat || "").toLowerCase();
        if (c.includes("web") || c.includes("site") || c.includes("network")) return "Website";
        if (c.includes("design") || c.includes("poster") || c.includes("ui") || c.includes("graphic") || c.includes("brand")) return "Designs";
        if (c.includes("photo") || c.includes("image") || c.includes("pic")) return "Photos";
        if (c.includes("video") || c.includes("motion") || c.includes("film") || c.includes("edit")) return "Videos";
        return "Website";
      };
      const mapped = initialProjects.map((p) => ({
        id: p.slug,
        image: p.coverImage || `https://picsum.photos/seed/${p.slug}/800/600?grayscale`,
        text: p.title,
        category: normalizeCategory((p.tags && p.tags.join(" ")) || p.status),
        description: p.tags ? p.tags.join(', ') : '',
        tech: p.tags ? p.tags.join('·') : '',
        link: p.repository ? `https://github.com/${p.repository}` : '',
      }));
      setAllFull(mapped);
    } else {
      setAllFull([]);
    }
  }, [initialProjects]);

  const [filteredFull, setFilteredFull] = useState([]);

  useEffect(() => {
    if (!allFull) return;
    const filtered = activeCategory === "ALL"
      ? allFull
      : allFull.filter(p => (p.category || "").toLowerCase() === activeCategory.toLowerCase());
    setFilteredFull(filtered);
  }, [allFull, activeCategory]);

  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
  };

  const handleItemClick = useCallback((id) => {
    if (id) {
      router.push(`/project/${id}`);
    }
  }, [router]);

  const categories = ["ALL", "WEBSITE", "DESIGNS", "PHOTOS", "VIDEOS"];

  return (
    <section className="relative w-full min-h-screen pb-24 text-white">
      {/* Background Image */}
      <img src="/photo/sunset-bg.jpg" className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none" alt="Background" />
      
      {/* Background dark overlay to ensure content is readable over nature sunset */}
      <div className="fixed inset-0 bg-black/75 z-0 pointer-events-none" />

      {/* Header Area */}
      <div className="relative z-20 pt-24 md:pt-32 px-6 md:px-20 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <p className="font-sans text-[10px] md:text-[12px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-3 font-medium">
            Creative
          </p>
          <h1 className="font-sans font-black tracking-tighter text-white leading-none text-5xl md:text-7xl lg:text-8xl">
            {activeCategory === "ALL" ? "Archive." : activeCategory.charAt(0) + activeCategory.slice(1).toLowerCase() + "."}
          </h1>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex gap-6 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`text-[12px] uppercase tracking-[0.2em] font-bold transition-all duration-300 relative pb-2 ${activeCategory === cat ? "text-[#ff6b1a]" : "text-white/40 hover:text-white"}`}
            >
              {cat}
              {activeCategory === cat && (
                <motion.div layoutId="activeFilterGrid" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#ff6b1a]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Filters (Sticky) */}
      <div className="md:hidden sticky top-24 z-30 mb-8 px-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-4 py-2 rounded-full text-[10px] uppercase tracking-[0.1em] font-bold transition-all duration-300 ${
                activeCategory === cat ? "bg-[#ff6b1a] text-black" : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative z-20 px-6 md:px-20 max-w-7xl mx-auto">
        {filteredFull && filteredFull.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredFull.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative cursor-pointer flex flex-col gap-4"
                  onClick={() => handleItemClick(project.id)}
                >
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 border border-white/10">
                    <img 
                      src={project.image} 
                      alt={project.text}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* Hover Info Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-[#ff6b1a] text-[10px] uppercase tracking-widest font-bold mb-2">View Project</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1 group-hover:text-[#ff6b1a] transition-colors">
                      {project.text}
                    </h3>
                    <p className="text-sm text-white/50 uppercase tracking-widest font-medium">
                      {project.category}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : filteredFull && filteredFull.length === 0 ? (
          <div className="flex items-center justify-center py-32 text-white/30 text-sm tracking-[0.3em] uppercase">
            No projects found in this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
