import {
  BrainCircuit,
  Globe,
  Lock,
  Radar,
  RefreshCcw,
  ShieldCheck,
  Ticket,
} from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { type PlatformModule, platformModules } from "@/content/profile";
import { cn } from "@/lib/utils";

const ICONS: Record<PlatformModule["icon"], React.ComponentType<{ className?: string }>> = {
  radar: Radar,
  brain: BrainCircuit,
  ticket: Ticket,
  refresh: RefreshCcw,
  globe: Globe,
  shield: ShieldCheck,
};

/** Baseline with a single flagged anomaly — the UEBA idea in one glance. */
const AnomalySpark = () => (
  <svg viewBox="0 0 320 70" className="h-16 w-full" aria-hidden>
    <defs>
      <linearGradient id="spark-fill" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.25" />
        <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
      </linearGradient>
    </defs>
    <path
      d="M0 48 L20 46 L40 50 L60 44 L80 47 L100 43 L120 48 L140 45 L160 49 L180 44 L200 46 L214 12 L228 47 L250 44 L270 48 L290 45 L320 47 L320 70 L0 70 Z"
      fill="url(#spark-fill)"
    />
    <path
      d="M0 48 L20 46 L40 50 L60 44 L80 47 L100 43 L120 48 L140 45 L160 49 L180 44 L200 46 L214 12 L228 47 L250 44 L270 48 L290 45 L320 47"
      fill="none"
      stroke="var(--color-accent)"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <line x1="0" x2="320" y1="30" y2="30" stroke="var(--color-warn)" strokeDasharray="3 5" strokeOpacity="0.5" />
    <circle cx="214" cy="12" r="9" fill="var(--color-danger)" fillOpacity="0.15" />
    <circle cx="214" cy="12" r="3.5" fill="var(--color-danger)" />
    <text x="226" y="14" fill="var(--color-danger)" fontSize="9" fontFamily="var(--font-mono)">
      score 0.97
    </text>
  </svg>
);

