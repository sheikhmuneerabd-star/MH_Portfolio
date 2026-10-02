"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { getLenis } from "@/lib/lenis";
import ProjectImage from "@/components/ProjectImage";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  src: string;
  caption: string;
  onClose: () => void;
};

export default function ImageLightbox({ src, caption, onClose }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [scrollable, setScrollable] = useState(false);

  // Scroll lock + ESC
  useEffect(() => {
    getLenis()?.stop();
    document.body.style.overflow = "hidden";
    closeBtn.current?.focus();

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [onClose]);

  // Image lambi ho (poora page) to hint dikhao
  const checkScrollable = () => {
    const el = scroller.current;
    if (el) setScrollable(el.scrollHeight > el.clientHeight + 8);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      className="fixed inset-0 z-[90] flex items-center justify-center p-3 md:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      {/* Peeche ka andhera: click karne par band */}
      <div
        className="absolute inset-0 bg-night/90 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      <motion.div
        className="relative flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] border border-moon/15 bg-midnight md:rounded-[2rem]"
        initial={{ y: 60, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 60, scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        {/* Upar ki patti: caption + close */}
        <div className="flex items-center justify-between gap-4 border-b border-moon/15 px-5 py-3">
          <p className="truncate text-sm text-moon/80">{caption}</p>
          <button
            ref={closeBtn}
            onClick={onClose}
            aria-label="Close image"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-moon/25 transition-colors hover:border-sky hover:bg-sky hover:text-night"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" className="h-4 w-4" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>

        {/* Image: lambi ho to yahin scroll hoti hai */}
        <div
          ref={scroller}
          data-lenis-prevent
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          {src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={caption}
              onLoad={checkScrollable}
              className="block h-auto w-full"
            />
          ) : (
            <div className="relative aspect-[16/10] w-full">
              <ProjectImage src="" alt={caption} label={caption} />
            </div>
          )}
        </div>

        {scrollable && (
          <p className="pointer-events-none border-t border-moon/15 px-5 py-2 text-center text-xs uppercase tracking-[0.25em] text-dusk">
            Scroll to see the full page
          </p>
        )}
      </motion.div>
    </motion.div>
  );
}