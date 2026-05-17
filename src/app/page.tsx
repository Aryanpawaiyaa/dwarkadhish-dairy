"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { CanvasSequence } from "@/components/CanvasSequence";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  const [khoyaProgress, setKhoyaProgress] = useState(0);
  const mainRef = useRef<HTMLElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme switching logic based on scroll
    const ctx = gsap.context(() => {
      // Beat 1 to Beat 2 (Light to Dark)
      ScrollTrigger.create({
        trigger: beat2Ref.current,
        start: "top 60%",
        end: "top 40%",
        onEnter: () => document.documentElement.classList.add("dark"),
        onLeaveBack: () => document.documentElement.classList.remove("dark"),
        scrub: true,
      });

      // Beat 3 to Beat 4 (Dark to Light)
      ScrollTrigger.create({
        trigger: ".beat-4-trigger",
        start: "top 60%",
        end: "top 40%",
        onEnter: () => document.documentElement.classList.remove("dark"),
        onLeaveBack: () => document.documentElement.classList.add("dark"),
        scrub: true,
      });

      // Split text reveal for "Purity, Perfected."
      gsap.fromTo(
        ".beat-1-text span",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: beat1Ref.current,
            start: "top 50%",
          },
        }
      );

      // Parallax for Bento Grid
      gsap.utils.toArray<HTMLElement>(".bento-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 40, scale: 1, rotation: 0 },
          {
            y: 0,
            scale: 1.03,
            rotation: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              scrub: 1,
            },
          }
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="relative w-full overflow-hidden">
      
      {/* BEAT 1: THE GOLDEN POUR */}
      <section ref={beat1Ref} className="relative w-full" id="home">
        {/* Canvas is pinned by ScrollTrigger inside the component */}
        <CanvasSequence
          sequencePath="/Cow_milk_commercial_golden_sunrise"
          fileNamePrefix="ezgif-frame-"
          frameCount={240}
        >
          <div className="absolute inset-0 pointer-events-none z-10 bg-linear-to-b from-transparent via-transparent to-black/30" />
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-[8vw]">
            <h1 className="beat-1-text font-serif text-[clamp(4rem,10vw,9rem)] leading-tight text-white mix-blend-overlay text-center mb-6 overflow-hidden">
              {"Purity, Perfected.".split("").map((char, i) => (
                <span key={i} className="inline-block">{char === " " ? "\u00A0" : char}</span>
              ))}
            </h1>
            <p className="text-white/80 font-sans tracking-wide text-lg md:text-2xl text-center max-w-2xl font-light drop-shadow-md">
              Gram Lawan&apos;s finest, delivered from the heart of Madhya Pradesh.
            </p>
          </div>
        </CanvasSequence>
      </section>

      {/* BEAT 2: THE 40-YEAR LEGACY */}
      <section ref={beat2Ref} className="relative min-h-screen py-40 px-[8vw] z-20 bg-background" id="legacy">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center h-full">
          <div className="relative h-[70vh] w-full overflow-hidden rounded-[40px]">
            <Image
              src="/Owner.png"
              alt="40 Years Legacy"
              fill
              className="object-cover transition-transform duration-[10s] hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center space-y-8 relative">
            {/* Vertical Line */}
            <div className="absolute -left-10 top-0 w-px h-full bg-brand-gold/30 origin-top transform scale-y-0 transition-transform duration-1000 scroll-visible:scale-y-100" />
            
            <h2 className="font-serif text-[clamp(3rem,6vw,5rem)] leading-none text-foreground">
              40 Years of Uncompromised Trust
            </h2>
            <p className="font-sans text-xl text-foreground/70 font-light leading-relaxed">
              Established in 1986, Dwarkadhish Dairy has been the cornerstone of pure, unadulterated dairy in Bhind for four decades.
            </p>
            <div className="pt-8 mt-4 border-t border-black/10 dark:border-white/10">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/40 mb-2">Founder & Owner</p>
              <h3 className="font-serif text-3xl text-foreground mb-1">Mr. Virendra Singh Narwariya</h3>
              <p className="font-mono text-brand-gold tracking-widest text-lg mt-2">+91 9425117241</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEAT 3: THE ALCHEMY OF TRADITION */}
      <section className="relative w-full z-20 bg-background" id="craft">
        <CanvasSequence
          sequencePath="/Milk_transforms_into_khoya_pot"
          fileNamePrefix="ezgif-frame-"
          frameCount={240}
          onProgress={setKhoyaProgress}
          pin={true}
        >
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 px-[8vw]">
            <div className="relative w-full h-full flex flex-col items-center justify-center">
              <h2
                className="absolute font-serif text-[clamp(3rem,8vw,6rem)] text-white text-center transition-all duration-700 mix-blend-difference"
                style={{
                  opacity: khoyaProgress < 0.3 ? 1 : 0,
                  transform: `translateY(${(0.15 - khoyaProgress) * 200}px) scale(${1 + khoyaProgress})`,
                  filter: `blur(${khoyaProgress > 0.25 ? 10 : 0}px)`
                }}
              >
                Untouched Farm Milk
              </h2>
              <h2
                className="absolute font-serif text-[clamp(3rem,8vw,6rem)] text-brand-gold text-center transition-all duration-700 mix-blend-screen"
                style={{
                  opacity: khoyaProgress >= 0.3 && khoyaProgress < 0.6 ? 1 : 0,
                  transform: `translateY(${(0.45 - khoyaProgress) * 200}px) scale(${1 + (khoyaProgress - 0.3)})`,
                  filter: `blur(${khoyaProgress < 0.35 || khoyaProgress > 0.55 ? 10 : 0}px)`
                }}
              >
                The Slow Craft
              </h2>
              <h2
                className="absolute font-serif text-[clamp(3rem,8vw,6rem)] text-brand-terra text-center transition-all duration-700"
                style={{
                  opacity: khoyaProgress >= 0.6 ? 1 : 0,
                  transform: `translateY(${(0.8 - khoyaProgress) * 200}px) scale(${1 + (khoyaProgress - 0.6)})`,
                  filter: `blur(${khoyaProgress < 0.65 ? 10 : 0}px)`
                }}
              >
                Authentic Rich Khoya
              </h2>
            </div>
          </div>
        </CanvasSequence>
      </section>

      {/* BEAT 4: THE ECOSYSTEM GRID */}
      <section className="beat-4-trigger relative min-h-screen py-40 px-[8vw] z-30 bg-background" id="products">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[400px]">
          {/* Card 1 */}
          <div className="bento-card col-span-1 md:col-span-8 relative rounded-[40px] overflow-hidden group">
            <CanvasSequence
              sequencePath="/Hand_holding_coffee_cup_pouring"
              fileNamePrefix="ezgif-frame-"
              frameCount={240}
              pin={false}
              className="h-full! absolute!"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
            <div className="absolute bottom-10 left-10 z-10">
              <h3 className="font-serif text-4xl text-white">The Perfect Microfoam</h3>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bento-card col-span-1 md:col-span-4 relative rounded-[40px] overflow-hidden group">
            <Image
              src="/gulab-jamun.png"
              alt="Festive Sweets"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-10 left-10 z-10">
              <h3 className="font-serif text-3xl text-white">Festive Sweets</h3>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bento-card col-span-1 md:col-span-12 relative rounded-[40px] overflow-hidden group bg-secondary flex items-center justify-center">
            <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay" />
            <div className="z-10 text-center">
              <h3 className="font-serif text-5xl text-foreground mb-4">Community & Wholesale</h3>
              <p className="font-sans text-foreground/60 uppercase tracking-widest text-sm">Serving Bhind Since 1986</p>
            </div>
          </div>
        </div>
      </section>

      {/* BEAT 5: ABSOLUTE TRUST */}
      <section className="relative min-h-[80vh] py-32 px-[8vw] z-30 bg-background border-t border-black/5 dark:border-white/5 flex items-center" id="compliance">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 w-full">
          <div className="space-y-12">
            <div className="relative inline-block">
              <h3 className="font-sans text-6xl font-light text-foreground mb-2">FSSAI</h3>
              <div className="font-mono text-3xl text-brand-blue tracking-widest animate-pulse">
                21423670000871
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-8 text-sm font-sans uppercase tracking-widest text-foreground/60">
              <div>
                <div className="mb-2 text-xs opacity-50">Authority</div>
                <div className="text-foreground">Govt. of Madhya Pradesh</div>
              </div>
              <div>
                <div className="mb-2 text-xs opacity-50">Business Type</div>
                <div className="text-foreground">Petty Food Business</div>
              </div>
              <div className="col-span-2">
                <div className="mb-2 text-xs opacity-50">Address</div>
                <div className="text-foreground">GRAM LAWAN KALI MATA MANDIR KE SAMNE<br/>Bhind</div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end items-end text-right w-full">
            <a href="#" className="group relative overflow-hidden rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 p-8 backdrop-blur-md transition-all duration-500 hover:border-brand-blue/50 hover:bg-brand-blue/5">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-500">
                <div className="w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,214,255,0.8)_0%,transparent_70%)] blur-2xl" />
              </div>
              <div className="relative z-10 flex flex-col items-end">
                <p className="text-xs uppercase tracking-[0.3em] text-foreground/40 mb-2">Digital Experience By</p>
                <h4 className="font-serif text-3xl text-foreground group-hover:text-brand-blue transition-colors duration-300">Aryan Singh</h4>
                <div className="mt-6 flex items-center gap-3 font-mono text-xs text-brand-blue opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                  <span className="animate-pulse shadow-[0_0_8px_#00D6FF] rounded-full w-2 h-2 bg-brand-blue inline-block"></span> 
                  Initialize Portfolio
                </div>
              </div>
              <div className="absolute inset-0 overflow-hidden rounded-3xl opacity-0 group-hover:opacity-30 pointer-events-none">
                <div className="w-full h-[2px] bg-brand-blue shadow-[0_0_15px_#00D6FF] animate-scanline" />
              </div>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
