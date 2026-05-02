import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://kids-oekaki.ikk-dev.jp"),
  title: "おえかきひろば",
  description: "子ども向けの楽しいおえかきアプリ。",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "https://kids-oekaki.ikk-dev.jp/",
    siteName: "おえかきひろば",
    title: "おえかきひろば",
    description: "子ども向けの楽しいおえかきアプリ。",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: "キッズおえかき",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "おえかきひろば",
    description: "子ども向けの楽しいおえかきアプリ。",
    images: ["/og"],
  },
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
