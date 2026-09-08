/**
 * Blog posts. Each paragraph in `body` renders as its own <p>.
 * Ordered newest-first; `date` is ISO (YYYY-MM-DD).
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO date, used for sorting and the <time> element. */
  date: string;
  topic: string;
  readingMinutes: number;
  body: readonly string[];
};

export const posts: readonly Post[] = [
  {
    slug: "threat-intelligence-soc-analysis",
    title: "Threat Intelligence & SOC Analysis: Staying Ahead of Cyber Threats",
    description:
      "Explore the world of threat intelligence and SOC analysis with real-world stories, tools, and strategies from Henok Eshetu.",
    date: "2025-03-01",
    topic: "Threat Intelligence",
    readingMinutes: 2,
    body: [
      "Threat intelligence and SOC (Security Operations Center) analysis are about staying ahead of cyber threats. This post explores the tools, strategies, and real-world stories from defending organizations against advanced attacks. Threat intelligence involves gathering and analyzing data on emerging threats, while SOC operations focus on monitoring, detection, and response. Incident response is about rapid containment and remediation when threats are detected.",
      "In my experience, the most effective SOCs are those that combine technology, process, and people. Tools like the Elastic Stack enable log analysis and threat detection, while SIEM (Security Information and Event Management) platforms provide real-time monitoring and alerting. Custom dashboards help visualize threats and coordinate response efforts.",
      "Best practices include continuous monitoring (24/7 vigilance), proactive threat hunting, and collaboration with peers to share intelligence. The challenges are significant: evolving threats, complex infrastructures, and the need for constant vigilance. However, the rewards—secure systems, protected data, and peace of mind—make the effort worthwhile.",
      "As technology advances, threat intelligence and SOC analysis will only become more critical. Staying ahead requires continuous learning, adaptation, and a commitment to best practices. Whether you are building a new SOC or improving an existing one, the principles of threat intelligence and SOC analysis are essential for success.",
      "In conclusion, threat intelligence and SOC analysis are not just technical disciplines—they are mindsets. By embracing these mindsets, we can build systems that are not only functional and efficient but also secure and resilient. The future of cybersecurity depends on our ability to adapt, learn, and apply the principles of threat intelligence and SOC analysis in everything we do.",
      "Thank you for joining me on this journey through the world of threat intelligence and SOC analysis. I hope this post has provided valuable insights and practical advice for your own work. Stay vigilant, stay informed, and never stop learning.",
    ],
  },
  {
    slug: "penetration-testing-system-engineering",
    title: "Penetration Testing & System Engineering: Breaking to Build Stronger Systems",
    description:
      "A hands-on guide to penetration testing and system engineering, with stories, tools, and tips from Henok Eshetu.",
    date: "2025-01-12",
    topic: "Offensive Security",
    readingMinutes: 2,
    body: [
      "Penetration testing and system engineering are about breaking systems to build them stronger. This post explores the tools, techniques, and real-world stories from testing and hardening digital infrastructure. The process begins with reconnaissance and vulnerability assessment, followed by exploitation and post-exploitation analysis. Each step provides valuable insights into system weaknesses and opportunities for improvement.",
      "In my experience, the most effective penetration tests are those that mimic real-world attacks as closely as possible. This means thinking like an adversary, using the same tools and techniques, and constantly adapting to new defenses. System engineering complements this by designing and implementing controls that address identified vulnerabilities and improve overall resilience.",
      "Tools of the trade include Metasploit, Nmap, Burp Suite, and custom scripts for automation and integration. Collaboration with system owners and stakeholders is essential to ensure that findings are understood and addressed. Reporting is a critical part of the process—clear, actionable recommendations drive real change.",
      "The challenges are many: evolving threats, complex systems, and the need for continuous improvement. However, the rewards—stronger systems, reduced risk, and greater confidence—make it all worthwhile.",
      "As technology evolves, so too must our approach to penetration testing and system engineering. Continuous learning, adaptation, and a commitment to best practices are essential for success. Whether you are testing a new application or hardening an existing system, the principles of penetration testing and system engineering are invaluable.",
      "In conclusion, penetration testing and system engineering are not just technical disciplines—they are mindsets. By embracing these mindsets, we can build systems that are not only functional and efficient but also secure and resilient. The future of cybersecurity depends on our ability to adapt, learn, and apply the principles of testing and engineering in everything we do.",
      "Thank you for joining me on this journey through the world of penetration testing and system engineering. I hope this post has provided valuable insights and practical advice for your own work. Stay curious, stay resilient, and never stop testing.",
    ],
  },
  {
    slug: "network-security-engineering",
    title: "Network Security Engineering: Building Resilient Digital Fortresses",
    description:
      "A deep dive into the world of network security engineering, from firewalls to data center design, with real-world insights from Henok Eshetu.",
    date: "2024-11-18",
    topic: "Network Security",
    readingMinutes: 1,
    body: [
      "Network security engineering is about building digital fortresses that protect data and systems from ever-evolving threats. This post explores the principles, tools, and real-world lessons from designing and defending secure networks. Defense in depth, least privilege, and segmentation are foundational principles that guide every decision.",
      "In my experience, building resilient networks requires a layered approach. Firewalls, intrusion detection systems, and network segmentation work together to create multiple barriers against attackers. Least privilege ensures that users and systems have only the access they need, reducing the risk of compromise. Segmentation isolates sensitive systems and data, limiting the impact of breaches.",
      "Key technologies include next-generation firewalls, VPNs, and network monitoring tools. Automation and orchestration are increasingly important, enabling rapid response to threats and efficient management of complex environments.",
      "The challenges are significant: evolving threats, complex infrastructures, and the need for constant vigilance. However, the rewards—secure systems, protected data, and peace of mind—make the effort worthwhile.",
      "As technology advances, network security will only become more critical. Staying ahead requires continuous learning, adaptation, and a commitment to best practices. Whether you are designing a new network or securing an existing one, the principles of network security engineering are essential for success.",
      "In conclusion, network security engineering is not just a technical discipline—it is a mindset. By embracing this mindset, we can build systems that are not only functional and efficient but also secure and resilient. The future of cybersecurity depends on our ability to adapt, learn, and apply the principles of network security in everything we do.",
      "Thank you for joining me on this journey through the world of network security engineering. I hope this post has provided valuable insights and practical advice for your own work. Stay vigilant, stay secure, and never stop learning.",
    ],
  },
  {
    slug: "languages-and-scripting",
    title: "Languages & Scripting: The Power of Polyglot Programming in Cybersecurity",
    description:
      "Discover how mastering multiple programming languages empowers automation, security, and innovation, with practical insights from Henok Eshetu.",
    date: "2024-09-05",
    topic: "Engineering",
    readingMinutes: 1,
    body: [
      "Polyglot programming is a force multiplier in cybersecurity and development. By mastering multiple languages, you unlock new possibilities for automation, integration, and innovation. This post explores the value of learning diverse languages and scripting tools. Go is ideal for low-level operations and concurrency, Rust for safety and performance, Python for rapid development and scripting, PHP for web backends, and Bash & PowerShell for automation and system administration.",
      "The ability to choose the right language for the task at hand is invaluable. In my experience, leveraging the strengths of each language leads to more robust, efficient, and secure solutions. For example, using Go for high-performance networking tools, Python for quick data analysis scripts, and Rust for security-critical components.",
      "Scripting is at the heart of automation. Automating repetitive tasks, integrating disparate systems, and orchestrating complex workflows are all made possible by scripting. Whether it’s automating deployments, monitoring systems, or processing data, scripting skills are essential for modern developers and security professionals.",
      "The journey to polyglot proficiency is ongoing. New languages and tools are constantly emerging, and staying current requires a commitment to continuous learning. In my work, I have found that curiosity and a willingness to experiment are the keys to mastering new technologies.",
      "In conclusion, languages and scripting are more than just technical skills—they are enablers of innovation and efficiency. By embracing a polyglot mindset, you can tackle a wider range of challenges, build more powerful solutions, and stay ahead in a rapidly changing field.",
      "Thank you for exploring the world of languages and scripting with me. I hope this post inspires you to expand your own skill set and embrace the power of polyglot programming.",
    ],
  },
  {
    slug: "full-stack-development-automation",
    title: "Full Stack Development & Automation: Building Secure, Scalable Systems",
    description:
      "Explore the intersection of full stack development and automation, with practical insights and project stories from Henok Eshetu.",
    date: "2024-06-22",
    topic: "Engineering",
    readingMinutes: 2,
    body: [
      "Full stack development is about building robust, scalable, and secure systems from the ground up. My journey has taken me from frontend interfaces to backend APIs, and from manual deployments to fully automated CI/CD pipelines. This post shares practical insights and stories from real-world projects. Mastery of frontend technologies like React.js, Next.js, and TypeScript, combined with backend expertise in Nest.js, FastAPI, and Spring Boot, enables the creation of seamless, high-performance applications. Databases such as PostgreSQL, Redis, and OpenSearch/ElasticSearch provide the backbone for data storage and retrieval, while DevOps practices like CI/CD, containerization, and cloud infrastructure ensure reliability and scalability.",
      "Automation is a key theme in modern development. By automating repetitive tasks, developers can focus on solving complex problems and delivering value. In my experience, setting up automated testing, deployment pipelines, and infrastructure provisioning has dramatically improved project outcomes. The ability to quickly iterate, test, and deploy new features is a game-changer in today’s fast-paced environment.",
      "Real-world projects have taught me the importance of collaboration and communication. Working closely with designers, product managers, and other engineers ensures that solutions are not only technically sound but also aligned with user needs and business goals. Security is always top of mind—implementing best practices for authentication, authorization, and data protection is non-negotiable.",
      "The challenges of full stack development are many: keeping up with rapidly evolving technologies, managing complex dependencies, and ensuring that systems remain maintainable and extensible over time. However, the rewards—delivering impactful products, learning new skills, and solving meaningful problems—make it all worthwhile.",
      "As technology continues to evolve, the role of the full stack developer will only become more important. The ability to bridge the gap between frontend and backend, to automate and optimize workflows, and to deliver secure, scalable solutions is invaluable in today’s digital landscape.",
      "In conclusion, full stack development and automation are about more than just writing code—they are about building systems that empower people and organizations to achieve their goals. By embracing best practices, staying curious, and always striving for excellence, we can create software that makes a difference.",
      "Thank you for joining me on this exploration of full stack development and automation. I hope these insights inspire you to tackle your own projects with confidence and creativity.",
    ],
  },
  {
    slug: "data-center-virtualization-infrastructure-design",
    title: "Data Center Virtualization & Infrastructure Design: Powering the Modern Enterprise",
    description:
      "Explore the principles and real-world applications of data center virtualization and infrastructure design with Henok Eshetu.",
    date: "2024-03-10",
    topic: "Infrastructure",
    readingMinutes: 2,
    body: [
      "Virtualization is the backbone of modern enterprise IT. I have designed and deployed scalable, resilient infrastructure using VMware, KVM, and cloud-native tools. This post explores the principles, challenges, and real-world lessons from building virtualized data centers. Server virtualization maximizes hardware utilization and flexibility, network virtualization isolates and secures traffic flows, and storage virtualization pools resources for performance and redundancy.",
      "Best practices in data center virtualization include designing for redundancy and eliminating single points of failure, automating deployments and management, and monitoring performance and security continuously. In my experience, the most successful projects are those that anticipate failure and build resilience into every layer.",
      "The journey to a virtualized data center is not without challenges. Migrating legacy systems, ensuring compatibility, and training staff are all significant hurdles. However, the benefits—greater agility, cost savings, and improved disaster recovery—make the effort worthwhile.",
      "In the real world, I have seen how virtualization enables rapid scaling, supports hybrid cloud strategies, and provides a foundation for automation and orchestration. The ability to spin up new environments in minutes, rather than days or weeks, transforms the way organizations operate.",
      "As technology evolves, the importance of virtualization will only grow. New tools and platforms are emerging all the time, and staying ahead requires a commitment to continuous learning and adaptation. Whether you are building a new data center or modernizing an existing one, the principles of virtualization are essential for success.",
      "In conclusion, data center virtualization is more than just a technical solution—it is a strategic enabler for the modern enterprise. By embracing virtualization, organizations can achieve greater flexibility, resilience, and efficiency, positioning themselves for success in a rapidly changing world.",
      "Thank you for exploring the world of data center virtualization and infrastructure design with me. I hope this post has provided valuable insights and practical advice for your own projects. Stay innovative, stay resilient, and keep building for the future.",
    ],
  },
  {
    slug: "cryptography-in-practice",
    title: "Cryptography in Practice: Securing Data in a Digital World",
    description:
      "A practical guide to cryptography, with real-world applications and lessons from Henok Eshetu.",
    date: "2023-12-15",
    topic: "Cryptography",
    readingMinutes: 3,
    body: [
      "In the digital age, cryptography is the science of secrets. As a developer and security engineer, I have implemented cryptographic solutions in real-world systems, always balancing usability and security. This post explores why cryptography matters, how to implement it well, and the lessons I have learned along the way. Every day, sensitive data moves across networks and sits in databases. Without strong cryptography, this data is vulnerable to theft, tampering, and surveillance. My work includes encryption and decryption to protect data at rest and in transit, key management for generating, storing, and rotating keys securely, and building a secured note-taking app as a real-world application of cryptography in Spring Boot, React.js, and PostgreSQL.",
      "Implementing cryptography in practice means choosing the right algorithms—using proven standards like AES, RSA, and ECC—and never rolling your own crypto, always leveraging trusted libraries. Key management is critical: protect keys as you would the data itself. Secure by default: encrypt sensitive fields, enforce strong passwords, and ensure that security is not an afterthought but a foundational principle. In my experience, balancing security and usability is a constant challenge; too much friction drives users away, but too little security leaves systems exposed. Regulatory compliance, such as meeting standards like GDPR and HIPAA, is another layer of complexity, as is incident response—revoking and rotating keys after a breach is essential for damage control.",
      "The tools and technologies I rely on include Spring Security for authentication and encryption, OpenSSL for key generation and certificate management, and custom scripts for automation and integration. Continuous learning is vital: cryptography evolves rapidly, and staying updated is the only way to remain effective. Testing thoroughly is non-negotiable; weak implementations can be worse than none. Educating users is also key, as security is a team effort, not just the responsibility of engineers.",
      "Real-world challenges abound. Balancing security and usability is a constant struggle. Too much friction in security processes can drive users to seek workarounds, undermining the very protections you put in place. Regulatory compliance adds another layer of complexity, requiring organizations to meet standards like GDPR and HIPAA. Incident response is also critical—when a breach occurs, the ability to quickly revoke and rotate keys can mean the difference between a minor incident and a major catastrophe.",
      "In my work, I have seen firsthand how cryptography can be both a shield and a sword in cybersecurity. By applying it thoughtfully, we can protect what matters most in the digital world. The journey is ongoing, and the stakes are high, but the rewards—secure systems, protected data, and peace of mind—are well worth the effort.",
      "As technology continues to advance, the importance of cryptography will only grow. New threats emerge every day, and staying ahead requires constant vigilance, innovation, and a commitment to best practices. Whether you are a developer, a security professional, or simply someone who values privacy, understanding and applying cryptography is essential.",
      "In conclusion, cryptography is not just a technical discipline—it is a mindset, a way of thinking about problems and solutions in the digital world. By embracing this mindset, we can build systems that are not only functional and efficient, but also secure and resilient. The future of cybersecurity depends on our ability to adapt, learn, and apply the principles of cryptography in everything we do.",
      "Thank you for joining me on this journey through the world of cryptography. I hope this post has provided valuable insights and practical advice that you can apply in your own work. Stay curious, stay vigilant, and never stop learning.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
