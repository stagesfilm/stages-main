"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HeroCarousel } from "./HeroCarousel";

const YOUTUBE_ID = "RaeZ8LUgFxA";
// YouTube end-screen appears ~3s before the video ends; seek back before that
const SEEK_THRESHOLD = 3.5;

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

function loadYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);
  const failTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const seekToStart = useCallback(() => {
    const p = playerRef.current;
    if (!p) return;
    p.seekTo(0, true);
    p.playVideo();
  }, []);

  const startSeamlessLoop = useCallback(() => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = setInterval(() => {
      const p = playerRef.current;
      if (!p?.getCurrentTime || !p?.getDuration) return;
      const current = p.getCurrentTime();
      const duration = p.getDuration();
      if (duration > 0 && current >= duration - SEEK_THRESHOLD) {
        seekToStart();
      }
    }, 200);
  }, [seekToStart]);

  useEffect(() => {
    let cancelled = false;

    failTimerRef.current = setTimeout(() => {
      if (!isPlaying) setHasFailed(true);
    }, 12000);

    loadYTApi().then(() => {
      if (cancelled || !containerRef.current) return;

      const el = document.createElement("div");
      containerRef.current.appendChild(el);

      playerRef.current = new window.YT.Player(el, {
        videoId: YOUTUBE_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
        },
        events: {
          onReady: (e: YT.PlayerEvent) => {
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              if (failTimerRef.current) clearTimeout(failTimerRef.current);
              setIsPlaying(true);
              startSeamlessLoop();
            }
            // Hard fallback: if YT end screen somehow appears, restart immediately
            if (e.data === window.YT.PlayerState.ENDED) {
              seekToStart();
            }
          },
          onError: () => {
            setHasFailed(true);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      if (failTimerRef.current) clearTimeout(failTimerRef.current);
      if (pollRef.current) clearInterval(pollRef.current);
      playerRef.current?.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Fallback stills — visible until video plays (or if it fails) */}
      {(!isPlaying || hasFailed) && <HeroCarousel />}

      {/* YouTube player — oversized to crop out any YT UI */}
      {!hasFailed && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 1s ease-in-out" }}
        >
          <div
            ref={containerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [&>div]:!w-full [&>div]:!h-full [&_iframe]:w-full [&_iframe]:h-full"
            style={{
              width: "calc(max(100%, 177.78vh))",
              height: "calc(max(100%, 56.25vw))",
            }}
          />
        </div>
      )}

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
