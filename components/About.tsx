"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";

export default function About() {
  const root = useRef<HTMLDivElement>(null);
  const { about, experience } = portfolio;
  const words = about.statement.split(" ");

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(".a-word");

      // Reduced motion: sab lafz seedha poore nazar aayen
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(words, { opacity: 1 });
        return;
      }

      // Scroll ke saath lafz ek ek karke roshan hon
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".a-statement",
            start: "top 80%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );

      // Bio aur experience halke se upar aayen
      gsap.from(".a-fade", {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: { trigger: ".a-bio", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <div ref={root}>
      {/* ABOUT */}
      <section id="about" className="px-5 py-32 md:px-10 md:py-48">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-dusk">About me</p>

        <p className="a-statement max-w-6xl font-display text-4xl leading-tight md:text-6xl lg:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="a-word inline-block opacity-[0.15]">
              {w}&nbsp;
            </span>
          ))}
        </p>

        <div className="a-bio mt-16 grid gap-8 md:mt-24 md:grid-cols-[1fr_2fr]">
          <div />
          <p className="a-fade max-w-2xl text-lg leading-relaxed text-moon/80">
            {about.bio}
          </p>
        </div>
      </section>

      {/* EXPERIENCE (menu ke liye) */}
      <section id="experience" className="px-5 pb-32 md:px-10">
        <p className="mb-8 text-sm uppercase tracking-[0.3em] text-dusk">Experience</p>
        <ul className="divide-y divide-moon/15 border-y border-moon/15">
          {experience.map((e) => (
            <li
              key={e.year + e.role}
              className="a-fade flex flex-col gap-1 py-6 md:flex-row md:items-baseline md:justify-between"
            >
              <span className="text-sm text-dusk md:w-48">{e.year}</span>
              <span className="font-display text-2xl md:flex-1 md:text-4xl">{e.role}</span>
              <span className="text-moon/70">{e.place}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}