"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Floating "back to top" control. The ring around it fills with page
 * progress via a CSS scroll timeline; JS only decides when to show it.
 */
export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
        document.getElementById("main")?.focus({ preventScroll: true });
      }}
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed right-4 bottom-4 z-40 grid size-12 place-items-center rounded-full border border-line-strong bg-ink-900/85 text-fg-muted shadow-xl backdrop-blur transition-all duration-300 hover:border-accent-dim hover:text-accent sm:right-6 sm:bottom-6",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90" aria-hidden>
        <circle cx="24" cy="24" r="22" fill="none" stroke="var(--color-line)" strokeWidth="2" />
        <circle
          cx="24"
          cy="24"
          r="22"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="100"
          className="scroll-ring"
        />
      </svg>
      <ArrowUp className="relative size-4 transition-transform group-hover:-translate-y-0.5" />
    </button>
  );
};
