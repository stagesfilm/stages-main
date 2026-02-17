import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[rgba(245,245,245,0.2)]">
      {/* ── Movie-poster credit block (SVG) ── */}
      <div className="pt-[81px] px-6 md:px-[80px] flex justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/footer-credits.svg"
          alt="STAGES film credits — Live Nation Studios Presents, a Ryan Booth film"
          className="w-full max-w-[780px] h-auto"
        />
      </div>

      {/* ── Footer links ── */}
      <div className="mt-[90px] px-6 md:px-[80px]">
        {/* Mobile: stacked layout / Desktop: 4-col grid */}

        {/* STAGES wordmark — centered on mobile, part of grid on desktop */}
        <div className="md:hidden flex justify-center mb-[40px]">
          <Link href="/" className="font-display text-foreground text-[24px] leading-[32px] tracking-[-0.6px] uppercase hover:opacity-80 transition-opacity">
            STAGES
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-[32px] md:gap-[48px]">
          {/* STAGES wordmark — desktop only */}
          <div className="hidden md:block">
            <Link href="/" className="font-display text-foreground text-[24px] leading-[32px] tracking-[-0.6px] uppercase hover:opacity-80 transition-opacity">
              STAGES
            </Link>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-[16px]">
            <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] uppercase leading-[16px]">
              CONTACT
            </p>
            <div className="flex flex-col gap-[12px]">
              <div>
                <p className="font-meta text-foreground/60 text-[14px] leading-[20px]">Press</p>
                <a href="mailto:ChrisDelhomme@LiveNationStudios.com" className="font-meta text-foreground text-[14px] leading-[20px] hover:text-accent transition-colors underline">Chris Delhomme</a>
              </div>
              <div>
                <p className="font-meta text-foreground/60 text-[14px] leading-[20px]">Public</p>
                <a href="mailto:kat@theranchproductions.com" className="font-meta text-foreground text-[14px] leading-[20px] hover:text-accent transition-colors underline">Kat Delby</a>
              </div>
            </div>
          </div>

          {/* Pages */}
          <div className="flex flex-col gap-[16px]">
            <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] uppercase leading-[16px]">
              PAGES
            </p>
            <div className="flex flex-col gap-[8px]">
              {[
                { label: "Info", href: "/" },
                { label: "Screenings", href: "/#screenings" },
                { label: "Press", href: "/press" },
                { label: "Share", href: "/share" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="font-meta text-foreground text-[14px] leading-[20px] hover:text-accent transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Updates — full-width centered on mobile, normal col on desktop */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-[16px] items-center md:items-stretch mt-[8px] md:mt-0">
            <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] uppercase leading-[16px]">
              UPDATES
            </p>
            <div className="flex flex-col gap-[12px] w-full max-w-[320px] md:max-w-none">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="font-meta h-[46px] px-[16px] py-[12px] bg-[rgba(245,245,245,0.05)] border border-[rgba(245,245,245,0.2)] text-foreground placeholder:text-[rgba(245,245,245,0.5)] text-[12px] focus:outline-none"
              />
              <button
                type="submit"
                className="font-meta h-[40px] px-[16px] py-[12px] bg-foreground text-[#0a0a0a] text-[12px] font-bold tracking-[0.3px] text-center hover:bg-foreground/90 transition-colors"
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar — centered on mobile */}
        <div className="border-t border-[rgba(245,245,245,0.1)] mt-[64px] py-5 md:py-0 md:h-[49px] flex flex-col md:flex-row items-center md:justify-between gap-3 md:gap-0">
          <p className="font-meta text-foreground/40 text-[11px] md:text-[12px] tracking-[0.3px] text-center md:text-left">
            © 2026 STAGES Film. ALL RIGHTS RESERVED.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-x-[20px] gap-y-[8px]">
            <a href="#" className="font-meta text-foreground/60 text-[11px] md:text-[12px] tracking-[0.3px] hover:text-foreground transition-colors">
              TWITTER
            </a>
            <a href="#" className="font-meta text-foreground/60 text-[11px] md:text-[12px] tracking-[0.3px] hover:text-foreground transition-colors">
              INSTAGRAM
            </a>
            <a href="https://allmannerofus.com" target="_blank" rel="noopener noreferrer" className="font-meta text-foreground/60 text-[11px] md:text-[12px] tracking-[0.3px] hover:text-foreground transition-colors">
              SITE BY ALL MANNER OF US
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

