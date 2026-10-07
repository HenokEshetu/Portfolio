/**
 * Projects and their case studies.
 *
 * `featured: true` surfaces a project on the home page. Every project gets a
 * case-study page at /work/<slug> automatically.
 */

export type CaseStudySection = {
  heading: string;
  body: readonly string[];
};

export type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Window chrome to draw around the image. */
  frame?: "browser" | "desktop";
  /** Address shown in the browser frame. */
  url?: string;
};

export type Project = {
  slug: string;
  title: string;
  /** One line. What it is and who it's for. */
  summary: string;
  year: string;
  role: string;
  stack: readonly string[];
  featured?: boolean;
  /** Small factual stats shown on the case-study page. Keep these verifiable. */
  facts?: readonly { label: string; value: string }[];
  links?: readonly { label: string; href: string }[];
  /** Real screenshots of the running software. The first one is the cover. */
  gallery?: readonly Shot[];
  /** Where the screenshots come from, shown under the gallery. */
  galleryNote?: string;
  /** Drawn cover for projects without public screenshots. */
  visual?: "chess" | "terminal";
  caseStudy: readonly CaseStudySection[];
};

export const projects: readonly Project[] = [
  {
    slug: "cti-platform",
    title: "Real-Time Cyber Threat Intelligence Platform",
    summary:
      "ዳጉ (Dagu), my BSc final-year project: a STIX 2.1 threat-intelligence platform that ingests and enriches feeds, streams updates to analysts in real time, and turns indicators into Suricata IDS rules automatically.",
    year: "2024 — 2025",
    role: "Final-year project · lead developer",
    stack: ["NestJS", "GraphQL", "PostgreSQL", "Redis", "OpenSearch", "React 19", "Python", "Suricata"],
    featured: true,
    facts: [
      { label: "Data model", value: "STIX 2.1 SDOs, SCOs and relationships" },
      { label: "Realtime", value: "GraphQL subscriptions over WebSocket" },
      { label: "Commits", value: "~260 of ~335 across the project repos" },
    ],
    links: [
      { label: "Overview", href: "https://github.com/HenokEshetu/Real-time_Threat_Intelligence" },
      { label: "Backend", href: "https://github.com/HenokEshetu/Real-time_Threat_Intelligence_Backend" },
      { label: "Frontend", href: "https://github.com/HenokEshetu/Real-time_Threat_Intelligence_Frontend" },
      { label: "Suricata bridge", href: "https://github.com/HenokEshetu/Real-time_Threat_Intelligence_Suricata" },
    ],
    gallery: [
      { src: "/work/cti-platform/dashboard.webp", alt: "ዳጉ CTI dashboard with counters, threat map and distribution charts", caption: "Analyst dashboard: live counters, world threat map and campaign/intrusion-set trends.", width: 1600, height: 962, frame: "browser", url: "dagu.cti/dashboard" },
      { src: "/work/cti-platform/dashboard-analytics.webp", alt: "Industry-targeted threats, platform distributions and security reports", caption: "Industry targeting, platform distributions and the latest security reports.", width: 1600, height: 962, frame: "browser", url: "dagu.cti/dashboard#analytics" },
      { src: "/work/cti-platform/domain-names.webp", alt: "Domain-name observables table with markings and enrichment labels", caption: "STIX cyber-observables: 678 domain names with TLP markings and enrichment verdicts.", width: 1600, height: 962, frame: "browser", url: "dagu.cti/observables/domain-names" },
      { src: "/work/cti-platform/ipv4-detail.webp", alt: "IPv4 observable detail with geolocation, verdict scores and external references", caption: "IPv4 detail: geolocation, enrichment verdicts and Hybrid Analysis references.", width: 1600, height: 962, frame: "browser", url: "dagu.cti/observables/ipv4-addresses/172.64.149.23" },
    ],
    galleryNote: "Screenshots of the production build from the project README, showing real ingested threat data.",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Threat feeds are cheap to subscribe to and expensive to use. A team can ingest thousands of indicators a day and still miss the one that matters, because raw IOCs arrive without context: no confidence, no relationships, and no link to the controls that could act on them.",
          "The goal was a platform where an indicator is the start of an investigation, not the end of one. It arrives, gets normalised to STIX 2.1, gets enriched and related to other objects, reaches analysts in real time, and finally becomes an enforceable detection.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The backend is NestJS with Apollo GraphQL. GraphQL fits because a CTI console needs very different shapes of the same graph: an IOC detail view, a campaign overview and a knowledge-graph explorer should not each need a bespoke REST endpoint. Subscriptions over WebSocket push new and updated objects to every open console.",
          "STIX domain and cyber-observable objects, relationships and reports live in PostgreSQL through TypeORM. Redis handles pub/sub and Bull job queues, so slow work like feed ingestion and enrichment runs off the request path. HashiCorp Vault holds third-party API keys. Authentication is JWT with Passport (including Google OAuth) and role-based access control.",
          "Enrichment pulls context from MITRE ATT&CK, VirusTotal, Shodan, AbuseIPDB, ThreatFox and Hybrid Analysis. A separate Python bridge subscribes to new indicators, generates Suricata rules from them, hot-reloads the IDS and exposes Prometheus metrics, which turns intelligence into enforcement.",
          "The React 19 and TypeScript console uses Apollo Client and live subscriptions to drive dashboards, geo-maps, a force-directed knowledge graph and timelines.",
        ],
      },
      {
        heading: "What I'd change",
        body: [
          "Enrichment was built assuming feeds stay roughly the same size. When one feed suddenly grows by an order of magnitude, the backpressure shows up as latency in the wrong place. Today I would put a durable log such as Kafka between ingestion and enrichment and scale each enrichment stage on its own, which is the pattern I now use in production.",
        ],
      },
    ],
  },
  {
    slug: "fluxa",
    title: "Fluxa",
    summary:
      "A multi-tenant task and project management platform: a Rust API with first-class tenancy, RBAC and signed webhooks, plus OpenAPI-generated web and mobile clients.",
    year: "2026",
    role: "Independent · sole architect",
    stack: ["Rust", "Axum", "SQLx", "PostgreSQL", "Redis", "tonic gRPC", "Next.js 16", "Flutter"],
    featured: true,
    facts: [
      { label: "Clients", value: "Next.js 16 web · Flutter mobile" },
      { label: "Contract", value: "OpenAPI-generated, diff-checked in CI" },
      { label: "Supply chain", value: "fmt · clippy · cargo-audit · Trivy" },
    ],
    links: [
      { label: "Backend", href: "https://github.com/RustyHenok/fluxa-backend" },
      { label: "Web", href: "https://github.com/RustyHenok/fluxa-web" },
      { label: "Mobile", href: "https://github.com/RustyHenok/fluxa-mobile" },
    ],
    gallery: [
      { src: "/work/fluxa/overview.webp", alt: "Fluxa workspace overview with tenant summary and task pulse", caption: "Tenant overview: live summary counters, recent task pulse and focus areas.", width: 1600, height: 1000, frame: "browser", url: "fluxa.app" },
      { src: "/work/fluxa/tasks.webp", alt: "Fluxa contract-aware task dashboard", caption: "Task dashboard driven by the generated OpenAPI client and cursor pagination.", width: 1600, height: 1000, frame: "browser", url: "fluxa.app/tasks" },
      { src: "/work/fluxa/projects.webp", alt: "Fluxa project workspace with project creation form", caption: "Tenant-scoped project hierarchy with inline creation.", width: 1600, height: 1000, frame: "browser", url: "fluxa.app/projects" },
      { src: "/work/fluxa/login.webp", alt: "Fluxa sign-in screen", caption: "Sign-in through the cookie-backed BFF, so the browser never holds the refresh token.", width: 1600, height: 1000, frame: "browser", url: "fluxa.app/login" },
    ],
    galleryNote: "Captured from the real Next.js web app, running against a local mock of the Fluxa API with demo data.",
    caseStudy: [
      {
        heading: "Why build it",
        body: [
          "Task managers look simple until you add teams. Once several organisations share one deployment, every query becomes a tenancy question, every integration becomes a security boundary, and every background job needs a story for retries. Fluxa is where I explore those problems end to end, outside the constraints of my day job.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "The backend is Rust 2024 on Axum and Tokio, with SQLx against PostgreSQL and Redis for caching and coordination. It also exposes a tonic gRPC interface. Auth uses short-lived JWT access tokens with refresh rotation, Argon2 password hashing and Google/GitHub OAuth. Authorisation is owner/admin/member RBAC enforced per tenant, and every privileged change goes to a tenant audit log.",
          "Side effects run through an outbox so a notification or webhook is never lost when a transaction commits. Outbound webhooks are HMAC-signed, retried with backoff and dead-lettered when they keep failing. Prometheus metrics and OpenTelemetry traces make the background workers observable.",
          "The API contract is generated as OpenAPI and diffed in CI, so a breaking change can't ship by accident. The Next.js 16 web app uses a cookie-based backend-for-frontend, and the Flutter app (Riverpod, go_router, Dio, secure storage) consumes the same generated models.",
        ],
      },
    ],
  },
  {
    slug: "rusty-chess",
    title: "Rusty Chess",
    summary:
      "Multiplayer chess for humans: online rated play, LAN hosting and local games. A Rust core and TLS-only networking power a Tauri 2 desktop app and a self-hostable server.",
    year: "2026",
    role: "Independent · sole author",
    stack: ["Rust", "Axum", "Turso", "WebSockets/TLS", "Tauri 2", "SolidJS", "Playwright"],
    facts: [
      { label: "Rules engine", value: "Dependency-free, perft-verified" },
      { label: "Ratings", value: "Glicko-2 per time control" },
      { label: "Transport", value: "HTTPS and WSS only, never plaintext" },
    ],
    visual: "chess",
    caseStudy: [
      {
        heading: "The interesting part is the network",
        body: [
          "Chess rules are a solved problem. Trust between a desktop client and a self-hosted server is not. Every connection is HTTPS or WSS, and the desktop WebView has no network access at all because its Content Security Policy forbids it. All traffic goes through a TLS client in the app's Rust backend.",
          "Self-signed servers are handled like SSH: on first connection the app shows the certificate's SHA-256 fingerprint and asks the player to compare it with the host's screen. If a trusted server later presents a different certificate, the app blocks the connection and never re-trusts it silently.",
        ],
      },
      {
        heading: "Engineering",
        body: [
          "The workspace is split into a dependency-free rules crate (legal moves, FEN, SAN and PGN, verified with perft), a deterministic match crate (time controls, a lag-compensated server clock, Glicko-2 and pairing), a protocol crate that generates the TypeScript bindings, and an Axum server on Turso.",
          "Passwords use Argon2id. Session tokens are stored only as SHA-256 hashes, and login, chat, WebSocket messages and per-IP connections are all rate-limited. CI runs Rust tests over real TLS, Vitest, browser end-to-end tests with Playwright, and WebDriver tests against the actual desktop binary.",
        ],
      },
    ],
  },
  {
    slug: "syslog-analyzer",
    title: "Syslog Analyzer",
    summary:
      "A modular real-time security analytics platform: collects syslog from distributed infrastructure, applies YAML-defined detection rules, and correlates multi-step attack patterns.",
    year: "2025",
    role: "Sole author",
    stack: ["Python", "Go", "NATS", "PostgreSQL", "Docker"],
    featured: true,
    facts: [
      { label: "Services", value: "Collector · Analyzer · Correlation · Dashboard" },
      { label: "Transport", value: "Syslog over UDP/TCP" },
      { label: "Detections", value: "Brute force · lateral movement · port scans" },
    ],
    links: [
      { label: "Source", href: "https://github.com/HenokEshetu/Syslog_Analyzer" },
    ],
    gallery: [
      { src: "/work/syslog-analyzer/dashboard.webp", alt: "Syslog security dashboard with log volume, alerts, timeline and log explorer", caption: "Security dashboard: log volume, alert severities, top sources, a 24-hour timeline and the log explorer.", width: 1600, height: 1000, frame: "browser", url: "localhost:5000" },
    ],
    galleryNote: "Captured from the real dashboard template with its JSON API returning demo data.",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Syslog is the lowest common denominator of infrastructure telemetry — every switch, firewall, and Linux box speaks it — which makes it simultaneously the most available signal and the least structured. Turning that stream into detections means solving three separate problems that are usually conflated: reliable collection, per-event rule evaluation, and correlation across events that are individually unremarkable.",
        ],
      },
      {
        heading: "Architecture",
        body: [
          "Splitting those three concerns into separate services was the central decision. The collector does one thing: accept syslog over UDP and TCP, parse it, and publish to NATS. It holds no detection state, so it can be scaled or restarted without losing rule context.",
          "The analyzer consumes from NATS and evaluates detection rules defined in YAML, which means adding a detection is a config change rather than a deployment. Logs and alerts land in Postgres. A separate correlation engine runs periodically over that stored history looking for multi-step patterns — a brute-force attempt followed by a successful login followed by lateral movement is three benign-looking events and one incident.",
          "NATS sits between collection and analysis specifically so a slow analyzer cannot drop inbound syslog on the floor, which is the classic failure mode when collection and analysis live in the same process.",
        ],
      },
      {
        heading: "Outcome",
        body: [
          "The result is a system where the expensive part — correlation — runs on its own schedule against durable storage, while the latency-sensitive part — collection — stays thin enough to keep up with bursty infrastructure. The whole stack is containerised, so a full deployment is a compose file rather than a runbook.",
        ],
      },
    ],
  },
  {
    slug: "deepnet",
    title: "DeepNet",
    summary:
      "A Rust network-analysis toolkit doing raw packet crafting and protocol-aware parsing, with TCP SYN, TCP connect, and UDP scan modes over a direct datalink interface.",
    year: "2025",
    role: "Sole author",
    stack: ["Rust", "pnet_datalink", "Tokio"],
    featured: true,
    facts: [
      { label: "Scan modes", value: "TCP SYN · TCP connect · UDP" },
      { label: "Interface", value: "Raw datalink via pnet" },
      { label: "Language", value: "100% Rust" },
    ],
    links: [{ label: "Source", href: "https://github.com/HenokEshetu/DeepNet" }],
    gallery: [
      { src: "/work/deepnet/packet-crafter.webp", alt: "DeepNet packet crafter tab", caption: "Packet crafter: hand-built TCP/UDP packets with custom payload, count and delay.", width: 1200, height: 370, frame: "desktop", url: "DeepNet — Packet Crafter" },
      { src: "/work/deepnet/port-scanner.webp", alt: "DeepNet port scanner tab", caption: "Port scanner: target, port range, scan type (TCP SYN, connect, UDP) and thread count.", width: 1200, height: 320, frame: "desktop", url: "DeepNet — Advanced Network Toolkit" },
      { src: "/work/deepnet/packet-sniffer.webp", alt: "DeepNet packet sniffer tab", caption: "Packet sniffer: interface selection and BPF filters.", width: 1200, height: 230, frame: "desktop", url: "DeepNet — Packet Sniffer" },
    ],
    galleryNote: "Captured from a release build of the egui desktop app.",
    caseStudy: [
      {
        heading: "Why build another scanner",
        body: [
          "Not to replace nmap. The point was to work at the layer below the tools I normally reach for — to craft packets by hand, sit directly on the datalink interface, and understand exactly what goes on the wire and what comes back. You learn different things about a protocol when you are responsible for assembling every field of the header.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Rust was the right language here for the same reason it is the right language for the SIEM work: packet parsing is a domain where a bounds error is a security bug, and the type system removes an entire class of them at compile time. Working through pnet_datalink gives direct interface access without giving up that guarantee.",
          "The three scan modes exist because they answer different questions. A TCP connect scan tells you what a normal client would see. A SYN scan tells you what is listening without completing a handshake. A UDP scan tells you almost nothing reliably, and building one is the fastest way to internalise why.",
          "Parallelism is structured so that scanning is bounded by network round-trips rather than by thread scheduling — the pattern that makes fast scanners fast.",
        ],
      },
    ],
  },
  {
    slug: "secure-notes",
    title: "Secure Note-Taking App",
    summary:
      "End-to-end encrypted notes backed by a purpose-built certificate authority and key-management service — three services, split so the crypto boundary is explicit.",
    year: "2025",
    role: "Sole author",
    stack: ["React", "Spring Boot", "Java", "PKI"],
    featured: true,
    links: [
      {
        label: "Frontend",
        href: "https://github.com/HenokEshetu/notetakingappfrontend",
      },
      { label: "API", href: "https://github.com/HenokEshetu/notetakingappapi" },
      {
        label: "Certificate authority",
        href: "https://github.com/HenokEshetu/notetakingappcrtauth",
      },
    ],
    gallery: [
      { src: "/work/secure-notes/notes.webp", alt: "Secure notes workspace with note cards", caption: "Notes workspace: per-user notes behind JWT auth.", width: 1600, height: 1000, frame: "browser", url: "localhost:5173/home" },
      { src: "/work/secure-notes/login.webp", alt: "Secure notes sign-in screen", caption: "Sign-in and registration.", width: 1600, height: 1000, frame: "browser", url: "localhost:5173" },
    ],
    galleryNote: "Captured from the real React frontend, with the API mocked and demo notes.",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "\"Encrypted notes\" is easy to claim and hard to mean. Most implementations encrypt at rest with a key the server holds, which protects against a stolen disk and nothing else. The interesting engineering is not the cipher — it is key management: where keys live, who can derive them, how they rotate, and what an attacker with database access actually gets.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "The system is deliberately three separate services rather than one. The frontend handles content. The API handles storage and never sees plaintext. The certificate authority is its own service with its own trust boundary, responsible for issuing and validating the certificates that underpin key exchange.",
          "Splitting the CA out was the decision that mattered most. When certificate issuance lives inside the application server, compromising the application compromises the trust root. Keeping it separate means the blast radius of an API compromise stops at ciphertext.",
        ],
      },
      {
        heading: "What I learned",
        body: [
          "Building a CA — even a small one — is the best possible way to understand why PKI is shaped the way it is. Every piece of ceremony that looks like bureaucracy from the outside turns out to be load-bearing once you are the one deciding how a certificate gets revoked.",
        ],
      },
    ],
  },
  {
    slug: "sysadmin-automation",
    title: "System Engineering Automation Tools",
    summary:
      "Cross-platform operational tooling — account management, log rotation, secure backups, patching — that detects its own OS and runs interactively or on a timer.",
    year: "2025",
    role: "Sole author",
    stack: ["Python", "Rust", "Go", "Bash", "PowerShell"],
    links: [
      {
        label: "Source",
        href: "https://github.com/HenokEshetu/System-Engineer-Automation-tools",
      },
    ],
    visual: "terminal",
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Operational scripts rot in a specific way: they are written against one machine, work perfectly there, and fail silently everywhere else. The failure is rarely the logic — it is an assumption about a path, a package manager, or an init system that was never made explicit.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Every tool detects its platform at runtime rather than trusting the environment it was written on, and fails loudly rather than continuing on a bad assumption. Each one runs both interactively and unattended under cron or a systemd timer, because an automation tool that only works when a human is watching is not automation.",
          "The language choice per tool is deliberate rather than aesthetic: Bash and PowerShell where the job is orchestrating existing system utilities, Python where it is parsing and reporting, and Rust or Go where the tool needs to be a single binary that runs on a host with no runtime installed.",
        ],
      },
    ],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
