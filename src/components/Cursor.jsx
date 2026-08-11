"use client";
import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  // null = unknown (SSR), true = touch device, false = mouse device
  const [isTouch, setIsTouch] = useState(null);

  useEffect(() => {
    // pointer: coarse → touchscreen; pointer: fine → mouse/trackpad
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch !== false) return;  // skip if touch OR still unknown
    const el = cursorRef.current;
    if (!el) return;

    let mx = -200, my = -200;
    let cx = -200, cy = -200;
    let scale = 1;
    let targetScale = 1;
    let rotation = 0;
    let targetRotation = 0;
    let raf = null;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };
    const onEnter = () => { targetScale = 1.8; targetRotation = 45; };
    const onLeave = () => { targetScale = 1; targetRotation = 0; };

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
      cx += (mx - cx) * 0.11;
      cy += (my - cy) * 0.11;
      scale += (targetScale - scale) * 0.10;
      rotation += (targetRotation - rotation) * 0.15;
      
      el.style.transform =
        `translate(${cx}px,${cy}px) translate(-50%,-50%) scale(${scale}) rotate(${rotation}deg)`;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [isTouch]);

  // Render nothing until we know the device type, and nothing on touch devices
  if (isTouch !== false) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        width:         24,
        height:        24,
        mixBlendMode:  "difference",
        pointerEvents: "none",
        zIndex:        99999,
        willChange:    "transform",
      }}
    >
      {/* Vertical crosshair line */}
      <div 
        style={{
          position: "absolute",
          left: "50%",
          top: "0",
          bottom: "0",
          width: "2px",
          background: "#fff",
          transform: "translateX(-50%)"
        }}
      />
      {/* Horizontal crosshair line */}
      <div 
        style={{
          position: "absolute",
          top: "50%",
          left: "0",
          right: "0",
          height: "2px",
          background: "#fff",
          transform: "translateY(-50%)"
        }}
      />
    </div>
  );
}
