"use client";

import { useState } from "react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdeIMWjmED6kjqlgWCX_4unBxMotKmY0R-40jEoIXgbLjDkWg/formResponse";
const ENTRY_ID = "entry.93113307";

type Status = "idle" | "loading" | "success" | "error";

export function EmailForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    const trimmed = email.trim().toLowerCase();
    if (!trimmed) return;
    setStatus("loading");

    try {
      await fetch(FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ [ENTRY_ID]: trimmed }).toString(),
      });
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  if (status === "success") {
    return (
      <p className="font-meta text-foreground text-[14px] font-bold h-[52px] flex items-center">
        ✓ YOU&apos;RE ON THE LIST
      </p>
    );
  }

  return (
    <form className="flex flex-col sm:flex-row gap-[12px]" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="EMAIL ADDRESS"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "loading"}
        className="font-meta flex-1 h-[52px] px-[24px] py-[16px] bg-[#0a0a0a] text-foreground placeholder:text-[rgba(245,245,245,0.4)] text-[14px] font-bold focus:outline-none disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="font-meta h-[52px] px-[32px] bg-[#0a0a0a] text-foreground text-[14px] font-bold tracking-[0.35px] leading-[20px] text-center hover:bg-[#1a1a1a] transition-colors whitespace-nowrap disabled:opacity-60"
      >
        {status === "loading" ? "..." : status === "error" ? "TRY AGAIN" : "SUBSCRIBE"}
      </button>
    </form>
  );
}
