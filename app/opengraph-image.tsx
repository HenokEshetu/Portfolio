import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GATES = ["clippy", "tests", "cargo-audit", "trivy", "secrets", "argocd"];

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
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(62,230,164,0.18), transparent 60%), radial-gradient(ellipse 60% 60% at 100% 100%, rgba(61,214,245,0.12), transparent 60%), #05070a",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 56,
                height: 56,
                borderRadius: 12,
                border: "1px solid #24313f",
                background: "#0b1016",
                color: "#3ee6a4",
                fontSize: 20,
                letterSpacing: 3,
              }}
            >
              {profile.initials}
            </div>
            <div style={{ color: "#a0acb9", fontSize: 26, fontFamily: "monospace" }}>~/henok</div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "#3ee6a4",
              fontSize: 20,
              fontFamily: "monospace",
              border: "1px solid rgba(62,230,164,0.35)",
              borderRadius: 999,
              padding: "8px 18px",
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#3ee6a4" }} />
            all gates green
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ color: "#a0acb9", fontSize: 30 }}>{profile.name}</div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              marginTop: 14,
              color: "#e9eef3",
              fontSize: 80,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -3,
              maxWidth: 1000,
            }}
          >
            I build security platforms that&nbsp;
            <span style={{ color: "#3ee6a4" }}>fail closed.</span>
          </div>
          <div style={{ marginTop: 26, color: "#a0acb9", fontSize: 28 }}>
            {profile.title}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {GATES.map((gate) => (
            <div
              key={gate}
              style={{
                display: "flex",
                color: "#a0acb9",
                fontSize: 20,
                fontFamily: "monospace",
                border: "1px solid #24313f",
                background: "#0b1016",
                borderRadius: 8,
                padding: "6px 14px",
              }}
            >
              <div style={{ width: 8, height: 8, borderRadius: 999, background: "#3ee6a4", marginRight: 10, alignSelf: "center" }} />
              {gate}
            </div>
          ))}
        </div>
      </div>
    ),
    size
  );
}
