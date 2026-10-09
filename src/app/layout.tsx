import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fontSans = localFont({
  src: "../../public/fonts/font4.woff2",
  variable: "--font-sans",
  display: "swap",
});

const fontAccent = localFont({
  src: "../../public/fonts/Coffespark.ttf",
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Enopix — Privacy-First Image Processing",
    template: "%s | Enopix",
  },
  description:
    "Free, browser-based image processing suite. Resize, crop, compress, convert, remove metadata, split grids, generate social presets & favicons — all locally. Zero uploads.",
  keywords: [
    "enopix",
    "image tools",
    "image resize",
    "image compress",
    "image converter",
    "favicon generator",
    "social media presets",
    "privacy image editor",
    "browser image processing",
    "EXIF remover",
    "image crop",
    "grid split",
  ],
  authors: [{ name: "Enopix" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Enopix",
    title: "Enopix — Privacy-First Image Processing",
    description:
      "Free, browser-based image processing. Resize, crop, compress, convert, and more — all processed locally. Zero uploads.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enopix — Privacy-First Image Processing",
    description:
      "Free, browser-based image processing. All processed locally. Zero uploads.",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/enopix.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontAccent.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
