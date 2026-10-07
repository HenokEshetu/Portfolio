import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";
import { formatPostDate, posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing on threat intelligence, network security, cryptography, and building secure backend systems.",
};

export default function BlogIndexPage() {
  return (
    <div className="pt-32 pb-24 sm:pt-40">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Writing</p>
          <h1 className="mt-3 font-display text-h2 font-bold text-fg">Blog</h1>
          <p className="mt-5 max-w-2xl text-lead text-fg-muted">
            Notes on threat intelligence, network security, cryptography, and
            the practice of building systems that hold up.
          </p>
        </Reveal>

        <ul className="mt-16 border-t border-line">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={Math.min(i, 4)}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block border-b border-line py-8 transition-colors"
              >
                <div className="grid gap-4 sm:grid-cols-12 sm:gap-8">
                  <div className="sm:col-span-3">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-wide text-fg-subtle">
                      <time dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                      <span aria-hidden>·</span>
                      <span>{post.readingMinutes} min</span>
                    </p>
                    <p className="mt-2 inline-block rounded-md border border-line bg-ink-850 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-accent">
                      {post.topic}
                    </p>
                  </div>

                  <div className="sm:col-span-9">
                    <h2 className="font-display text-h3 font-semibold text-fg transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-3 max-w-[62ch] text-[15px] leading-relaxed text-fg-muted">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  );
}
