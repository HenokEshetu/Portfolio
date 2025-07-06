import { notFound } from "next/navigation";
import CryptographyInPractice from "../cryptography-in-practice";
import DataCenterVirtualization from "../data-center-virtualization-infrastructure-design";
import FullStackDevelopmentAutomation from "../full-stack-development-automation";
import LanguagesAndScripting from "../languages-and-scripting";
import NetworkSecurityEngineering from "../network-security-engineering";
import PenetrationTestingSystemEngineering from "../penetration-testing-system-engineering";
import ThreatIntelligenceSocAnalysis from "../threat-intelligence-soc-analysis";

const blogComponents: Record<string, React.FC> = {
  "cryptography-in-practice": CryptographyInPractice,
  "data-center-virtualization-infrastructure-design": DataCenterVirtualization,
  "full-stack-development-automation": FullStackDevelopmentAutomation,
  "languages-and-scripting": LanguagesAndScripting,
  "network-security-engineering": NetworkSecurityEngineering,
  "penetration-testing-system-engineering": PenetrationTestingSystemEngineering,
  "threat-intelligence-soc-analysis": ThreatIntelligenceSocAnalysis,
};

export function generateStaticParams() {
  return Object.keys(blogComponents).map((slug) => ({ slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const PostComponent = blogComponents[slug];
  if (!PostComponent) return notFound();
  return <PostComponent />;
}
