import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { credentials } from "@/content/profile";

const GROUPS = [
  { kind: "education" as const, label: "Education" },
  { kind: "certification" as const, label: "Certifications" },
];

export const Credentials = () => (
  <Section id="credentials" eyebrow="Background" title="Education & certifications">
    <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
      {GROUPS.map((group, groupIndex) => {
        const items = credentials.filter((c) => c.kind === group.kind);
        if (items.length === 0) return null;

        return (
          <Reveal key={group.kind} delay={groupIndex}>
            <h3 className="eyebrow text-fg-subtle">{group.label}</h3>
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.title} className="card-surface p-5">
                  <p className="font-medium text-fg">{item.title}</p>
                  <p className="mt-1 text-sm text-fg-muted">
                    {item.issuer}
                    {item.year ? ` · ${item.year}` : ""}
                  </p>
                  {item.note ? (
                    <p className="mt-2 text-sm text-fg-subtle">{item.note}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  </Section>
);
