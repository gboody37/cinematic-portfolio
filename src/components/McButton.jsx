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

  return (
    <>
      <audio ref={audioRef} src="/click.mp3" preload="auto" />
      <button
        onClick={handleClick}
        className={`relative flex items-center justify-center w-full md:w-[400px] h-[40px] md:h-[48px] bg-[#727272] hover:bg-[#8fa2ff] text-[#e0e0e0] hover:text-white transition-colors duration-0 ${className}`}
        style={{
          fontFamily: "var(--font-pixel), monospace",
          border: "2px solid #000",
          boxShadow: "inset 2px 2px 0px #9e9e9e, inset -2px -2px 0px #4a4a4a",
          textShadow: "2px 2px 0px #3f3f3f",
          ...style
        }}
      >
        <span className="text-[10px] md:text-[14px] leading-none mt-1">{children}</span>
      </button>
    </>
  );
}
