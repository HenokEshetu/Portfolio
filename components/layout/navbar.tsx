"use client";

import { Command, FileDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { OPEN_PALETTE_EVENT } from "@/components/ui/command-palette";
import { SocialIcon } from "@/components/ui/social-icon";
import { navLinks, profile, socials } from "@/content/profile";
import { cn } from "@/lib/utils";

const openPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex h-14 max-w-[76rem] items-center justify-between gap-4 rounded-2xl border px-3 transition-[background-color,border-color,box-shadow] duration-300 sm:px-4",
          scrolled || open
            ? "border-line-strong/80 bg-ink-900/75 shadow-[0_20px_60px_-30px_#000] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        )}
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md font-mono text-[13px]"
          aria-label={`${profile.name} — home`}
        >
          <span
            aria-hidden
            className="relative grid size-8 place-items-center overflow-hidden rounded-lg border border-line-strong bg-ink-850 text-[11px] font-semibold tracking-widest text-accent transition-colors group-hover:border-accent-dim"
          >
            {profile.initials}
            <span className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-accent to-transparent opacity-70" />
          </span>
          <span className="hidden text-fg-muted sm:inline">
            <span className="text-accent">~</span>/{profile.handle}
            <span className="ml-0.5 inline-block h-3.5 w-[7px] translate-y-[2px] animate-blink bg-accent/80" />
          </span>
        </Link>

        <ul className="hidden items-center gap-0.5 lg:flex">
          {navLinks.map((link, i) => (
            <li key={link.title}>
              <Link
                href={link.href}
                className="group rounded-lg px-3 py-2 text-[13.5px] text-fg-muted transition-colors hover:bg-ink-800/70 hover:text-fg"
              >
                <span className="mr-1 font-mono text-[10px] text-fg-subtle transition-colors group-hover:text-accent">
                  0{i + 1}
                </span>
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={openPalette}
            className="hidden items-center gap-2 rounded-lg border border-line-strong bg-ink-850/80 px-2.5 py-1.5 font-mono text-[11.5px] text-fg-subtle transition-colors hover:border-accent-dim hover:text-fg sm:inline-flex"
            aria-label="Open command palette"
          >
            <Command className="size-3.5" aria-hidden />
            <span>K</span>
          </button>

          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener"
              className="hidden items-center gap-1.5 rounded-lg bg-fg px-3 py-1.5 text-[13px] font-semibold text-ink-950 transition-colors hover:bg-accent-bright md:inline-flex"
            >
              <FileDown className="size-3.5" aria-hidden />
              Résumé
            </a>
          ) : null}

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg p-2 text-fg lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="terminal mx-auto mt-2 max-w-[76rem] overflow-hidden lg:hidden"
        >
          <ul className="flex flex-col px-2 py-2">
            {navLinks.map((link, i) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-[15px] text-fg-muted transition-colors hover:bg-ink-800 hover:text-fg"
                >
                  <span className="font-mono text-[11px] text-accent">0{i + 1}</span>
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between gap-4 border-t border-line px-4 py-4">
            <div className="flex items-center gap-1">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.name}
                  className="rounded-md p-2 text-fg-subtle transition-colors hover:text-fg"
                >
                  <SocialIcon icon={social.icon} className="size-5" />
                </a>
              ))}
            </div>
            {profile.resumeUrl ? (
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3.5 py-2 text-sm font-semibold text-ink-950"
              >
                <FileDown className="size-4" aria-hidden />
                Résumé
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
};
