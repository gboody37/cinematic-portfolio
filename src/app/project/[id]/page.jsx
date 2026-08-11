"use client";
import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import Image from "next/image";
import PageShell from "../../../components/PageShell";

function safeUrl(url) {
  if (!url) return url;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

const renderParsedText = (text) => {
  if (!text) return "";
  const parts = text.split(/\*([^*]+)\*/g);
  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <span key={index} className="font-serif italic text-white/90">
          {part}
        </span>
      );
    }
    return part;
  });
};

export default function ProjectPage() {
  const { id } = useParams();
  const router  = useRouter();
  const ref = useRef(null);
  const [project, setProject]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch(`/api/works/${id}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); setLoading(false); return null; }
        return r.json();
      })
      .then((data) => {
        if (data && !data.error) {
          setProject(data);
          setLoading(false);
        } else {
          setNotFound(true);
          setLoading(false);
        }
      })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [id]);

  useEffect(() => {
    if (!project) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    const ctx = gsap.context(() => {
      gsap.from(".ap-label", { y: 20, opacity: 0, duration: 0.5, delay: 0.3 });
      gsap.from(".ap-h", { y: 55, opacity: 0, duration: 0.8, ease: "power4.out", delay: 0.5 });
      gsap.from(".ap-bio", { y: 25, opacity: 0, duration: 0.6, delay: 0.7 });
      gsap.from(".ap-img", { scale: 1.04, opacity: 0, duration: 1.4, ease: "power3.out", delay: 0.1 });
      gsap.from(".ap-media", { scale: 0.95, opacity: 0, duration: 1.2, ease: "power4.out", delay: 0.5 });
    }, ref);
    return () => ctx.revert();
  }, [project]);

  // Parse tech/services into array safely
  const servicesData = project?.services || project?.tech;
  let services = [];
  if (Array.isArray(servicesData)) {
    services = servicesData;
  } else if (typeof servicesData === "string") {
    services = servicesData.split(/[,;]/).map((s) => s.trim()).filter(Boolean);
  }

  return (
    <PageShell>
      <section ref={ref} className="relative w-full min-h-dvh overflow-y-auto">

        {/* Background image - consistent with About Me */}
        <div className="ap-img fixed inset-0 z-0 opacity-40">
          <Image
            src="/photo/sunset-bg.jpg"
            alt="Background"
            fill
            className="object-cover object-center filter blur-md"
            priority
          />
          {/* Mobile: heavy bottom dark overlay so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/80 to-[#080808]/30 md:hidden" />
          {/* Desktop: side gradient */}
          <div className="hidden md:block absolute inset-0 bg-gradient-to-l from-[#080808] via-[#080808]/90 to-transparent" />
          <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/60" />
        </div>

        {loading && (
          <div className="relative z-10 flex items-center justify-center min-h-screen">
            <div className="w-6 h-6 border-2 border-white/20 border-t-[#ff6b1a] rounded-full animate-spin" />
          </div>
        )}

        {notFound && (
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen gap-6">
            <p className="text-white/20 text-sm tracking-widest uppercase">Project not found</p>
            <Link href="/projects" className="text-[#ff6b1a] text-[11px] tracking-[0.4em] uppercase hover:opacity-70 transition-opacity">
              Back to projects
            </Link>
          </div>
        )}

        {project && (
          <>
            {/* ── MOBILE LAYOUT ── */}
            <div className="flex flex-col px-5 pt-28 pb-10 relative z-10 md:hidden min-h-dvh">
              <p className="ap-label text-[10px] text-[#ff6b1a] tracking-[0.5em] uppercase mb-4 font-medium">
                {project.category || "CASE STUDY"}
              </p>
              <h1 className="ap-h font-black text-3xl tracking-tighter leading-none mb-6">
                <span className="block text-white">{project.title}</span>
              </h1>

              {/* Main Image Mobile */}
              {(project.image_url || project.mobile_image_url) && (
                <div className="ap-media w-full aspect-[4/3] rounded-2xl overflow-hidden mb-8 border border-white/10">
                  <img
                    src={project.image_url || project.mobile_image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {project.description && (
                <div className="ap-bio mb-8">
                  <h3 className="text-white font-bold text-sm mb-3">OVERVIEW</h3>
                  <p className="text-[13px] text-white/50 font-light leading-relaxed">
                    {renderParsedText(project.description)}
                  </p>
                </div>
              )}

              {/* Meta Details */}
              <div className="ap-bio grid grid-cols-2 gap-6 mb-8">
                {project.client && (
                  <div>
                    <p className="text-[9px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-1.5 font-bold">Client</p>
                    <p className="text-white text-sm font-medium">{project.client}</p>
                  </div>
                )}
                {project.year && (
                  <div>
                    <p className="text-[9px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-1.5 font-bold">Year</p>
                    <p className="text-white text-sm font-medium">{project.year}</p>
                  </div>
                )}
              </div>

              {services.length > 0 && (
                <div className="ap-bio mb-10">
                  <p className="text-[9px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-3 font-bold">Services & Tech</p>
                  <div className="flex flex-wrap gap-2">
                    {services.map((s) => (
                      <span key={s} className="px-3 py-1.5 rounded-full border border-white/10 text-white/70 text-[10px] uppercase tracking-wider">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {project.link && (
                <a
                  href={safeUrl(project.link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ap-bio inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#ff6b1a]/30 text-[#ff6b1a] text-[10px] font-bold uppercase tracking-widest rounded-full hover:bg-[#ff6b1a] hover:text-black transition-colors duration-300 w-full mb-12"
                >
                  View Live Project
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
              )}
            </div>

            {/* ── DESKTOP LAYOUT ── */}
            <div className="hidden md:flex relative z-10 w-full min-h-dvh max-w-[1400px] mx-auto px-16 xl:px-24">
              
              {/* Left Column - Meta & Info */}
              <div className="w-[45%] lg:w-[40%] flex flex-col justify-center py-20 pr-12 xl:pr-20">
                <p className="ap-label text-[11px] xl:text-[12px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-6 font-medium">
                  {project.category || "CASE STUDY"}
                </p>
                <h1 className="ap-h font-black text-5xl xl:text-6xl tracking-tighter leading-[0.95] mb-10 text-white">
                  {project.title}
                </h1>

                {project.description && (
                  <div className="ap-bio mb-10">
                    <h3 className="text-white font-bold text-sm tracking-widest mb-4">OVERVIEW</h3>
                    <p className="text-[14px] xl:text-[15px] text-white/50 font-light leading-relaxed">
                      {renderParsedText(project.description)}
                    </p>
                  </div>
                )}

                <div className="ap-bio grid grid-cols-2 gap-8 mb-10">
                  {project.client && (
                    <div>
                      <p className="text-[10px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-2 font-bold">Client</p>
                      <p className="text-white text-base font-medium">{project.client}</p>
                    </div>
                  )}
                  {project.year && (
                    <div>
                      <p className="text-[10px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-2 font-bold">Year</p>
                      <p className="text-white text-base font-medium">{project.year}</p>
                    </div>
                  )}
                </div>

                {services.length > 0 && (
                  <div className="ap-bio mb-12">
                    <p className="text-[10px] text-[#ff6b1a] tracking-[0.4em] uppercase mb-4 font-bold">Services & Tech</p>
                    <div className="flex flex-wrap gap-2.5">
                      {services.map((s) => (
                        <span key={s} className="px-4 py-2 rounded-full border border-white/10 text-white/70 text-[11px] uppercase tracking-wider bg-black/40 backdrop-blur-sm">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.link && (
                  <a
                    href={safeUrl(project.link)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ap-bio self-start inline-flex items-center gap-3 px-6 py-3.5 border border-[#ff6b1a]/30 text-[#ff6b1a] text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#ff6b1a] hover:text-black transition-colors duration-300"
                  >
                    View Live Project
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </a>
                )}
                
                <Link href="/projects" className="ap-bio mt-16 text-white/30 hover:text-white text-xs uppercase tracking-widest transition-colors flex items-center gap-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                  Back to Projects
                </Link>
              </div>

              {/* Right Column - Media */}
              <div className="w-[55%] lg:w-[60%] flex items-center justify-center py-20">
                {(project.image_url || project.mobile_image_url) && (
                  <div className="ap-media relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#080808]/50 backdrop-blur-xl">
                    <img
                      src={project.image_url || project.mobile_image_url}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

      </section>
    </PageShell>
  );
}
