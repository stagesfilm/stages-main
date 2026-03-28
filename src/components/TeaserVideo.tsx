"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SEEK_THRESHOLD = 3.5;
const VIDEO_ASPECT = 16 / 9;

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

function loadYTApi(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT?.Player) { resolve(); return; }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }
  });
}

function computeCover(cw: number, ch: number) {
  const containerAspect = cw / ch;
  if (containerAspect > VIDEO_ASPECT) {
    return { w: Math.ceil(cw), h: Math.ceil(cw / VIDEO_ASPECT) };
  }
  return { w: Math.ceil(ch * VIDEO_ASPECT), h: Math.ceil(ch) };
}

interface TeaserVideoProps {
  videoId: string;
  /** If true, loop silently (background mode). If false, show controls for playback. */
  mode?: "background" | "player";
}

/**
 * Reusable YouTube video component for landing pages.
 * "background" mode: autoplay muted loop (like HeroVideo)
 * "player" mode: 16:9 framed embed with standard controls
 */
export function TeaserVideo({ videoId, mode = "player" }: TeaserVideoProps) {
  if (mode === "player") {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`}
          title="Film teaser"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  // Background autoplay mode
  return <TeaserBackground videoId={videoId} />;
}

function TeaserBackground({ videoId }: { videoId: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);

  const applyCoverSize = useCallback(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;
    const { width: cw, height: ch } = wrapper.getBoundingClientRect();
    if (!cw || !ch) return;
    const { w, h } = computeCover(cw, ch);
    container.style.width = `${w}px`;
    container.style.height = `${h}px`;
    try { playerRef.current?.setSize(w, h); } catch { /* not ready */ }
  }, []);

  useEffect(() => {
    applyCoverSize();
    const ro = new ResizeObserver(applyCoverSize);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [applyCoverSize]);

  useEffect(() => {
    let cancelled = false;

    loadYTApi().then(() => {
      if (cancelled || !containerRef.current) return;
      const el = document.createElement("div");
      containerRef.current.appendChild(el);
      playerRef.current = new window.YT.Player(el, {
        videoId,
        width: 3840,
        height: 2160,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, showinfo: 0,
          modestbranding: 1, rel: 0, playsinline: 1,
          disablekb: 1, fs: 0, iv_load_policy: 3,
        },
        events: {
          onReady: (e: YT.PlayerEvent) => {
            e.target.playVideo();
            applyCoverSize();
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              pollRef.current = setInterval(() => {
                const p = playerRef.current;
                if (!p?.getCurrentTime || !p?.getDuration) return;
                if (p.getCurrentTime() >= p.getDuration() - SEEK_THRESHOLD) {
                  p.seekTo(0, true);
                  p.playVideo();
                }
              }, 200);
            }
          },
          onError: () => setIsPlaying(false),
        },
      });
    });

    return () => {
      cancelled = true;
      if (pollRef.current) clearInterval(pollRef.current);
      playerRef.current?.destroy();
    };
  }, [videoId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden bg-black">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 1s ease-in-out" }}
      >
        <div
          ref={containerRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
