"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CanvasSequenceProps {
  sequencePath: string; // e.g., "/Cow_milk_commercial_golden_sunrise"
  fileNamePrefix: string; // e.g., "ezgif-frame-"
  frameCount: number; // e.g., 240
  extension?: string; // e.g., ".jpg"
  className?: string;
  onProgress?: (progress: number) => void;
  pin?: boolean;
  children?: React.ReactNode;
}

function padNumber(num: number, length: number) {
  return num.toString().padStart(length, "0");
}

export function CanvasSequence({
  sequencePath,
  fileNamePrefix,
  frameCount,
  extension = ".jpg",
  className,
  onProgress,
  pin = true,
  children,
}: CanvasSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const stateRef = useRef({
    currentFrame: 0,
    targetFrame: 0,
    loaded: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d", { alpha: false });
    if (!canvas || !ctx || !containerRef.current) return;

    // Preload manager
    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `${sequencePath}/${fileNamePrefix}${padNumber(i, 3)}${extension}`;
      images.push(img);

      img.onload = () => {
        stateRef.current.loaded++;
        if (i === 1) {
          renderFrame(1);
        }
      };
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      renderFrame(stateRef.current.currentFrame);
    };

    window.addEventListener("resize", resize);
    resize();

    function renderFrame(index: number) {
      if (!ctx || !canvas) return;
      
      // Keep index in bounds
      const safeIndex = Math.max(1, Math.min(frameCount, Math.round(index)));
      const img = imagesRef.current[safeIndex - 1];

      if (img && img.complete) {
        // Cover fit logic (9:16 target ratio handled by cover fit)
        const canvasRatio = canvas.width / canvas.height;
        const imgRatio = img.width / img.height;
        
        let drawWidth, drawHeight, offsetX, offsetY;

        if (canvasRatio > imgRatio) {
          drawWidth = canvas.width;
          drawHeight = canvas.width / imgRatio;
          offsetX = 0;
          offsetY = (canvas.height - drawHeight) / 2;
        } else {
          drawWidth = canvas.height * imgRatio;
          drawHeight = canvas.height;
          offsetX = (canvas.width - drawWidth) / 2;
          offsetY = 0;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      }
    }

    let rafId: number;
    const renderLoop = () => {
      // Lerp for smooth frame transition
      stateRef.current.currentFrame += (stateRef.current.targetFrame - stateRef.current.currentFrame) * 0.12;
      
      // Only render if we have a visible change
      if (Math.abs(stateRef.current.targetFrame - stateRef.current.currentFrame) > 0.01) {
        renderFrame(stateRef.current.currentFrame);
      }
      
      rafId = requestAnimationFrame(renderLoop);
    };
    rafId = requestAnimationFrame(renderLoop);

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: pin ? "top top" : "top bottom",
      end: pin ? "+=300%" : "bottom top",
      pin: pin,
      scrub: true,
      onUpdate: (self) => {
        stateRef.current.targetFrame = 1 + self.progress * (frameCount - 1);
        if (onProgress) {
          onProgress(self.progress);
        }
      },
    });

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
      trigger.kill();
    };
  }, [sequencePath, fileNamePrefix, frameCount, extension, onProgress, pin]);

  return (
    <div ref={containerRef} className={`h-screen w-full relative overflow-hidden ${className || ""}`}>
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />
      {children && <div className="absolute inset-0 z-10">{children}</div>}
    </div>
  );
}
