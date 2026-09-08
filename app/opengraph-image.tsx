import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08090b",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 52,
              height: 52,
              borderRadius: 10,
              border: "1px solid #2b323e",
              background: "#101317",
              color: "#4fd6c4",
              fontSize: 20,
              letterSpacing: 2,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ color: "#9aa2ae", fontSize: 26 }}>{profile.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#eceef1",
              fontSize: 76,
              lineHeight: 1.05,
              letterSpacing: -2.5,
              maxWidth: 940,
            }}
          >
            Security engineer &amp; full-stack developer
          </div>
          <div
            style={{
              marginTop: 28,
              color: "#9aa2ae",
              fontSize: 28,
              lineHeight: 1.5,
              maxWidth: 820,
            }}
          >
            {profile.tagline}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 44, height: 3, background: "#4fd6c4" }} />
          <div style={{ color: "#6b7381", fontSize: 22, letterSpacing: 1 }}>
            Rust · Go · TypeScript · Kubernetes
          </div>
        </div>
      </div>
    ),
    size
  );
}
