"use client";

import { useEffect, useRef } from "react";
import type { IconType } from "react-icons";
import {
  SiReact, SiNextdotjs, SiTypescript, SiNodedotjs, SiExpress, SiTailwindcss,
  SiGreensock, SiFramer, SiPostgresql, SiMongodb, SiDocker, SiGit, SiFigma, SiVercel,
} from "react-icons/si";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";

// Naam se icon (data file mein sirf naam likhna hai)
const ICONS: Record<string, IconType> = {
  React: SiReact,
  "Next.js": SiNextdotjs,
  TypeScript: SiTypescript,
  "Node.js": SiNodedotjs,
  Express: SiExpress,
  "Tailwind CSS": SiTailwindcss,
  GSAP: SiGreensock,
  "Framer Motion": SiFramer,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Docker: SiDocker,
  Git: SiGit,
  Figma: SiFigma,
  Vercel: SiVercel,
};

export default function TechMarquee() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const hovered = useRef(false);
  const { techStack } = portfolio;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = track.current;
    if (!el) return;

    let boost = 0; // scroll velocity se extra speed
    let current = 1; // maujooda speed
    let tick: (() => void) | undefined;

    const ctx = gsap.context(() => {
      // 4 copies hain, to -50% par loop bilkul seamless hai
      const tween = gsap.to(el, { xPercent: -50, ease: "none", duration: 40, repeat: -1 });

      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          boost = Math.min(Math.abs(self.getVelocity()) / 250, 6);
        },
      });

      tick = () => {
        const target = hovered.current ? 0 : 1 + boost; // hover par ruk jao
        current += (target - current) * 0.08; // smooth
        tween.timeScale(current);
        boost *= 0.94; // scroll ruke to speed wapas normal
      };
      gsap.ticker.add(tick);
    }, root);

    return () => {
      if (tick) gsap.ticker.remove(tick);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={root}
      aria-label="Technologies I work with"
      onMouseEnter={() => (hovered.current = true)}
      onMouseLeave={() => (hovered.current = false)}
      className="overflow-hidden border-y border-moon/15 py-10 md:py-14"
    >
      <div
        ref={track}
        className="flex w-max motion-reduce:w-auto motion-reduce:flex-wrap motion-reduce:justify-center"
      >
        {[0, 1, 2, 3].map((n) => (
          <ul
            key={n}
            aria-hidden={n > 0}
            className={`flex shrink-0 items-center gap-4 pr-4 ${n > 0 ? "motion-reduce:hidden" : ""}`}
          >
            {techStack.map((t) => {
              const Icon = ICONS[t];
              return (
                <li
                  key={t}
                  className="flex items-center gap-3 rounded-full border border-moon/20 px-6 py-3 text-lg transition-colors duration-300 hover:border-sky hover:bg-sky hover:text-night"
                >
                  {Icon && <Icon className="h-5 w-5" aria-hidden="true" />}
                  {t}
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </section>
  );
}