/**
 * Single source of truth for everything about Henok.
 * Edit this file to update the site — no component changes needed.
 */

export const profile = {
  name: "Henok Eshetu",
  initials: "HE",
  handle: "henok",
  role: "Secure Systems Developer",
  title: "Secure Systems Developer · SIEM Development Team Leader",
  company: "Beta Tech Hub",
  // Shown in the hero, under the headline. Two sentences max.
  tagline:
    "I lead SIEM development at Beta Tech Hub, building a multi-tenant SIEM/XDR platform: UEBA, threat intelligence, case management and agentic AI for the SOC, plus the DevSecOps pipeline that ships it to Kubernetes.",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  availability: "Open to security engineering roles & collaboration",
  email: "henokeshetu2024@gmail.com",
  phone: "+251 923 469 211",
  portrait: "/henok-portrait.jpg",
  /** Set to null to hide every Résumé button. */
  resumeUrl: "/henok-eshetu-cv.pdf" as string | null,
} as const;

/** Small verifiable facts shown under the hero. */
export const stats: readonly { value: string; label: string }[] = [
  { value: "9", label: "tenant services in the SIEM/XDR platform I lead" },
  { value: "400+", label: "commits to the core platform in 2026" },
  { value: "3", label: "production languages: Rust, Go and Python" },
  { value: "3.71", label: "CGPA, BSc Cyber Security" },
] as const;

/** The short "about" narrative. Each string renders as its own paragraph. */
export const about: readonly string[] = [
  "I'm a Secure Systems Developer and the SIEM Development Team Leader at Beta Tech Hub, where we are building a multi-tenant SIEM/XDR platform for a managed security service provider. I own work from the architecture diagram to the running pod: service design, threat modelling, implementation, CI/CD gates, Helm and Argo CD rollouts, and the operational follow-through.",
  "Rust (Axum and Tokio) is my primary language. I use Go for threat intelligence and Python/FastAPI for AI and ML. I've built UEBA anomaly detection, a case management and ticketing system, a fleet update manager, a Go CTI service and an agentic AI SOC assistant. All of them run under tenant isolation and fail-closed authorisation, on an event pipeline that doesn't lose alerts.",
  "Before this I was an Information Security Analyst doing SOC monitoring, vulnerability assessment, incident response and GRC, and a network security engineering intern at INSA. That defensive background is why I design for how a system fails, not just for the happy path.",
] as const;

/** Rendered as a syntax-highlighted profile.yaml next to the about copy. */
export const profileYaml: readonly { key: string; value: string | readonly string[] }[] = [
  { key: "name", value: "Henok Eshetu" },
  { key: "role", value: "Secure Systems Developer" },
  { key: "leads", value: "SIEM Development Team @ Beta Tech Hub" },
  { key: "location", value: "Addis Ababa, ET (UTC+3)" },
  { key: "primary", value: "Rust · Axum · Tokio" },
  { key: "also", value: ["Go", "Python/FastAPI", "TypeScript"] },
  { key: "focus", value: ["SIEM/XDR", "UEBA", "CTI", "Agentic AI", "DevSecOps"] },
  { key: "studying", value: "(ISC)² CSSLP" },
] as const;

/** Rendered as a `tail -f now.log` panel under profile.yaml. */
export const nowLog: readonly { level: "now" | "off"; text: string }[] = [
  { level: "now", text: "leading the SIEM development team @ Beta Tech Hub" },
  { level: "now", text: "preparing for the (ISC)² CSSLP exam" },
  { level: "now", text: "building Fluxa and Rusty Chess in Rust" },
  { level: "off", text: "reading the Bible · playing the harp · chess · reflective walks" },
] as const;

export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  location: string;
  /** Short decorative ref shown in the git-log timeline. */
  ref: string;
  /** Set on the current role — renders a live indicator. */
  current?: boolean;
  /** Renders on a side branch in the timeline. */
  branch?: string;
  href?: string;
  summary: string;
  highlights: readonly string[];
  stack: readonly string[];
};

