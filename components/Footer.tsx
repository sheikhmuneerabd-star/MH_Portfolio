"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { portfolio } from "@/data/portfolio";
import { scrollToTarget } from "@/lib/lenis";
import { useGoTo } from "@/hooks/useGoTo";
import FillButton from "@/components/FillButton";
import { usePathname } from "next/navigation";

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const goTo = useGoTo();
  const pathname = usePathname();
  const { profile, nav } = portfolio;

    useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap.from(".f-name", {
        yPercent: 60,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });

      // Naye page ki height set hone ke baad dobara napo
      gsap.delayedCall(0.4, () => ScrollTrigger.refresh());
    },
    { scope: root, dependencies: [pathname], revertOnUpdate: true }
  );

  return (
    <footer ref={root} className="overflow-hidden border-t border-moon/15 px-5 pt-16 md:px-10 md:pt-24">
      <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
        <nav aria-label="Footer">
          <p className="mb-5 text-sm uppercase tracking-[0.3em] text-dusk">Quick links</p>
          <ul className="grid grid-cols-2 gap-x-12 gap-y-3 text-lg">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    goTo(item.href);
                  }}
                  className="transition-colors hover:text-sky"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <FillButton onClick={() => scrollToTarget(0, { duration: 1.6 })} aria-label="Back to top">
          Back to top ↑
        </FillButton>
      </div>

      <p className="mt-10 text-sm text-moon/60">
        © {new Date().getFullYear()} {profile.name}. All rights reserved.
      </p>

      {/* Giant name */}
      <p
        aria-hidden="true"
        className="f-name select-none whitespace-nowrap pt-6 text-center font-display uppercase leading-[0.85] text-moon"
        style={{ fontSize: "clamp(2.5rem, 10vw, 13rem)" }}
      >
        {profile.name}
      </p>
    </footer>
  );
}