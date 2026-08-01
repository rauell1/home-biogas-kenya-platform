import type { Metadata } from "next";
import { Unbounded, Newsreader, Manrope, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const display = Unbounded({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-family",
  display: "swap",
});
const editorial = Newsreader({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-editorial-family",
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans-family",
  display: "swap",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-family",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Home Biogas Kenya — Waste contains energy",
    template: "%s · Home Biogas Kenya",
  },
  description:
    "Home Biogas Kenya designs and builds biogas and organic-waste systems for homes, farms, institutions and commercial facilities.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "Home Biogas Kenya — Waste contains energy",
    description: "Biogas and organic-waste systems for homes, farms, institutions and commercial facilities.",
    images: [{ url: "/brand/home-biogas-kenya-logo.png", width: 460, height: 219, alt: "Home Biogas Kenya" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${editorial.variable} ${sans.variable} ${mono.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
