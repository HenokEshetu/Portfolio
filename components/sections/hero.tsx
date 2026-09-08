import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { profile } from "@/content/profile";

const CORE_STACK = [
  "Rust",
  "Go",
  "TypeScript",
  "Kafka",
  "OpenSearch",
  "Kubernetes",
] as const;

/** Staggered entrance delay, applied via CSS custom property. */
const step = (index: number) =>
  ({ "--rise-delay": `${index * 80}ms` }) as React.CSSProperties;

export const Hero = () => (
  <section className="relative overflow-hidden pt-32 pb-16 sm:pt-40 sm:pb-20">
    {/* Faint engineering grid — two gradients, no canvas, no video */}
    <div
      aria-hidden
      className="grid-backdrop pointer-events-none absolute inset-0 -z-10"
    />
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[420px] w-[min(90rem,140%)] -translate-x-1/2 opacity-[0.16] blur-3xl"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, var(--color-accent) 0%, transparent 62%)",
      }}
    />

    <div className="container-page">
      <p className="rise-in eyebrow flex items-center gap-2.5" style={step(0)}>
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
          <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
        </span>
        {profile.availability}
      </p>

      <h1
        className="rise-in mt-6 max-w-4xl text-display font-semibold text-fg"
        style={step(1)}
      >
        Security engineer &amp;{" "}
        <span className="text-gradient">full-stack developer</span>
      </h1>

      <p
        className="rise-in mt-7 max-w-xl text-lead text-fg-muted"
        style={step(2)}
      >
        {profile.tagline}
      </p>

      <div
        className="rise-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        style={step(3)}
      >
        <Link
          href="/#work"
          className="group inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.98]"
        >
          View work
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-line-strong px-5 py-3 text-sm font-semibold text-fg transition-colors hover:border-accent-dim hover:text-accent"
        >
          Get in touch
        </Link>
        {profile.resumeUrl ? (
          <a
            href={profile.resumeUrl}
            className="group inline-flex items-center justify-center gap-1.5 px-2 py-3 text-sm font-medium text-fg-muted transition-colors hover:text-fg sm:ml-1"
          >
            Résumé
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        ) : null}
      </div>

      <div className="rise-in mt-14 sm:mt-16" style={step(4)}>
        <div className="rule-fade" />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-8">
          <p className="eyebrow shrink-0 text-fg-subtle">Core stack</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {CORE_STACK.map((item) => (
              <li
                key={item}
                className="font-mono text-[13px] tracking-wide text-fg-muted"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);
