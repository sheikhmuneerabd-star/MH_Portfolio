"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import ServiceArt from "@/components/ServiceArt";

export default function Services() {
  const root = useRef<HTMLElement>(null);
  const { services } = portfolio;

  useGSAP(
    () => {
      // Reduced motion: koi animation nahi, sab seedha nazar aaye
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // 1) "SERVICES" marquee: scroll ke saath left ki taraf chalta hai
      gsap.to(".s-marquee", {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: ".s-head",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2) Cards: odd left se, even right se (scrub)
      // Mobile par kam faasla, taake side se bahar na nikle
      const dist = window.innerWidth < 768 ? 30 : 60;
      gsap.utils.toArray<HTMLElement>(".s-card").forEach((card, i) => {
        const fromLeft = i % 2 === 0; // 1st, 3rd = left
        gsap.fromTo(
          card,
          { xPercent: fromLeft ? -dist : dist, opacity: 0.2 },
          {
            xPercent: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 95%",
              end: "top 45%",
              scrub: true,
            },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    // overflow-x-clip: side se aate cards se page ka horizontal scroll na bane
    // (sticky ke saath clip theek chalta hai, hidden nahi)
    <section ref={root} id="skills" className="overflow-x-clip py-24 md:py-40">
      {/* Bara marquee heading */}
      <div className="s-head mb-16 overflow-hidden md:mb-24" aria-hidden="true">
        <div
          className="s-marquee flex w-max gap-12 whitespace-nowrap font-display uppercase leading-none text-moon"
          style={{ fontSize: "clamp(4rem, 18vw, 16rem)" }}
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className={i % 2 ? "text-sky" : ""}>
              Services
            </span>
          ))}
        </div>
      </div>
      <h2 className="sr-only">Services</h2>

      {/* Pill cards */}
      <div className="space-y-6 px-5 md:space-y-10 md:px-10">
        {services.map((s, i) => (
          <article
            key={s.num}
            className="s-card rounded-[2.5rem] border border-moon/15 bg-midnight p-6 shadow-2xl md:sticky md:rounded-[4rem] md:p-12"
            // Desktop par cards thoda thoda farq se upar chipakte hain
            style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
          >
            <div
              className={`flex flex-col gap-8 md:items-center md:gap-14 ${
                i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Text side */}
              <div className="flex-1">
                <p className="text-sm tracking-[0.3em] text-dusk">{s.num}</p>
                <h3 className="mt-2 font-display text-5xl md:text-7xl">{s.title}</h3>
                <p className="mt-4 max-w-md text-moon/70">{s.description}</p>

                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {s.tech.map((t) => (
                    <li
                      key={t}
                      className="cursor-default rounded-full border border-moon/25 px-4 py-2 text-sm transition-colors duration-300 hover:border-sky hover:bg-sky hover:text-night"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

               {/* Visual side: SVG illustration */}
                <div
                    aria-hidden="true"
                    className="relative flex h-56 w-full items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-sky/30 via-sky/10 to-transparent p-6 md:h-80 md:w-[42%] md:rounded-[3rem]"
                >
                    <ServiceArt name={s.art} className="h-full w-full" />
                </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}