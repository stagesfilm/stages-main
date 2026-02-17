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

export const metadata: Metadata = {
  title: "STAGES | A Film by Ryan Booth",
  description: "STAGES — An intimate, observational film. SXSW 2026.",
  openGraph: {
    title: "STAGES | A Film by Ryan Booth",
    description: "STAGES — An intimate, observational film. SXSW 2026.",
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
