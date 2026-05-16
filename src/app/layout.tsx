import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "KOVA MK-1 — Precision Meets Poetry",
  description:
    "A premium mechanical keyboard inspired by Japanese craft. Hot-swap, gasket mount, CNC aluminum. Pre-order from $189.",
  openGraph: {
    title: "KOVA MK-1 — Precision Meets Poetry",
    description: "A premium mechanical keyboard inspired by Japanese craft.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
