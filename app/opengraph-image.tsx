import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "RURO · Your only digital house that tells your story in your way";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The share card: warm ivory with a soft blue wash at the foot, ink type and the RURO blue and velvet accents. */
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "linear-gradient(180deg, #f7f3eb 0%, #f7f3eb 62%, #f1dedc 100%)",
          color: "#252521",
        }}
      >
        <div style={{ display: "flex", fontSize: 44, letterSpacing: 10, fontFamily: "serif" }}>RURO</div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.04, letterSpacing: -2, fontFamily: "serif" }}>
          <span>Your only digital house</span>
          <span style={{ fontStyle: "italic", color: "#85101c" }}>that tells your story</span>
          <span style={{ fontStyle: "italic", color: "#6f2029" }}>in your way.</span>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#706b64", letterSpacing: 2 }}>PERSONAL WEBSITES FOR FOUNDERS AND EXECUTIVES · RURO.IN</div>
      </div>
    ),
    size,
  );
}
