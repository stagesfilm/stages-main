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

type ScreeningGroup = {
  label: string;
  upcoming: Screening[];
  past: Screening[];
};

function groupScreenings(screenings: Screening[]): ScreeningGroup[] {
  const map = new Map<string, ScreeningGroup>();

  for (const s of screenings) {
    if (!map.has(s.eventGroup)) {
      map.set(s.eventGroup, { label: s.eventGroup, upcoming: [], past: [] });
    }
    const group = map.get(s.eventGroup)!;
    if (isUpcoming(s.eventDate)) {
      group.upcoming.push(s);
    } else {
      group.past.push(s);
    }
  }

  // Sort groups: those with upcoming screenings first, then past-only groups
  return Array.from(map.values()).sort((a, b) => {
    const aHasUpcoming = a.upcoming.length > 0 ? 0 : 1;
    const bHasUpcoming = b.upcoming.length > 0 ? 0 : 1;
    return aHasUpcoming - bHasUpcoming;
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

        {groups.map((group) => (
          <div key={group.label} className="mb-[72px] last:mb-0">
            {/* Group heading */}
            <h2 className="reveal font-meta font-bold text-foreground/40 text-[11px] tracking-[0.12em] uppercase mb-[16px] pl-[24px]">
              {group.label}
            </h2>

            {/* Upcoming screenings */}
            {group.upcoming.length > 0 && (
              <div className="flex flex-col border-t border-[rgba(245,245,245,0.2)]">
                {group.upcoming.map((s, i) => (
                  <ScreeningRow key={s.id} screening={s} index={i} />
                ))}
              </div>
            )}

            {/* Past screenings — muted, collapsed visually */}
            {group.past.length > 0 && (
              <div className={`flex flex-col ${group.upcoming.length > 0 ? "mt-[24px]" : "border-t border-[rgba(245,245,245,0.2)]"}`}>
                <h2 className="reveal font-meta font-bold text-foreground/30 text-[11px] tracking-[0.12em] uppercase pl-[24px] py-[12px] border-b border-[rgba(245,245,245,0.08)]">
                  Past Events
                </h2>
                {group.past.map((s, i) => (
                  <ScreeningRow key={s.id} screening={s} index={i} isPast />
                ))}
              </div>
            )}
          </div>
        ))}

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
