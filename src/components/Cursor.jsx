"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return;
    const el = cursorRef.current;
    if (!el) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let scale = 1;
    let targetScale = 1;
    let raf = null;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => { targetScale = 2.5; };
    const onLeave = () => { targetScale = 1; };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a, button").forEach((node) => {
      node.addEventListener("mouseenter", onEnter);
      node.addEventListener("mouseleave", onLeave);
    });

    const observer = new MutationObserver(() => {
      document.querySelectorAll("a:not([data-cur]), button:not([data-cur])").forEach((node) => {
        node.setAttribute("data-cur", "1");
        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const frame = () => {
      raf = requestAnimationFrame(frame);
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      scale += (targetScale - scale) * 0.15;
      
      el.style.transform =
        `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale})`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         32,
        height:        32,
        borderRadius:  "50%",
        border:        "1.5px solid rgba(255, 255, 255, 0.7)",
        background:    "rgba(255, 255, 255, 0.05)",
        backdropFilter: "blur(2px)",
        pointerEvents: "none",
        zIndex:        99999,
        willChange:    "transform",
        transition:    "border-color 0.3s ease, background 0.3s ease",
      }}
    >
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "4px",
          height: "4px",
          background: "#fff",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)"
        }}
      />
    </div>
  );
}
