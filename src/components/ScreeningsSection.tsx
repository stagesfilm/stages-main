"use client";

import Link from "next/link";
import { getUpcomingScreenings } from "@/lib/screenings";
import { ScrollReveal } from "@/components/ScrollReveal";

export function ScreeningsSection() {
  const upcoming = getUpcomingScreenings();

  if (upcoming.length === 0) return null;

  return (
    <section id="screenings" className="bg-background border-t border-[rgba(245,245,245,0.2)]">
      <ScrollReveal className="w-full px-6 md:px-[80px] pt-[81px] pb-20">
        <h2 className="font-display text-foreground text-[40px] md:text-[72px] leading-[1] tracking-[-3.6px] uppercase mb-[48px] reveal">
          SXSW 2026
          <br />
          SCREENINGS
        </h2>

        <div className="flex flex-col">
          {upcoming.map((s, i) => (
            <Link
              key={`${s.eventDate}-${s.venue}`}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="reveal border-b border-[rgba(245,245,245,0.1)] hover:bg-white/[0.03] transition-colors group"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Desktop row */}
              <div className="hidden md:block">
                <div className="flex items-center h-[49px]">
                  <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] pl-[24px] pr-[16px] lg:pr-[20px] whitespace-nowrap shrink-0">
                    {s.date}
                  </span>
                  <span className="font-meta text-foreground text-[16px] leading-[24px] pr-[16px] lg:pr-[20px] whitespace-nowrap shrink-0">
                    {s.time}
                  </span>
                  <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] flex-1 truncate min-w-0">
                    {s.venue}
                  </span>
                  <span className="font-meta text-foreground/60 text-[16px] leading-[24px] px-[16px] lg:px-[20px] whitespace-nowrap shrink-0">
                    {s.location}
                  </span>
                  <span className="font-meta text-accent text-[14px] font-bold tracking-[0.35px] whitespace-nowrap shrink-0 text-right group-hover:translate-x-1 transition-transform">
                    TICKETS →
                  </span>
                </div>
                {s.note && (
                  <p className="font-meta text-foreground/40 text-[12px] leading-[16px] italic pl-[24px] pb-[10px] -mt-[4px]">
                    {s.note}
                  </p>
                )}
              </div>

              {/* Mobile card */}
              <div className="md:hidden flex items-center justify-between py-4 gap-4">
                <div className="flex flex-col gap-[2px]">
                  <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                    {s.date} · {s.time}
                  </span>
                  <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                    {s.venue}
                  </span>
                  {s.note && (
                    <span className="font-meta text-foreground/40 text-[12px] leading-[16px] italic mt-[2px]">
                      {s.note}
                    </span>
                  )}
                </div>
                <span className="font-meta text-accent text-[13px] font-bold tracking-[0.35px] shrink-0 group-hover:translate-x-1 transition-transform">
                  TICKETS →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </ScrollReveal>
    </section>
  );
}
