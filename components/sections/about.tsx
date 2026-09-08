import { MapPin } from "lucide-react";

import { Reveal } from "@/components/ui/reveal";
import { about, profile } from "@/content/profile";

export const About = () => (
  <section
    id="about"
    aria-labelledby="about-heading"
    className="scroll-mt-24 py-16 sm:py-24"
  >
    <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <Reveal>
          <p className="eyebrow">About</p>
          <h2
            id="about-heading"
            className="mt-3 text-h2 font-semibold text-fg"
          >
            What I do
          </h2>
          <p className="mt-6 inline-flex items-center gap-2 text-sm text-fg-subtle">
            <MapPin className="size-4" aria-hidden />
            {profile.location}
          </p>
        </Reveal>
      </div>

      <div className="lg:col-span-8">
        <div className="space-y-6">
          {about.map((paragraph, i) => (
            <Reveal key={paragraph.slice(0, 32)} delay={i}>
              <p className="max-w-[62ch] text-lead text-fg-muted">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);
