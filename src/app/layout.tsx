import type { Metadata } from "next";
import { Alegreya, Sofia_Sans_Extra_Condensed, Copse, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";

const alegreya = Alegreya({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-alegreya-family",
});

const sofiaSansEC = Sofia_Sans_Extra_Condensed({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-credits-family",
});

const copse = Copse({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-copse-family",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter-family",
});

const SITE_URL = "https://stagesfilm.com";
const OG_IMAGE = `${SITE_URL}/opengraph.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "STAGES | A Film by Ryan Booth — SXSW 2026 World Premiere",
    template: "%s | STAGES Film",
  },
  description:
    "STAGES is an intimate, observational film by Ryan Booth. After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. World Premiere at SXSW 2026 in Austin, TX.",
  keywords: [
    "STAGES",
    "STAGES film",
    "Ryan Booth",
    "SXSW 2026",
    "SXSW film",
    "David Ramirez",
    "Leslie Grace",
    "Live Nation Studios",
    "indie film",
    "music film",
    "solo tour",
    "Austin TX",
    "world premiere",
    "film festival",
  ],
  authors: [{ name: "Ryan Booth" }],
  creator: "Ryan Booth",
  publisher: "Live Nation Studios",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "STAGES Film",
    title: "STAGES | A Film by Ryan Booth — SXSW 2026 World Premiere",
    description:
      "After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. An intimate, observational film by Ryan Booth. World Premiere at SXSW 2026.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "STAGES — A Film by Ryan Booth. SXSW 2026 World Premiere.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "STAGES | A Film by Ryan Booth — SXSW 2026",
    description:
      "After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. World Premiere at SXSW 2026 in Austin, TX.",
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${alegreya.variable} ${sofiaSansEC.variable} ${copse.variable} ${inter.variable}`}>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/qae3akf.css" />
      </head>
      <body className="antialiased font-sans">
        <Header />
        <main className="min-h-screen">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
