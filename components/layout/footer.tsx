import Link from "next/link";

import { SocialIcon } from "@/components/ui/social-icon";
import { navLinks, profile, socials } from "@/content/profile";

export const Footer = () => (
  <footer className="border-t border-line">
    <div className="container-page flex flex-col gap-8 py-12 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-medium text-fg">{profile.name}</p>
        <p className="mt-1.5 text-sm text-fg-subtle">
          {profile.role} · {profile.location}
        </p>
      </div>

      <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
        {navLinks.map((link) => (
          <Link
            key={link.title}
            href={link.href}
            className="text-sm text-fg-muted transition-colors hover:text-fg"
          >
            {link.title}
          </Link>
        ))}
      </nav>

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
            <SocialIcon icon={social.icon} className="size-[18px]" />
          </a>
        ))}
      </div>
    </div>

    <div className="container-page border-t border-line py-6">
      <p className="text-xs text-fg-subtle">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js and
        Tailwind CSS —{" "}
        <a
          href="https://github.com/HenokEshetu/Portfolio"
          target="_blank"
          rel="noreferrer noopener"
          className="underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg-muted"
        >
          source
        </a>
        .
      </p>
    </div>
  </footer>
);
