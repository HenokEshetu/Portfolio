import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { skillGroups } from "@/content/profile";

export const Skills = () => (
  <Section
    id="skills"
    eyebrow="Capabilities"
    title="What I work with"
    intro="Grouped by what they're for, rather than as a wall of logos."
  >
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((group, i) => (
        <Reveal as="li" key={group.category} delay={i}>
          <div className="card-surface h-full p-6">
            <h3 className="text-[15px] font-semibold text-fg">
              {group.category}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-subtle">
              {group.blurb}
            </p>

            <div className="my-5 rule-fade" />

            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="rounded-md border border-line bg-ink-900 px-2.5 py-1 font-mono text-[11px] text-fg-muted"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ul>
  </Section>
);
