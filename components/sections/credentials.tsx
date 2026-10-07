import { Award, GraduationCap, Languages } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { credentials, spokenLanguages } from "@/content/profile";
import { cn } from "@/lib/utils";

export const Credentials = () => {
  const education = credentials.filter((c) => c.kind === "education");
  const certs = credentials.filter((c) => c.kind === "certification");

  return (
    <Section
      id="credentials"
      index="06"
      eyebrow="Background"
      command="openssl x509 -in credentials.pem -noout -subject"
      title="Education & certifications"
    >
      <div className="grid gap-5 lg:grid-cols-12">
        {education.map((item) => {
          const gpa = item.note?.match(/CGPA ([\d.]+)/)?.[1];
          return (
            <Reveal key={item.title} className="lg:col-span-5">
              <article className="card-surface spotlight glow-border relative flex h-full flex-col overflow-hidden p-7">
                <div aria-hidden className="dot-backdrop absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
                <div className="relative flex items-center gap-3">
                  <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900 text-accent">
                    <GraduationCap className="size-5" aria-hidden />
                  </span>
                  <p className="eyebrow">Education</p>
                </div>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-fg">{item.title}</h3>
                <p className="relative mt-1.5 text-accent">{item.issuer}</p>
                <p className="relative mt-1 font-mono text-[12px] text-fg-subtle">{item.year}</p>

                {gpa ? (
                  <div className="relative mt-auto flex items-end gap-3 pt-10">
                    <span className="font-display text-6xl leading-none font-bold tracking-tight">
                      <span className="text-gradient">{gpa}</span>
                    </span>
                    <span className="pb-1.5 font-mono text-[12px] text-fg-subtle">/ 4.00 CGPA</span>
                  </div>
                ) : null}
                {item.note ? (
                  <p className="relative mt-4 text-sm text-fg-muted">
                    {item.note.replace(/CGPA [\d.]+ \/ 4\.00\.\s*/, "")}
                  </p>
                ) : null}
              </article>
            </Reveal>
          );
        })}

        <div className="grid gap-5 lg:col-span-7">
          <Reveal delay={1}>
            <div className="card-surface p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900 text-accent">
                  <Award className="size-5" aria-hidden />
                </span>
                <p className="eyebrow">Certifications &amp; training</p>
              </div>

              <ul className="mt-6 divide-y divide-line">
                {certs.map((cert) => {
                  const inProgress = cert.status === "in-progress";
                  return (
                    <li key={cert.title} className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2 py-4 first:pt-0 last:pb-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-fg">{cert.title}</p>
                        <p className="mt-0.5 text-sm text-fg-subtle">
                          {cert.issuer}
                          {cert.note ? <span className="text-fg-subtle"> · {cert.note}</span> : null}
                        </p>
                      </div>
                      <span
                        className={cn(
                          "inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10.5px]",
                          inProgress
                            ? "border-warn/30 bg-warn/10 text-warn"
                            : "border-accent/30 bg-accent/10 text-accent"
                        )}
                      >
                        <span className={cn("size-1.5 rounded-full", inProgress ? "animate-pulse bg-warn" : "bg-accent")} />
                        {inProgress ? "in progress" : "completed"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="card-surface flex flex-wrap items-center gap-x-8 gap-y-4 p-6">
              <span className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900 text-accent">
                  <Languages className="size-5" aria-hidden />
                </span>
                <span className="eyebrow">Languages</span>
              </span>
              {spokenLanguages.map((lang) => (
                <p key={lang.name} className="text-sm">
                  <span className="font-medium text-fg">{lang.name}</span>
                  <span className="text-fg-subtle"> · {lang.level}</span>
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
};
