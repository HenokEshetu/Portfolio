"use client";

import { useEffect, useState } from "react";

import { profile } from "@/content/profile";

const formatter = new Intl.DateTimeFormat("en-GB", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
  timeZone: profile.timezone,
});

/**
 * Henok's local time. Renders a stable placeholder on the server so hydration
 * never mismatches, then ticks once per second on the client.
 */
export const LiveClock = ({ className }: { className?: string }) => {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setNow(formatter.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time className={className} suppressHydrationWarning>
      {now ?? "--:--:--"}
    </time>
  );
};
