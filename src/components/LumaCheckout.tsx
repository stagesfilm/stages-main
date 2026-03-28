"use client";

import Script from "next/script";
import { useEffect } from "react";

interface LumaCheckoutProps {
  lumaEventUrl: string;
  label?: string;
  className?: string;
}

/**
 * Renders Luma's inline RSVP checkout button.
 * When clicked, opens Luma's registration pop-up without leaving the page.
 * Requires a Luma Plus account for the event.
 */
export function LumaCheckout({ lumaEventUrl, label = "RSVP", className }: LumaCheckoutProps) {
  useEffect(() => {
    // Re-initialize if Luma script already loaded (e.g. multiple embeds on one page)
    if (typeof window !== "undefined" && (window as unknown as { luma?: { initCheckout?: () => void } }).luma?.initCheckout) {
      (window as unknown as { luma: { initCheckout: () => void } }).luma.initCheckout();
    }
  }, [lumaEventUrl]);

  return (
    <>
      <Script
        src="https://embed.lu.ma/checkout-button.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (typeof window !== "undefined" && (window as unknown as { luma?: { initCheckout?: () => void } }).luma?.initCheckout) {
            (window as unknown as { luma: { initCheckout: () => void } }).luma.initCheckout();
          }
        }}
      />
      <a
        href={lumaEventUrl}
        className={`luma-checkout font-meta font-bold text-accent text-[14px] tracking-[0.35px] whitespace-nowrap shrink-0 hover:translate-x-1 transition-transform inline-block ${className ?? ""}`}
        data-luma-action="checkout"
        data-luma-event-url={lumaEventUrl}
      >
        {label} →
      </a>
    </>
  );
}
