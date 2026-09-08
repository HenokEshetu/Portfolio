import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { projects } from "@/content/projects";

export const Work = () => (
  <Section
    id="work"
    eyebrow="Work"
    title="Selected projects"
    intro="Each one has a write-up covering the problem, the architecture decisions, and what I would do differently."
  >
    <ul className="grid gap-5 sm:grid-cols-2">
      {projects.map((project, i) => (
        <Reveal
          as="li"
          key={project.slug}
          delay={i}
          className={project.featured && i === 0 ? "sm:col-span-2" : undefined}
        >
          <Link
            href={`/work/${project.slug}`}
            className="card-surface group flex h-full flex-col p-6 sm:p-7"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[11px] tracking-wide text-fg-subtle">
                  {project.year} · {project.role}
                </p>
                <h3 className="mt-2.5 text-h3 font-semibold text-fg transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
              </div>
              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </div>

            <p className="mt-4 max-w-[58ch] flex-1 text-[15px] leading-relaxed text-fg-muted">
              {project.summary}
            </p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md border border-line bg-ink-900 px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Link>
        </Reveal>
      ))}
    </ul>
  </Section>
);
