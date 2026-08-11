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
      className="relative min-h-[100vh] flex flex-col items-center justify-center overflow-hidden pt-10"
    >
      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl px-4">
        
        {/* Logo */}
        <div className="relative mb-16">
          <h1 
            className="text-7xl md:text-9xl text-white text-center uppercase tracking-[0.2em] font-black"
          >
            KEYU
          </h1>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-4 md:gap-5 w-full items-center max-w-md">
          <McButton onClick={() => scrollTo('work-section')}>Projects</McButton>
          <McButton onClick={() => scrollTo('about-section')}>About Me</McButton>
          <div className="flex w-full">
            <McButton onClick={() => window.open('https://github.com/gboody37', '_blank')} className="w-full">GitHub</McButton>
          </div>
          <div className="flex gap-4 md:gap-5 w-full">
            <McButton onClick={() => scrollTo('contact-section')} className="flex-1">Contact</McButton>
            <McButton onClick={() => window.location.href='/resume.pdf'} className="flex-1">Resume</McButton>
          </div>
        </div>
      </div>
    </section>
  );
}
