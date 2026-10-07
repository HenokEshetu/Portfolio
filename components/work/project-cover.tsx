import { ShieldCheck } from "lucide-react";
import Image from "next/image";

import { ShotFrame } from "@/components/ui/shot-frame";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/utils";

/* ── Rusty Chess: board + TOFU certificate prompt (repo is private) ── */
const POSITION = [
  "♜♞♝♛♚♝♞♜",
  "♟♟♟♟·♟♟♟",
  "········",
  "····♟···",
  "····♙···",
  "·····♘··",
  "♙♙♙♙·♙♙♙",
  "♖♘♗♕♔♗·♖",
];

/** White pieces are drawn with the solid glyphs and a light fill so both sides read on any square. */
const WHITE_TO_SOLID: Record<string, string> = { "♔": "♚", "♕": "♛", "♖": "♜", "♗": "♝", "♘": "♞", "♙": "♟" };

const ChessVisual = ({ compact }: { compact?: boolean }) => (
  <div
    className="relative grid h-full min-h-56 place-items-center overflow-hidden bg-[radial-gradient(ellipse_at_30%_20%,color-mix(in_oklab,var(--color-accent)_14%,transparent),transparent_60%),var(--color-ink-900)] p-6"
    role="img"
    aria-label="Illustration of Rusty Chess: a board mid-game next to a certificate fingerprint trust prompt"
  >
    <div className="flex items-center gap-6">
      <div
        className={cn(
          "grid grid-cols-8 overflow-hidden rounded-lg border border-line-strong shadow-2xl",
          compact ? "w-40" : "w-56 sm:w-64"
        )}
      >
        {POSITION.flatMap((row, r) =>
          [...row].map((piece, c) => {
            const isWhite = WHITE_TO_SOLID[piece] !== undefined;
            return (
              <span
                key={`${r}-${c}`}
                className={cn(
                  "grid aspect-square place-items-center leading-none select-none",
                  compact ? "text-[13px]" : "text-[19px] sm:text-[22px]",
                  (r + c) % 2 === 0 ? "bg-[#b9cbc4]" : "bg-[#2f5f53]",
                  isWhite
                    ? "text-[#f8fafc] [-webkit-text-stroke:0.8px_#0a0f1a] [text-shadow:0_1px_2px_#0009]"
                    : "text-ink-950 [text-shadow:0_1px_0_#ffffff40]",
                  r === 4 && c === 4 && "ring-2 ring-inset ring-warn/80"
                )}
              >
                {piece === "·" ? "" : (WHITE_TO_SOLID[piece] ?? piece)}
              </span>
            );
          })
        )}
      </div>

      {!compact ? (
        <div className="hidden w-60 space-y-3 sm:block">
          <div className="terminal p-4">
            <p className="flex items-center gap-2 text-[13px] font-semibold text-fg">
              <ShieldCheck className="size-4 text-accent" aria-hidden />
              Trust this server?
            </p>
            <p className="mt-2 font-mono text-[10.5px] leading-relaxed text-fg-subtle">SHA-256 fingerprint</p>
            <p className="font-mono text-[10.5px] leading-relaxed break-all text-accent-bright">
              9F:2C:41:7A:E0:5B:13:C8:66:D2:0A:91:4E:B7:3F:58
            </p>
            <div className="mt-3 flex gap-2">
              <span className="rounded-md bg-accent px-2.5 py-1 text-[11px] font-semibold text-ink-950">Trust</span>
              <span className="rounded-md border border-line-strong px-2.5 py-1 text-[11px] text-fg-muted">Cancel</span>
            </div>
          </div>
          <div className="flex gap-2 font-mono text-[11px]">
            <span className="flex-1 rounded-md border border-line bg-ink-850 px-2 py-1.5 text-fg">♔ 04:37</span>
            <span className="flex-1 rounded-md border border-line bg-ink-850 px-2 py-1.5 text-fg-muted">♚ 05:00</span>
          </div>
          <p className="rounded-md border border-line bg-ink-850 px-2 py-1.5 font-mono text-[11px] text-fg-muted">
            Glicko-2 <span className="text-accent">1642 ± 48</span>
          </p>
        </div>
      ) : null}
    </div>
  </div>
);

/* ── Automation tools: the real repository layout ── */
const TREE = [
  ["backup/", "ec2 · encrypted · mysql · rsync · simple", "py"],
  ["deployment/", "deploy_docker.sh · net_checker.go", "sh go"],
  ["monitoring/", "cpu_memory · disk_usage · log_tailer · port_scanner", "py go rs"],
  ["security-auditing/", "file_hasher.rs · find_suid.{sh,ps1} · password_strength", "rs ps1"],
  ["system-maintenance/", "log_rotator.sh · update.{sh,ps1}", "sh ps1"],
  ["user-management/", "create · delete · list · lock · reset · bulk_create", "py"],
] as const;

const TerminalVisual = ({ compact }: { compact?: boolean }) => (
  <div
    className="h-full min-h-56 bg-ink-950 p-5 font-mono text-[11.5px] leading-[1.9] sm:p-6"
    role="img"
    aria-label="Repository layout of the System Engineering Automation Tools"
  >
    <p className="text-fg">
      <span className="text-accent">❯</span> tree -L 1 System-Engineer-Automation-tools
    </p>
    <ul className={cn("mt-1", compact && "text-[10.5px]")}>
      {TREE.map(([dir, files, langs], i) => (
        <li key={dir} className="flex gap-2 whitespace-nowrap">
          <span className="text-fg-subtle">{i === TREE.length - 1 ? "└──" : "├──"}</span>
          <span className="text-signal">{dir}</span>
          {!compact ? <span className="hidden truncate text-fg-subtle sm:inline">{files}</span> : null}
          <span className="ml-auto text-violet">{langs}</span>
        </li>
      ))}
    </ul>
    <p className="mt-1 text-fg-subtle">6 directories · Python · Go · Rust · Bash · PowerShell</p>
  </div>
);

type ProjectCoverProps = {
  project: Project;
  compact?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

/** The project's first screenshot in window chrome, or a drawn visual when there are none. */
export const ProjectCover = ({ project, compact, priority, className, sizes }: ProjectCoverProps) => {
  const shot = project.gallery?.[0];

  if (shot) {
    return (
      <ShotFrame frame={shot.frame} url={shot.url} compact={compact} className={className}>
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          priority={priority}
          sizes={sizes ?? "(min-width: 1024px) 800px, 100vw"}
          className="h-auto w-full"
        />
      </ShotFrame>
    );
  }

  if (project.visual) {
    return (
      <ShotFrame
        frame="desktop"
        url={project.visual === "chess" ? "Rusty Chess" : "~/System-Engineer-Automation-tools"}
        compact={compact}
        className={className}
      >
        {project.visual === "chess" ? <ChessVisual compact={compact} /> : <TerminalVisual compact={compact} />}
      </ShotFrame>
    );
  }

  return null;
};
