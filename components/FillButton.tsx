"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

type Side = "left" | "right" | "top" | "bottom";

// "Simti hui" halat: fill us side par collapse hoti hai
const COLLAPSED: Record<Side, string> = {
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
  top: "inset(0% 0% 100% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
};
const FULL = "inset(0% 0% 0% 0%)";

// Maujooda theme (dark/light) ka rang CSS variable se parho
const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

// Mouse button ki kis side se guzra, ye nikalta hai
function getSide(e: React.MouseEvent, el: HTMLElement): Side {
  const r = el.getBoundingClientRect();
  const x = (e.clientX - r.left) / r.width - 0.5;
  const y = (e.clientY - r.top) / r.height - 0.5;
  if (Math.abs(x) > Math.abs(y)) return x < 0 ? "left" : "right";
  return y < 0 ? "top" : "bottom";
}

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
  download?: boolean | string;
};

export default function FillButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "outline",
  className = "",
  disabled,
  download,
  ...rest
}: Props) {
  const elRef = useRef<HTMLElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  // Component hatne par tweens band karo
  useEffect(() => {
    const fill = fillRef.current;
    const text = textRef.current;
    return () => {
      if (fill) gsap.killTweensOf(fill);
      if (text) gsap.killTweensOf(text);
    };
  }, []);

  const reduce = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mouse andar aya: usi side se fill shuru
  const handleEnter = (e: React.MouseEvent) => {
    const el = elRef.current;
    const fill = fillRef.current;
    if (!el || !fill || disabled) return;
    const side = getSide(e, el);

    gsap.killTweensOf(fill);
    gsap.fromTo(
      fill,
      { clipPath: COLLAPSED[side] },
      { clipPath: FULL, duration: reduce() ? 0 : 0.55, ease: "power3.out" }
    );

    // Text ka rang fill ke saath badle.
    // solid: fill sky hai, text night rehta hai
    // outline: fill moon hai, text night ho jata hai
    gsap.to(textRef.current, {
      color: cssVar("--night"),
      duration: reduce() ? 0 : 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Mouse bahar gaya: jis side se nikla, fill usi taraf simat jaye
  const handleLeave = (e: React.MouseEvent) => {
    const el = elRef.current;
    const fill = fillRef.current;
    if (!el || !fill) return;
    const side = getSide(e, el);

    gsap.killTweensOf(fill);
    gsap.to(fill, {
      clipPath: COLLAPSED[side],
      duration: reduce() ? 0 : 0.45,
      ease: "power3.inOut",
    });

    gsap.to(textRef.current, {
      color: variant === "solid" ? cssVar("--night") : cssVar("--moon"),
      duration: reduce() ? 0 : 0.35,
      delay: 0.1,
      ease: "power2.inOut",
      overwrite: "auto",
      // Animation ke baad inline rang hata do, taake theme badalne par bhi sahi rahe
      onComplete: () => {
        gsap.set(textRef.current, { clearProps: "color" });
      },
    });
  };

  // Variant ke rang:
  // solid   = moon (cream white) button, hover par sky blue fill
  // outline = border wala, hover par moon fill
  const base =
    variant === "solid"
      ? "bg-moon text-night"
      : "border border-moon/30 text-moon";
  const fillBg = variant === "solid" ? "bg-sky" : "bg-moon";

  const classes = `relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-3.5 text-sm font-semibold tracking-wide ${base} ${className}`;

  const inner = (
    <>
      {/* Fill layer: sirf rang, koi text nahi */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 ${fillBg}`}
        style={{ clipPath: COLLAPSED.left }}
      />
      {/* Text: sirf ek hi, fill ke upar, is liye kabhi kat nahi sakta */}
      <span ref={textRef} className="relative z-10 whitespace-nowrap">
        {children}
      </span>
    </>
  );

  const common = {
    className: classes,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave,
    ...rest,
  };

  if (href) {
        // Download wala link: Next.js Link nahi, seedha <a download>
    if (download) {
      return (
        <a
          {...common}
          ref={elRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          download={typeof download === "string" ? download : true}
        >
          {inner}
        </a>
      );
    }

    const external = /^https?:\/\//.test(href);
    if (external) {
      return (
        <a
          {...common}
          ref={elRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      );
    }
    return (
      <Link
        {...common}
        ref={elRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      {...common}
      ref={elRef as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}