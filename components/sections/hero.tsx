import { ArrowRight, BadgeCheck, FileDown, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { LiveClock } from "@/components/ui/live-clock";
import { profile, stats, toolbelt } from "@/content/profile";

/** Staggered entrance delay, applied via CSS custom property. */
const step = (index: number) =>
  ({ "--rise-delay": `${index * 90}ms` }) as React.CSSProperties;

const line = (index: number) =>
  ({ "--line-delay": `${900 + index * 380}ms` }) as React.CSSProperties;

const PIPELINE = [
  { stage: "fmt + clippy", detail: "-D warnings" },
  { stage: "test", detail: "cargo · pytest · vitest" },
  { stage: "sast / sca", detail: "cargo-audit · trivy" },
  { stage: "secrets", detail: "0 findings" },
  { stage: "image", detail: "write-once · signed digest" },
  { stage: "deploy", detail: "argocd sync → k8s" },
] as const;

export const Hero = () => (
  <section className="relative overflow-hidden pt-28 pb-10 sm:pt-36 lg:pt-40">
    <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[520px] w-[min(95rem,150%)] -translate-x-1/2 opacity-[0.18] blur-3xl"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, var(--color-accent) 0%, transparent 60%)",
      }}
    />

    <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
      {/* ── Copy ─────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        <div
          className="rise-in inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line-strong bg-ink-850/70 py-1.5 pr-4 pl-2 font-mono text-[11.5px] text-fg-muted backdrop-blur"
          style={step(0)}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2 py-0.5 text-accent">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
            </span>
            online
          </span>
          <span>{profile.availability}</span>
        </div>

        <p className="rise-in mt-8 font-mono text-sm text-fg-subtle" style={step(1)}>
          <span className="text-accent">❯</span> whoami
        </p>
        <p
          className="rise-in mt-2 font-display text-2xl font-semibold tracking-tight text-fg sm:text-[1.7rem]"
          style={step(1)}
        >
          {profile.name}
          <span className="text-fg-subtle"> · </span>
          <span className="text-fg-muted">{profile.role}</span>
        </p>

        <h1
          className="rise-in mt-6 max-w-[15ch] font-display text-display font-bold text-fg"
          style={step(2)}
        >
          I build security platforms that{" "}
          <span className="relative whitespace-nowrap">
            <span className="text-gradient">fail closed.</span>
            <svg
              aria-hidden
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              className="absolute -bottom-2 left-0 h-3 w-full text-accent/60"
            >
              <path
                d="M2 9 C 60 2, 140 2, 298 7"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="rise-in mt-8 max-w-xl text-lead text-fg-muted" style={step(3)}>
          {profile.tagline}
        </p>

        <div className="rise-in mt-10 flex flex-col gap-3 sm:flex-row sm:items-center" style={step(4)}>
          <Link href="/#work" className="btn-primary group">
            Explore my work
            <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          {profile.resumeUrl ? (
            <a href={profile.resumeUrl} target="_blank" rel="noopener" className="btn-ghost">
              <FileDown aria-hidden className="size-4" />
              Download CV
            </a>
          ) : null}
          <Link
            href="/#contact"
            className="px-2 py-3 text-sm font-medium text-fg-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-fg hover:decoration-accent"
          >
            Get in touch
          </Link>
        </div>

        <p
          className="rise-in mt-10 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11.5px] text-fg-subtle"
          style={step(5)}
        >
          <span className="inline-flex items-center gap-1.5">
            <MapPin className="size-3.5 text-accent" aria-hidden />
            {profile.location}
          </span>
          <span aria-hidden className="text-line-strong">/</span>
          <span>
            EAT <LiveClock className="text-fg-muted tabular-nums" />
          </span>
          <span aria-hidden className="hidden text-line-strong sm:inline">/</span>
          <span className="hidden sm:inline">
            press <span className="kbd">Ctrl</span> <span className="kbd">K</span>
          </span>
        </p>
      </div>

      {/* ── Visual: identity card + pipeline terminal ───────── */}
      <div className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none">
        <div className="rise-in relative" style={step(2)}>
          {/* Portrait */}
          <div className="relative ml-auto aspect-[4/5] w-[86%] overflow-hidden rounded-[1.6rem] border border-line-strong bg-ink-850 shadow-[0_40px_120px_-40px_#000]">
            <Image
              src={profile.portrait}
              alt={`Portrait of ${profile.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 420px, 80vw"
              className="object-cover object-top saturate-[0.9]"
            />
            {/* Duotone wash + vignette */}
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950 via-ink-950/10 to-transparent" />
            <div aria-hidden className="absolute inset-0 bg-accent/[0.04] mix-blend-color" />
            {/* Scanline */}
            <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="scanline h-1/3 w-full bg-linear-to-b from-transparent via-accent/[0.09] to-transparent" />
            </div>
            {/* HUD corners */}
            {["top-3 left-3 border-t border-l", "top-3 right-3 border-t border-r", "bottom-3 left-3 border-b border-l", "bottom-3 right-3 border-b border-r"].map((pos) => (
              <span key={pos} aria-hidden className={`absolute size-5 border-accent/70 ${pos}`} />
            ))}

            <div className="absolute top-5 left-5 inline-flex items-center gap-1.5 rounded-md border border-accent/30 bg-ink-950/60 px-2 py-1 font-mono text-[10px] tracking-wider text-accent backdrop-blur">
              <BadgeCheck className="size-3.5" aria-hidden />
              IDENTITY VERIFIED
            </div>

            <div className="absolute inset-x-5 bottom-5">
              <p className="font-mono text-[10.5px] tracking-[0.18em] text-accent uppercase">
                SIEM Dev Team Lead
              </p>
              <p className="mt-1 font-display text-xl font-semibold text-fg">{profile.company}</p>
            </div>
          </div>

          {/* Floating credential chip */}
          <div className="absolute top-[38%] -left-2 animate-float rounded-xl border border-line-strong bg-ink-900/85 px-3 py-2 shadow-xl backdrop-blur sm:-left-6">
            <p className="font-mono text-[10px] text-fg-subtle">cert.status</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-fg">
              <span className="size-1.5 rounded-full bg-warn" />
              CSSLP · in progress
            </p>
          </div>

          {/* Pipeline terminal */}
          <div
            className="terminal relative -mt-28 w-[92%] font-mono text-[11.5px] leading-relaxed sm:-mt-32"
            role="img"
            aria-label="Illustration: a CI/CD pipeline passing every security gate and deploying to Kubernetes"
          >
            <div className="flex items-center gap-2 border-b border-line px-3.5 py-2.5">
              <span className="size-2.5 rounded-full bg-danger/80" />
              <span className="size-2.5 rounded-full bg-warn/80" />
              <span className="size-2.5 rounded-full bg-accent/80" />
              <span className="ml-2 text-[10.5px] text-fg-subtle">~/siem-platform — main</span>
            </div>
            <div aria-hidden className="space-y-0.5 px-4 py-3.5">
              <p className="type-line text-fg" style={line(0)}>
                <span className="text-accent">❯</span> git push origin main
              </p>
              <p className="type-line text-fg-subtle" style={line(1)}>
                → pipeline triggered · 6 gates
              </p>
              {PIPELINE.map((gate, i) => (
                <p key={gate.stage} className="fade-line flex gap-2" style={line(i + 2)}>
                  <span className="text-accent">✓</span>
                  <span className="w-28 shrink-0 text-fg-muted">{gate.stage}</span>
                  <span className="truncate text-fg-subtle">{gate.detail}</span>
                </p>
              ))}
              <p className="fade-line pt-1.5 text-accent-bright" style={line(PIPELINE.length + 2)}>
                ● all gates green — tenant isolation verified
                <span className="ml-1 inline-block h-3 w-[6px] translate-y-[2px] animate-blink bg-accent" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* ── Stats ──────────────────────────────────────────────── */}
    <div className="container-page mt-16 sm:mt-20">
      <dl className="rise-in grid grid-cols-2 overflow-hidden rounded-2xl border border-line bg-ink-900/60 backdrop-blur lg:grid-cols-4" style={step(6)}>
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`relative flex flex-col p-5 sm:p-6 ${i % 2 === 1 ? "border-l border-line" : ""} ${i >= 2 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <dt className="order-2 mt-1.5 text-[13px] leading-snug text-fg-subtle">{stat.label}</dt>
            <dd className="order-1 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              <span className="text-gradient">{stat.value}</span>
            </dd>
          </div>
        ))}
      </dl>
    </div>

    {/* ── Toolbelt marquee ───────────────────────────────────── */}
    <div className="mask-x mt-12 overflow-hidden" aria-label="Technologies I work with">
      <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
        {[...toolbelt, ...toolbelt].map((tool, i) => (
          <li
            key={`${tool}-${i}`}
            aria-hidden={i >= toolbelt.length}
            className="chip px-3.5 py-1.5 text-[12px]"
          >
            <span className="mr-2 text-accent">▹</span>
            {tool}
          </li>
        ))}
      </ul>
    </div>
  </section>
);
