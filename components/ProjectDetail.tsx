"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import type { Project } from "@/data/portfolio";
import FillButton from "@/components/FillButton";
import ProjectImage from "@/components/ProjectImage";
import { usePageTransition } from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import ImageLightbox from "@/components/ImageLightbox";

export default function ProjectDetail({ project }: { project: Project }) {
  const root = useRef<HTMLElement>(null);
  const { go } = usePageTransition();
  const [open, setOpen] = useState<number | null>(null);
    // -1 = cover image, 0,1,2... = gallery ki images
  const current =
    open === null
      ? null
      : open === -1
      ? { src: project.image, caption: `${project.title} cover` }
      : project.gallery[open];

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Parda uthne ke baad shuru ho (delay 0.6)
      gsap.from(".d-in", {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.6,
      });

      // More screens: card upar aaye, andar image parallax
      gsap.utils.toArray<HTMLElement>(".g-card").forEach((card) => {
        gsap.from(card, {
          y: 90,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
        gsap.fromTo(
          card.querySelector(".g-card-img"),
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    },
    { scope: root }
  );

  return (
    <main ref={root} id="main" tabIndex={-1} className="px-5 pb-24 pt-32 md:px-10 md:pt-40">
      {/* Top: label, title, links */}
      <header>
        <p className="d-in text-sm uppercase tracking-[0.3em] text-sky">
          Case Study · {project.category}
        </p>
        <h1
          className="d-in mt-4 font-display leading-[0.95]"
          style={{ fontSize: "clamp(3.5rem, 12vw, 11rem)" }}
        >
          {project.title}
        </h1>
        <div className="d-in mt-8 flex flex-wrap gap-3">
          {project.live && <FillButton variant="solid" href={project.live}>Live Demo</FillButton>}
          <FillButton href={project.github}>GitHub</FillButton>
        </div>
      </header>

      {/* Cover image: hover par "View full", click par poori image */}
      <div className="d-in mt-12 md:mt-20">
        <button
          type="button"
          onClick={() => setOpen(-1)}
          aria-label={`View full image: ${project.title} cover`}
          className="group relative block w-full text-left"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-[2rem] md:rounded-[3rem]">
            <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
              <ProjectImage
                src={project.image}
                alt={`${project.title} cover`}
                label={project.title}
                priority
                sizes="100vw"
              />
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-night/40 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
              <span className="flex items-center gap-2 rounded-full bg-moon px-5 py-3 text-sm font-semibold text-night shadow-xl transition-transform duration-300 md:translate-y-3 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                  <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                </svg>
                View full
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* Overview + What I built */}
      <section className="mt-20 grid gap-12 md:mt-32 md:grid-cols-[1fr_2fr]">
        <h2 className="font-display text-3xl md:text-4xl">Overview</h2>
        <p className="max-w-2xl text-lg leading-relaxed text-moon/80">{project.overview}</p>

        <h2 className="font-display text-3xl md:text-4xl">What I Built</h2>
        <ul className="max-w-2xl space-y-4">
          {project.built.map((b) => (
            <li key={b} className="flex gap-3 text-lg text-moon/80">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" />
              {b}
            </li>
          ))}
        </ul>

        <h2 className="font-display text-3xl md:text-4xl">Tech Stack</h2>
        <ul className="flex flex-wrap gap-2.5">
          {project.tech.map((t) => (
            <li
              key={t}
              className="cursor-default rounded-full border border-moon/25 px-4 py-2 text-sm transition-colors duration-300 hover:border-sky hover:bg-sky hover:text-night"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      {/* Key features */}
      <section className="mt-20 md:mt-32">
        <h2 className="mb-8 font-display text-3xl md:text-4xl">Key Features</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {project.features.map((f, i) => (
            <li key={f} className="rounded-3xl border border-moon/15 bg-midnight/60 p-6">
              <p className="text-sm tracking-[0.3em] text-dusk">0{i + 1}</p>
              <p className="mt-6 font-display text-2xl">{f}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Gallery: card par hover karein, click se poori image khulegi */}
      {project.gallery.length > 0 && (
        <section className="mt-20 md:mt-32">
          <h2 className="mb-8 font-display text-3xl md:text-4xl">More Screens</h2>
          <div
            className={`grid gap-10 md:gap-14 ${
              project.gallery.length > 1 ? "md:grid-cols-2" : ""
            }`}
          >
            {project.gallery.map((g, i) => (
              <figure key={g.caption} className={i % 2 ? "md:mt-24" : ""}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label={`View full image: ${g.caption}`}
                  className="group relative block w-full text-left"
                >
                  <div className="g-card relative aspect-[4/3] overflow-hidden rounded-[2rem] md:rounded-[2.5rem]">
                    {/* Parallax wala wrapper (GSAP isi ko hilata hai) */}
                    <div className="g-card-img absolute -inset-y-[10%] inset-x-0">
                      {/* Hover zoom alag wrapper mein, taake GSAP se na takraye */}
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105">
                        <ProjectImage
                          src={g.src}
                          alt={g.caption}
                          label={g.caption}
                          index={i + 1}
                          sizes="(min-width: 768px) 45vw, 90vw"
                        />
                      </div>
                    </div>

                    {/* Beech mein "View full" button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-night/40 opacity-100 transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                      <span className="flex items-center gap-2 rounded-full bg-moon px-5 py-3 text-sm font-semibold text-night shadow-xl transition-transform duration-300 md:translate-y-3 md:group-hover:translate-y-0 md:group-focus-visible:translate-y-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                          strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
                          <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                        </svg>
                        View full
                      </span>
                    </div>
                  </div>
                </button>
                <figcaption className="mt-4 text-sm text-moon/60">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* Bottom buttons */}
      <div className="mt-24 flex flex-wrap items-center justify-between gap-6 border-t border-moon/15 pt-10">
        <div className="flex flex-wrap gap-3">
          {project.live && <FillButton href={project.live}>Live Demo</FillButton>}
          <FillButton href={project.github}>GitHub</FillButton>
        </div>
        <FillButton
          variant="solid"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            go("/", { scrollTo: "#projects" }); // wapas Projects section par
          }}
        >
          Go Back Home
        </FillButton>
      </div>

      <AnimatePresence>
        {current && (
          <ImageLightbox
            key={open}
            src={current.src}
            caption={current.caption}
            onClose={() => setOpen(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}