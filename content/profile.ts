/**
 * Single source of truth for everything about Henok.
 * Edit this file to update the site — no component changes needed.
 */

export const profile = {
  name: "Henok Eshetu",
  initials: "HE",
  role: "Security Engineer & Full-Stack Developer",
  // Shown in the hero, under the headline. Two sentences max.
  tagline:
    "I build threat-intelligence and detection platforms — and the secure, high-throughput systems underneath them.",
  location: "Addis Ababa, Ethiopia",
  availability: "Open to collaboration",
  email: "henok.eshetu.2025@proton.me",
  /**
   * Drop the PDF at public/henok-eshetu-cv.pdf and set this to
   * "/henok-eshetu-cv.pdf". While it is null the Resume buttons are hidden,
   * so the site never ships a dead link.
   */
  resumeUrl: null as string | null,
} as const;

/** The short "about" narrative. Each string renders as its own paragraph. */
export const about: readonly string[] = [
  "I work on the SIEM backend at Beta Tech Hub, where I design and build the services that turn raw telemetry into decisions a security team can act on — ingest pipelines, detection and correlation logic, case management, and the APIs that tie them together.",
  "Most of my day is spent in Rust and Go on systems where correctness is not negotiable: multi-tenant isolation, fail-closed authorization, durable event delivery, and the kind of throughput where a wrong data structure shows up as a production incident. I care about getting the types and the failure modes right the first time rather than iterating toward something that merely compiles.",
  "Before the platform work, my background was network security engineering and penetration testing — designing LAN/WAN and data-centre topologies, and breaking systems to understand how they actually fail. That perspective is why I build defensively by default.",
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  /** Set on the current role — renders a live indicator. */
  current?: boolean;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
};

export const experience: readonly ExperienceEntry[] = [
  {
    company: "Beta Tech Hub",
    role: "Backend Engineer — SIEM Team",
    period: "Present",
    current: true,
    summary:
      "Own the backend of a commercial SIEM platform spanning ingest, detection, user-behaviour analytics, and case management.",
    highlights: [
      "Built multi-tenant case management and ticketing in Rust with deny-by-default tenant isolation and role-scoped access.",
      "Hardened the event pipeline for durability: manual Kafka offset commits, reconnect backoff, and a durable dead-letter queue so alerts survive consumer failure.",
      "Designed the UEBA service's authentication path to fail closed — OIDC/JWT verification, origin allowlisting, rate limiting, and request-size caps.",
      "Moved CI from advisory to blocking: unit tests, clippy, cargo-audit, secret scanning, and container scanning gate every publish.",
    ],
    stack: ["Rust", "Go", "Kafka", "OpenSearch", "PostgreSQL", "Redis", "Kubernetes"],
  },
  {
    company: "Independent",
    role: "Network Security Engineer & Penetration Tester",
    period: "Earlier",
    summary:
      "Network and data-centre design work alongside offensive security engagements and tooling.",
    highlights: [
      "Designed LAN/WAN topologies with MPLS and IPsec VPNs, VRRP redundancy, and load balancing.",
      "Ran web and network penetration tests, and wrote the automation that made the repetitive parts repeatable.",
      "Built cross-platform system-engineering tooling in Python, Bash, Rust, Go, and PowerShell.",
    ],
    stack: ["Cisco", "MPLS", "IPsec", "Python", "Bash", "PowerShell"],
  },
] as const;

export type Credential = {
  title: string;
  issuer: string;
  year?: string;
  kind: "certification" | "education";
  note?: string;
};

export const credentials: readonly Credential[] = [
  {
    title: "BSc, Computer Science",
    issuer: "—",
    kind: "education",
    note: "Replace with your degree, institution, and graduation year.",
  },
  {
    title: "Add your certifications",
    issuer: "—",
    kind: "certification",
    note: "e.g. CEH, OSCP, CCNA, Security+ — with issuer and year.",
  },
] as const;

export type SkillGroup = {
  category: string;
  /** One line explaining what this cluster is actually for. */
  blurb: string;
  skills: readonly string[];
};

export const skillGroups: readonly SkillGroup[] = [
  {
    category: "Detection & Threat Intelligence",
    blurb: "Turning telemetry and feeds into alerts a analyst can act on.",
    skills: [
      "SIEM engineering",
      "UEBA",
      "Correlation rules",
      "IOC enrichment",
      "Dark-web feed ingest",
      "Alert triage",
      "Incident response",
    ],
  },
  {
    category: "Backend & Distributed Systems",
    blurb: "Services that stay correct under load and partial failure.",
    skills: [
      "Rust (axum, tonic, tokio)",
      "Go",
      "gRPC",
      "GraphQL",
      "Kafka",
      "OpenSearch",
      "PostgreSQL",
      "Redis",
    ],
  },
  {
    category: "Offensive Security",
    blurb: "Breaking systems to find out how they actually fail.",
    skills: [
      "Web pentesting",
      "Network pentesting",
      "Packet crafting",
      "Exploit analysis",
      "Tooling automation",
    ],
  },
  {
    category: "Network & Infrastructure",
    blurb: "The layer everything else depends on.",
    skills: [
      "LAN/WAN design",
      "MPLS & IPsec VPN",
      "VRRP",
      "Firewalls",
      "Load balancing",
      "Data-centre design",
      "Virtualization",
    ],
  },
  {
    category: "Platform & Delivery",
    blurb: "Shipping it safely and repeatably.",
    skills: [
      "Docker",
      "Kubernetes",
      "CI/CD gating",
      "SAST & dependency audit",
      "Secret scanning",
      "Prometheus",
    ],
  },
  {
    category: "Frontend",
    blurb: "Interfaces for operators who are already under pressure.",
    skills: ["TypeScript", "React", "Next.js", "Tailwind CSS", "NestJS", "FastAPI"],
  },
] as const;

export type Social = {
  name: string;
  href: string;
  /** Icon key resolved in components/ui/social-icon.tsx */
  icon: "github" | "linkedin" | "telegram" | "mail";
};

export const socials: readonly Social[] = [
  { name: "GitHub", href: "https://github.com/HenokEshetu", icon: "github" },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/henok-eshetu-284bba2b3/",
    icon: "linkedin",
  },
  { name: "Telegram", href: "https://t.me/sulamatis_temeleshi", icon: "telegram" },
  { name: "Email", href: `mailto:${profile.email}`, icon: "mail" },
] as const;

export const navLinks = [
  { title: "About", href: "/#about" },
  { title: "Experience", href: "/#experience" },
  { title: "Work", href: "/#work" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/#contact" },
] as const;
