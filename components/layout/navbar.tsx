"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { SocialIcon } from "@/components/ui/social-icon";
import { navLinks, profile, socials } from "@/content/profile";
import { cn } from "@/lib/utils";

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Solid background only once the page has moved, so the hero stays clean.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-line bg-ink-950/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main"
        className="container-page flex h-16 items-center justify-between gap-6"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md text-sm font-medium"
        >
          <span
            aria-hidden
            className="grid size-8 place-items-center rounded-md border border-line-strong bg-ink-850 font-mono text-[11px] tracking-widest text-accent transition-colors group-hover:border-accent-dim"
          >
            {profile.initials}
          </span>
          <span className="text-fg">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link
                href={link.href}
                className="rounded-md px-3 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-1 md:flex">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={social.name}
              className="rounded-md p-2 text-fg-subtle transition-colors hover:text-fg"
            >
              <SocialIcon icon={social.icon} className="size-[18px]" />
            </a>
          ))}
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              className="ml-2 rounded-md border border-line-strong bg-ink-850 px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent-dim hover:text-accent"
            >
              Résumé
            </a>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="rounded-md p-2 text-fg md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-ink-950 md:hidden"
        >
          <ul className="container-page flex flex-col py-2">
            {navLinks.map((link) => (
              <li key={link.title}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-line/60 py-3.5 text-[15px] text-fg-muted transition-colors hover:text-fg"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          <div className="container-page flex items-center justify-between gap-4 py-5">
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
                className="rounded-md border border-line-strong bg-ink-850 px-4 py-2 text-sm font-medium text-fg"
              >
                Résumé
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
};
