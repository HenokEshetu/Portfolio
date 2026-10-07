import { ArrowRight, ArrowUpRight, FolderGit2 } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { ProjectCover } from "@/components/work/project-cover";
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
                <span className="text-accent font-mono text-[11px]">❯</span>
                <span className="truncate font-mono text-[11px] text-fg-subtle">
                  ~/projects/<span className="text-fg-muted">{project.slug}</span>
                </span>
                <span className="ml-auto shrink-0 font-mono text-[11px] text-fg-subtle">{project.year}</span>
              </div>

              {!hero ? (
                <div className="relative h-48 overflow-hidden border-b border-line bg-ink-900 px-5 pt-5 sm:h-56">
                  <ProjectCover
                    project={project}
                    compact
                    sizes="(min-width: 768px) 560px, 100vw"
                    className="origin-top transition-transform duration-700 group-hover:-translate-y-1 group-hover:scale-[1.02]"
                  />
                  <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-ink-900 to-transparent" />
                </div>
              ) : null}

              <div className={cn("flex flex-1 flex-col p-6 sm:p-7", hero && "lg:flex-row lg:gap-10")}>
                <div className={cn("flex flex-1 flex-col", hero && "lg:max-w-[46%]")}>
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

                  {hero && project.facts ? (
                    <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                      {project.facts.map((fact) => (
                        <div key={fact.label} className="bg-ink-900 px-3.5 py-3">
                          <dt className="font-mono text-[10px] tracking-wider text-fg-subtle uppercase">{fact.label}</dt>
                          <dd className="mt-1 text-[13px] text-fg">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}

                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {hero ? (
                  <div className="relative mt-8 flex-1 lg:mt-0">
                    <div aria-hidden className="pointer-events-none absolute inset-x-[10%] -bottom-6 h-24 rounded-full bg-accent/20 blur-3xl" />
                    <ProjectCover
                      project={project}
                      priority
                      sizes="(min-width: 1024px) 620px, 100vw"
                      className="relative transition-transform duration-700 group-hover:-translate-y-1 lg:[transform:perspective(1600px)_rotateY(-6deg)] lg:group-hover:[transform:perspective(1600px)_rotateY(-2deg)_translateY(-4px)]"
                    />
                  </div>
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
