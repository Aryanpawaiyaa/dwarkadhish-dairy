"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setIsLoading(false);
      },
    });

    // 1. Drop falls
    tl.fromTo(
      dropRef.current,
      { y: "-100vh", opacity: 1, scale: 1 },
      { y: "50vh", duration: 0.8, ease: "power2.in" }
    )
    // 2. Drop disappears, ripple starts
    .to(dropRef.current, { opacity: 0, duration: 0.1, scale: 0 })
    .fromTo(
      rippleRef.current,
      { scale: 0, opacity: 0.8 },
      { scale: 10, opacity: 0, duration: 1.5, ease: "power2.out" },
      "-=0.1"
    )
    // Wait for ripple to finish before fading out
    .to({}, { duration: 0.5 })
    // 5. Container fades out
    .to(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-1000 flex items-center justify-center bg-background"
    >
      <div
        ref={dropRef}
        className="absolute w-4 h-6 bg-brand-milk rounded-[50%] blur-[1px]"
        style={{ top: 0, left: "50%", transform: "translateX(-50%)" }}
      />
      <div
        ref={rippleRef}
        className="absolute w-[100px] h-[100px] rounded-full border-2 border-brand-milk mix-blend-screen"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  );
}
