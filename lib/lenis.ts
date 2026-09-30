import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

/** Lenis se smooth scroll (anchor links ke liye). Lenis na ho to normal scroll. */
export const scrollToTarget = (
  target: string | number | HTMLElement,
  opts?: { offset?: number; duration?: number; immediate?: boolean }
) => {
  if (instance) {
    instance.scrollTo(target, opts);
    return;
  }
  if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior: "smooth" });
  } else {
    target.scrollIntoView({ behavior: "smooth" });
  }
};