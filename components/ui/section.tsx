import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  /** Two-digit index shown in the eyebrow, e.g. "02". */
  index: string;
  eyebrow: string;
  /** Shell command shown above the heading, e.g. "cat about.md". */
  command: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export const SectionHeader = ({
  id,
  index,
  eyebrow,
  command,
  title,
  intro,
}: Omit<SectionProps, "children" | "className">) => (
  <Reveal>
    <div className="flex items-center gap-3">
      <p className="eyebrow">
        <span className="text-fg-subtle">{index} /</span> {eyebrow}
      </p>
      <span aria-hidden className="h-px w-16 bg-linear-to-r from-accent/60 to-transparent" />
    </div>
    <p className="mt-5 font-mono text-[13px] text-fg-subtle">
      <span className="text-accent">❯</span> {command}
    </p>
    <h2
      id={`${id}-heading`}
      className="mt-2 max-w-3xl font-display text-h2 font-bold text-fg"
    >
      {title}
    </h2>
    {intro ? <p className="mt-5 max-w-2xl text-lead text-fg-muted">{intro}</p> : null}
  </Reveal>
);

export const Section = ({ id, children, className, ...header }: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={cn("relative scroll-mt-24 py-20 sm:py-24", className)}
  >
    <div className="container-page">
      <SectionHeader id={id} {...header} />
      <div className="mt-12 sm:mt-16">{children}</div>
    </div>
  </section>
);
