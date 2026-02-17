"use client";

export function EmailForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-[12px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="EMAIL ADDRESS"
        required
        className="font-meta flex-1 h-[52px] px-[24px] py-[16px] bg-[#0a0a0a] text-foreground placeholder:text-[rgba(245,245,245,0.4)] text-[14px] font-bold focus:outline-none"
      />
      <button
        type="submit"
        className="font-meta h-[52px] px-[32px] bg-[#0a0a0a] text-foreground text-[14px] font-bold tracking-[0.35px] leading-[20px] text-center hover:bg-[#1a1a1a] transition-colors whitespace-nowrap"
      >
        SUBSCRIBE
      </button>
    </form>
  );
}
