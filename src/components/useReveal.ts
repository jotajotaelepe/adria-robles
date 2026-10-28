import { useEffect, type RefObject } from "react";

/** Adds `className` to the element the first time it scrolls into view. */
export function useReveal(ref: RefObject<HTMLElement | null>, enabled: boolean, className: string) {
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.classList.add(className);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, className]);
}
