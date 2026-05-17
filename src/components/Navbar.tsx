"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 flex items-center justify-center px-[8vw] py-4 transition-all duration-500",
        scrolled ? "bg-black/10 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <ul className="hidden md:flex items-center gap-8 text-sm font-medium tracking-[0.25em] uppercase text-white mix-blend-difference">
        {["Legacy", "Craft", "Products", "Compliance"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="hover:text-brand-gold transition-colors duration-300">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
