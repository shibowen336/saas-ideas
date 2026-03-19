import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { siteConfig } from "@/lib/site";

import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "SaaS Idea Validator",
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }]
  },
  twitter: {
    card: "summary_large_image",
    images: [siteConfig.ogImage]
  },
  icons: {
    icon: "/brand-mark.svg",
    shortcut: "/brand-mark.svg",
    apple: "/brand-mark.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-clay text-slate-900 antialiased">
        <div className="relative min-h-screen overflow-x-hidden">{children}</div>
      </body>
    </html>
  );
}
