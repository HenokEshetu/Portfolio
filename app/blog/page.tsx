import fs from "fs";
import path from "path";

const blogPosts = [
  {
    slug: "cryptography-in-practice",
    title: "Cryptography in Practice: Securing Data in a Digital World",
    date: "2023-12-15",
    description:
      "A practical guide to cryptography, with real-world applications and lessons from Henok Eshetu.",
  },
  {
    slug: "data-center-virtualization-infrastructure-design",
    title:
      "Data Center Virtualization & Infrastructure Design: Powering the Modern Enterprise",
    date: "2024-03-10",
    description:
      "Explore the principles and real-world applications of data center virtualization and infrastructure design with Henok Eshetu.",
  },
  {
    slug: "full-stack-development-automation",
    title:
      "Full Stack Development & Automation: Building Secure, Scalable Systems",
    date: "2024-06-22",
    description:
      "Explore the intersection of full stack development and automation, with practical insights and project stories from Henok Eshetu.",
  },
  {
    slug: "languages-and-scripting",
    title:
      "Languages & Scripting: The Power of Polyglot Programming in Cybersecurity",
    date: "2024-09-05",
    description:
      "Discover how mastering multiple programming languages empowers automation, security, and innovation, with practical insights from Henok Eshetu.",
  },
  {
    slug: "network-security-engineering",
    title:
      "Network Security Engineering: Building Resilient Digital Fortresses",
    date: "2024-11-18",
    description:
      "A deep dive into the world of network security engineering, from firewalls to data center design, with real-world insights from Henok Eshetu.",
  },
  {
    slug: "penetration-testing-system-engineering",
    title:
      "Penetration Testing & System Engineering: Breaking to Build Stronger Systems",
    date: "2025-01-12",
    description:
      "A hands-on guide to penetration testing and system engineering, with stories, tools, and tips from Henok Eshetu.",
  },
  {
    slug: "threat-intelligence-soc-analysis",
    title: "Threat Intelligence & SOC Analysis: Staying Ahead of Cyber Threats",
    date: "2025-03-01",
    description:
      "Explore the world of threat intelligence and SOC analysis with real-world stories, tools, and strategies from Henok Eshetu.",
  },
];

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto py-16 px-6 md:px-12 mt-32">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-300">
        Blog
      </h1>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block rounded-2xl shadow-lg border border-purple-700/30 bg-[#181028]/80 hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(112,66,248,0.18)] transition-all duration-300 p-8 min-h-[220px] cursor-pointer"
          >
            <h2 className="text-2xl font-semibold text-purple-200 mb-2">
              {post.title}
            </h2>
            <p className="text-sm text-purple-400 mb-4">{post.date}</p>
            <p className="text-white/80 mb-2">{post.description}</p>
            <span className="text-cyan-400 font-bold">Read more →</span>
          </a>
        ))}
      </div>
    </main>
  );
}
