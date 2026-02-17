"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";

export interface CharacterCard {
  characterName: string;
  performedBy: string;
  actorName: string;
  image1: string;
  image2: string;
  image1Alt?: string;
  image2Alt?: string;
  quote?: string;
}

/* ── Auto-generated palette ─────────────────────────────────── */

const PALETTE = [
  "#acb1ab", // sage
  "#f7bdb2", // salmon
  "#e4dad1", // cream
  "#91a6b4", // dusty blue
  "#b5acaf", // mauve
  "#afa393", // taupe
  "#d4c5a9", // sand
  "#bec8b7", // mint
  "#e8c8c8", // blush
  "#c8bfa8", // khaki
];

function getColor(i: number, total: number): string {
  const step = Math.max(3, Math.floor(PALETTE.length / Math.max(total, 1)));
  return PALETTE[(i * step + 1) % PALETTE.length];
}

/* ── Layout variants (simplified: 1 or 2 images + text) ─────── */

const LAYOUT_SEQUENCE = [0, 2, 1, 3, 0, 2, 1, 3, 0, 2];

function getLayout(i: number): number {
  return LAYOUT_SEQUENCE[i % LAYOUT_SEQUENCE.length];
}

/* ── Subtle rotation per card ───────────────────────────────── */

const ROTATIONS = [0.3, -0.7, 0.45, -1.0, 0.15, -0.5, 0.8, -0.25, 0.6, -0.9];

function getRotation(i: number): number {
  return ROTATIONS[i % ROTATIONS.length];
}

/* ── Main component ─────────────────────────────────────────── */

interface Props {
  characters: CharacterCard[];
}

