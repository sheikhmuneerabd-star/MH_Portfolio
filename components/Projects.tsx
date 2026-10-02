"use client";

import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { portfolio, type Project } from "@/data/portfolio";
import FillButton from "@/components/FillButton";
import ProjectImage from "@/components/ProjectImage";
import { usePageTransition } from "@/components/PageTransition";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);
  const { go } = usePageTransition();

  // Hover sirf mouse wale device par, aur reduced-motion na ho
  const canHover = () =>
    window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches;

  useEffect(() => {
    const el = imgRef.current;
    return () => {
      if (el) gsap.killTweensOf(el);
    };
  }, []);

  // Mouse ke saath image halki si khiskti hai aur zoom hoti hai
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imgRef.current || !canHover()) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(imgRef.current, {
      x: x * -28,
      y: y * -28,
      scale: 1.1,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    if (!imgRef.current) return;
    gsap.to(imgRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const detailsHref = `/projects/${project.slug}`;

  return (
    <article className="p-card grid items-center gap-8 rounded-[2.5rem] border border-moon/15 bg-midnight/60 p-5 md:grid-cols-2 md:gap-14 md:rounded-[3.5rem] md:p-8">
      {/* Image side (alternate hoti hai) */}
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`relative aspect-[4/3] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] ${
          index % 2 ? "md:order-2" : ""
        }`}
      >
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <ProjectImage
            src={project.image}
            alt={`${project.title} preview`}
            label={project.title}
            index={index}
            sizes="(min-width: 768px) 45vw, 90vw"
          />
        </div>
      </div>

      {/* Content side */}
      <div className="md:px-4">
        <p className="text-xs uppercase tracking-[0.3em] text-sky">{project.category}</p>
        <h3 className="mt-3 font-display text-4xl md:text-6xl">{project.title}</h3>
        <p className="mt-4 max-w-md text-moon/70">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <FillButton
            variant="solid"
            href={detailsHref}
            onClick={(e) => {
              e.preventDefault();
              go(detailsHref);
            }}
          >
            See Details
          </FillButton>
          {project.live && <FillButton href={project.live}>Live Demo</FillButton>}
          <FillButton href={project.github}>GitHub</FillButton>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);
    const { go } = usePageTransition();
    const featured = portfolio.projects.filter((p) => p.featured);
    const hasMore = portfolio.projects.length > featured.length;

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Title reveal
      gsap.from(".p-title", {
        yPercent: 110,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: { trigger: ".p-head", start: "top 85%" },
      });

      // Har card neeche se halka sa upar aaye
      gsap.utils.toArray<HTMLElement>(".p-card").forEach((card) => {
        gsap.from(card, {
          y: 70,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    },
    { scope: root }
  );

  return (
    <section ref={root} id="projects" className="px-5 py-24 md:px-10 md:py-40">
      <div className="p-head mb-14 md:mb-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-dusk">Featured work</p>
        <h2
          className="overflow-hidden font-display leading-[0.95]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          <span className="p-title block">Selected Projects</span>
        </h2>
      </div>

            <div className="space-y-8 md:space-y-14">
        {featured.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center md:mt-20">
          <FillButton
            variant="solid"
            href="/projects"
            onClick={(e) => {
              e.preventDefault();
              go("/projects");
            }}
          >
            View All Projects ({portfolio.projects.length})
          </FillButton>
        </div>
      )}
    </section>
  );
}