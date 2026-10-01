import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.profile.name} portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { name, role } = portfolio.profile;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(160deg, #0e1524 0%, #05070d 70%)",
          color: "#f3eee0",
        }}
      >
        <div style={{ display: "flex", fontSize: 40, color: "#5aa9ff" }}>MH.</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 120, fontWeight: 700, lineHeight: 1.05 }}>
            {name}
          </div>
          <div style={{ display: "flex", fontSize: 44, marginTop: 20, color: "#5aa9ff" }}>
            {role}
          </div>
        </div>
      </div>
    ),
    size
  );
}