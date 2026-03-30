import type { Metadata } from "next";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";
import { ScrollReveal } from "@/components/ScrollReveal";
import { LumaCheckout } from "@/components/LumaCheckout";
import type { Screening } from "@/payload-types";

export const metadata: Metadata = {
  title: "Screenings",
  description: "Find screenings and upcoming events for STAGES, a film by Ryan Booth.",
};

// Revalidate once per hour so screening data stays fresh without a full rebuild
export const revalidate = 3600;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isUpcoming(eventDate: string): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return eventDate >= today;
}

const GENERAL_GROUP_KEY = "__general";

type ScreeningGroup = {
  /** Stable map key; GENERAL_GROUP_KEY when event group is unset */
  key: string;
  /** Shown as sub-heading; empty for general / ungrouped screenings */
  label: string;
  upcoming: Screening[];
  past: Screening[];
};

function bucketForEventGroup(raw: string | null | undefined): { key: string; label: string } {
  const t = typeof raw === "string" ? raw.trim() : "";
  if (!t) return { key: GENERAL_GROUP_KEY, label: "" };
  return { key: t, label: t };
}

function groupScreenings(screenings: Screening[]): ScreeningGroup[] {
  const map = new Map<string, ScreeningGroup>();

  for (const s of screenings) {
    const { key, label } = bucketForEventGroup(s.eventGroup);
    if (!map.has(key)) {
      map.set(key, { key, label, upcoming: [], past: [] });
    }
    const group = map.get(key)!;
    if (isUpcoming(s.eventDate)) {
      group.upcoming.push(s);
    } else {
      group.past.push(s);
    }
  }

  // Sort: upcoming groups first; within that, named groups before unlabeled; then A–Z
  return Array.from(map.values()).sort((a, b) => {
    const aHasUpcoming = a.upcoming.length > 0 ? 0 : 1;
    const bHasUpcoming = b.upcoming.length > 0 ? 0 : 1;
    if (aHasUpcoming !== bHasUpcoming) return aHasUpcoming - bHasUpcoming;

    const aGeneral = a.key === GENERAL_GROUP_KEY ? 1 : 0;
    const bGeneral = b.key === GENERAL_GROUP_KEY ? 1 : 0;
    if (aGeneral !== bGeneral) return aGeneral - bGeneral;

    return a.label.localeCompare(b.label, undefined, { sensitivity: "base" });
  });
}

// ─── Screening Row ────────────────────────────────────────────────────────────

