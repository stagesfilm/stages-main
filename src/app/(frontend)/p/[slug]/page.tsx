import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import { LumaCheckout } from "@/components/LumaCheckout";
import { TeaserVideo } from "@/components/TeaserVideo";
import { LexicalContent } from "@/components/LexicalContent";
import type { SerializedEditorState } from "lexical";
import type { LandingPage, Screening } from "@/payload-types";

export const dynamic = "force-dynamic";

// ─── Metadata: always noindex per-page ───────────────────────────────────────

const NO_INDEX_ROBOTS = {
  index: false,
  follow: false,
  googleBot: { index: false, follow: false },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const base: Metadata = { robots: NO_INDEX_ROBOTS };

  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "landing-pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const page = docs[0] as LandingPage | undefined;
  if (!page || !page.published) return base;

  return {
    ...base,
    title: page.title,
    description: page.subtitle ?? undefined,
  };
}

// ─── CTA component ───────────────────────────────────────────────────────────

function CtaButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center h-[52px] px-8 bg-accent text-[#0a0a0a] font-meta font-bold text-sm tracking-[0.35px] hover:opacity-90 transition-opacity"
    >
      {label} →
    </a>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function LandingPageRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayloadClient();

  const { docs } = await payload.find({
    collection: "landing-pages",
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  });

  const page = docs[0] as LandingPage | undefined;
  if (!page || !page.published) notFound();

  const screenings = (page.screenings ?? []).filter(
    (s): s is Screening => typeof s === "object" && s !== null
  );

  const hasLumaScreenings = screenings.some(
    (s) => s.ticketingType === "luma" && s.lumaEventUrl
  );

  const hasVideo = Boolean(page.teaserVideoId);

  return (
    <div className="bg-background min-h-screen">
      {/* ── Teaser video ── */}
      {hasVideo && (
        <section className="w-full bg-black">
          <TeaserVideo videoId={page.teaserVideoId!} mode="player" />
        </section>
      )}

      {/* ── Content — full-width, centered ── */}
      <div className={`w-full px-6 md:px-[80px] ${hasVideo ? "pt-[64px]" : "pt-[140px]"} pb-[120px]`}>
        <div className="max-w-[1200px] mx-auto">

          {/* Title */}
          <h1 className="font-display text-foreground text-[40px] md:text-[68px] leading-[1] tracking-[-2.4px] uppercase mb-[20px] max-w-[60ch] mx-auto text-center">
            {page.title}
          </h1>

          {/* Subtitle */}
          {page.subtitle && (
            <p className="font-meta text-foreground/70 text-[16px] leading-[26px] max-w-[60ch] mx-auto mb-[48px] text-center">
              {page.subtitle}
            </p>
          )}

          {/* Separator */}
          {!page.subtitle && <div className="mb-[48px]" />}

          {/*
           * Rich text content — no max-width here.
           * Prose elements (p, h2, etc.) are capped at 60ch via CSS.
           * Block elements (images, videos, logo bars) break out and
           * control their own width through component-level classes.
           */}
          {page.content && (
            <div className="mb-[56px]">
              <LexicalContent
                content={page.content as unknown as SerializedEditorState}
              />
            </div>
          )}

          {/* Event details */}
          {screenings.length > 0 && (
            <div className="mb-[56px] max-w-[60ch] mx-auto">
              <p className="font-meta font-bold text-foreground/40 text-[11px] tracking-[0.14em] uppercase mb-[16px]">
                EVENT DETAILS
              </p>
              <div className="flex flex-col border-t border-[rgba(245,245,245,0.2)]">
                {screenings.map((s) => (
                  <div
                    key={s.id}
                    className="border-b border-[rgba(245,245,245,0.1)] py-[20px]"
                  >
                    {/* Desktop */}
                    <div className="hidden md:flex items-center gap-[20px]">
                      <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] shrink-0 min-w-[56px]">
                        {s.date}
                      </span>
                      <span className="font-meta text-foreground text-[16px] leading-[24px] shrink-0 min-w-[72px]">
                        {s.time}
                      </span>
                      <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] flex-1">
                        {s.venue}
                      </span>
                      <span className="font-meta text-foreground/60 text-[16px] leading-[24px] shrink-0">
                        {s.location}
                      </span>
                      <div className="shrink-0 ml-[20px]">
                        {s.ticketingType === "luma" && s.lumaEventUrl ? (
                          <LumaCheckout lumaEventUrl={s.lumaEventUrl} label="RSVP" />
                        ) : s.ticketUrl ? (
                          <a
                            href={s.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-meta font-bold text-accent text-[14px] tracking-[0.35px] hover:translate-x-1 transition-transform inline-block"
                          >
                            TICKETS →
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {/* Mobile */}
                    <div className="md:hidden flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-[4px]">
                        <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                          {s.date} · {s.time}
                        </span>
                        <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                          {s.venue}
                        </span>
                        <span className="font-meta text-foreground/60 text-[13px] leading-[18px]">
                          {s.location}
                        </span>
                      </div>
                      <div className="shrink-0 mt-[2px]">
                        {s.ticketingType === "luma" && s.lumaEventUrl ? (
                          <LumaCheckout lumaEventUrl={s.lumaEventUrl} label="RSVP" />
                        ) : s.ticketUrl ? (
                          <a
                            href={s.ticketUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-meta font-bold text-accent text-[13px] tracking-[0.35px]"
                          >
                            TICKETS →
                          </a>
                        ) : null}
                      </div>
                    </div>

                    {s.note && (
                      <p className="font-meta text-foreground/40 text-[12px] leading-[16px] italic mt-[8px]">
                        {s.note}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Fallback CTA when no Luma screenings */}
          {!hasLumaScreenings && page.ctaUrl && (
            <div className="mt-[8px] max-w-[60ch] mx-auto">
              <CtaButton href={page.ctaUrl} label={page.ctaLabel ?? "RSVP"} />
            </div>
          )}

          {/* Bottom micro-copy */}
          <p className="font-meta text-foreground/30 text-[12px] leading-[18px] mt-[64px] max-w-[60ch] mx-auto">
            This is a private, invitation-only page. Please do not share publicly.
          </p>
        </div>
      </div>
    </div>
  );
}

