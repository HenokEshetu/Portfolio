import Link from "next/link";

import { LiveClock } from "@/components/ui/live-clock";
import { SocialIcon } from "@/components/ui/social-icon";
import { navLinks, profile, socials } from "@/content/profile";

export const Footer = () => (
  <footer className="relative border-t border-line">
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent"
    />
    <div className="container-page grid gap-10 py-14 md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="font-display text-2xl font-semibold text-fg">{profile.name}</p>
        <p className="mt-2 max-w-sm text-sm text-fg-subtle">{profile.title}</p>
        <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-line-strong bg-ink-900 px-3 py-1.5 font-mono text-[11px] text-fg-muted">
          <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
          all systems operational
          <span className="text-line-strong">|</span>
          EAT <LiveClock className="tabular-nums" />
        </p>
      </div>

      <nav aria-label="Footer" className="md:col-span-4">
        <p className="eyebrow text-fg-subtle">Navigate</p>
        <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
          {navLinks.map((link) => (
            <li key={link.title}>
              <Link href={link.href} className="text-sm text-fg-muted transition-colors hover:text-accent">
                {link.title}
              </Link>
            </li>
          ))}
          {profile.resumeUrl ? (
            <li>
              <a href={profile.resumeUrl} target="_blank" rel="noopener" className="text-sm text-fg-muted transition-colors hover:text-accent">
                Résumé (PDF)
              </a>
            </li>
          ) : null}
        </ul>
      </nav>

      <div className="md:col-span-3">
        <p className="eyebrow text-fg-subtle">Connect</p>
        <div className="mt-4 flex items-center gap-1.5">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target={social.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer noopener"
              aria-label={social.name}
              className="rounded-lg border border-line bg-ink-900 p-2.5 text-fg-subtle transition-colors hover:border-accent-dim hover:text-accent"
            >
              <SocialIcon icon={social.icon} className="size-[18px]" />
            </a>
          ))}
        </div>
        <a
          href={`mailto:${profile.email}`}
          className="mt-4 block font-mono text-[12px] text-fg-muted transition-colors hover:text-accent"
        >
          {profile.email}
        </a>
      </div>
    </div>

    <div className="container-page flex flex-col gap-2 border-t border-line py-6 font-mono text-[11px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind CSS, deployed on Vercel.
      </p>
      <p>
        <a
          href="https://github.com/HenokEshetu/Portfolio"
          target="_blank"
          rel="noreferrer noopener"
          className="transition-colors hover:text-accent"
        >
          <span className="text-accent">❯</span> view source
        </a>
      </p>
    </div>
  </footer>
);
