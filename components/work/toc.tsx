"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TocProps = {
  items: readonly { id: string; label: string }[];
};

/** "On this page" list that highlights the section currently in view. */
export const Toc = ({ items }: TocProps) => {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" }
    );
    for (const item of items) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="eyebrow text-fg-subtle">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {items.map((item, i) => {
          const isActive = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "-ml-px flex gap-3 border-l py-1.5 pl-4 text-sm transition-colors",
                  isActive
                    ? "border-accent text-fg"
                    : "border-transparent text-fg-subtle hover:border-line-strong hover:text-fg-muted"
                )}
              >
                <span className={cn("font-mono text-[11px]", isActive ? "text-accent" : "text-fg-subtle")}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
