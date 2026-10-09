import type { Metadata } from "next";
import { Geist_Mono, Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/layout/toast-provider";


const bengaliFont = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const latinFont = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const monoFont = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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
      className={`${bengaliFont.variable} ${latinFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
