import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "বাজার দর — আজকের বাজারদর",
    template: "%s | বাজার দর",
  },
  description:
    "চাল, ডাল, মাছ, মাংস, সবজি ও নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন। দাম তুলনা করুন এবং সচেতনভাবে বাজার করুন।",
  applicationName: "বাজার দর",
  keywords: [
    "বাজার দর",
    "বাংলাদেশ বাজারদর",
    "আজকের বাজার",
    "পণ্যের দাম",
    "Bazar Dor",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
