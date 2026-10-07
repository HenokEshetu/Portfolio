import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Gallery } from "@/components/work/gallery";
import { ProjectCover } from "@/components/work/project-cover";
import { Toc } from "@/components/work/toc";
import { getProject, projects } from "@/content/projects";
import { slugify } from "@/lib/utils";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  const cover = project.gallery?.[0];
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      ...(cover ? { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt }] } : {}),
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const total = projects.length;
  const next = projects[(index + 1) % total];
  const prev = projects[(index - 1 + total) % total];

  const sections = project.caseStudy.map((section) => ({ ...section, id: slugify(section.heading) }));
  const hasGallery = Boolean(project.gallery && project.gallery.length > 0);
  const toc = [
    ...sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(hasGallery ? [{ id: "screens", label: "Screens" }] : []),
  ];

  return (
    <article className="relative pt-28 pb-24 sm:pt-36">
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px]" />

      <div className="container-page">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-between gap-4">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 font-mono text-[12.5px] text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft aria-hidden className="size-4 transition-transform group-hover:-translate-x-0.5" />
            <span>
              <span className="text-accent">~</span>/work/<span className="text-fg">{project.slug}</span>
            </span>
          </Link>
          <p className="font-mono text-[11.5px] text-fg-subtle">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </nav>

        {/* Header */}
        <header className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="eyebrow">
              {project.year} · {project.role}
            </p>
            <h1 className="mt-4 font-display text-display font-bold text-fg">{project.title}</h1>
            <p className="mt-6 max-w-2xl text-lead text-fg-muted">{project.summary}</p>
          </div>

          {project.links && project.links.length > 0 ? (
            <div className="flex flex-wrap gap-2 lg:col-span-4 lg:justify-end">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="btn-ghost group px-3.5 py-2"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ))}
            </div>
          ) : null}
        </header>

        <ul className="mt-8 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <li key={tech} className="chip">
              {tech}
            </li>
          ))}
        </ul>

        {/* Cover */}
        <div className="relative mt-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-[8%] -bottom-10 h-40 rounded-full bg-accent/20 blur-3xl"
          />
          <ProjectCover project={project} priority sizes="(min-width: 1280px) 1150px, 100vw" className="relative" />
          {!hasGallery && project.visual ? (
            <p className="relative mt-4 font-mono text-[11.5px] text-fg-subtle">
              <span className="text-accent">#</span>{" "}
              {project.visual === "chess"
                ? "Illustration of the app. The repository is private; a live demo is available on request."
                : "The repository layout, drawn from the real file tree."}
            </p>
          ) : null}
        </div>

        {/* Facts */}
        {project.facts && project.facts.length > 0 ? (
          <dl className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-ink-900 p-5 sm:p-6">
                <dt className="font-mono text-[10.5px] tracking-widest text-fg-subtle uppercase">{fact.label}</dt>
                <dd className="mt-2 text-[15px] font-medium text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}

        {/* Body */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc items={toc} />
            </div>
          </aside>

          <div className="space-y-16 lg:col-span-9">
            {sections.map((section, i) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <p className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-h3 font-bold text-fg sm:text-[1.7rem]">{section.heading}</h2>
                <div className="mt-5 space-y-5">
                  {section.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 32)} className="max-w-[70ch] text-[17px] leading-[1.75] text-fg-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            {hasGallery && project.gallery ? (
              <section id="screens" className="scroll-mt-28">
                <p className="font-mono text-[12px] text-accent">{String(sections.length + 1).padStart(2, "0")}</p>
                <h2 className="mt-2 font-display text-h3 font-bold text-fg sm:text-[1.7rem]">Screens</h2>
                <p className="mt-3 max-w-[60ch] text-fg-muted">
                  Select any screen to view it full size. Use ← and → to move between them.
                </p>
                <div className="mt-8">
                  <Gallery shots={project.gallery} note={project.galleryNote} />
                </div>
              </section>
            ) : null}
          </div>
        </div>

        {/* Prev / next */}
        <nav aria-label="More projects" className="mt-24 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
          {prev && prev.slug !== project.slug ? (
            <Link
              href={`/work/${prev.slug}`}
              className="card-surface spotlight glow-border group flex items-center gap-4 p-5"
            >
              <ArrowLeft className="size-5 shrink-0 text-fg-subtle transition-all group-hover:-translate-x-0.5 group-hover:text-accent" aria-hidden />
              <span>
                <span className="eyebrow text-fg-subtle">Previous</span>
                <span className="mt-1 block font-display text-lg font-semibold text-fg group-hover:text-accent-bright">
                  {prev.title}
                </span>
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && next.slug !== project.slug ? (
            <Link
              href={`/work/${next.slug}`}
              className="card-surface spotlight glow-border group flex items-center justify-end gap-4 p-5 text-right"
            >
              <span>
                <span className="eyebrow text-fg-subtle">Next project</span>
                <span className="mt-1 block font-display text-lg font-semibold text-fg group-hover:text-accent-bright">
                  {next.title}
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-fg-subtle transition-all group-hover:translate-x-0.5 group-hover:text-accent" aria-hidden />
            </Link>
          ) : null}
        </nav>
      </div>
    </article>
  );
}
