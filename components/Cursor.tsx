"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  // Sirf mouse wale devices par chalao (touch par nahi)
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("has-cursor");

    gsap.set(dot, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });

    // Lag wali movement
    const moveX = gsap.quickTo(dot, "x", { duration: 0.3, ease: "power3.out" });
    const moveY = gsap.quickTo(dot, "y", { duration: 0.3, ease: "power3.out" });

    const onMove = (e: MouseEvent) => {
      moveX(e.clientX);
      moveY(e.clientY);
      gsap.to(dot, { opacity: 1, duration: 0.2, overwrite: "auto" });
    };

    // Links/buttons par bada karo
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const hit = t.closest("a, button, [data-cursor]");
      // Sky-blue jagah (right panel, hover fill) par cursor ka rang ulta
      const onSky = !!t.closest("[data-cursor-invert]");
      dot.classList.toggle("on-sky", onSky);
      gsap.to(dot, {
        scale: hit ? 3.5 : 1,
        opacity: hit ? 0.35 : 1,
        duration: 0.3,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const onLeaveWindow = () => gsap.to(dot, { opacity: 0, duration: 0.2 });

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      document.documentElement.classList.remove("has-cursor");
      gsap.killTweensOf(dot);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 rounded-full"
    />
  );
}