export const experience: readonly ExperienceEntry[] = [
  {
    company: "Beta Tech Hub",
    role: "Secure Systems Developer & SIEM Development Team Leader",
    period: "Feb 2026 — Present",
    location: "Addis Ababa",
    ref: "a7f3c91",
    current: true,
    summary:
      "I lead the team building a Kubernetes-native, multi-tenant SIEM/XDR platform for an MSSP, and own delivery from architecture to deployment.",
    highlights: [
      "Designed and built the UEBA engine: a Kafka-driven Rust pipeline (ingest → parse → features → ML → OpenSearch) with a scikit-learn worker running Isolation Forest, LOF, One-Class SVM and Random Forest models.",
      "Built the Case Management & Ticketing System in Rust/Axum (SQLx/PostgreSQL, Redis, S3 evidence storage, real-time WebSockets) and the Update Manager for staged agent rollouts, rollback and fleet health.",
      "Developed an agentic AI SOC assistant on Wazuh: a supervisor coordinating four specialist agents across 69 tools. It runs on any OpenAI-compatible model or Gemini and has human approval gates and a full audit trail.",
      "Built the Go CTI service (go-micro, gRPC) that normalises threat feeds into STIX 2.1 in OpenSearch, with Redis caching and Bloom-filter IOC lookups.",
      "Own platform DevSecOps: Helm and Argo CD GitOps, Vault with External Secrets Operator, Keycloak OIDC and mTLS. GitLab CI blocks merges on tests, clippy, cargo-audit, secret scanning and container scanning.",
    ],
    stack: [
      "Rust",
      "Axum",
      "Go",
      "gRPC",
      "Python",
      "FastAPI",
      "Kafka",
      "OpenSearch",
      "PostgreSQL",
      "Redis",
      "Wazuh",
      "Keycloak",
      "Vault",
      "Kubernetes",
      "Helm",
      "Argo CD",
      "GitLab CI",
    ],
  },
  {
    company: "Open source · RustyHenok",
    role: "Independent Software Engineer",
    period: "Mar 2026 — Present",
    location: "Remote",
    ref: "5e0d2b4",
    branch: "oss",
    href: "https://github.com/RustyHenok",
    summary:
      "Self-directed products I build end to end to try out architecture ideas I can't test at work.",
    highlights: [
      "Fluxa: a multi-tenant task platform with a Rust 2024 backend (Axum, SQLx, tonic gRPC), JWT rotation, OAuth, RBAC, an audit log, outbox workers and HMAC-signed webhooks with dead-lettering. Its OpenAPI-generated clients serve a Next.js 16 web app and a Flutter mobile app.",
      "Rusty Chess: multiplayer chess with a perft-verified Rust engine, Glicko-2 ratings, a TLS/WSS Axum server with certificate pinning, and a Tauri 2 desktop app. It is tested with Playwright and WebDriver in GitHub Actions.",
    ],
    stack: ["Rust", "Axum", "SQLx", "tonic", "Next.js", "Flutter", "Tauri", "SolidJS", "OpenTelemetry", "Trivy"],
  },
  {
    company: "Amhara Media Corporation (AMECO)",
    role: "Information Security Analyst",
    period: "Jul 2025 — Feb 2026",
    location: "Bahir Dar",
    ref: "c41e8a0",
    summary:
      "Security operations and governance for a regional media corporation's IT and broadcast environment.",
    highlights: [
      "Monitored and triaged security events through SIEM and log analysis, escalating incidents and supporting response from detection to recovery.",
      "Ran vulnerability assessments across servers, network devices and web applications, prioritising findings by risk and tracking remediation.",
      "Drove GRC: wrote and maintained information-security policies, standards and procedures, and carried out risk assessments.",
    ],
    stack: ["SIEM", "Incident response", "Vulnerability assessment", "GRC", "Policy"],
  },
  {
    company: "Information Network Security Administration (INSA)",
    role: "Network Security Engineering Intern",
    period: "Jul 2024 — Sep 2024",
    location: "Addis Ababa",
    ref: "1b9f07e",
    summary:
      "Network and data-centre security engineering at Ethiopia's national cyber-security agency.",
    highlights: [
      "Contributed to data-centre design and enterprise LAN/WAN design with IPsec and MPLS VPNs and load balancing.",
      "Implemented security protocols and redundancy (VRRP, firewall policy, SNMP) and validated them in simulation.",
    ],
    stack: ["Cisco", "MPLS", "IPsec", "VRRP", "Firewalls", "Data-centre design"],
  },
] as const;

