import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { lab } from "@/content/profile";
import { projects } from "@/content/projects";
import { cn } from "@/lib/utils";

export const Work = () => (
  <Section
    id="work"
    index="05"
    eyebrow="Work"
    command="ls ~/projects --sort=impact"
    title="Selected projects"
    intro="Each project has a write-up covering the problem, the architecture decisions and what I'd do differently."
  >
    <ul className="grid gap-5 md:grid-cols-2">
      {projects.map((project, i) => {
        const hero = i === 0;
        return (
          <Reveal as="li" key={project.slug} delay={i % 3} className={cn(hero && "md:col-span-2")}>
            <Link
              href={`/work/${project.slug}`}
              className="terminal spotlight glow-border group relative flex h-full flex-col overflow-hidden transition-transform duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                <span className="size-2.5 rounded-full bg-danger/70" />
                <span className="size-2.5 rounded-full bg-warn/70" />
                <span className="size-2.5 rounded-full bg-accent/70" />
                <span className="ml-2 truncate font-mono text-[11px] text-fg-subtle">
                  ~/projects/<span className="text-fg-muted">{project.slug}</span>
                </span>
                <span className="ml-auto shrink-0 font-mono text-[11px] text-fg-subtle">{project.year}</span>
              </div>

              <div className={cn("flex flex-1 flex-col p-6 sm:p-7", hero && "lg:flex-row lg:gap-10")}>
                <div className={cn("flex flex-1 flex-col", hero && "lg:max-w-[60%]")}>
                  <p className="font-mono text-[11px] tracking-wide text-accent">{project.role}</p>
                  <h3
                    className={cn(
                      "mt-2.5 font-display font-semibold text-fg transition-colors group-hover:text-accent-bright",
                      hero ? "text-2xl sm:text-3xl" : "text-h3"
                    )}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-3.5 max-w-[60ch] flex-1 text-[15px] leading-relaxed text-fg-muted">
                    {project.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {hero && project.facts ? (
                  <dl className="mt-8 grid flex-1 content-start gap-px self-start overflow-hidden rounded-xl border border-line bg-line lg:mt-0">
                    {project.facts.map((fact) => (
                      <div key={fact.label} className="bg-ink-900 px-4 py-3.5">
                        <dt className="font-mono text-[10.5px] tracking-wider text-fg-subtle uppercase">
                          {fact.label}
                        </dt>
                        <dd className="mt-1 text-sm text-fg">{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
              </div>

              <div className="flex items-center justify-between border-t border-line px-6 py-3.5 font-mono text-[11.5px] text-fg-subtle sm:px-7">
                <span>
                  <span className="text-accent">❯</span> open case-study
                </span>
                <ArrowRight
                  aria-hidden
                  className="size-4 transition-all group-hover:translate-x-1 group-hover:text-accent"
                />
              </div>
            </Link>
          </Reveal>
        );
      })}
    </ul>

    {/* Smaller builds */}
    <Reveal>
      <div className="mt-14">
        <p className="font-mono text-[13px] text-fg-subtle">
          <span className="text-accent">❯</span> ls -la ~/lab
        </p>
        <div className="mt-4 overflow-hidden rounded-2xl border border-line">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">Smaller projects and experiments</caption>
            <thead className="bg-ink-900 font-mono text-[10.5px] tracking-wider text-fg-subtle uppercase">
              <tr>
                <th scope="col" className="px-4 py-3 font-normal">Repository</th>
                <th scope="col" className="hidden px-4 py-3 font-normal sm:table-cell">Lang</th>
                <th scope="col" className="px-4 py-3 font-normal">What it is</th>
                <th scope="col" className="w-10 px-4 py-3"><span className="sr-only">Link</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {lab.map((entry) => (
                <tr key={entry.name} className="group bg-ink-850/40 transition-colors hover:bg-ink-800/70">
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-2 font-mono text-[12.5px] text-fg">
                      <FolderGit2 className="size-4 text-accent" aria-hidden />
                      {entry.name}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3.5 font-mono text-[12px] text-signal sm:table-cell">{entry.lang}</td>
                  <td className="px-4 py-3.5 text-fg-muted">{entry.blurb}</td>
                  <td className="px-4 py-3.5">
                    {entry.href ? (
                      <a
                        href={entry.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        aria-label={`${entry.name} on GitHub`}
                        className="inline-flex text-fg-subtle transition-colors hover:text-accent"
                      >
                        <ArrowUpRight className="size-4" aria-hidden />
                      </a>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  </Section>
);
