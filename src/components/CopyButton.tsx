"use client";

import { useState } from "react";

interface CopyButtonProps {
  url: string;
  label?: string;
}

export function CopyButton({ url, label = "Copy link" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullUrl = url.startsWith("http") ? url : `${window.location.origin}${url.startsWith("/") ? "" : "/"}${url}`;
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="font-meta inline-flex items-center justify-center h-[52px] px-8 border border-foreground text-foreground hover:bg-foreground hover:text-background text-sm font-bold tracking-[0.35px] transition-colors whitespace-nowrap"
      aria-label={label}
    >
      {copied ? "COPIED!" : "COPY LINK"}
    </button>
  );
}
