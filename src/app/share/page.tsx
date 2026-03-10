import Image from "next/image";
import Link from "next/link";
import { CopyIconButton } from "@/components/CopyIconButton";

const pressAds = [
  "/press-ads/01-StagesPoster.png",
  "/press-ads/STAGES_IG_001b.png",
  "/press-ads/STAGES_IG_002.png",
  "/press-ads/STAGES_IG_003.png",
  "/press-ads/STAGES_IG_004.png",
  "/press-ads/STAGES_IG_005.png",
];

// Only stills without —X in filename (excluded from share)
const pressStills = [6, 7, 8, 9, 10, 11, 14, 15, 17, 19, 28, 37].map(
  (n) => `/screen-previews/STAGES-${n}.jpg`
);

export default function SharePage() {
  return (
    <>
      {/* Intro */}
      <section className="pt-[148px] pb-20 bg-background">
        <div className="w-full px-6 md:px-[80px]">
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

      {/* Press Ads */}
      <section id="press-promotional" className="py-16 border-t border-border scroll-mt-[80px]">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Press &amp; Promotional
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {pressAds.map((src, i) => (
              <div
                key={src}
                className="group bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors"
              >
                <div className="relative aspect-[4/5] bg-background">
                  <Image
                    src={src}
                    alt="STAGES promotional material"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                </div>
                <div className="p-3 flex gap-2">
                  <a
                    href={src}
                    download
                    className="font-meta inline-flex items-center justify-center gap-2 h-[36px] flex-1 bg-foreground text-background text-[11px] font-bold tracking-[0.35px] hover:bg-foreground/90 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    DOWNLOAD
                  </a>
                  <CopyIconButton url={`https://stagesfilm.com/share#ad-${i + 1}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Press Stills */}
      <section id="production-stills" className="py-16 border-t border-border scroll-mt-[80px]">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Production Stills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pressStills.map((src, i) => (
              <div
                key={src}
                className="group bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors"
              >
                <div className="relative aspect-[3/2] bg-background">
                  <Image
                    src={src}
                    alt="STAGES production still"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3 flex gap-2">
                  <a
                    href={src}
                    download
                    className="font-meta inline-flex items-center justify-center gap-2 h-[36px] flex-1 bg-foreground text-background text-[11px] font-bold tracking-[0.35px] hover:bg-foreground/90 transition-colors"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    DOWNLOAD
                  </a>
                  <CopyIconButton url={`https://stagesfilm.com/share#still-${i + 1}`} />
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
                href="mailto:ChrisDelhomme@LiveNationStudios.com"
                className="text-accent hover:text-accent-hover transition-colors text-sm"
              >
                ChrisDelhomme@LiveNationStudios.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Copy Link + CTA */}
      <section className="py-24 bg-accent">
        <div className="w-full px-6 md:px-[80px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2
              className="font-display text-[#0a0a0a] leading-none tracking-[-1px] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              SEE STAGES AT SXSW 2026
            </h2>
            <Link
              href="/#screenings"
              className="font-meta inline-flex items-center justify-center h-[52px] px-8 border border-[#0a0a0a] text-[#0a0a0a] font-bold text-sm tracking-[0.35px] hover:bg-[#0a0a0a] hover:text-foreground transition-colors w-fit"
            >
              VIEW SCREENINGS
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
