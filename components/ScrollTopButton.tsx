"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/lenis";

export default function ScrollTopButton() {
  const btnRef = useRef<HTMLButtonElement>(null);
  const visible = useRef(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Shuru mein chhupa hua
    gsap.set(btn, { opacity: 0, scale: 0.6, pointerEvents: "none" });

    const onScroll = () => {
      // Hero (1 screen) guzarne ke baad dikhao
      const show = window.scrollY > window.innerHeight * 0.9;
      if (show === visible.current) return;
      visible.current = show;
      gsap.to(btn, {
        opacity: show ? 1 : 0,
        scale: show ? 1 : 0.6,
        pointerEvents: show ? "auto" : "none",
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      gsap.killTweensOf(btn);
    };
  }, []);

  return (
    <button
      ref={btnRef}
      onClick={() => scrollToTarget(0, { duration: 1.6 })}
      aria-label="Scroll to top"
      className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-sky text-night shadow-lg transition-colors hover:bg-moon"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 19V5M5 12l7-7 7 7"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}