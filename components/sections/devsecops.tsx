import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { pipeline } from "@/content/profile";
import { cn } from "@/lib/utils";

/* Lemniscate of Bernoulli — the classic DevOps "infinity" loop. */
const A = 250;
const point = (t: number) => {
  const s = Math.sin(t);
  const c = Math.cos(t);
  const d = 1 + s * s;
  return { x: (A * c) / d, y: (A * s * c) / d };
};

const round = (n: number) => Math.round(n * 10) / 10;

const LOOP_PATH = (() => {
  const steps = 240;
  // Start at the crossing (t = π/2) so the travelling packet begins at "SEC".
  const parts: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = Math.PI / 2 + (i / steps) * Math.PI * 2;
    const { x, y } = point(t);
    parts.push(`${i === 0 ? "M" : "L"}${round(x)} ${round(y)}`);
  }
  return parts.join(" ");
})();

/* Where each stage sits on the loop, in traversal order. */
const STAGE_T = [0.62, 0.86, 1.14, 1.38, 1.62, 1.86, 2.14, 2.38].map((k) => k * Math.PI);

const nodes = pipeline.map((stage, i) => {
  const t = STAGE_T[i] ?? 0;
  const p = point(t);
  // Push labels outward from the centre of their own lobe.
  const lobeX = stage.side === "dev" ? -A * 0.55 : A * 0.55;
  const dx = p.x - lobeX;
  const dy = p.y;
  const len = Math.hypot(dx, dy) || 1;
  // Nodes next to the crossing would collide with each other's labels, so
  // their labels sit above/below and lean away from the centre instead.
  const nearCentre = Math.abs(p.x) < A * 0.4;
  const dir = stage.side === "dev" ? -1 : 1;
  return {
    ...stage,
    x: round(p.x),
    y: round(p.y),
    lx: round(nearCentre ? p.x + dir * 8 : p.x + (dx / len) * 30),
    ly: round(nearCentre ? p.y + (p.y < 0 ? -18 : 22) : p.y + (dy / len) * 30),
    anchor: (nearCentre ? (dir < 0 ? "end" : "start") : "middle") as "end" | "start" | "middle",
  };
});

const InfinityLoop = () => (
  <svg viewBox="-330 -140 660 280" className="mx-auto w-full max-w-4xl" aria-hidden>
    <defs>
      <linearGradient id="loop-grad" x1="0" x2="1" y1="0" y2="0">
        <stop offset="0%" stopColor="var(--color-accent)" />
        <stop offset="100%" stopColor="var(--color-signal)" />
      </linearGradient>
      <filter id="loop-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" />
      </filter>
    </defs>

    <text x={-A * 0.55} y="5" textAnchor="middle" fill="var(--color-fg-subtle)" fontSize="13" letterSpacing="4" fontFamily="var(--font-mono)">
      DEV
    </text>
    <text x={A * 0.55} y="5" textAnchor="middle" fill="var(--color-fg-subtle)" fontSize="13" letterSpacing="4" fontFamily="var(--font-mono)">
      OPS
    </text>

    {/* Track */}
    <path d={LOOP_PATH} fill="none" stroke="var(--color-line-strong)" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
    <path d={LOOP_PATH} fill="none" stroke="url(#loop-grad)" strokeWidth="1.5" opacity="0.6" />

    {/* Travelling packets */}
    <path
      d={LOOP_PATH}
      pathLength={1000}
      className="loop-packet"
      fill="none"
      stroke="var(--color-accent-bright)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeDasharray="34 966"
      filter="url(#loop-glow)"
    />
    <path
      d={LOOP_PATH}
      pathLength={1000}
      className="loop-packet"
      fill="none"
      stroke="var(--color-accent-bright)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeDasharray="34 966"
    />

    {nodes.map((n) => (
      <g key={n.id}>
        <circle cx={n.x} cy={n.y} r="8" fill="var(--color-ink-950)" stroke={n.side === "dev" ? "var(--color-accent)" : "var(--color-signal)"} strokeWidth="2" />
        <circle cx={n.x} cy={n.y} r="2.5" fill={n.side === "dev" ? "var(--color-accent)" : "var(--color-signal)"} />
        <text
          x={n.lx}
          y={n.ly + 4}
          textAnchor={n.anchor}
          fill="var(--color-fg)"
          fontSize="12.5"
          fontWeight="600"
          fontFamily="var(--font-display)"
        >
          {n.name}
        </text>
      </g>
    ))}

    {/* SEC at the crossing: security is the loop, not a stage */}
    <g>
      <circle r="30" fill="var(--color-accent)" opacity="0.12" filter="url(#loop-glow)" />
      <rect x="-26" y="-14" width="52" height="28" rx="8" fill="var(--color-ink-950)" stroke="var(--color-accent)" strokeWidth="1.5" />
      <text y="4.5" textAnchor="middle" fill="var(--color-accent-bright)" fontSize="12" fontWeight="700" letterSpacing="2.5" fontFamily="var(--font-mono)">
        SEC
      </text>
    </g>
  </svg>
);

export const DevSecOps = () => (
  <Section
    id="devsecops"
    index="03"
    eyebrow="How I ship"
    command="cat .gitlab-ci.yml"
    title={
      <>
        DevSecOps, end to end.{" "}
        <span className="text-fg-subtle">Security isn&apos;t a stage. It runs through every stage.</span>
      </>
    }
    intro="I own the whole loop: threat model, code, pipeline gates, GitOps rollout and the detections that feed back into the next design. These are the tools I use at each stage."
  >
    <Reveal>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-ink-900/50 px-2 py-8 sm:px-8 sm:py-10">
        <div aria-hidden className="dot-backdrop absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
        <div className="relative">
          <InfinityLoop />
        </div>
      </div>
    </Reveal>

    <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {pipeline.map((stage, i) => (
        <Reveal as="li" key={stage.id} delay={i % 4}>
          <article className="card-surface spotlight glow-border group h-full p-5">
            <div className="flex items-center justify-between">
              <span
                className={cn(
                  "font-mono text-[11px] tracking-wider",
                  stage.side === "dev" ? "text-accent" : "text-signal"
                )}
              >
                {String(i + 1).padStart(2, "0")} · {stage.side.toUpperCase()}
              </span>
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full",
                  stage.side === "dev" ? "bg-accent" : "bg-signal"
                )}
              />
            </div>
            <h3 className="mt-3 font-display text-lg font-semibold text-fg">{stage.name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{stage.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {stage.tools.map((tool) => (
                <li key={tool} className="chip text-[10.5px]">
                  {tool}
                </li>
              ))}
            </ul>
          </article>
        </Reveal>
      ))}
    </ol>
  </Section>
);
