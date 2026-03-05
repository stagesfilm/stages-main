"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { HeroCarousel } from "./HeroCarousel";

const YOUTUBE_ID = "RaeZ8LUgFxA";
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

/**
 * Compute pixel width & height for a 16:9 video to fully cover a container,
 * behaving like CSS `object-fit: cover`.
 */
function computeCover(cw: number, ch: number) {
  const containerAspect = cw / ch;
  if (containerAspect > VIDEO_ASPECT) {
    return { w: Math.ceil(cw), h: Math.ceil(cw / VIDEO_ASPECT) };
  }
  return { w: Math.ceil(ch * VIDEO_ASPECT), h: Math.ceil(ch) };
}

export function HeroVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasFailed, setHasFailed] = useState(false);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval>>(null);
  const failTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const applyCoverSize = useCallback(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const { width: cw, height: ch } = wrapper.getBoundingClientRect();
    if (!cw || !ch) return;

    const { w, h } = computeCover(cw, ch);
    container.style.width = `${w}px`;
    container.style.height = `${h}px`;

    try { playerRef.current?.setSize(w, h); } catch { /* player may not be ready */ }
  }, []);

  useEffect(() => {
    applyCoverSize();
    const ro = new ResizeObserver(applyCoverSize);
    if (wrapperRef.current) ro.observe(wrapperRef.current);
    return () => ro.disconnect();
  }, [applyCoverSize]);

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
      if (duration > 0 && current >= duration - SEEK_THRESHOLD) seekToStart();
    }, 200);
  }, [seekToStart]);

  useEffect(() => {
    let cancelled = false;
    failTimerRef.current = setTimeout(() => {
      if (!isPlaying) setHasFailed(true);
    }, 12000);

    loadYTApi().then(() => {
      if (cancelled || !containerRef.current) return;

      const wrapper = wrapperRef.current;
      let initW = 3840;
      let initH = 2160;
      if (wrapper) {
        const rect = wrapper.getBoundingClientRect();
        if (rect.width && rect.height) {
          const cover = computeCover(rect.width, rect.height);
          initW = cover.w;
          initH = cover.h;
        }
      }

      const el = document.createElement("div");
      containerRef.current.appendChild(el);
      playerRef.current = new window.YT.Player(el, {
        videoId: YOUTUBE_ID,
        width: initW,
        height: initH,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, showinfo: 0,
          modestbranding: 1, rel: 0, playsinline: 1,
          disablekb: 1, fs: 0, iv_load_policy: 3, cc_load_policy: 0,
        },
        events: {
          onReady: (e: YT.PlayerEvent) => {
            e.target.setPlaybackQuality("hd1080");
            e.target.playVideo();
            applyCoverSize();
          },
          onStateChange: (e: YT.OnStateChangeEvent) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              if (failTimerRef.current) clearTimeout(failTimerRef.current);
              setIsPlaying(true);
              startSeamlessLoop();
              applyCoverSize();
            }
            if (e.data === window.YT.PlayerState.ENDED) seekToStart();
          },
          onError: () => setHasFailed(true),
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
    <div ref={wrapperRef} className="absolute inset-0 overflow-hidden bg-black">
      {(!isPlaying || hasFailed) && <HeroCarousel />}

      {!hasFailed && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: isPlaying ? 1 : 0, transition: "opacity 1s ease-in-out" }}
        >
          <div
            ref={containerRef}
            className="hero-yt-wrapper absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          />
        </div>
      )}

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </div>
  );
}
