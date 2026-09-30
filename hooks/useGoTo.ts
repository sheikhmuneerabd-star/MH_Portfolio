"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/components/PageTransition";
import { scrollToTarget } from "@/lib/lenis";

export function useGoTo() {
  const pathname = usePathname();
  const { go } = usePageTransition();

  return useCallback(
    (target: string) => {
      if (pathname === "/") scrollToTarget(target === "#home" ? 0 : target);
      else go("/", { scrollTo: target });
    },
    [pathname, go]
  );
}