import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { about, nowLog, profileYaml } from "@/content/profile";

const YamlValue = ({ value }: { value: string | readonly string[] }) => {
  if (typeof value === "string") {
    return <span className="tok-str">&quot;{value}&quot;</span>;
  }
  return (
    <>
      <span className="tok-punc">[</span>
      {value.map((item, i) => (
        <span key={item}>
          <span className="tok-str">{item}</span>
          {i < value.length - 1 ? <span className="tok-punc">, </span> : null}
        </span>
      ))}
      <span className="tok-punc">]</span>
    </>
  );
};

export const About = () => (
  <Section
    id="about"
    index="01"
    eyebrow="About"
    command="cat about.md"
    title={
      <>
        Defensive by background.{" "}
        <span className="text-fg-subtle">Builder by trade.</span>
      </>
    }
  >
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
      <div className="space-y-6 lg:col-span-7">
        {about.map((paragraph, i) => (
          <Reveal key={paragraph.slice(0, 32)} delay={i}>
            <p className="max-w-[62ch] text-lead text-fg-muted">
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={1} className="space-y-4 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <figure className="terminal spotlight glow-border relative overflow-hidden">
          <figcaption className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="size-2.5 rounded-full bg-danger/80" />
            <span className="size-2.5 rounded-full bg-warn/80" />
            <span className="size-2.5 rounded-full bg-accent/80" />
            <span className="ml-2 font-mono text-[11px] text-fg-subtle">profile.yaml</span>
            <span className="ml-auto rounded border border-line px-1.5 py-0.5 font-mono text-[9.5px] tracking-wider text-fg-subtle">
              YAML
            </span>
          </figcaption>
          <pre className="px-4 py-4 font-mono text-[12.5px] leading-[1.9] whitespace-pre-wrap">
            <code>
              <span className="tok-com"># the short version</span>
              {"\n"}
              {profileYaml.map((row, i) => (
                <span key={row.key} className="block pl-8 -indent-8">
                  <span className="mr-4 inline-block w-4 text-right text-ink-600 select-none">
                    {i + 1}
                  </span>
                  <span className="tok-key">{row.key}</span>
                  <span className="tok-punc">: </span>
                  <YamlValue value={row.value} />
                </span>
              ))}
            </code>
          </pre>
        </figure>

        <div className="terminal overflow-hidden">
          <p className="flex items-center justify-between border-b border-line px-4 py-2.5 font-mono text-[11px] text-fg-subtle">
            <span>tail -f now.log</span>
            <span className="inline-flex items-center gap-1.5 text-accent">
              <span className="size-1.5 animate-pulse rounded-full bg-accent" />
              live
            </span>
          </p>
          <ul className="space-y-1.5 px-4 py-3.5 font-mono text-[12px] leading-relaxed">
            {nowLog.map((entry) => (
              <li key={entry.text} className="flex gap-3">
                <span className={entry.level === "now" ? "text-accent" : "text-violet"}>
                  [{entry.level}]
                </span>
                <span className="text-fg-muted">{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  </Section>
);
