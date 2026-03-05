"use client";

import Image from "next/image";
import { useState } from "react";

export interface CharacterCard {
  characterName: string;
  performedBy: string;
  actorName: string;
  actorUrl?: string;
  image1: string;
  image2: string;
  image1Alt?: string;
  image2Alt?: string;
  quote?: string;
}

/* ── Per-card rotation for the scattered look ───────────────── */

const ROTATIONS = [-3.2, 2.8, -1.5, 4.1, -2.4, 1.9, -3.8, 2.2, -1.1, 3.5];

function getRotation(i: number): number {
  return ROTATIONS[i % ROTATIONS.length];
}

/* ── Slight vertical offsets for organic scatter ────────────── */

const Y_OFFSETS = [0, 18, -12, 24, -8, 14, -20, 6, -16, 10];

function getYOffset(i: number): number {
  return Y_OFFSETS[i % Y_OFFSETS.length];
}

/* ── Main component ─────────────────────────────────────────── */

interface Props {
  characters: CharacterCard[];
}

export function FeaturingSection({ characters }: Props) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="bg-[#f5f5f5] py-16 md:py-[80px] overflow-hidden">
      <div className="px-6 md:px-[80px] mb-[32px] md:mb-[48px]">
        <p className="font-meta text-[#0a0a0a]/55 text-[12px] tracking-[0.3px] uppercase">
          Featuring
        </p>
      </div>

      <div className="px-6 md:px-[40px]">
        <div className="flex flex-wrap justify-center gap-x-[12px] md:gap-x-[20px] gap-y-[24px] md:gap-y-[16px]">
          {characters.map((char, i) => (
            <Polaroid
              key={char.characterName}
              char={char}
              rotation={getRotation(i)}
              yOffset={getYOffset(i)}
              isHovered={hoveredIdx === i}
              onHover={() => setHoveredIdx(i)}
              onLeave={() => setHoveredIdx(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Polaroid card ──────────────────────────────────────────── */

function Polaroid({
  char,
  rotation,
  yOffset,
  isHovered,
  onHover,
  onLeave,
}: {
  char: CharacterCard;
  rotation: number;
  yOffset: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const isImdb = char.actorUrl?.includes("imdb.com");

  return (
    <div
      className="polaroid-card shrink-0"
      style={{
        transform: isHovered
          ? `rotate(0deg) translateY(-8px) scale(1.04)`
          : `rotate(${rotation}deg) translateY(${yOffset}px)`,
        zIndex: isHovered ? 20 : 1,
      }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="polaroid-frame">
        {/* Photo */}
        <div className="relative w-full aspect-[3/4]">
          <Image
            src={char.image1}
            alt={char.image1Alt ?? char.characterName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 42vw, 220px"
          />
        </div>

        {/* Caption — handwritten style */}
        <div className="pt-[8px] md:pt-[10px] pb-[2px] px-[2px] flex items-start justify-between gap-1">
          <div className="font-handwritten text-[#1a1a1a] leading-[1.1] min-w-0">
            <span className="block text-[20px] md:text-[24px]">{char.characterName}</span>
            <span className="block text-[16px] md:text-[19px] text-[#1a1a1a]/70">{char.actorName}</span>
          </div>

          {char.actorUrl && (
            <a
              href={char.actorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 mt-[4px] opacity-60 hover:opacity-100 transition-opacity"
              aria-label={`${char.actorName} on ${isImdb ? "IMDb" : "the web"}`}
            >
              {isImdb ? (
                <Image
                  src="/IMDb_PrimaryLogo_Black.svg"
                  alt="IMDb"
                  width={32}
                  height={16}
                  className="h-[14px] md:h-[16px] w-auto"
                />
              ) : (
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  className="w-[14px] h-[14px] md:w-[16px] md:h-[16px] text-[#1a1a1a]"
                >
                  <path
                    d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9"
                    strokeWidth={1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
