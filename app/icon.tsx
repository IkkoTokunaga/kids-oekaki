import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #a7f3d0 0%, #fbcfe8 100%)",
          borderRadius: 14,
          fontSize: 42,
        }}
      >
        {"\u{1F58C}\uFE0F"}
      </div>
    ),
    {
      ...size,
    },
  );
}
