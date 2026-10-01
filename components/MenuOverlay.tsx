"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { portfolio } from "@/data/portfolio";
import { getLenis } from "@/lib/lenis";
import { SocialIcon, PinIcon, MailIcon, PhoneIcon } from "@/components/Icons";

const EASE = [0.76, 0, 0.24, 1] as const;

type Props = {
  open: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void; // link dabane par
  onExited: () => void; // animation khatam hone par
};

// Left links ka stagger
const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.45 } },
};
const linkIn = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Right social icons neeche se center mein
const socialList = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};
const socialIn = {
  hidden: { y: 60, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.7, ease: EASE } },
};

export default function MenuOverlay({ open, onClose, onNavigate, onExited }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Scroll lock + ESC
  useEffect(() => {
    if (!open) return;

    getLenis()?.stop(); // Lenis band
    document.body.style.overflow = "hidden"; // Lenis na ho tab bhi lock

        const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return onClose();
      if (e.key !== "Tab") return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>(
        "a[href], button:not([disabled])"
      );
      if (!items || items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      getLenis()?.start(); // Lenis wapas chalu
    };
  }, [open, onClose]);

  return (
    <AnimatePresence onExitComplete={onExited}>
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Main menu"
          className="fixed inset-0 z-[60]"
        >
          {/* LEFT panel: upar se aata hai */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute left-0 top-0 flex h-[65%] w-full flex-col justify-center bg-midnight px-8 md:h-full md:w-[65%] md:px-20"
          >
            <nav aria-label="Main">
              <motion.ul variants={list} initial="hidden" animate="show" className="space-y-1 md:space-y-2">
                {portfolio.nav.map((item, i) => (
                  <li key={item.href} className="overflow-hidden">
                    <motion.a
                      variants={linkIn}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(item.href);
                      }}
                      className="group flex items-baseline gap-4 font-display text-4xl text-moon transition-all duration-300 hover:translate-x-4 hover:text-sky md:text-7xl"
                    >
                      <span className="font-sans text-xs text-dusk transition-colors group-hover:text-sky md:text-sm">
                        0{i + 1}
                      </span>
                      {item.label}
                    </motion.a>
                  </li>
                ))}
              </motion.ul>
            </nav>
          </motion.div>

        {/* RIGHT panel: neeche se aata hai */}
          <motion.div
            data-cursor-invert
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="absolute bottom-0 right-0 flex h-[35%] w-full flex-col justify-between bg-sky p-6 text-night md:h-full md:w-[35%] md:p-14"
          >
            {/* Close: sirf X, hover par "CLOSE" text X ke andar se nikalta hai */}
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close menu"
              className="group flex items-center gap-4 self-end"
            >
              <span className="max-w-0 overflow-hidden transition-[max-width] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:max-w-28 group-focus-visible:max-w-28">
                <span className="block translate-x-full whitespace-nowrap text-sm font-semibold uppercase tracking-[0.2em] opacity-0 transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  Close
                </span>
              </span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-night/40 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:rotate-90">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                  strokeLinecap="round" className="h-5 w-5" aria-hidden="true">
                  <path d="M5 5l14 14M19 5L5 19" />
                </svg>
              </span>
            </button>

            {/* Contact: bada aur saaf */}
            <motion.div
              variants={socialList}
              initial="hidden"
              animate="show"
              className="hidden md:block"
            >
              <motion.h3 variants={socialIn} className="font-display text-4xl lg:text-5xl">
                Contact
              </motion.h3>

              <ul className="mt-8 space-y-6 text-lg lg:text-xl">
                <motion.li variants={socialIn} className="flex items-center gap-4">
                  <PinIcon className="h-6 w-6 shrink-0" />
                  <span>{portfolio.profile.location}</span>
                </motion.li>
                <motion.li variants={socialIn} className="flex items-center gap-4">
                  <MailIcon className="h-6 w-6 shrink-0" />
                  <a
                    href={`mailto:${portfolio.profile.email}`}
                    className="break-all underline-offset-4 hover:underline"
                  >
                    {portfolio.profile.email}
                  </a>
                </motion.li>
                <motion.li variants={socialIn} className="flex items-center gap-4">
                  <PhoneIcon className="h-6 w-6 shrink-0" />
                  <a
                    href={`tel:${portfolio.profile.phone.replace(/\s/g, "")}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {portfolio.profile.phone}
                  </a>
                </motion.li>
              </ul>
            </motion.div>

            {/* Social pills: hover par naam upar jata hai, icon neeche se center mein aata hai */}
            <motion.ul
              variants={socialList}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center gap-3 md:justify-start"
            >
              {portfolio.socials.map((s) => (
                <motion.li key={s.type} variants={socialIn}>
                  <a
                    href={s.href}
                    target={s.type === "email" ? undefined : "_blank"}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="group relative flex h-12 min-w-[7.5rem] items-center justify-center overflow-hidden rounded-full border border-night/40 px-6 text-sm font-semibold uppercase tracking-wider transition-colors duration-500 hover:bg-night hover:text-moon focus-visible:bg-night focus-visible:text-moon"
                  >
                    {/* Naam: hover par upar ud jata hai */}
                    <span className="flex items-center gap-2 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-[200%] group-focus-visible:-translate-y-[200%]">
                      {s.label}
                      <span aria-hidden="true">↗</span>
                    </span>
                    {/* Icon: neeche se center mein aata hai */}
                    <span className="absolute inset-0 flex translate-y-[200%] items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0">
                      <SocialIcon type={s.type} className="h-5 w-5" />
                    </span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}