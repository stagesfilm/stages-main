# Engineering Spec: Smooth Portfolio Site (adapted from Stages)

A concise, copy-paste-friendly spec to recreate the “incredibly smooth” feel of the Stages site for a new portfolio. Focus: **scroll, transitions, and micro-interactions** with minimal JS and no heavy animation libraries.

---

## 1. Stack

| Layer | Choice | Notes |
|-------|--------|--------|
| Framework | **Next.js 16** (App Router) | Use `next dev` / `next build`. |
| UI | **React 19** | |
| Styling | **Tailwind CSS v4** | `@import "tailwindcss"` in globals; use `@theme inline` for design tokens. |
| Language | **TypeScript** | |
| Fonts | **next/font** (Google + optional Typekit) | Load 1–2 display + 1 body; expose via CSS variables. |

**No** Framer Motion or other animation libs—all motion is CSS + small React hooks (pathname, scroll, IntersectionObserver).

---

## 2. Global “Smooth” Foundations

### 2.1 Scroll behavior

- **Smooth scroll (all anchors):**  
  In `globals.css`:  
  `html { scroll-behavior: smooth; }`
- **In-page hash links:**  
  When user clicks a nav link that points to `#section` on the *current* page, call `element.scrollIntoView({ behavior: "smooth", block: "start" })` and `preventDefault()` so the browser doesn’t jump. If the link goes to another route with a hash, do `router.push(href)` and let the new page load then scroll (or replicate the same scroll-into-view after mount).
- **Scroll listener:**  
  Use `{ passive: true }` so the main thread isn’t blocked:  
  `window.addEventListener("scroll", handleScroll, { passive: true });`

### 2.2 Body / typography

- **Antialiasing:**  
  `body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }`
- **Fonts:**  
  Apply `next/font` variables to `<html>` and map them in Tailwind `@theme inline` (e.g. `--font-sans`, `--font-display`). Use a single primary font for body and one for headings to keep layout stable and smooth.

---

## 3. Design Tokens (CSS Variables + Tailwind)

Define in `:root` and mirror in `@theme inline` so Tailwind and ad-hoc CSS stay in sync:

- **Colors:** e.g. `--background`, `--foreground`, `--accent`, `--accent-hover`, `--muted`, `--border`, `--card-bg`.
- **Font families:** e.g. `--font-sans`, `--font-display` (and any extra like `--font-meta` for labels/captions).

Use these in Tailwind (e.g. `bg-background`, `text-foreground`, `border-border`, `font-display`) and in custom classes so the whole site feels consistent and transitions (e.g. header background, button hover) stay smooth.

---

## 4. Page Transitions (Route Changes)

**Goal:** No hard cut between pages. Brief exit → content swap → enter.

### 4.1 Pattern

1. Wrap **all** route content in a single client component that reads `usePathname()`.
2. On pathname change:  
   - Set phase to `"exit"`.  
   - After **exit duration** (e.g. 250ms), update displayed children to the new page and set phase to `"enter"`.  
   - `window.scrollTo(0, 0)` so the new page starts at top.
3. Render a single wrapper div whose class is either `page-enter` or `page-exit`.

### 4.2 CSS (in globals.css)

- **Exit:** e.g. `opacity: 1 → 0`, `translateY(0 → -8px)`, ~250ms, `ease`.
- **Enter:** e.g. `opacity: 0 → 1`, `translateY(12px → 0)`, ~450ms, `cubic-bezier(0.22, 1, 0.36, 1)`.

Use `animation-fill-mode: both` so the element holds the end state. Match the timeout in the React effect to the exit duration.

---

## 5. Hero / Above-the-Fold Load-in

**Goal:** Hero content appears with a light, staggered fade-up (no layout thrash).

- Use **CSS only:** one keyframe (e.g. `fadeUp`: opacity 0→1, translateY 20px→0), one class (e.g. `animate-fade-up` with ~0.7s ease).
- **Stagger:** Utility classes for delay, e.g. `animate-delay-100` … `animate-delay-600` (increment by 100–200ms). Apply to hero title, subtitle, CTA, etc.
- **No JS** for this—keeps first paint and interaction predictable.

---

## 6. Scroll Reveal (Sections Entering Viewport)

**Goal:** Sections and headings subtly fade and move up when they enter the viewport, once.

### 6.1 CSS

- **Initial state:**  
  `.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.65s ease, transform 0.65s ease; }`
- **Visible state:**  
  `.reveal.is-visible { opacity: 1; transform: translateY(0); }`
- Optional: `.reveal-slow { transition-duration: 0.9s; }` for key blocks.

### 6.2 React component

- **ScrollReveal:** A client component that wraps a section (or group of sections). In `useEffect`:
  - `querySelectorAll(".reveal")` within its ref.
  - For each element, use **IntersectionObserver** with something like `threshold: 0.08` and `rootMargin: "0px 0px -48px 0px"` (trigger when a bit above the bottom of the viewport).
  - On intersect, add `is-visible` to the element and **unobserve** it (one-time reveal).
- Optional: support a `delay` prop to add a short timeout before adding `is-visible` for the first child.

### 6.3 Usage

- Wrap each “reveal section” in `<ScrollReveal>` (or a single wrapper for the whole page).
- Add class `reveal` (and optionally `reveal-slow`) to headings, paragraphs, cards, or rows that should animate in. Optionally set `style={{ transitionDelay: `${index * 60}ms` }}` on list items for a light stagger.

