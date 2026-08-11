"use client";
import React from "react";

export default function McButton({ children, onClick, className = "", style = {} }) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center w-full h-[50px] md:h-[60px] 
        rounded-full border border-white/20 bg-black/40 backdrop-blur-md 
        text-white font-sans text-xs md:text-sm tracking-[0.2em] uppercase 
        hover:bg-white hover:text-black hover:border-white transition-all duration-300 ${className}`}
      style={style}
    >
      <span>{children}</span>
    </button>
  );
}
