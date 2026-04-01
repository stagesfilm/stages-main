import Image from "next/image";
import Link from "next/link";
import { CopyIconButton } from "@/components/CopyIconButton";
import { LexicalContent } from "@/components/LexicalContent";
import { getPayloadClient } from "@/lib/payload";
import type { SiteSetting, SharePage as SharePageType, Media } from "@/payload-types";
import type { SerializedEditorState } from "lexical";

export const revalidate = 3600;

// ─── Fallback assets (public/) ────────────────────────────────────────────────
// Used until the director uploads assets via /admin → Media.

const FALLBACK_PRESS_ADS = [
  "/press-ads/01-StagesPoster.png",
  "/press-ads/STAGES_IG_001b.png",
  "/press-ads/STAGES_IG_002.png",
  "/press-ads/STAGES_IG_003.png",
  "/press-ads/STAGES_IG_004.png",
  "/press-ads/STAGES_IG_005.png",
];

const FALLBACK_PRESS_STILLS = [6, 7, 8, 9, 10, 11, 14, 15, 17, 19, 28, 37].map(
  (n) => `/screen-previews/STAGES-${n}.jpg`
);

// ─── Download button ─────────────────────────────────────────────────────────

function DownloadButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      download
      className="font-meta inline-flex items-center justify-center gap-2 h-[36px] flex-1 bg-foreground text-background text-[11px] font-bold tracking-[0.35px] hover:bg-foreground/90 transition-colors"
    >
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      DOWNLOAD
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function SharePage() {
  const payload = await getPayloadClient();

  const [sharePage, siteSettings] = await Promise.all([
    payload.findGlobal({ slug: "share-page", depth: 1 }) as Promise<SharePageType>,
    payload.findGlobal({ slug: "site-settings" }) as Promise<SiteSetting>,
  ]);

  const siteUrl = siteSettings.siteUrl ?? "https://stages.movie";
  const pressContact = (siteSettings.contactEntries ?? []).find(
    (c) => c.title?.toLowerCase().includes("publicity")
  );
  const pressEmail = pressContact?.email ?? "ChrisDelhomme@LiveNationStudios.com";

  const introText = sharePage.introText ?? "Download and share promotional materials. Help us spread the word about the film.";

  // CMS assets — only use when populated
  const cmsPromoAssets = (sharePage.promotionalAssets ?? []).filter(
    (a) => typeof a.image === "object" && a.image !== null
  );
  const cmsStills = (sharePage.productionStills ?? []).filter(
    (a) => typeof a.image === "object" && a.image !== null
  );

  // Resolve which source to use
  const promoSrcs: Array<{ src: string; label?: string }> =
    cmsPromoAssets.length > 0
      ? cmsPromoAssets.map((a) => ({
          src: (a.image as Media).url ?? `/media/${(a.image as Media).filename}`,
          label: a.label ?? undefined,
        }))
      : FALLBACK_PRESS_ADS.map((src) => ({ src }));

  const stillSrcs: Array<{ src: string }> =
    cmsStills.length > 0
      ? cmsStills.map((a) => ({ src: (a.image as Media).url ?? `/media/${(a.image as Media).filename}` }))
      : FALLBACK_PRESS_STILLS.map((src) => ({ src }));

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
          <p className="text-foreground/70 text-base max-w-xl leading-relaxed">{introText}</p>
        </div>
      </section>

      {/* Press & Promotional */}
      {promoSrcs.length > 0 && (
        <section id="press-promotional" className="py-16 border-t border-border scroll-mt-[80px]">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Press &amp; Promotional
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {promoSrcs.map(({ src, label }, i) => (
                <div
                  key={src}
                  className="group bg-card border border-border overflow-hidden hover:border-foreground/30 transition-colors"
                >
                  <div className="relative aspect-[4/5] bg-background">
                    <Image
                      src={src}
                      alt={label ?? "STAGES promotional material"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 50vw, 33vw"
                      loading={i < 3 ? "eager" : "lazy"}
                      unoptimized={src.startsWith("/press-ads/")}
                    />
                  </div>
                  {label && (
                    <p className="font-meta text-muted text-[10px] tracking-[0.3px] uppercase px-3 pt-2">
                      {label}
                    </p>
                  )}
                  <div className="p-3 flex gap-2">
                    <DownloadButton href={src} />
                    <CopyIconButton url={`${siteUrl}/share#ad-${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Production Stills */}
      {stillSrcs.length > 0 && (
        <section id="production-stills" className="py-16 border-t border-border scroll-mt-[80px]">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Production Stills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {stillSrcs.map(({ src }, i) => (
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
                      loading="lazy"
                      unoptimized={src.startsWith("/screen-previews/")}
                    />
                  </div>
                  <div className="p-3 flex gap-2">
                    <DownloadButton href={src} />
                    <CopyIconButton url={`${siteUrl}/share#still-${i + 1}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Usage Guidelines */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-8">
            Usage Guidelines
          </h2>
          {sharePage.usageGuidelines ? (
            <div className="grid md:grid-cols-2 gap-12">
              <LexicalContent
                content={sharePage.usageGuidelines as unknown as SerializedEditorState}
                className="text-foreground/80 text-[15px] leading-[26px]"
              />
              <div>
                <p className="text-foreground/80 mb-3 text-[15px]">
                  For commercial use or custom assets, please contact our publicity team.
                </p>
                <a
                  href={`mailto:${pressEmail}`}
                  className="text-accent hover:text-accent-hover transition-colors text-sm"
                >
                  {pressEmail}
                </a>
              </div>
            </div>
          ) : (
            /* Default guidelines until CMS is populated */
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-4 text-foreground/80">
                <p>
                  These assets are provided for promotional purposes to help spread awareness
                  about STAGES. You&apos;re welcome to use them on social media, blogs, and
                  editorial content.
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
                  href={`mailto:${pressEmail}`}
                  className="text-accent hover:text-accent-hover transition-colors text-sm"
                >
                  {pressEmail}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Screenings CTA */}
      <section className="py-24 bg-accent">
        <div className="w-full px-6 md:px-[80px] flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <h2
              className="font-display text-[#0a0a0a] leading-none tracking-[-1px] mb-8"
              style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
            >
              SEE STAGES
            </h2>
            <Link
              href="/screenings"
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
