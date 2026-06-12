import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eno Image Tools — Privacy-First Image Processing",
    template: "%s | Eno Image Tools",
  },
  description:
    "Free, browser-based image processing suite. Resize, crop, compress, convert, remove metadata, split grids, generate social presets & favicons — all locally. Zero uploads.",
  keywords: [
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
  authors: [{ name: "Eno Tools" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Eno Image Tools",
    title: "Eno Image Tools — Privacy-First Image Processing",
    description:
      "Free, browser-based image processing. Resize, crop, compress, convert, and more — all processed locally. Zero uploads.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eno Image Tools — Privacy-First Image Processing",
    description:
      "Free, browser-based image processing. All processed locally. Zero uploads.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
