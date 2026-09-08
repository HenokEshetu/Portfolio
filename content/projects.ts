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
  caseStudy: readonly CaseStudySection[];
};

export const projects: readonly Project[] = [
  {
    slug: "cti-platform",
    title: "Real-Time Threat Intelligence Platform",
    summary:
      "Aggregates indicators from OSINT, internal logs, and dark-web feeds, then enriches and scores them so analysts triage signal instead of noise.",
    year: "2025",
    role: "Backend & platform engineering",
    stack: ["Rust", "Python", "NestJS", "GraphQL", "React", "OpenSearch"],
    featured: true,
    caseStudy: [
      {
        heading: "The problem",
        body: [
          "Threat feeds are cheap to subscribe to and expensive to use. A team can ingest millions of indicators a day and still miss the one that matters, because raw IOCs arrive without context: no confidence score, no relationship to assets the organisation actually owns, and no history of whether this indicator has ever mattered before.",
          "The goal was a platform that treats an indicator as the beginning of a question rather than the answer — something that arrives, gets enriched, gets correlated against internal telemetry, and only then competes for an analyst's attention.",
        ],
      },
      {
        heading: "Approach",
        body: [
          "Ingestion is a set of independent feed adapters that normalise wildly different source formats into one internal indicator model, so adding a feed never means touching the correlation logic. Each adapter is responsible for its own rate limiting and backoff, and a failure in one feed cannot stall the others.",
          "Enrichment runs as a pipeline stage rather than at query time. By the time an indicator is searchable it already carries reputation data, first-seen and last-seen timestamps, and any links to related infrastructure. Search itself sits on OpenSearch, which keeps the analyst-facing queries fast even as the indicator corpus grows.",
          "The API layer is GraphQL, chosen because the dashboard's views need very different shapes of the same underlying graph — an IOC detail view and a campaign overview should not require two bespoke REST endpoints each.",
        ],
      },
      {
        heading: "What I'd change",
        body: [
          "The enrichment pipeline was built assuming feeds stay roughly the same size. A feed that suddenly grows an order of magnitude creates backpressure that surfaces as latency in the wrong place. Making enrichment stages independently scalable, rather than scaling the pipeline as a unit, is the first thing I'd revisit.",
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
