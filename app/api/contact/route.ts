import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

import { profile } from "@/content/profile";

export const runtime = "nodejs";

const ContactSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.email("Enter a valid email address").max(200),
  message: z.string().trim().min(20, "Tell me a bit more").max(5000),
  // Honeypot: real people leave this empty, naive bots fill it in.
  company: z.string().max(0).optional(),
});

/**
 * Best-effort per-instance rate limit. Serverless means each instance keeps its
 * own counter, so this throttles casual abuse rather than a determined attacker
 * — enough for a contact form, and it costs no extra infrastructure.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(key, recent);
    return true;
  }

  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return false;
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check your details." },
      { status: 400 }
    );
  }

  const { name, email, message, company } = parsed.data;

  // Honeypot tripped — accept silently so the bot learns nothing.
  if (company) return NextResponse.json({ ok: true });

  if (isRateLimited(clientKey(req))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>";
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  // Never pretend a message was delivered when it was not.
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot deliver.");
    return NextResponse.json(
      {
        error: `Email delivery isn't configured yet. Please reach me directly at ${profile.email}.`,
      },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Portfolio enquiry — ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:ui-sans-serif,system-ui,sans-serif;line-height:1.6">
          <h2 style="margin:0 0 4px">New portfolio enquiry</h2>
          <p style="margin:0 0 16px;color:#555">
            From <strong>${escapeHtml(name)}</strong>
            &lt;<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>&gt;
          </p>
          <div style="white-space:pre-wrap;border-left:3px solid #4fd6c4;padding-left:14px">
            ${escapeHtml(message)}
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend rejected the message:", error);
      return NextResponse.json(
        { error: "Couldn't send that right now. Please try again shortly." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form failed:", err);
    return NextResponse.json(
      { error: "Couldn't send that right now. Please try again shortly." },
      { status: 502 }
    );
  }
}
