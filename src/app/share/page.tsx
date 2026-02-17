import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyButton } from "@/components/CopyButton";

export const metadata: Metadata = {
  title: "Share STAGES",
  description:
    "Download and share promotional materials for STAGES — production stills, posters, and assets for social media. A film by Ryan Booth, SXSW 2026.",
  openGraph: {
    title: "Share STAGES | Download Promotional Assets",
    description:
      "Download and share promotional materials for STAGES — production stills, posters, and assets for social media. A film by Ryan Booth, SXSW 2026.",
    url: "https://stagesfilm.com/share",
  },
  alternates: {
    canonical: "https://stagesfilm.com/share",
  },
};

const assets = [
  {
    id: "1",
    title: "Production Still – Motel Room",
    description: "Behind the scenes conversation",
    image: "/home-hero.png",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Performance Still – Stage",
    description: "David performing live",
    image: "/david-on-stage.png",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Performance Still – Venue",
    description: "Intimate venue performance",
    image: "/david-singing.png",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "On the Road",
    description: "Life on tour",
    image: "/david-with-gear.png",
    downloadUrl: "#",
  },
];

export default function SharePage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-[120px] pb-20 bg-background">
        <div className="w-full px-6 md:px-[80px]">
          <p className="font-meta text-muted text-xs tracking-[0.3px] uppercase mb-4">
            Share
          </p>
          <h1
            className="font-display text-foreground leading-none tracking-[-1px] mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            SHARE
            <br />
            STAGES
          </h1>
          <p className="text-foreground/70 text-base max-w-xl leading-relaxed">
            Download and share promotional materials. Help us spread the word about the film.
          </p>
        </div>
      </section>

      {/* Asset Grid */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <div className="grid md:grid-cols-2 gap-6">
            {assets.map((asset) => (
              <div
                key={asset.id}
                id={asset.id}
                className="group bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors"
              >
                <div className="relative aspect-[4/3] bg-background">
                  <Image
                    src={asset.image}
                    alt={asset.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-1">{asset.title}</h3>
                  <p className="text-sm text-muted mb-5">{asset.description}</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={asset.downloadUrl}
                      className="font-meta inline-flex items-center justify-center gap-2 h-[52px] px-8 bg-foreground text-background text-sm font-bold tracking-[0.35px] hover:bg-foreground/90 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      DOWNLOAD
                    </a>
                    <CopyButton url={`https://stagesfilm.com/share#${asset.id}`} label="Copy asset link" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guidelines */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-8">
            Usage Guidelines
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4 text-foreground/80">
              <p>
                These assets are provided for promotional purposes to help spread awareness
                about STAGES. You&apos;re welcome to use them on social media, blogs, and editorial content.
              </p>
              <p className="font-semibold text-foreground">
                Please credit the film when sharing: STAGES (2026)
              </p>
            </div>
            <div>
              <p className="text-foreground/80 mb-3">
                For commercial use or custom assets, please contact our publicity team.
              </p>
              <a
                href="mailto:ChrisDeHaan@LiveNationStudios.com"
                className="text-accent hover:text-accent-hover transition-colors text-sm"
              >
                ChrisDeHaan@LiveNationStudios.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="w-full px-6 md:px-[80px]">
          <h2
            className="font-display text-[#0a0a0a] leading-none tracking-[-1px] mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            SEE STAGES AT SXSW 2026
          </h2>
          <Link
            href="/#screenings"
            className="font-meta inline-flex items-center justify-center h-[52px] px-8 border border-[#0a0a0a] text-[#0a0a0a] font-bold text-sm tracking-[0.35px] hover:bg-[#0a0a0a] hover:text-foreground transition-colors"
          >
            VIEW SCREENINGS
          </Link>
        </div>
      </section>
    </>
  );
}
