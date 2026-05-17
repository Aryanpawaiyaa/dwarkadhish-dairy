"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Center cursor
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.6, ease: "power3" });

    const moveCursor = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      if (isHovering) {
        gsap.to(cursorRef.current, { scale: 3, opacity: 0.5, duration: 0.3 });
      } else {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
      }
    }
  }, [isHovering]);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-100 h-4 w-4 rounded-full bg-white mix-blend-difference shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform duration-300 ease-out"
      style={{ willChange: "transform" }}
    />
  );
}
