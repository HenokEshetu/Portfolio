"use client";

import { NAV_LINKS, SOCIALS } from "@/constants";
import Link from "next/link";
import { useState } from "react";

async function sendMail(form: {
  name: string;
  email: string;
  message: string;
}) {
  // Replace with your email API endpoint or service (e.g., Resend, EmailJS, Formspree, custom API route)
  // Example using fetch to a Next.js API route at /api/contact
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  if (!res.ok) throw new Error("Failed to send message");
}

export const ContactForm = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      await sendMail(form);
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col items-center justify-center py-20"
    >
      <h1 className="text-[40px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 mb-10">
        Contact Me
      </h1>
      <form
        className="w-full max-w-2xl bg-[#181c24] rounded-2xl shadow-2xl border border-[#2d3750] p-8 flex flex-col gap-6"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <label className="flex flex-col text-[#e6e6ea]">
          Name
          <input
            className="mt-2 p-3 rounded-lg bg-[#23283a] border border-[#2d3750] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-[#e6e6ea]"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label className="flex flex-col text-[#e6e6ea]">
          Email
          <input
            className="mt-2 p-3 rounded-lg bg-[#23283a] border border-[#2d3750] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-[#e6e6ea]"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        <label className="flex flex-col text-[#e6e6ea]">
          Message
          <textarea
            className="mt-2 p-3 rounded-lg bg-[#23283a] border border-[#2d3750] focus:outline-none focus:ring-2 focus:ring-cyan-500 text-[#e6e6ea] min-h-[120px] resize-none scrollbar-hide"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </label>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        {submitted ? (
          <p className="text-green-400 text-center">
            Thank you for reaching out! I&apos;ll get back to you soon.
          </p>
        ) : (
          <button
            type="submit"
            className="mt-4 py-3 px-8 rounded-lg bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        )}
      </form>
      <div className="mt-10 flex flex-row items-center gap-2 text-[#e6e6ea] text-lg">
        {SOCIALS.map(({ link, name, icon: Icon }) => (
          <Link
            href={link}
            target="_blank"
            rel="noreferrer noopener"
            key={name}
          >
            <Icon className="h-8 w-8 text-white" />
          </Link>
        ))}
        <p>Phone Numbers:</p>
        <p>+2519 23 46 92 11</p>
        <p>+2517 10 20 92 11</p>
      </div>
    </section>
  );
};
