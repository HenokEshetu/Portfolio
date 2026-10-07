import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { BackToTop } from "@/components/ui/back-to-top";
import { CommandPalette } from "@/components/ui/command-palette";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { SpotlightTracker } from "@/components/ui/spotlight-tracker";
import { siteConfig, siteUrl } from "@/config";
import { profile, socials } from "@/content/profile";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = siteConfig;

export const viewport: Viewport = {
  themeColor: "#05070a",
  colorScheme: "dark",
};

/** Person schema so search engines resolve the name to a real identity. */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.title,
  worksFor: { "@type": "Organization", name: profile.company },
  email: `mailto:${profile.email}`,
  url: siteUrl,
  image: `${siteUrl}${profile.portrait}`,
  alumniOf: { "@type": "CollegeOrUniversity", name: "Bahir Dar University" },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Addis Ababa",
    addressCountry: "ET",
  },
  sameAs: [
    ...socials.filter((s) => s.href.startsWith("http")).map((s) => s.href),
    "https://github.com/RustyHenok",
  ],
  knowsAbout: [
    "SIEM engineering",
    "XDR",
    "UEBA",
    "Threat intelligence",
    "DevSecOps",
    "Kubernetes",
    "Rust",
    "Go",
    "Python",
    "Agentic AI",
  ],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${grotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-dvh overflow-x-clip antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-ink-950"
        >
          Skip to content
        </a>

        {/* Page-wide atmosphere: two slow aurora glows + a fine noise grain */}
        <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
          <div className="aurora absolute -top-[30%] left-[-10%] h-[70vh] w-[60vw] rounded-full bg-accent/[0.07] blur-[120px]" />
          <div className="aurora absolute top-[35%] right-[-15%] h-[60vh] w-[50vw] rounded-full bg-signal/[0.06] blur-[120px] [animation-delay:-9s]" />
          <div
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
            }}
          />
        </div>

        <ReadingProgress />
        <Navbar />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />

        <BackToTop />
        <CommandPalette />
        <SpotlightTracker />

        <script
          type="application/ld+json"
          // Static, author-controlled object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
