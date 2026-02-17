"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { href: "/", label: "INFO" },
  { href: "/#screenings", label: "SCREENINGS" },
  { href: "/press", label: "PRESS" },
  { href: "/share", label: "SHARE" },
];

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isOverHero = pathname === "/" && !scrolled;

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const hashIdx = href.indexOf("#");
      if (hashIdx === -1) return;

      const basePath = href.slice(0, hashIdx) || "/";
      const hash = href.slice(hashIdx);

      if (pathname === basePath) {
        e.preventDefault();
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        e.preventDefault();
        router.push(href);
      }
    },
    [pathname, router]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverHero
          ? "bg-transparent border-b border-white/20"
          : "bg-background border-b border-border"
      }`}
    >
      <div className="w-full px-6 md:px-[80px] h-[80px] flex items-center justify-between">
        <Link
          href="/"
          className={`text-2xl font-display tracking-[-0.6px] transition-colors ${
            isOverHero ? "text-foreground" : "text-foreground"
          } hover:opacity-80`}
        >
          STAGES
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-[32px]">
          {navLinks.map((link) => {
            const isActive =
              (link.href === "/" && pathname === "/") ||
              (link.href !== "/" && pathname.startsWith(link.href.split("#")[0]) && link.href.split("#")[0] !== "/");
            const active = isActive || (link.href === "/" && pathname === "/");

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-meta text-sm font-bold tracking-[0.35px] transition-colors ${
                  active ? "text-accent" : "text-foreground/90 hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/#updates"
            onClick={(e) => handleNavClick(e, "/#updates")}
            className="font-meta text-sm font-bold tracking-[0.35px] text-foreground/90 hover:text-foreground transition-colors"
          >
            UPDATES
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-meta text-sm font-bold tracking-[0.35px] text-foreground"
              onClick={(e) => {
                handleNavClick(e, link.href);
                setMobileOpen(false);
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/#updates"
            className="font-meta text-sm font-bold tracking-[0.35px] text-foreground"
            onClick={(e) => {
              handleNavClick(e, "/#updates");
              setMobileOpen(false);
            }}
          >
            UPDATES
          </Link>
          <Link
            href="https://schedule.sxsw.com/2026/films/2253651"
            target="_blank"
            rel="noopener noreferrer"
            className="font-meta mt-2 inline-flex items-center justify-center h-[52px] px-8 bg-accent text-[#0a0a0a] font-bold text-sm tracking-[0.35px] hover:bg-accent-hover transition-colors"
            onClick={() => setMobileOpen(false)}
          >
            GET TICKETS
          </Link>
        </nav>
      )}
    </header>
  );
}
