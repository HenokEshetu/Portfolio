import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Credentials } from "@/components/sections/credentials";
import { DevSecOps } from "@/components/sections/devsecops";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Platform } from "@/components/sections/platform";
import { Work } from "@/components/sections/work";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Platform />
      <DevSecOps />
      <Experience />
      <Work />
      <Credentials />
      <Contact />
    </>
  );
}
