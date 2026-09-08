import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[70vh] flex-col items-start justify-center py-32">
      <p className="eyebrow">404</p>
      <h1 className="mt-4 text-h2 font-semibold text-fg">
        This page doesn&apos;t exist
      </h1>
      <p className="mt-5 max-w-md text-lead text-fg-muted">
        The link may be out of date, or the page may have moved.
      </p>
      <Link
        href="/"
        className="group mt-9 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-colors hover:bg-accent-bright"
      >
        <ArrowLeft
          aria-hidden
          className="size-4 transition-transform group-hover:-translate-x-0.5"
        />
        Back home
      </Link>
    </div>
  );
}
