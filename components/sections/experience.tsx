import { ArrowUpRight, GitBranch, MapPin } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { experience } from "@/content/profile";
import { cn } from "@/lib/utils";

export const Experience = () => (
  <Section
    id="experience"
    index="04"
    eyebrow="Experience"
    command="git log --oneline --graph career"
    title="Where I've shipped"
  >
    <ol className="relative">
      {/* main branch rail */}
      <span
        aria-hidden
        className="absolute top-3 bottom-6 left-[7px] w-px bg-linear-to-b from-accent via-line-strong to-transparent sm:left-[11px]"
      />

      {experience.map((entry, i) => {
        const isBranch = Boolean(entry.branch);
        return (
          <Reveal as="li" key={entry.company} delay={i} className="relative pb-8 pl-8 last:pb-0 sm:pl-14">
            {/* commit node */}
            <span
              aria-hidden
              className={cn(
                "absolute top-6 left-0 grid size-[15px] place-items-center rounded-full border-2 bg-ink-950 sm:left-1 sm:size-[23px]",
                entry.current ? "border-accent" : isBranch ? "border-signal" : "border-line-strong"
              )}
            >
              {entry.current ? (
                <span className="relative flex size-1.5 sm:size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-full rounded-full bg-accent" />
                </span>
              ) : (
                <span className={cn("size-1.5 rounded-full sm:size-2", isBranch ? "bg-signal" : "bg-fg-subtle")} />
              )}
            </span>

            <article
              className={cn(
                "card-surface spotlight glow-border p-6 sm:p-8",
                isBranch && "border-signal/20"
              )}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-[11.5px]">
                <span className="text-warn">commit {entry.ref}</span>
                {entry.current ? (
                  <span className="rounded-md border border-accent/30 bg-accent/10 px-1.5 py-0.5 text-accent">
                    HEAD → main
                  </span>
                ) : null}
                {isBranch ? (
                  <span className="inline-flex items-center gap-1 rounded-md border border-signal/30 bg-signal/10 px-1.5 py-0.5 text-signal">
                    <GitBranch className="size-3" aria-hidden />
                    {entry.branch}
                  </span>
                ) : null}
                <span className="ml-auto text-fg-subtle">{entry.period}</span>
              </div>

              <h3 className="mt-4 font-display text-h3 font-semibold text-fg">{entry.role}</h3>
              <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                {entry.href ? (
                  <a
                    href={entry.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-1 font-medium text-accent hover:text-accent-bright"
                  >
                    {entry.company}
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </a>
                ) : (
                  <span className="font-medium text-accent">{entry.company}</span>
                )}
                <span className="inline-flex items-center gap-1 text-fg-subtle">
                  <MapPin className="size-3.5" aria-hidden />
                  {entry.location}
                </span>
              </p>

              <p className="mt-4 max-w-[68ch] text-fg-muted">{entry.summary}</p>

              <ul className="mt-5 space-y-2.5">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 40)}
                    className="flex max-w-[78ch] gap-3 text-[15px] leading-relaxed text-fg-muted"
                  >
                    <span aria-hidden className="mt-px font-mono text-accent select-none">
                      +
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-1.5">
                {entry.stack.map((tech) => (
                  <li key={tech} className="chip">
                    {tech}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </ol>
  </Section>
);
