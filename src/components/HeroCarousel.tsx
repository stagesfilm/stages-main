"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const IMAGES = [
  "/home-hero.png",
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
