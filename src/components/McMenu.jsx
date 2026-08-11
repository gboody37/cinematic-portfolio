"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import McButton from "./McButton";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function McMenu() {
  const ref = useRef(null);
  const [showRealms, setShowRealms] = useState(false);

  useEffect(() => {
    // Pulse animation for splash text
    gsap.to(".mc-splash", {
      scale: 1.08,
      duration: 0.4,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });

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
        
        {/* Minecraft Logo */}
        <div className="relative mb-20">
          <h1 
            className="text-6xl md:text-8xl text-[#d4d4d4] text-center uppercase tracking-tighter"
            style={{ 
              fontFamily: "var(--font-pixel), monospace",
              textShadow: "6px 6px 0px #3f3f3f, 10px 10px 0px #000"
            }}
          >
            KEYU
          </h1>
          
          {/* Splash Text */}
          <div 
            className="mc-splash absolute -bottom-8 -right-8 md:-right-24 text-yellow-300 text-sm md:text-lg transform -rotate-[20deg]"
            style={{ 
              fontFamily: "var(--font-pixel), monospace",
              textShadow: "2px 2px 0px #3f3f3f"
            }}
          >
            Now with 100% more cinematic!
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="flex flex-col gap-3 md:gap-4 w-full items-center mt-12 max-w-md">
          <McButton onClick={() => scrollTo('work-section')}>Singleplayer</McButton>
          <McButton onClick={() => scrollTo('about-section')}>Multiplayer</McButton>
          <div className="flex w-full">
            <McButton onClick={() => window.open('https://github.com/gboody37', '_blank')} className="w-full">Minecraft Realms</McButton>
          </div>
          <div className="flex gap-3 md:gap-4 w-full">
            <McButton onClick={() => scrollTo('contact-section')} className="flex-1">Options...</McButton>
            <McButton onClick={() => window.location.href='/resume.pdf'} className="flex-1">Quit Game</McButton>
          </div>
        </div>
      </div>
    </section>
  );
}
