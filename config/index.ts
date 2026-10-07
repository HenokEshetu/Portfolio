import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const siteUrl = "https://henokeshetuportfolio.vercel.app";

const description =
  "Henok Eshetu is a Secure Systems Developer and SIEM Development Team Leader building a multi-tenant SIEM/XDR platform (UEBA, threat intelligence, agentic AI for the SOC) in Rust, Go and Python, and shipping it with DevSecOps on Kubernetes.";

export const siteConfig: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Henok Eshetu",
    "secure systems developer",
    "SIEM development team lead",
    "SIEM/XDR",
    "UEBA",
    "threat intelligence",
    "DevSecOps",
    "Kubernetes",
    "agentic AI SOC",
    "Rust Axum",
    "Go gRPC",
    "Python FastAPI",
    "cybersecurity",
    "Ethiopia",
  ],
  authors: [{ name: profile.name, url: "https://github.com/HenokEshetu" }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
