"use client";
import React, { useRef } from "react";

export default function McButton({ children, onClick, className = "", style = {} }) {
  const audioRef = useRef(null);

  const handleClick = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
    if (onClick) onClick(e);
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <>
      <audio ref={audioRef} src="/click.mp3" preload="auto" />
      <button
        onClick={handleClick}
        onMouseEnter={(e) => { setIsHovered(true); if (onClick) e.target.style.transform = "scale(1.02)"; }}
        onMouseLeave={(e) => { setIsHovered(false); if (onClick) e.target.style.transform = "scale(1)"; }}
        className={`relative flex items-center justify-center w-full md:w-[400px] h-[40px] md:h-[48px] transition-transform duration-75 ${className}`}
        style={{
          fontFamily: "var(--font-pixel), monospace",
          backgroundColor: isHovered ? "#7e88d1" : "#c6c6c6",
          border: "2px solid #000000",
          boxShadow: isHovered 
            ? "inset 3px 3px 0px #a4afe5, inset -3px -3px 0px #4e558c"
            : "inset 3px 3px 0px #ffffff, inset -3px -3px 0px #555555",
          color: isHovered ? "#ffffa0" : "#e0e0e0",
          textShadow: "2px 2px 0px #3f3f3f",
          cursor: "none",
          ...style
        }}
      >
        <span className="text-[12px] md:text-[16px] leading-none mt-1">{children}</span>
      </button>
    </>
  );
}