function ScreeningRow({ screening, index, isPast }: { screening: Screening; index: number; isPast?: boolean }) {
  const rowClasses = `reveal border-b border-[rgba(245,245,245,0.1)] transition-colors group ${
    isPast ? "opacity-40 hover:opacity-60" : "hover:bg-white/[0.03]"
  }`;

  const ctaContent = (() => {
    if (screening.ticketingType === "luma" && screening.lumaEventUrl) {
      return <LumaCheckout lumaEventUrl={screening.lumaEventUrl} label="RSVP" />;
    }
    const href = screening.ticketUrl ?? "#";
    return (
      <span className="font-meta text-accent text-[14px] font-bold tracking-[0.35px] whitespace-nowrap shrink-0 group-hover:translate-x-1 transition-transform">
        TICKETS →
      </span>
    );
  })();

  const rowInner = (
    <>
      {/* Desktop row */}
      <div className="hidden md:block">
        <div className="flex items-center h-[49px]">
          <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] pl-[24px] pr-[16px] lg:pr-[20px] whitespace-nowrap shrink-0">
            {screening.date}
          </span>
          <span className="font-meta text-foreground text-[16px] leading-[24px] pr-[16px] lg:pr-[20px] whitespace-nowrap shrink-0">
            {screening.time}
          </span>
          <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] flex-1 truncate min-w-0">
            {screening.venue}
          </span>
          <span className="font-meta text-foreground/60 text-[16px] leading-[24px] px-[16px] lg:px-[20px] whitespace-nowrap shrink-0">
            {screening.location}
          </span>
          {ctaContent}
        </div>
        {screening.note && (
          <p className="font-meta text-foreground/40 text-[12px] leading-[16px] italic pl-[24px] pb-[10px] -mt-[4px]">
            {screening.note}
          </p>
        )}
      </div>

      {/* Mobile card */}
      <div className="md:hidden flex items-center justify-between py-4 gap-4">
        <div className="flex flex-col gap-[2px]">
          <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
            {screening.date} · {screening.time}
          </span>
          <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
            {screening.venue}
          </span>
          <span className="font-meta text-foreground/60 text-[13px] leading-[18px]">
            {screening.location}
          </span>
          {screening.note && (
            <span className="font-meta text-foreground/40 text-[12px] leading-[16px] italic mt-[2px]">
              {screening.note}
            </span>
          )}
        </div>
        <div className="shrink-0">{ctaContent}</div>
      </div>
    </>
  );

  // Luma rows don't need an outer <Link> — the LumaCheckout button is the CTA
  if (screening.ticketingType === "luma") {
    return (
      <div
        key={screening.id}
        className={rowClasses}
        style={{ transitionDelay: `${index * 60}ms` }}
      >
        {rowInner}
      </div>
    );
  }

  return (
    <Link
      key={screening.id}
      href={screening.ticketUrl ?? "#"}
      target="_blank"
      rel="noopener noreferrer"
      className={rowClasses}
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      {rowInner}
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ScreeningsPage() {
  const payload = await getPayloadClient();

  const { docs: screenings } = await payload.find({
    collection: "screenings",
    where: {
      and: [
        { visibility: { equals: "public" } },
        { published: { equals: true } },
      ],
    },
    sort: "eventDate",
    limit: 200,
  });

  const groups = groupScreenings(screenings as Screening[]);
  const hasAnyUpcoming = groups.some((g) => g.upcoming.length > 0);

  return (
    <div className="bg-background min-h-screen">
      <ScrollReveal className="w-full px-6 md:px-[80px] pt-[140px] pb-20">
        {/* Page header */}
        <h1 className="reveal font-display text-foreground text-[40px] md:text-[72px] leading-[1] tracking-[-3.6px] uppercase mb-[12px]">
          SCREENINGS
        </h1>
        {!hasAnyUpcoming && groups.length > 0 && (
          <p className="reveal font-meta text-foreground/50 text-[15px] leading-[22px] mb-[64px]">
            No upcoming events scheduled. Check back soon for new screenings.
          </p>
        )}

        {groups.length === 0 && (
          <p className="reveal font-meta text-foreground/50 text-[15px] leading-[22px] mb-[64px]">
            No screenings currently scheduled. Check back soon.
          </p>
        )}

        {/* Upcoming screenings by group */}
        {groups.map((group) =>
          group.upcoming.length > 0 && (
            <div key={group.key} className="mb-[72px]">
              {group.label && (
                <h2 className="reveal font-meta font-bold text-foreground/40 text-[11px] tracking-[0.12em] uppercase mb-[16px] pl-[24px]">
                  {group.label}
                </h2>
              )}
              <div className="flex flex-col border-t border-[rgba(245,245,245,0.2)]">
                {group.upcoming.map((s, i) => (
                  <ScreeningRow key={s.id} screening={s} index={i} />
                ))}
              </div>
            </div>
          )
        )}

        {/* Past events — all groups combined under one heading */}
        {groups.some((g) => g.past.length > 0) && (
          <div className="mt-[24px]">
            <h2
              className="reveal font-display text-foreground/40 leading-[1] tracking-[-2px] uppercase mb-[32px]"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
            >
              PAST EVENTS
            </h2>
            {groups.map((group) =>
              group.past.length > 0 && (
                <div key={`past-${group.key}`} className="mb-[48px] last:mb-0">
                  {group.label && (
                    <h3 className="reveal font-meta font-bold text-foreground/30 text-[11px] tracking-[0.12em] uppercase mb-[16px] pl-[24px]">
                      {group.label}
                    </h3>
                  )}
                  <div className="flex flex-col border-t border-[rgba(245,245,245,0.1)]">
                    {group.past.map((s, i) => (
                      <ScreeningRow key={s.id} screening={s} index={i} isPast />
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        )}

        {/* CTA back to film info */}
        <div className="reveal mt-[80px] pt-[48px] border-t border-[rgba(245,245,245,0.1)]">
          <p className="font-meta text-foreground/50 text-[13px] leading-[20px]">
            For press inquiries and materials,{" "}
            <a href="/press" className="text-accent hover:underline">
              visit the press page
            </a>
            .
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
