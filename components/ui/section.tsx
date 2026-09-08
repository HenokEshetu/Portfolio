import type { ReactNode } from "react";

import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  /** Optional standfirst under the title. */
  intro?: string;
  children: ReactNode;
  className?: string;
};

export const Section = ({
  id,
  eyebrow,
  title,
  intro,
  children,
  className,
}: SectionProps) => (
  <section
    id={id}
    aria-labelledby={`${id}-heading`}
    className={cn("scroll-mt-24 py-16 sm:py-24", className)}
  >
    <div className="container-page">
      <Reveal>
        <p className="eyebrow">{eyebrow}</p>
        <h2
          id={`${id}-heading`}
          className="mt-3 max-w-3xl text-h2 font-semibold text-fg"
        >
          {title}
        </h2>
        {intro ? (
          <p className="mt-5 max-w-2xl text-lead text-fg-muted">{intro}</p>
        ) : null}
      </Reveal>

      <div className="mt-12 sm:mt-16">{children}</div>
    </div>
  </section>
);