/** Supervisor fanning out to four specialist agents. */
const AgentGraph = () => {
  const agents = ["investigator", "analyst", "responder", "sysadmin"];
  return (
    <svg viewBox="0 0 240 150" className="h-48 w-full" aria-hidden>
      {agents.map((_, i) => {
        const x = 30 + i * 60;
        return (
          <path
            key={i}
            d={`M120 34 C120 70, ${x} 70, ${x} 104`}
            fill="none"
            stroke="var(--color-line-strong)"
            strokeWidth="1.2"
          />
        );
      })}
      {agents.map((_, i) => {
        const x = 30 + i * 60;
        return (
          <path
            key={`p-${i}`}
            className="loop-packet"
            d={`M120 34 C120 70, ${x} 70, ${x} 104`}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="1.6"
            strokeDasharray="6 120"
            style={{ animationDelay: `${i * -1.2}s`, animationDuration: "4s" }}
          />
        );
      })}
      <rect x="78" y="12" width="84" height="24" rx="6" fill="var(--color-ink-800)" stroke="var(--color-accent)" strokeOpacity="0.6" />
      <text x="120" y="28" textAnchor="middle" fill="var(--color-accent-bright)" fontSize="10" fontFamily="var(--font-mono)">
        supervisor
      </text>
      {agents.map((name, i) => {
        const x = 30 + i * 60;
        return (
          <g key={name}>
            <circle cx={x} cy={110} r="6" fill="var(--color-ink-800)" stroke="var(--color-signal)" strokeOpacity="0.7" />
            <text x={x} y={132} textAnchor="middle" fill="var(--color-fg-subtle)" fontSize="8.5" fontFamily="var(--font-mono)">
              {name}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

/** Case queue with severities and SLA burn — the CMT in one glance. */
const CaseQueue = () => {
  const cases = [
    { id: "CASE-1042", title: "Brute force → admin login", sev: "P1", sla: 82, tone: "danger" },
    { id: "CASE-1039", title: "Anomalous data egress", sev: "P2", sla: 46, tone: "warn" },
    { id: "CASE-1031", title: "Phishing report triage", sev: "P3", sla: 18, tone: "accent" },
  ] as const;
  const tones = {
    danger: "border-danger/40 bg-danger/10 text-danger",
    warn: "border-warn/40 bg-warn/10 text-warn",
    accent: "border-accent/40 bg-accent/10 text-accent",
  } as const;
  const bars = { danger: "bg-danger", warn: "bg-warn", accent: "bg-accent" } as const;
  return (
    <ul aria-hidden className="space-y-2">
      {cases.map((c, i) => (
        <li key={c.id} className="rounded-lg border border-line bg-ink-900/80 px-3 py-2">
          <div className="flex items-center gap-2 font-mono text-[10.5px]">
            <span className={cn("rounded border px-1.5 py-px", tones[c.tone])}>{c.sev}</span>
            <span className="text-fg-subtle">{c.id}</span>
            <span className="ml-auto text-fg-subtle">SLA</span>
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <span className="truncate text-[12.5px] text-fg-muted">{c.title}</span>
            <span className="ml-auto h-1 w-16 shrink-0 overflow-hidden rounded-full bg-ink-700">
              <span
                className={cn("fill-bar block h-full rounded-full", bars[c.tone])}
                style={{ width: `${c.sla}%`, ["--fill-delay" as string]: `${i * 200}ms` }}
              />
            </span>
          </div>
        </li>
      ))}
    </ul>
  );
};

/** Canary → staged → fleet-wide rollout with a rollback guard. */
const RolloutRings = () => {
  const rings = [
    { name: "canary", pct: 100, hosts: "12 / 12" },
    { name: "ring-1", pct: 100, hosts: "240 / 240" },
    { name: "fleet", pct: 64, hosts: "1,804 / 2,812" },
  ];
  return (
    <div aria-hidden className="space-y-2.5 font-mono text-[10.5px]">
      {rings.map((r, i) => (
        <div key={r.name}>
          <div className="flex justify-between text-fg-subtle">
            <span>
              <span className={r.pct === 100 ? "text-accent" : "text-signal"}>{r.pct === 100 ? "✓" : "▸"}</span> {r.name}
            </span>
            <span>{r.hosts}</span>
          </div>
          <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-ink-700">
            <div
              className={cn("fill-bar h-full rounded-full", r.pct === 100 ? "bg-accent" : "bg-signal")}
              style={{ width: `${r.pct}%`, ["--fill-delay" as string]: `${i * 350}ms` }}
            />
          </div>
        </div>
      ))}
      <p className="pt-1 text-fg-subtle">
        rollback <span className="text-accent">armed</span> · window <span className="text-fg-muted">02:00–04:00 EAT</span>
      </p>
    </div>
  );
};

/** STIX 2.1 graph: indicator → malware → threat actor, with a Bloom-filter hit. */
const StixGraph = () => {
  const nodes = [
    { x: 40, y: 34, label: "indicator", sub: "185.220.101.47", color: "var(--color-warn)" },
    { x: 160, y: 34, label: "malware", sub: "LockBit 3.0", color: "var(--color-danger)" },
    { x: 280, y: 34, label: "intrusion-set", sub: "FIN7", color: "var(--color-violet)" },
  ];
  return (
    <div aria-hidden>
      <svg viewBox="0 0 320 70" className="h-16 w-full">
        <path d="M58 34 H142 M178 34 H262" stroke="var(--color-line-strong)" strokeWidth="1.4" />
        <path className="loop-packet" d="M58 34 H142 M178 34 H262" pathLength={1000} stroke="var(--color-accent)" strokeWidth="1.8" strokeDasharray="60 440" style={{ animationDuration: "3.5s" }} fill="none" />
        <text x="100" y="27" textAnchor="middle" fill="var(--color-fg-subtle)" fontSize="8" fontFamily="var(--font-mono)">indicates</text>
        <text x="220" y="27" textAnchor="middle" fill="var(--color-fg-subtle)" fontSize="8" fontFamily="var(--font-mono)">attributed-to</text>
        {nodes.map((n) => (
          <g key={n.label}>
            <circle cx={n.x} cy={n.y} r="13" fill="var(--color-ink-800)" stroke={n.color} strokeWidth="1.5" />
            <circle cx={n.x} cy={n.y} r="4" fill={n.color} />
            <text x={n.x} y={n.y + 26} textAnchor="middle" fill="var(--color-fg-muted)" fontSize="8.5" fontFamily="var(--font-mono)">
              {n.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] text-fg-subtle">
        <span className="rounded border border-accent/30 bg-accent/10 px-1.5 py-px whitespace-nowrap text-accent">bloom hit</span>
        <span className="whitespace-nowrap">185.220.101.47</span>
        <span className="whitespace-nowrap text-fg-muted">→ 3 sightings · 0.4 ms</span>
      </p>
    </div>
  );
};

const GATES = ["fmt", "clippy", "test", "cargo-audit", "trivy", "secrets", "argocd"] as const;

const TenantRail = () => (
  <div aria-hidden className="space-y-3">
    <div className="flex flex-wrap gap-2">
      {["tenant-a", "tenant-b", "tenant-c", "platform"].map((ns, i) => (
        <span
          key={ns}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md border px-2 py-1 font-mono text-[10.5px]",
            i === 3 ? "border-signal/30 text-signal" : "border-accent/25 text-accent"
          )}
        >
          <Lock className="size-3" />
          ns/{ns}
        </span>
      ))}
    </div>
    <div className="flex flex-wrap items-center gap-1 font-mono text-[10.5px]">
      {GATES.map((gate, i) => (
        <span key={gate} className="inline-flex items-center gap-1">
          <span
            className="pulse-node inline-flex items-center gap-1 rounded border border-line bg-ink-900 px-1.5 py-0.5 text-fg-muted"
            style={{ ["--pulse-delay" as string]: `${i * 300}ms` }}
          >
            <span className="text-accent">✓</span>
            {gate}
          </span>
          {i < GATES.length - 1 ? <span className="text-line-strong">→</span> : null}
        </span>
      ))}
    </div>
  </div>
);

const VISUALS: Partial<Record<string, React.ReactNode>> = {
  "UEBA engine": <AnomalySpark />,
  "Agentic AI SOC assistant": <AgentGraph />,
  "Case management & ticketing": <CaseQueue />,
  "Update manager": <RolloutRings />,
  "CTI service": <StixGraph />,
  "Platform & DevSecOps": <TenantRail />,
};

export const Platform = () => (
  <Section
    id="platform"
    index="02"
    eyebrow="Current work"
    command="kubectl get services -n siem-xdr"
    title={
      <>
        Inside the <span className="text-gradient">SIEM/XDR platform</span> I lead
      </>
    }
    intro="A multi-tenant SIEM/XDR for a managed security service provider. Each tenant runs in its own namespace, alerts are never silently dropped, and every service authorises tenants fail-closed. These are the parts I designed and built."
  >
    <ul className="grid auto-rows-[minmax(0,auto)] gap-4 md:grid-cols-2 lg:grid-cols-3">
      {platformModules.map((module, i) => {
        const Icon = ICONS[module.icon];
        const visual = VISUALS[module.name];
        return (
          <Reveal
            as="li"
            key={module.name}
            delay={i}
            className={cn(
              module.span === "wide" && "lg:col-span-2",
              module.span === "tall" && "lg:row-span-2"
            )}
          >
            <article className="card-surface spotlight glow-border group flex h-full flex-col p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <span className="grid size-11 place-items-center rounded-xl border border-line-strong bg-ink-900 text-accent transition-colors group-hover:border-accent-dim">
                  <Icon className="size-5" />
                </span>
                <span className="chip text-[10.5px] text-fg-subtle">{module.lang}</span>
              </div>

              <h3 className="mt-5 font-display text-h3 font-semibold text-fg">{module.name}</h3>
              <p className="mt-2.5 max-w-[56ch] text-[15px] leading-relaxed text-fg-muted">
                {module.blurb}
              </p>

              {visual ? (
                <div className="mt-5 flex flex-1 items-center">
                  <div className="w-full">{visual}</div>
                </div>
              ) : (
                <div className="flex-1" />
              )}

              <ul className="mt-5 flex flex-wrap gap-1.5">
                {module.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        );
      })}
    </ul>

    <Reveal>
      <p className="mt-6 font-mono text-[11.5px] text-fg-subtle">
        <span className="text-accent">#</span> Proprietary platform. Shown at architecture level only; deeper walkthroughs on request.
      </p>
    </Reveal>
  </Section>
);
