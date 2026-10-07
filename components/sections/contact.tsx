"use client";

import { ArrowRight, Check, LoaderCircle } from "lucide-react";
import { useState } from "react";

import { Reveal } from "@/components/ui/reveal";
import { SocialIcon } from "@/components/ui/social-icon";
import { profile, socials } from "@/content/profile";

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent" }
  | { state: "error"; message: string };

const FIELD_CLASS =
  "w-full rounded-lg border border-line bg-ink-950/60 px-3.5 py-3 text-[15px] text-fg " +
  "placeholder:text-fg-subtle transition-colors hover:border-line-strong " +
  "focus:border-accent-dim focus:outline-none focus-visible:outline-none";

export const Contact = () => {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status.state === "sending") return;

    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus({ state: "sending" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };

      if (!res.ok) {
        setStatus({
          state: "error",
          message: body.error ?? "Something went wrong. Please try again.",
        });
        return;
      }

      setStatus({ state: "sent" });
    } catch {
      setStatus({
        state: "error",
        message: `Network error. You can reach me directly at ${profile.email}.`,
      });
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative scroll-mt-24 overflow-hidden py-20 sm:py-28"
    >
      <div aria-hidden className="grid-backdrop pointer-events-none absolute inset-0 -z-10 rotate-180" />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <div className="flex items-center gap-3">
              <p className="eyebrow">
                <span className="text-fg-subtle">07 /</span> Contact
              </p>
              <span aria-hidden className="h-px w-16 bg-linear-to-r from-accent/60 to-transparent" />
            </div>
            <p className="mt-5 font-mono text-[13px] text-fg-subtle">
              <span className="text-accent">❯</span> ./contact.sh --secure
            </p>
            <h2
              id="contact-heading"
              className="mt-2 font-display text-h2 font-bold text-fg"
            >
              Let&apos;s build something <span className="text-gradient">hard to break.</span>
            </h2>
            <p className="mt-5 max-w-md text-lead text-fg-muted">
              Security engineering roles, detection platforms, DevSecOps, or backend
              systems that need to hold up under load. I&apos;d be glad to hear about any of them.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-2 font-mono text-[15px] font-medium text-accent"
            >
              {profile.email}
              <ArrowRight
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-0.5"
              />
            </a>

            <div className="mt-8 flex items-center gap-2">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  aria-label={social.name}
                  className="rounded-xl border border-line-strong bg-ink-850 p-3 text-fg-subtle transition-colors hover:border-accent-dim hover:text-accent"
                >
                  <SocialIcon icon={social.icon} className="size-[18px]" />
                </a>
              ))}
            </div>

            <p className="mt-8 font-mono text-[11.5px] text-fg-subtle">
              <span className="text-accent">#</span> usually replies within a day · EAT (UTC+3)
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            {status.state === "sent" ? (
              <div className="terminal flex min-h-70 flex-col items-center justify-center p-10 text-center">
                <span className="grid size-11 place-items-center rounded-full border border-accent-dim bg-accent/10">
                  <Check className="size-5 text-accent" aria-hidden />
                </span>
                <p className="mt-5 text-h3 font-semibold text-fg">
                  Message sent
                </p>
                <p className="mt-2 max-w-sm text-fg-muted">
                  Thanks for reaching out — I&apos;ll get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="terminal relative overflow-hidden"
              >
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-danger/70" />
                  <span className="size-2.5 rounded-full bg-warn/70" />
                  <span className="size-2.5 rounded-full bg-accent/70" />
                  <span className="ml-2 font-mono text-[11px] text-fg-subtle">
                    new-message — encrypted in transit (TLS)
                  </span>
                </div>
                <div className="space-y-5 p-6 sm:p-8">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block font-mono text-[12px] text-fg-muted"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Your name"
                      className={FIELD_CLASS}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block font-mono text-[12px] text-fg-muted"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="you@company.com"
                      className={FIELD_CLASS}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block font-mono text-[12px] text-fg-muted"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="What are you working on?"
                    className={`${FIELD_CLASS} resize-y`}
                  />
                </div>

                {/* Honeypot — hidden from people, tempting to bots */}
                <div aria-hidden className="absolute left-[-9999px]">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div
                  aria-live="polite"
                  className="min-h-5 text-sm text-red-400"
                >
                  {status.state === "error" ? status.message : null}
                </div>

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {status.state === "sending" ? (
                    <>
                      <LoaderCircle
                        aria-hidden
                        className="size-4 animate-spin"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight aria-hidden className="size-4" />
                    </>
                  )}
                </button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
