import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Harshal - Full Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#04050a",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 22% 18%, rgba(97,244,255,0.35), transparent 340px), radial-gradient(circle at 82% 26%, rgba(139,92,246,0.34), transparent 360px), radial-gradient(circle at 52% 88%, rgba(255,178,199,0.22), transparent 320px), linear-gradient(135deg, #04050a, #080a14 48%, #04050a)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 44,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 42,
            background: "rgba(255,255,255,0.045)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14), 0 40px 120px rgba(0,0,0,0.45)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "86px 92px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              color: "#61f4ff",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                borderRadius: 999,
                background: "#61f4ff",
                boxShadow: "0 0 28px rgba(97,244,255,0.85)",
              }}
            />
            Available For New Projects
          </div>
          <div
            style={{
              marginTop: 44,
              fontSize: 104,
              lineHeight: 0.88,
              fontWeight: 950,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {siteConfig.name}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 56,
              lineHeight: 1,
              fontWeight: 850,
              color: "#dbe8ff",
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              marginTop: 36,
              maxWidth: 860,
              fontSize: 30,
              lineHeight: 1.35,
              color: "rgba(200,215,255,0.76)",
            }}
          >
            Next.js, React, AI solutions and premium business platforms built for real outcomes.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
