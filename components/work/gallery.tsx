"use client";

import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { ShotFrame } from "@/components/ui/shot-frame";
import type { Shot } from "@/content/projects";
import { cn } from "@/lib/utils";

type GalleryProps = {
  shots: readonly Shot[];
  note?: string;
};

/**
 * Screenshot grid with an accessible lightbox: click or Enter opens it,
 * ←/→ move between screens, Esc closes and focus returns to the thumbnail.
 */
export const Gallery = ({ shots, note }: GalleryProps) => {
  const [open, setOpen] = useState<number | null>(null);
  const triggers = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen((current) => {
      if (current !== null) requestAnimationFrame(() => triggers.current[current]?.focus());
      return null;
    });
  }, []);

  const step = useCallback(
    (delta: number) => setOpen((i) => (i === null ? i : (i + delta + shots.length) % shots.length)),
    [shots.length]
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const current = open === null ? null : shots[open];

  return (
    <>
      <ul className="grid gap-6 md:grid-cols-2">
        {shots.map((shot, i) => (
          <li key={shot.src} className={cn(i === 0 && "md:col-span-2")}>
            <figure>
              <button
                ref={(el) => {
                  triggers.current[i] = el;
                }}
                type="button"
                onClick={() => setOpen(i)}
                className="group relative block w-full cursor-zoom-in rounded-xl text-left"
                aria-label={`Open screenshot ${i + 1} of ${shots.length}: ${shot.alt}`}
              >
                <ShotFrame
                  frame={shot.frame}
                  url={shot.url}
                  compact={i !== 0}
                  className="transition-[transform,border-color] duration-500 group-hover:-translate-y-1 group-hover:border-accent-dim"
                >
                  <div className="relative overflow-hidden">
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={shot.width}
                      height={shot.height}
                      sizes={i === 0 ? "(min-width: 1024px) 900px, 100vw" : "(min-width: 768px) 450px, 100vw"}
                      className="h-auto w-full transition-transform duration-700 group-hover:scale-[1.015]"
                    />
                    <span className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-md border border-line-strong bg-ink-950/80 px-2 py-1 font-mono text-[10.5px] text-fg-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      <Expand className="size-3" aria-hidden />
                      view
                    </span>
                  </div>
                </ShotFrame>
              </button>
              <figcaption className="mt-3 flex gap-3 text-sm leading-relaxed text-fg-muted">
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span>{shot.caption}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {note ? (
        <p className="mt-6 font-mono text-[11.5px] text-fg-subtle">
          <span className="text-accent">#</span> {note}
        </p>
      ) : null}

      {current && open !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Screenshot ${open + 1} of ${shots.length}`}
          className="fixed inset-0 z-[95] flex flex-col bg-ink-950/92 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="flex items-center justify-between px-4 py-3 sm:px-6">
            <p className="font-mono text-[12px] text-fg-subtle">
              <span className="text-accent">{String(open + 1).padStart(2, "0")}</span> / {String(shots.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              className="rounded-lg border border-line-strong bg-ink-850 p-2 text-fg-muted transition-colors hover:text-fg"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
          </div>

          <div
            className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              width={current.width}
              height={current.height}
              sizes="100vw"
              loading="eager"
              className="h-auto max-h-[calc(100dvh-9.5rem)] w-auto max-w-full rounded-lg border border-line-strong object-contain shadow-2xl"
            />
            {shots.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  className="absolute left-2 rounded-full border border-line-strong bg-ink-850/90 p-2.5 text-fg transition-colors hover:border-accent-dim hover:text-accent sm:left-5"
                  aria-label="Previous screenshot"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  className="absolute right-2 rounded-full border border-line-strong bg-ink-850/90 p-2.5 text-fg transition-colors hover:border-accent-dim hover:text-accent sm:right-5"
                  aria-label="Next screenshot"
                >
                  <ChevronRight className="size-5" />
                </button>
              </>
            ) : null}
          </div>

          <p className="mx-auto max-w-3xl px-6 py-4 text-center text-sm text-fg-muted">{current.caption}</p>
        </div>
      ) : null}
    </>
  );
};
