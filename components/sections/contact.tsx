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
  "w-full rounded-lg border border-line bg-ink-900 px-3.5 py-3 text-[15px] text-fg " +
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
      className="scroll-mt-24 border-t border-line py-16 sm:py-24"
    >
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2
              id="contact-heading"
              className="mt-3 text-h2 font-semibold text-fg"
            >
              Let&apos;s talk
            </h2>
            <p className="mt-5 max-w-md text-lead text-fg-muted">
              Security engineering, detection platforms, or backend systems that
              need to hold up under load — I&apos;d be glad to hear about it.
            </p>

            <a
              href={`mailto:${profile.email}`}
              className="group mt-8 inline-flex items-center gap-2 text-[15px] font-medium text-accent"
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
                  className="rounded-lg border border-line bg-ink-850 p-2.5 text-fg-subtle transition-colors hover:border-line-strong hover:text-fg"
                >
                  <SocialIcon icon={social.icon} className="size-[18px]" />
                </a>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={1}>
            {status.state === "sent" ? (
              <div className="card-surface flex min-h-70 flex-col items-center justify-center p-10 text-center">
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
                className="card-surface space-y-5 p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-fg"
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
                      className="mb-2 block text-sm font-medium text-fg"
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
                    className="mb-2 block text-sm font-medium text-fg"
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
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-semibold text-ink-950 transition-[background-color,transform] hover:bg-accent-bright active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
};