/** Modules of the SIEM/XDR platform I lead — shown as a bento grid. */
export type PlatformModule = {
  name: string;
  lang: string;
  blurb: string;
  tags: readonly string[];
  icon: "radar" | "brain" | "ticket" | "refresh" | "globe" | "shield";
  /** Bento sizing on large screens. */
  span?: "wide" | "tall";
};

export const platformModules: readonly PlatformModule[] = [
  {
    name: "UEBA engine",
    lang: "Rust + Python",
    blurb:
      "Multi-stage Kafka pipeline that learns per-user and per-entity baselines and scores anomalies, scoped to each tenant from ingest through indexing.",
    tags: ["Kafka", "scikit-learn", "Isolation Forest", "OpenSearch"],
    icon: "radar",
    span: "wide",
  },
  {
    name: "Agentic AI SOC assistant",
    lang: "Python · FastAPI",
    blurb:
      "Supervisor plus four specialist agents across 69 Wazuh tools, with human approval before any response action.",
    tags: ["Multi-agent", "Tool calling", "OpenAI-compatible", "Gemini"],
    icon: "brain",
    span: "tall",
  },
  {
    name: "Case management & ticketing",
    lang: "Rust · Axum",
    blurb: "Cases, evidence and SLAs with real-time collaboration for SOC analysts.",
    tags: ["SQLx", "PostgreSQL", "Redis", "S3", "WebSockets"],
    icon: "ticket",
  },
  {
    name: "Update manager",
    lang: "Rust · Axum",
    blurb: "Staged agent rollouts, maintenance windows, rollback and fleet health over SSE.",
    tags: ["SSE", "Keycloak RS256", "PostgreSQL"],
    icon: "refresh",
  },
  {
    name: "CTI service",
    lang: "Go · gRPC",
    blurb: "Threat-feed aggregation into STIX 2.1 with cached, Bloom-filtered IOC lookups.",
    tags: ["go-micro", "STIX 2.1", "Redis", "OpenSearch"],
    icon: "globe",
  },
  {
    name: "Platform & DevSecOps",
    lang: "Kubernetes · GitOps",
    blurb:
      "Namespace-per-tenant isolation, secrets from Vault via ESO, and per-tenant Keycloak realms. Every release passes blocking supply-chain gates.",
    tags: ["Helm", "Argo CD", "Vault", "mTLS", "GitLab CI"],
    icon: "shield",
    span: "wide",
  },
] as const;

/** The DevSecOps loop — what I use at each stage. */
export type PipelineStage = {
  id: string;
  name: string;
  side: "dev" | "ops";
  summary: string;
  tools: readonly string[];
};

export const pipeline: readonly PipelineStage[] = [
  {
    id: "plan",
    name: "Plan",
    side: "dev",
    summary: "Threat models, contracts and architecture decisions before code.",
    tools: ["Threat modelling", "Secure SDLC", "JSON Schema contracts", "ADRs"],
  },
  {
    id: "code",
    name: "Code",
    side: "dev",
    summary: "Type-safe services where a wrong state shouldn't compile.",
    tools: ["Rust · Axum · Tokio", "Go · gRPC", "Python · FastAPI", "TypeScript"],
  },
  {
    id: "build",
    name: "Build",
    side: "dev",
    summary: "Small, reproducible images and locked dependencies.",
    tools: ["Docker multi-stage", "Cargo workspaces", "uv", "pnpm"],
  },
  {
    id: "test",
    name: "Test",
    side: "dev",
    summary: "Behaviour and failure paths, including cross-tenant negatives.",
    tools: ["cargo test", "pytest", "Vitest", "Playwright", "Helm unittest"],
  },
  {
    id: "release",
    name: "Release",
    side: "ops",
    summary: "Blocking gates and write-once artefacts.",
    tools: ["GitLab CI", "GitHub Actions", "cargo-audit", "Trivy", "Secret scanning"],
  },
  {
    id: "deploy",
    name: "Deploy",
    side: "ops",
    summary: "Declarative and auditable deploys, with secrets never in Git.",
    tools: ["Kubernetes", "Helm", "Argo CD", "Vault + ESO"],
  },
  {
    id: "operate",
    name: "Operate",
    side: "ops",
    summary: "Durable streams, isolated tenants and identity everywhere.",
    tools: ["Kafka", "OpenSearch", "PostgreSQL", "Redis", "Keycloak · mTLS"],
  },
  {
    id: "monitor",
    name: "Monitor",
    side: "ops",
    summary: "Detection that closes the loop back into planning.",
    tools: ["Prometheus", "OpenTelemetry", "Wazuh", "UEBA", "CTI"],
  },
] as const;

