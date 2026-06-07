import { ImageResponse } from "next/og";
import { caseStudies, getCaseStudy } from "@/lib/case-studies";
import { siteConfig } from "@/lib/site-config";

export const runtime = "edge";
export const alt = "Project case study";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

type OgImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: OgImageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug) ?? caseStudies[0];
  const accent =
    project.accent === "rose"
      ? "rgba(255,178,199,0.34)"
      : "rgba(97,244,255,0.35)";

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
            background: `radial-gradient(circle at 22% 18%, ${accent}, transparent 340px), radial-gradient(circle at 82% 26%, rgba(139,92,246,0.32), transparent 360px), radial-gradient(circle at 52% 88%, rgba(255,178,199,0.18), transparent 320px), linear-gradient(135deg, #04050a, #080a14 48%, #04050a)`,
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
            padding: "82px 92px",
          }}
        >
          <div
            style={{
              display: "flex",
              color: "#61f4ff",
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Premium Case Study
          </div>
          <div
            style={{
              marginTop: 38,
              fontSize: project.name.length > 8 ? 88 : 108,
              lineHeight: 0.88,
              fontWeight: 950,
              letterSpacing: -2,
              textTransform: "uppercase",
            }}
          >
            {project.name}
          </div>
          <div
            style={{
              marginTop: 24,
              maxWidth: 900,
              fontSize: 42,
              lineHeight: 1.08,
              fontWeight: 800,
              color: "#dbe8ff",
            }}
          >
            {project.tagline}
          </div>
          <div
            style={{
              marginTop: 34,
              fontSize: 26,
              color: "rgba(200,215,255,0.76)",
          }}
        >
          {`${siteConfig.name} · ${project.stack.join(" · ")}`}
        </div>
        </div>
      </div>
    ),
    size,
  );
}
