import type { Metadata } from "next";

import { profile } from "@/content/profile";

export const siteUrl = "https://henokeshetuportfolio.vercel.app";

const description =
  "Henok Eshetu is a security engineer and full-stack developer building SIEM, threat-intelligence, and detection platforms in Rust, Go, and TypeScript.";

export const siteConfig: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} — ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    "Henok Eshetu",
    "security engineer",
    "SIEM engineering",
    "threat intelligence",
    "detection engineering",
    "penetration testing",
    "Rust backend",
    "Go",
    "network security",
    "full-stack developer",
    "Ethiopia",
  ],
  authors: [{ name: profile.name, url: "https://github.com/HenokEshetu" }],
  creator: profile.name,
  openGraph: {
    type: "profile",
    locale: "en_US",
    url: siteUrl,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.role}`,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};