---

## 7. Interactive Elements (Hover / Focus)

**Goal:** Every interactive element has a quick, consistent transition so the site feels responsive.

- **Buttons:**  
  `transition-colors` (and if you use border/background, transition those too). e.g. primary: `hover:bg-accent-hover`; secondary: `hover:bg-foreground hover:text-background`.
- **Links / nav:**  
  `transition-colors` and/or `hover:opacity-80` or `hover:text-foreground`.
- **Cards / rows:**  
  `transition-colors` and optionally `transition-transform`; e.g. `hover:bg-white/[0.03]` and `group-hover:translate-x-1` on an arrow.
- **“Deck” or tab strips:**  
  Use a class like `.deck-tab` with `transition: background-color 0.25s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)` and `:hover { transform: translateX(4px); }` for a slight nudge.

Keep durations short (0.2–0.35s) so the site feels snappy.

---

## 8. Header (Fixed, Context-Aware)

- **Fixed:** `fixed top-0 left-0 right-0 z-50`.
- **Scroll state:** One `useState` (e.g. `scrolled`). In `useEffect`, `handleScroll` sets e.g. `setScrolled(window.scrollY > 24)`; attach with `{ passive: true }`.
- **Over hero:** When `pathname === "/" && !scrolled`, use a transparent background and light border (e.g. `border-white/20`). Otherwise use solid `bg-background` and `border-border`.
- **Transition:** `transition-all duration-300` on the header so background/border changes are smooth.
- **Hash links:** Use the same in-page smooth scroll vs. `router.push` logic as in §2.1 so nav doesn’t “jump” awkwardly.

---

## 9. Images and LCP

- Use **Next.js `Image`** for all content images.
- **Hero / LCP image:**  
  Use `priority` on the first image (and only the first) so it loads immediately.
- **Sizes:**  
  Set explicit `sizes` (e.g. hero full-bleed: `100vw`; two-column: `50vw` or `45vw`; grid: `(max-width: 768px) 100vw, 50vw`) to avoid overfetching and layout shift.
- **Carousels:**  
  If the hero is a carousel, only the first slide gets `priority`; use CSS `opacity` + `transition` (e.g. 1.2s ease-in-out) for crossfades to keep animations on the compositor.

---

## 10. Optional “Card Expand” / Modal-like Blocks

When a section expands a card (e.g. “Featuring” tabs that open a detail card):

- **Enter:** Small scale + translateY keyframe, e.g. `translateY(-12px) scale(0.995)` → `translateY(0) scale(1)`, ~0.4s, `cubic-bezier(0.22, 1, 0.36, 1)`.
- After expanding, optionally `scrollIntoView({ behavior: "smooth", block: "nearest" })` with a short timeout (e.g. 80ms) so the opened card is in view without a harsh jump.

---

## 11. Easing Reference

Use these so motion feels consistent with Stages:

- **General enter / subtle motion:**  
  `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out feel).
- **Playful hover (e.g. tab nudge):**  
  `cubic-bezier(0.34, 1.56, 0.64, 1)` (slight overshoot).
- **Simple fade / exit:**  
  `ease` or `ease-in-out`.

---

## 12. File / Component Checklist (Portfolio)

| Item | Purpose |
|------|--------|
| `globals.css` | Tokens, `html`/`body`, page-enter/exit, fadeUp, reveal, deck-tab, card-expand, delay utilities. |
| `layout.tsx` | Fonts (next/font), `<Header />`, `<main><PageTransition>{children}</PageTransition></main>`, `<Footer />`. |
| `PageTransition.tsx` | Pathname-driven exit → swap children → enter + scroll to top. |
| `ScrollReveal.tsx` | IntersectionObserver on `.reveal`, add `.is-visible` once. |
| `Header.tsx` | Fixed nav, scroll state, transparent-over-hero, hash vs. route handling. |
| `Button.tsx` | Variants (e.g. primary/secondary/text) with `transition-colors` (and optional border/background). |
| Hero section | Staggered `animate-fade-up` + `animate-delay-*`; optional carousel with CSS opacity transition. |
| Section content | Wrapped in `<ScrollReveal>`, key elements with class `reveal` (and optional `reveal-slow` or per-item delay). |

---

## 13. What to Skip for “Smooth”

- No heavy JS animation libraries (reduces bundle and keeps 60fps on low-end devices).
- No scroll-linked animations that run on every frame (prefer IntersectionObserver + one-time or limited updates).
- No layout shift: reserve space for images (aspect ratio wrappers, `sizes`), and avoid fonts that cause reflow (use `next/font` with fallbacks).
- No non-passive scroll listeners.

---

## 14. One-Paragraph Summary

Use **Next.js 16 (App Router) + React 19 + Tailwind v4** with **CSS variables** for tokens. Enable **smooth scroll** and **passive** scroll listeners. Implement **route-level page transitions** (exit → swap → enter) and **scroll reveal** via **IntersectionObserver** and `.reveal`/`.is-visible` with CSS transitions. Use **staggered CSS-only** hero animations and **short, consistent transitions** on all interactive elements (buttons, links, cards, tabs). Use a **fixed, scroll-aware header** and **Next/Image** with **priority** and **sizes** for LCP. Keep **easing** consistent (ease-out for enter, light overshoot for hover). No heavy animation libs; keep motion on the compositor where possible (opacity, transform) for a smooth portfolio that feels like Stages.
