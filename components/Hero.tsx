"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import FillButton from "@/components/FillButton";
import { scrollToTarget } from "@/lib/lenis";

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const { hero, profile } = portfolio;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Entrance: text, phir portrait, phir cards
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".h-word", { yPercent: 110, duration: 1.2, stagger: 0.12 })
        .from(".h-portrait", { y: 80, opacity: 0, duration: 1.2 }, "-=0.9")
        .from(".h-card", { y: 40, opacity: 0, duration: 0.9, stagger: 0.12 }, "-=0.7");

      // Cards halka halka tairte rahein (andar wala wrapper, taake entrance se na takraye)
      gsap.to(".h-float", {
        y: -10,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      });
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="home"
      className="relative flex min-h-screen flex-col justify-end overflow-hidden pt-24"
    >
      {/* 1) Bara text: portrait ke PEECHE (z-0) */}
      <h1
        className="pointer-events-none absolute inset-x-0 top-[16%] z-0 text-center font-display uppercase leading-[0.85] text-moon"
        style={{ fontSize: "clamp(3.2rem, 14vw, 13rem)" }}
      >
        <span className="sr-only">{profile.name}, </span>
        {hero.headline.map((line) => (
          <span key={line} className="block overflow-hidden">
            <span className="h-word block">{line}</span>
          </span>
        ))}
      </h1>

        {/* 2) Portrait: beech mein (z-10), neeche se halka fade */}
      <div
        className="h-portrait relative z-10 mx-auto h-[55vh] w-full max-w-md lg:h-[90vh]"
        style={{
          WebkitMaskImage: "linear-gradient(to bottom, #000 72%, transparent 100%)",
          maskImage: "linear-gradient(to bottom, #000 85%, transparent 100%)",
        }}
      >
        <Image
          src={profile.portrait}
          alt={`${profile.name} portrait`}
          fill
          priority
          sizes="(min-width: 1024px) 28rem, 90vw"
          className="object-contain object-bottom"
        />
      </div>

      {/* 3) Cards: sab se aage (z-20) */}
      <div className="relative z-20 grid gap-4 px-5 pb-8 sm:grid-cols-2 lg:block lg:p-0">
        {/* Left card: intro + focus list */}
        <div className="h-card lg:absolute lg:bottom-10 lg:left-10 lg:w-80">
          <div className="h-float rounded-3xl border border-moon/15 bg-midnight/80 p-6 backdrop-blur">
            <p className="text-sm leading-relaxed text-moon/80">{hero.intro}</p>
            <ul className="mt-4 space-y-1.5 text-sm">
              {hero.focus.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky" />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <FillButton
                variant="solid"
                onClick={() => scrollToTarget("#projects")}
              >
                View Projects
              </FillButton>
            </div>
          </div>
        </div>

        {/* Right: stat cards */}
        <div className="flex gap-4 sm:justify-end lg:absolute lg:bottom-10 lg:right-10 lg:flex-col">
          {hero.stats.map((s) => (
            <div key={s.label} className="h-card flex-1 lg:flex-none">
              <div className="h-float rounded-3xl border border-moon/15 bg-midnight/80 px-6 py-5 backdrop-blur lg:w-52">
                <p className="font-display text-5xl text-sky">{s.value}</p>
                <p className="mt-1 text-xs uppercase tracking-widest text-moon/70">
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}