import { SkillDataProvider } from "@/components/sub/skill-data-provider";
import { SkillText } from "@/components/sub/skill-text";

import {
  BACKEND_SKILL,
  FRONTEND_SKILL,
  FULLSTACK_SKILL,
  OTHER_SKILL,
  SKILL_DATA,
} from "@/constants";

// Extracted categorized skills
const MY_SKILLS = [
  {
    category: "Network Security & Infrastructure",
    skills: [
      "Firewalls",
      "VPNs (MPLS, IPsec)",
      "VRRP",
      "SNMP",
      "Cryptography",
      "LAN/WAN Design",
      "Load Balancing",
      "Redundancy",
      "Data Center Design",
    ],
  },
  {
    category: "Threat Intelligence & SOC Analysis",
    skills: [
      "Real-time Threat Intelligence",
      "Dark Web Feed Integration",
      "Incident Response",
      "Alert Triaging",
      "SOC Analysis",
    ],
  },
  {
    category: "Penetration Testing & System Engineering",
    skills: [
      "Web Pentesting",
      "Network Pentesting",
      "Tool Automation",
      "Training",
      "HTB Games",
    ],
  },
  {
    category: "Full Stack Development",
    skills: [
      "React.js",
      "Next.js",
      "Nest.js",
      "FastAPI",
      "GraphQL",
      "OpenSearch/ElasticSearch",
      "Redis",
      "PostgreSQL",
      "Spring Boot",
    ],
  },
  {
    category: "Automation & Scripting",
    skills: ["Go", "Rust", "Python", "PHP", "Bash", "PowerShell"],
  },
  {
    category: "Cryptography",
    skills: [
      "Secured Note Taking App",
      "Encryption/Decryption",
      "Key Management",
    ],
  },
  {
    category: "Data Center Virtualization & Infrastructure",
    skills: ["CloudSim", "Cisco Packet Tracer", "Virtualization", "Simulation"],
  },
  {
    category: "Languages",
    skills: ["Go", "Rust", "C", "Python", "PHP", "Bash", "PowerShell"],
  },
];

export const Skills = () => {
  return (
    <section
      id="skills"
      style={{ transform: "scale(0.9)" }}
      className="flex flex-col items-center justify-center gap-3 h-full relative overflow-hidden py-20"
    >
      <SkillText />

      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {SKILL_DATA.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {FRONTEND_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {BACKEND_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {FULLSTACK_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>
      <div className="flex flex-row justify-around flex-wrap mt-4 gap-5 items-center">
        {OTHER_SKILL.map((skill, i) => (
          <SkillDataProvider
            key={skill.skill_name}
            src={skill.image}
            name={skill.skill_name}
            width={skill.width}
            height={skill.height}
            index={i}
          />
        ))}
      </div>

      {/* Henok Eshetu's categorized skills */}
      <div className="w-full max-w-7xl mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 z-10 relative">
        {MY_SKILLS.map((group) => (
          <div
            key={group.category}
            className="relative rounded-2xl p-4 shadow-lg border border-purple-700/30 bg-[#181028]/80
              hover:scale-105 hover:shadow-[0_8px_32px_0_rgba(112,66,248,0.18)] transition-all duration-300 group"
          >
            <h3 className="text-2xl font-bold text-purple-300 mb-1 tracking-wide flex items-center gap-2">
              <span className="inline-block">{group.category}</span>
            </h3>
            <div className="h-[2px] w-10 bg-gradient-to-r from-purple-500 to-cyan-400 mb-4 rounded-full opacity-80" />
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li
                  key={skill}
                  className="px-3 py-1 rounded-full text-xs font-semibold shadow
                    bg-[#2a1850]/70 border border-purple-400/20 text-white
                    transition-all duration-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="w-full h-full absolute">
        <div className="w-full h-full z-[-10] opacity-30 absolute flex items-center justify-center bg-cover">
          <video
            className="w-full h-auto"
            preload="false"
            playsInline
            loop
            muted
            autoPlay
          >
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </section>
  );
};
