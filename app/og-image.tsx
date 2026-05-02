import { ImageResponse } from "next/og";

export const alt = "キッズおえかき";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, rgb(56 189 248), rgb(37 99 235), rgb(14 116 144))",
          color: "white",
          fontFamily: "sans-serif",
          padding: "48px",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 700 }}>キッズおえかき</div>
        <div style={{ marginTop: 24, fontSize: 38 }}>
          かんたん・たのしい・おえかきアプリ
        </div>
        <div style={{ marginTop: 36, fontSize: 24, opacity: 0.95 }}>
          kids-oekaki.ikk-dev.jp
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
