import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getProject, projects } from "@/content/projects";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not found" };

  return {
    title: project.title,
    description: project.summary,
    openGraph: { title: project.title, description: project.summary },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <div className="container-page">
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        <header className="mt-10">
          <p className="eyebrow">
            {project.year} · {project.role}
          </p>
          <h1 className="mt-4 max-w-3xl text-h2 font-semibold text-fg">
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lead text-fg-muted">
            {project.summary}
          </p>

          <ul className="mt-8 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-line bg-ink-850 px-2.5 py-1 font-mono text-[11px] text-fg-subtle"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.links && project.links.length > 0 ? (
            <div className="mt-8 flex flex-wrap gap-3">
              {project.links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group inline-flex items-center gap-1.5 rounded-lg border border-line-strong px-4 py-2.5 text-sm font-medium text-fg transition-colors hover:border-accent-dim hover:text-accent"
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

        {project.facts && project.facts.length > 0 ? (
          <dl className="mt-14 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {project.facts.map((fact) => (
              <div key={fact.label} className="bg-ink-900 p-5">
                <dt className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
                  {fact.label}
                </dt>
                <dd className="mt-2 text-[15px] font-medium text-fg">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="mt-16 space-y-14">
          {project.caseStudy.map((section) => (
            <section key={section.heading}>
              <h2 className="text-h3 font-semibold text-fg">
                {section.heading}
              </h2>
              <div className="mt-5 space-y-5">
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="max-w-[68ch] text-[17px] leading-[1.7] text-fg-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {next && next.slug !== project.slug ? (
          <nav className="mt-20 border-t border-line pt-10">
            <p className="eyebrow text-fg-subtle">Next project</p>
            <Link
              href={`/work/${next.slug}`}
              className="group mt-4 flex items-center justify-between gap-6"
            >
              <span className="text-h3 font-semibold text-fg transition-colors group-hover:text-accent">
                {next.title}
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-5 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              />
            </Link>
          </nav>
        ) : null}
      </div>
    </article>
  );
}
