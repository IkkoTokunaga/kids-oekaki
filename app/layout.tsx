import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/icon", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: [{ url: "/favicon.ico" }, { url: "/icon", type: "image/png" }],
    apple: [{ url: "/icon", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