export function FeaturingSection({ characters }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeIdx !== null && cardRef.current) {
      const timeout = setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 80);
      return () => clearTimeout(timeout);
    }
  }, [activeIdx]);

  function handleTabClick(i: number) {
    setActiveIdx((prev) => (prev === i ? null : i));
  }

  return (
    <section className="bg-[#f5f5f5] py-16 md:py-[80px]">
      <div className="px-6 md:px-[80px] mb-[20px]">
        <p className="font-meta text-[#0a0a0a]/55 text-[12px] tracking-[0.3px] uppercase">
          Featuring
        </p>
      </div>

      {/* ── Desktop ─────────────────────────────────────────── */}
      <div className="hidden md:block px-6 md:px-[80px]">
        <div className="flex flex-col">
          {characters.map((char, i) => {
            const color = getColor(i, characters.length);
            const isActive = activeIdx === i;
            const isHovered = hoveredIdx === i;

            return (
              <button
                key={char.characterName}
                type="button"
                className="deck-tab group relative flex items-center justify-between w-full text-left select-none"
                style={{
                  height: 72,
                  paddingLeft: 24,
                  paddingRight: 24,
                  backgroundColor: isActive
                    ? color
                    : isHovered
                      ? `${color}55`
                      : "transparent",
                  borderBottom: "1px solid rgba(10,10,10,0.06)",
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => handleTabClick(i)}
              >
                <div className="flex items-center gap-[16px]">
                  <span
                    className="w-[10px] h-[10px] rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <h3
                    className="font-alegreya text-[#0a0a0a] leading-none tracking-[-2px] capitalize"
                    style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.2rem)" }}
                  >
                    {char.characterName}
                  </h3>
                </div>

                <div className="flex items-baseline gap-[6px] shrink-0">
                  <span className="font-meta text-[#0a0a0a]/45 text-[13px]">
                    {char.performedBy}
                  </span>
                  <span className="font-meta text-[#0a0a0a]/80 text-[15px] capitalize">
                    {char.actorName}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {activeIdx !== null && (
          <div ref={cardRef} className="mt-[32px]">
            <ExpandedCard
              char={characters[activeIdx]}
              color={getColor(activeIdx, characters.length)}
              layout={getLayout(activeIdx)}
              rotation={getRotation(activeIdx)}
            />
          </div>
        )}
      </div>

      {/* ── Mobile ──────────────────────────────────────────── */}
      <div className="md:hidden flex flex-col px-6">
        {characters.map((char, i) => {
          const color = getColor(i, characters.length);
          const isActive = activeIdx === i;

          return (
            <div key={char.characterName}>
              <button
                type="button"
                className="w-full text-left flex items-center justify-between py-[16px] select-none border-b border-[#0a0a0a]/6"
                style={{
                  backgroundColor: isActive ? color : "transparent",
                  paddingLeft: isActive ? 16 : 0,
                  paddingRight: isActive ? 16 : 0,
                }}
                onClick={() => handleTabClick(i)}
              >
                <div className="flex items-center gap-[10px]">
                  <span
                    className="w-[8px] h-[8px] rounded-full shrink-0"
                    style={{ backgroundColor: color }}
                  />
                  <h3 className="font-alegreya text-[#0a0a0a] text-[22px] leading-none tracking-[-1px] capitalize">
                    {char.characterName}
                  </h3>
                </div>
                <span className="font-meta text-[#0a0a0a]/55 text-[12px] capitalize">
                  {char.actorName}
                </span>
              </button>

              {isActive && (
                <MobileExpandedCard char={char} color={color} />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ── Expanded card (desktop) ────────────────────────────────── */

function ExpandedCard({
  char,
  color,
  layout,
  rotation,
}: {
  char: CharacterCard;
  color: string;
  layout: number;
  rotation: number;
}) {
  return (
    <div
      className="w-full overflow-hidden card-expand"
      style={{
        backgroundColor: color,
        opacity: 0.98,
        transform: `rotate(${rotation * 0.12}deg)`,
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-[40px] md:px-[48px] pt-[40px] md:pt-[48px] pb-[12px]">
        <h3
          className="font-alegreya text-[#0a0a0a] leading-none tracking-[-3.5px] capitalize"
          style={{ fontSize: "clamp(2.5rem, 5vw, 72px)" }}
        >
          {char.characterName}
        </h3>
        <div className="flex items-baseline gap-[6px] pt-[8px] shrink-0">
          <span className="font-meta text-[#0a0a0a]/45 text-[13px]">
            {char.performedBy}
          </span>
          <span className="font-meta text-[#0a0a0a]/80 text-[18px] capitalize">
            {char.actorName}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-[40px] md:px-[48px] pb-[40px] md:pb-[48px]">
        <CardLayout char={char} variant={layout} />
      </div>
    </div>
  );
}

/* ── 4 layout variants (1 or 2 images + capped-width text) ─── */

function CardLayout({ char, variant }: { char: CharacterCard; variant: number }) {
  const quote = char.quote ? (
    <blockquote className="font-copse text-[#0a0a0a]/70 text-[15px] md:text-[17px] leading-[1.65] max-w-[52ch]">
      {char.quote.split("\n\n").map((para, i) => (
        <p key={i} className={i > 0 ? "mt-3" : ""}>{para}</p>
      ))}
    </blockquote>
  ) : null;

  switch (variant) {
    /* 0 — Two images side-by-side, quote below */
    case 0:
      return (
        <div className="flex flex-col gap-[20px]">
          <div className="grid grid-cols-2 gap-[16px]">
            <Img src={char.image1} alt={char.image1Alt ?? char.characterName} ratio="4/3" />
            <Img src={char.image2} alt={char.image2Alt ?? char.characterName} ratio="4/3" />
          </div>
          {quote}
        </div>
      );

    /* 1 — Single wide image, quote below */
    case 1:
      return (
        <div className="flex flex-col gap-[20px]">
          <Img src={char.image1} alt={char.image1Alt ?? char.characterName} ratio="16/7" />
          {quote}
        </div>
      );

    /* 2 — Image left, quote right */
    case 2:
      return (
        <div className="grid grid-cols-[5fr_4fr] gap-[24px] items-start">
          <Img src={char.image1} alt={char.image1Alt ?? char.characterName} ratio="4/3" />
          <div className="flex flex-col justify-start pt-[4px]">{quote}</div>
        </div>
      );

    /* 3 — Quote left, image right */
    case 3:
      return (
        <div className="grid grid-cols-[4fr_5fr] gap-[24px] items-start">
          <div className="flex flex-col justify-start pt-[4px]">{quote}</div>
          <Img src={char.image2} alt={char.image2Alt ?? char.characterName} ratio="4/3" />
        </div>
      );

    default:
      return null;
  }
}

/* ── Shared image wrapper ───────────────────────────────────── */

function Img({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill className="object-cover" sizes="50vw" />
    </div>
  );
}

/* ── Mobile expanded card ───────────────────────────────────── */

function MobileExpandedCard({ char, color }: { char: CharacterCard; color: string }) {
  return (
    <div
      className="p-5 flex flex-col gap-4 card-expand"
      style={{ backgroundColor: color, opacity: 0.98 }}
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="relative aspect-[3/4]">
          <Image src={char.image1} alt={char.image1Alt ?? char.characterName} fill className="object-cover" sizes="45vw" />
        </div>
        <div className="relative aspect-[3/4]">
          <Image src={char.image2} alt={char.image2Alt ?? char.characterName} fill className="object-cover" sizes="45vw" />
        </div>
      </div>
      {char.quote && (
        <p className="font-copse text-[#0a0a0a]/70 text-[14px] leading-[1.65] max-w-[52ch]">{char.quote}</p>
      )}
    </div>
  );
}
