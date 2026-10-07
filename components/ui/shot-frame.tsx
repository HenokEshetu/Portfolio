import { Lock } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ShotFrameProps = {
  frame?: "browser" | "desktop";
  /** Address bar text (browser) or window title (desktop). */
  url?: string;
  children: ReactNode;
  className?: string;
  /** Smaller chrome for thumbnails. */
  compact?: boolean;
};

/** Browser or desktop window chrome around a screenshot. */
export const ShotFrame = ({ frame = "browser", url, children, className, compact }: ShotFrameProps) => (
  <div
    className={cn(
      "overflow-hidden rounded-xl border border-line-strong bg-ink-900 shadow-[0_30px_80px_-40px_#000]",
      className
    )}
  >
    <div
      className={cn(
        "flex items-center gap-2 border-b border-line bg-ink-850",
        compact ? "px-2.5 py-1.5" : "px-3.5 py-2.5"
      )}
    >
      <span className="flex shrink-0 gap-1.5" aria-hidden>
        <span className={cn("rounded-full bg-danger/70", compact ? "size-2" : "size-2.5")} />
        <span className={cn("rounded-full bg-warn/70", compact ? "size-2" : "size-2.5")} />
        <span className={cn("rounded-full bg-accent/70", compact ? "size-2" : "size-2.5")} />
      </span>
      {url ? (
        frame === "browser" ? (
          <span
            className={cn(
              "mx-auto flex min-w-0 max-w-[70%] flex-1 items-center justify-center gap-1.5 rounded-md border border-line bg-ink-950/70 font-mono text-fg-subtle",
              compact ? "px-2 py-0.5 text-[9.5px]" : "px-3 py-1 text-[11px]"
            )}
          >
            <Lock className={cn("shrink-0 text-accent", compact ? "size-2.5" : "size-3")} aria-hidden />
            <span className="truncate">{url}</span>
          </span>
        ) : (
          <span className={cn("mx-auto truncate font-mono text-fg-subtle", compact ? "text-[9.5px]" : "text-[11px]")}>
            {url}
          </span>
        )
      ) : null}
      <span className={cn("shrink-0", compact ? "w-8" : "w-12")} aria-hidden />
    </div>
    {children}
  </div>
);
