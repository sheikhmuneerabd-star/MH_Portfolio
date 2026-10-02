"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { portfolio } from "@/data/portfolio";
import { scrollToTarget } from "@/lib/lenis";
import FillButton from "@/components/FillButton";
import MenuOverlay from "@/components/MenuOverlay";
import { SocialIcon } from "@/components/Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";

export default function Header() {
  const [open, setOpen] = useState(false);

    // Thoda scroll hone par header par blur background aa jaye
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pending = useRef<string | null>(null); // menu band hone ke baad is par jana hai
  const menuBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  const onNavigate = useCallback((href: string) => {
    pending.current = href;
    setOpen(false);
  }, []);

  const pathname = usePathname();
    const { go } = usePageTransition();

  // Home par ho to scroll, warna pehle home par jao
  const goTo = useCallback(
    (target: string) => {
      if (pathname === "/") scrollToTarget(target === "#home" ? 0 : target);
      else go("/", { scrollTo: target });
    },
    [pathname, go]
  );

  // Menu poori tarah band ho gaya
    const onExited = useCallback(() => {
        menuBtn.current?.focus();
        if (pending.current) {
        const target = pending.current;
        pending.current = null;
        goTo(target);
        }
    }, [goTo]);

  return (
    <>
      <header 
        className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 transition-all duration-300 md:px-10 ${
            scrolled
                ? "border-b border-moon/10 bg-night/50 py-3 backdrop-blur-xl md:py-4"
                : "py-4 md:py-6"
        }`}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            goTo("#home");
            }}
          aria-label="Go to top"
          className="font-display text-2xl text-moon"
        >
          MH<span className="text-sky">.</span>
        </a>

        <div className="flex items-center gap-3 md:gap-4">
          {/* Social buttons (mobile par chhupe) */}
          <ul className="hidden items-center gap-2 lg:flex">
            {portfolio.socials.map((s) => (
              <li key={s.type}>
                <a
                  href={s.href}
                  target={s.type === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-moon/20 text-moon transition-colors hover:border-sky hover:text-sky"
                >
                  <SocialIcon type={s.type} className="h-4 w-4" />
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          {/* Menu icon: 3x3 dots */}
          <button
            ref={menuBtn}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-haspopup="dialog"
            className="grid h-11 w-11 grid-cols-3 content-center justify-items-center gap-[5px] rounded-full border border-moon/20 p-3 transition-colors hover:border-sky"
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <span key={i} className="h-1 w-1 rounded-full bg-moon" />
            ))}
          </button>

          <FillButton
            href={portfolio.profile.cv}
            download="Muneer-Hussain-CV.pdf"
            variant="solid"
            className="!px-5 !py-2.5"
          >
            Download CV
          </FillButton>
        </div>
      </header>

      <MenuOverlay open={open} onClose={close} onNavigate={onNavigate} onExited={onExited} />
    </>
  );
}