/** Rendered in the scrolling stack ticker. */
export const toolbelt: readonly string[] = [
  "Rust",
  "Axum",
  "Tokio",
  "SQLx",
  "Go",
  "gRPC",
  "Python",
  "FastAPI",
  "scikit-learn",
  "TypeScript",
  "React",
  "Next.js",
  "Kafka",
  "OpenSearch",
  "PostgreSQL",
  "Redis",
  "Wazuh",
  "Suricata",
  "STIX 2.1",
  "Keycloak",
  "Vault",
  "Docker",
  "Kubernetes",
  "Helm",
  "Argo CD",
  "GitLab CI",
  "Prometheus",
  "OpenTelemetry",
] as const;

export type Credential = {
  title: string;
  issuer: string;
  year?: string;
  kind: "certification" | "education";
  status?: "in-progress" | "completed";
  note?: string;
};

export const credentials: readonly Credential[] = [
  {
    title: "BSc in Cyber Security",
    issuer: "Bahir Dar University",
    year: "2022 — 2025",
    kind: "education",
    status: "completed",
    note: "CGPA 3.71 / 4.00. Thesis: Real-Time Cyber Threat Intelligence Platform.",
  },
  {
    title: "CSSLP — Certified Secure Software Lifecycle Professional",
    issuer: "(ISC)²",
    kind: "certification",
    status: "in-progress",
    note: "Preparing for the exam.",
  },
  {
    title: "SOC Level 1 learning path",
    issuer: "TryHackMe",
    kind: "certification",
    status: "completed",
  },
  {
    title: "Offensive security labs",
    issuer: "Hack The Box",
    kind: "certification",
    status: "completed",
    note: "Web and network exploitation.",
  },
] as const;

/** Smaller builds and experiments — rendered as an `ls -la ~/lab` listing. */
export type LabEntry = {
  name: string;
  lang: string;
  blurb: string;
  href?: string;
};

export const lab: readonly LabEntry[] = [
  {
    name: "Dengel-TextEditor",
    lang: "C++23",
    blurb: "Text editor built from scratch on SDL with a CMake/Premake build.",
    href: "https://github.com/HenokEshetu/Dengel-TextEditor",
  },
  {
    name: "contact_book",
    lang: "Rust",
    blurb: "Command-line contact manager with JSON persistence.",
    href: "https://github.com/HenokEshetu/contact_book",
  },
  {
    name: "learn-zig",
    lang: "Zig",
    blurb: "Systems and security programming exercises in Zig.",
    href: "https://github.com/RustyHenok/learn-zig",
  },
  {
    name: "Portfolio",
    lang: "TypeScript",
    blurb: "This site: Next.js 16, Tailwind CSS 4, CSS-only motion.",
    href: "https://github.com/HenokEshetu/Portfolio",
  },
] as const;

export const spokenLanguages: readonly { name: string; level: string }[] = [
  { name: "Amharic", level: "Native" },
  { name: "English", level: "Professional working proficiency" },
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
  { title: "Platform", href: "/#platform" },
  { title: "Experience", href: "/#experience" },
  { title: "Work", href: "/#work" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/#contact" },
] as const;
