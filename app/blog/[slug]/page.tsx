import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { formatPostDate, getPost, posts } from "@/content/posts";
import { profile } from "@/content/profile";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not found" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: [profile.name],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === slug);
  const next = posts[index + 1] ?? posts[0];

  return (
    <article className="pt-32 pb-24 sm:pt-40">
      <div className="container-page">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft
            aria-hidden
            className="size-4 transition-transform group-hover:-translate-x-0.5"
          />
          All posts
        </Link>

        <header className="mt-10 max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">
            <span className="text-accent">{post.topic}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.date}>{formatPostDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readingMinutes} min read</span>
          </p>

          <h1 className="mt-5 font-display text-h2 font-bold text-fg">{post.title}</h1>
          <p className="mt-6 text-lead text-fg-muted">{post.description}</p>
        </header>

        <div className="my-12 rule-fade" />

        {/* No nested scroll container — the page scrolls, the article doesn't. */}
        <div className="space-y-6">
          {post.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="max-w-[68ch] text-[17px] leading-[1.75] text-fg-muted"
            >
              {paragraph}
            </p>
          ))}
        </div>

        {next && next.slug !== post.slug ? (
          <nav aria-label="Next post" className="mt-20 border-t border-line pt-10">
            <Link
              href={`/blog/${next.slug}`}
              className="card-surface spotlight glow-border group flex items-center justify-between gap-6 p-6"
            >
              <span>
                <span className="eyebrow text-fg-subtle">Next post · {next.topic}</span>
                <span className="mt-2 block max-w-2xl font-display text-h3 font-semibold text-fg transition-colors group-hover:text-accent-bright">
                  {next.title}
                </span>
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
