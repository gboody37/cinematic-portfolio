"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import McButton from "./McButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function McMenu() {
  const ref = useRef(null);

  useEffect(() => {
    // Fade out when scrolling down (like Hero)
    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: ref.current,
          start: "bottom 80%",
          end: "bottom 10%",
          scrub: 1.2,
        },
        opacity: 0,
        y: -50,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-12"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-5xl">
        
        {/* Name / Logo */}
        <div className="relative mb-20 flex flex-col items-center gap-4">
          <h1 
            className="text-4xl md:text-7xl text-white text-center font-black tracking-wide"
            dir="rtl"
          >
            عبد الرحمن عامودي
          </h1>
          <h2 
            className="text-lg md:text-2xl text-white/60 text-center uppercase tracking-[0.4em] font-light"
          >
            Abdalrahman Amoudi
          </h2>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-4 w-full max-w-3xl">
          <McButton onClick={() => scrollTo('work-section')} className="md:w-[200px]">Projects</McButton>
          <McButton onClick={() => scrollTo('about-section')} className="md:w-[200px]">About Me</McButton>
          <McButton onClick={() => window.open('https://github.com/gboody37', '_blank')} className="md:w-[200px]">GitHub</McButton>
          <McButton onClick={() => scrollTo('contact-section')} className="md:w-[200px]">Contact</McButton>
          <McButton onClick={() => window.location.href='/resume.pdf'} className="md:w-[200px]">Resume</McButton>
        </div>
      </div>
    </section>
  );
}
