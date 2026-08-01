import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Home Biogas Kenya  -  Waste contains energy";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#121412",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          color: "#faf8f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              background: "#5db7c4",
              color: "#121412",
              padding: "6px 16px",
              fontSize: "16px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            HOME BIOGAS KENYA
          </div>
          <span style={{ color: "#a85532", fontSize: "16px", letterSpacing: "1px" }}>
            ENGINEERING & RENEWABLE ENERGY
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "900px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              lineHeight: 1.1,
              color: "#faf8f5",
              margin: 0,
            }}
          >
            Waste contains energy. We engineer the system that releases it.
          </h1>
          <p style={{ fontSize: "24px", color: "rgba(250, 248, 245, 0.75)", margin: 0 }}>
            Closed-loop anaerobic digesters & organic-waste management for homes, farms, institutions and commercial facilities in East Africa.
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            borderTop: "1px solid rgba(250, 248, 245, 0.2)",
            paddingTop: "24px",
            fontSize: "18px",
            color: "rgba(250, 248, 245, 0.5)",
          }}
        >
          <span>Nairobi, Kenya · homebiogas.co.ke</span>
          <span style={{ color: "#5db7c4" }}>ENERGY + BIO-SLURRY RECOVERY</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
