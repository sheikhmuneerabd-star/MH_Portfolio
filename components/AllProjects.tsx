"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import FillButton from "@/components/FillButton";
import ProjectImage from "@/components/ProjectImage";
import { usePageTransition } from "@/components/PageTransition";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function AllProjects() {
  const { projects } = portfolio;
  const { go } = usePageTransition();
  const [active, setActive] = useState("All");

  // Categories khud nikal lo: All + har unique category
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );

  const list = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    // reducedMotion="user": jin ke device mein animation band hai unke liye bhi theek
    <MotionConfig reducedMotion="user">
      <main className="px-5 pb-24 pt-32 md:px-10 md:pt-40">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sky">Archive</p>
        <h1
          className="font-display leading-[0.95]"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)" }}
        >
          All Projects
        </h1>

        {/* Filter tabs */}
        <div className="mt-10 flex flex-wrap gap-2.5 md:mt-16" role="group" aria-label="Filter projects">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              aria-pressed={active === c}
              className={`rounded-full border px-5 py-2 text-sm transition-colors duration-300 ${
                active === c
                  ? "border-sky bg-sky text-night"
                  : "border-moon/25 hover:border-sky hover:text-sky"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm text-dusk" aria-live="polite">
          {list.length} {list.length === 1 ? "project" : "projects"}
        </p>

        {/* Grid */}
        <motion.ul layout className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => {
              const href = `/projects/${p.slug}`;
              return (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      go(href);
                    }}
                    className="group block"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                      <div className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110">
                        <ProjectImage
                          src={p.image}
                          alt={`${p.title} preview`}
                          label={p.title}
                          index={i}
                          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                        />
                      </div>
                    </div>
                    <p className="mt-5 text-xs uppercase tracking-[0.25em] text-sky">{p.category}</p>
                    <h2 className="mt-2 flex items-center justify-between font-display text-3xl">
                      {p.title}
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                      >
                        ↗
                      </span>
                    </h2>
                    <p className="mt-2 text-moon/70">{p.description}</p>
                  </a>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>

        <div className="mt-20 flex justify-center">
          <FillButton
            variant="solid"
            href="/"
            onClick={(e) => {
              e.preventDefault();
              go("/", { scrollTo: "#projects" });
            }}
          >
            Go Back Home
          </FillButton>
        </div>
      </main>
    </MotionConfig>
  );
}