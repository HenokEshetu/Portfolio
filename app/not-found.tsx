import { ArrowLeft, Command } from "lucide-react";
import Link from "next/link";

import { navLinks } from "@/content/profile";

export default function NotFound() {
  return (
    <div className="relative">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 -z-10" />
      <div className="container-page flex min-h-[80vh] flex-col items-start justify-center py-32">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-display font-bold text-fg">
          Route <span className="text-gradient">not found.</span>
        </h1>

        <div className="terminal mt-10 w-full max-w-xl overflow-hidden font-mono text-[13px]">
          <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
            <span className="size-2.5 rounded-full bg-danger/70" />
            <span className="size-2.5 rounded-full bg-warn/70" />
            <span className="size-2.5 rounded-full bg-accent/70" />
            <span className="ml-2 text-[11px] text-fg-subtle">zsh — henok@portfolio</span>
          </div>
          <div className="space-y-1 px-4 py-4 leading-relaxed">
            <p className="text-fg">
              <span className="text-accent">❯</span> cd ./this-page
            </p>
            <p className="text-danger">cd: no such file or directory</p>
            <p className="text-fg-subtle">The link may be out of date, or the page may have moved. Try one of these:</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
              {navLinks.map((link) => (
                <li key={link.title}>
                  <Link href={link.href} className="text-signal underline-offset-4 hover:underline">
                    {link.title.toLowerCase()}/
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link href="/" className="btn-primary group">
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            Back home
          </Link>
          <p className="inline-flex items-center gap-2 font-mono text-[12px] text-fg-subtle">
            or press <span className="kbd"><Command className="size-3" aria-hidden />K</span> to search
          </p>
        </div>
      </div>
    </div>
  );
}
