"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, useAnimationControls } from "framer-motion";
import { ScrollTrigger } from "@/lib/gsap";
import { getLenis, scrollToTarget } from "@/lib/lenis";

const EASE = [0.76, 0, 0.24, 1] as const;

type GoOptions = { scrollTo?: string }; // naye page par khulne ke baad is section par jao

const Ctx = createContext<{ go: (href: string, opts?: GoOptions) => void }>({
  go: () => {},
});

// Kisi bhi component se: const { go } = usePageTransition();
export const usePageTransition = () => useContext(Ctx);

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimationControls();

  const busy = useRef(false);
  const scrollTarget = useRef<string | undefined>(undefined);
  const safety = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Parda upar nikalta hai (naya page tayyar hone ke baad)
  const reveal = useCallback(async () => {
    if (safety.current) clearTimeout(safety.current);

    // Naya page hamesha top se shuru
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);

    // Agar kisi section par jana hai (jaise #projects), parda uthne se pehle wahan pahunch jao
    if (scrollTarget.current) {
      const t = scrollTarget.current;
      scrollTarget.current = undefined;
      await new Promise((r) => setTimeout(r, 80)); // layout set hone do
      ScrollTrigger.refresh();
      scrollToTarget(t, { immediate: true });
    }

    await controls.start({
      y: "-100%",
      transition: { duration: 0.8, ease: EASE },
    });
    controls.set({ y: "100%" }); // agli baar ke liye neeche wapas
    busy.current = false;
  }, [controls]);

  // Route badla to parda uthao
  useEffect(() => {
    if (busy.current) reveal();
  }, [pathname, reveal]);

  const go = useCallback(
    async (href: string, opts?: GoOptions) => {
      if (busy.current) return;

      // Same page par ho to sirf scroll karo
      if (href === pathname) {
        if (opts?.scrollTo) scrollToTarget(opts.scrollTo);
        return;
      }

      busy.current = true;
      scrollTarget.current = opts?.scrollTo;

      // 1) Parda neeche se aakar screen dhak le
      await controls.start({
        y: "0%",
        transition: { duration: 0.8, ease: EASE },
      });

      // 2) Page badlo (scroll hum khud sambhalte hain)
      router.push(href, { scroll: false });

      // Safety: 4 second mein page na badle to bhi parda utha do
      safety.current = setTimeout(() => reveal(), 4000);
    },
    [pathname, controls, router, reveal]
  );

  const value = useMemo(() => ({ go }), [go]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <motion.div
        aria-hidden="true"
        initial={{ y: "100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-sky"
      >
        <span className="font-display text-7xl text-night md:text-9xl">MH.</span>
      </motion.div>
    </Ctx.Provider>
  );
}