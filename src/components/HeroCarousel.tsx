"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const SHUFFLED_HERO_IMAGES = [
  "/hero/STAGES-1.jpg",
  "/hero/STAGES-2.jpg",
  "/hero/STAGES-3.jpg",
  "/hero/STAGES-5.jpg",
  "/hero/STAGES-8.jpg",
  "/hero/STAGES-9.jpg",
  "/hero/STAGES-17.jpg",
  "/hero/STAGES-24.jpg",
  "/hero/STAGES-29.jpg",
  "/hero/STAGES-32.jpg",
  "/hero/STAGES-43.jpg",
];

// Deterministic shuffle using a fixed seed so the order is consistent per session
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const IMAGES = [
  "/home-hero.png",
  "/hero/STAGES-6.jpg",
  ...seededShuffle(SHUFFLED_HERO_IMAGES, 42),
  "/david-with-gear.png",
  "/david-on-stage.png",
  "/david-singing.png",
];

const INTERVAL = 6000;
const FADE_DURATION = 1200;

export function HeroCarousel() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % IMAGES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      {IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="STAGES — A Film by Ryan Booth"
          fill
          className="object-cover object-center"
          style={{
            opacity: i === activeIdx ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease-in-out`,
          }}
          priority={i === 0}
          sizes="100vw"
        />
      ))}
    </div>
  );
}
