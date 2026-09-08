import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/content/profile";

export const Experience = () => (
  <Section
    id="experience"
    eyebrow="Experience"
    title="Where I've built things"
  >
    <ol className="relative">
      {experience.map((entry, i) => (
        <Reveal as="li" key={entry.company} delay={i} className="group relative">
          <div className="grid gap-6 border-t border-line py-10 sm:grid-cols-12 sm:gap-8">
            {/* Period rail */}
            <div className="sm:col-span-3">
              <p className="flex items-center gap-2 font-mono text-xs tracking-wide text-fg-subtle">
                {entry.current ? (
                  <span
                    aria-hidden
                    className="inline-block size-1.5 rounded-full bg-accent"
                  />
                ) : null}
                {entry.period}
              </p>
            </div>

            <div className="sm:col-span-9">
              <h3 className="text-h3 font-semibold text-fg">{entry.role}</h3>
              <p className="mt-1 text-sm text-accent">{entry.company}</p>

              <p className="mt-4 max-w-[62ch] text-fg-muted">{entry.summary}</p>

              <ul className="mt-6 space-y-3">
                {entry.highlights.map((highlight) => (
                  <li
                    key={highlight.slice(0, 40)}
                    className="flex max-w-[64ch] gap-3 text-[15px] leading-relaxed text-fg-muted"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 size-1 shrink-0 rounded-full bg-accent-dim"
                    />
                    {highlight}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 flex flex-wrap gap-2">
                {entry.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  </Section>
);
