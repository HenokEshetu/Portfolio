import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger index — adds 60ms per step to the entrance delay. */
  delay?: number;
  as?: "div" | "li" | "section" | "article";
};

/**
 * Scroll reveal driven entirely by CSS (`animation-timeline: view()`).
 *
 * There is no client-side JS here and no hidden initial state: if the browser
 * doesn't support scroll-driven animations, or the visitor has asked for
 * reduced motion, the content simply renders visible.
 */
export const Reveal = ({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) => (
  <Tag
    className={cn("reveal", className)}
    style={delay ? { animationDelay: `${delay * 60}ms` } : undefined}
  >
    {children}
  </Tag>
);
