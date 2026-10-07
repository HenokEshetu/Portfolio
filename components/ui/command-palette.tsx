"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  Hash,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";

import { SocialIcon } from "@/components/ui/social-icon";
import { navLinks, profile, socials } from "@/content/profile";
import { cn } from "@/lib/utils";

export const OPEN_PALETTE_EVENT = "palette:open";

/** Element to refocus when the (singleton) palette closes. */
let restoreTarget: HTMLElement | null = null;

type Item = {
  id: string;
  group: "Navigate" | "Connect" | "Actions";
  label: string;
  hint?: string;
  icon: React.ReactNode;
  run: () => void | Promise<void>;
};

export const CommandPalette = () => {
  const router = useRouter();
  const listId = useId();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    restoreTarget?.focus?.();
    restoreTarget = null;
  }, []);

  const items = useMemo<Item[]>(() => {
    const nav: Item[] = navLinks.map((link) => ({
      id: `nav-${link.title}`,
      group: "Navigate",
      label: link.title,
      hint: link.href,
      icon: <Hash className="size-4" aria-hidden />,
      run: () => router.push(link.href),
    }));

    const connect: Item[] = [
      ...socials
        .filter((s) => s.href.startsWith("http"))
        .map<Item>((s) => ({
          id: `social-${s.name}`,
          group: "Connect",
          label: `Open ${s.name}`,
          hint: s.href.replace(/^https?:\/\//, ""),
          icon: <SocialIcon icon={s.icon} className="size-4" />,
          run: () => {
            window.open(s.href, "_blank", "noopener,noreferrer");
          },
        })),
      {
        id: "social-rusty",
        group: "Connect",
        label: "Open GitHub (RustyHenok)",
        hint: "github.com/RustyHenok",
        icon: <SocialIcon icon="github" className="size-4" />,
        run: () => {
          window.open("https://github.com/RustyHenok", "_blank", "noopener,noreferrer");
        },
      },
    ];

    const actions: Item[] = [
      {
        id: "copy-email",
        group: "Actions",
        label: "Copy email address",
        hint: profile.email,
        icon: <Copy className="size-4" aria-hidden />,
        run: async () => {
          try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          } catch {
            window.location.href = `mailto:${profile.email}`;
          }
        },
      },
    ];

    if (profile.resumeUrl) {
      const url = profile.resumeUrl;
      actions.push({
        id: "resume",
        group: "Actions",
        label: "Download résumé (PDF)",
        hint: url,
        icon: <FileText className="size-4" aria-hidden />,
        run: () => {
          window.open(url, "_blank", "noopener");
        },
      });
    }

    return [...actions, ...nav, ...connect];
  }, [router]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q) ||
        item.hint?.toLowerCase().includes(q)
    );
  }, [items, query]);

  // Global shortcut + custom open event from the navbar button.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => {
          if (!value) restoreTarget = document.activeElement as HTMLElement;
          return !value;
        });
      }
    };
    const onOpen = () => {
      restoreTarget = document.activeElement as HTMLElement;
      setOpen(true);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
    };
  }, [open]);

  const execute = useCallback(
    async (item: Item | undefined) => {
      if (!item) return;
      await item.run();
      if (item.id !== "copy-email") close();
    },
    [close]
  );

  if (!open) return null;

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      close();
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i + 1) % filtered.length : 0));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => (filtered.length ? (i - 1 + filtered.length) % filtered.length : 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      void execute(filtered[active]);
    } else if (event.key === "Tab") {
      // Keep focus inside the dialog: the input is its only tab stop.
      event.preventDefault();
    }
  };

  let lastGroup: Item["group"] | null = null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[14vh]"
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        aria-label="Close command palette"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-ink-950/70 backdrop-blur-sm"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        className="terminal relative w-full max-w-xl overflow-hidden"
      >
        <div className="flex items-center gap-3 border-b border-line px-4">
          <Search className="size-4 shrink-0 text-accent" aria-hidden />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Type a command or search…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-activedescendant={filtered[active] ? `${listId}-${filtered[active].id}` : undefined}
            className="h-14 w-full bg-transparent font-mono text-sm text-fg placeholder:text-fg-subtle focus:outline-none"
          />
          <span className="kbd">esc</span>
        </div>

        <ul id={listId} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
          {filtered.length === 0 ? (
            <li className="px-3 py-8 text-center font-mono text-sm text-fg-subtle">
              command not found: {query}
            </li>
          ) : (
            filtered.map((item, index) => {
              const header = item.group !== lastGroup ? item.group : null;
              lastGroup = item.group;
              const isActive = index === active;
              const isCopied = item.id === "copy-email" && copied;
              return (
                <li key={item.id} role="presentation">
                  {header ? (
                    <p className="px-3 pt-3 pb-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-fg-subtle">
                      {header}
                    </p>
                  ) : null}
                  <div
                    id={`${listId}-${item.id}`}
                    role="option"
                    aria-selected={isActive}
                    onMouseMove={() => setActive(index)}
                    onClick={() => void execute(item)}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                      isActive ? "bg-ink-700 text-fg" : "text-fg-muted"
                    )}
                  >
                    <span className={cn("grid size-7 place-items-center rounded-md border border-line bg-ink-900", isActive && "border-accent-dim text-accent")}>
                      {isCopied ? <Check className="size-4 text-accent" aria-hidden /> : item.icon}
                    </span>
                    <span className="flex-1">{isCopied ? "Copied to clipboard" : item.label}</span>
                    {item.hint ? (
                      <span className="hidden max-w-[45%] truncate font-mono text-[11px] text-fg-subtle sm:block">
                        {item.hint}
                      </span>
                    ) : null}
                    {isActive ? (
                      item.group === "Connect" ? (
                        <ArrowUpRight className="size-4 text-accent" aria-hidden />
                      ) : (
                        <CornerDownLeft className="size-4 text-accent" aria-hidden />
                      )
                    ) : null}
                  </div>
                </li>
              );
            })
          )}
        </ul>

        <div className="flex items-center justify-between border-t border-line px-4 py-2.5 font-mono text-[10.5px] text-fg-subtle">
          <span>
            <span className="text-accent">henok</span>@portfolio:~$
          </span>
          <span className="flex items-center gap-2">
            <span className="kbd">↑</span>
            <span className="kbd">↓</span> navigate
            <span className="kbd">↵</span> run
          </span>
        </div>
      </div>
    </div>
  );
};
