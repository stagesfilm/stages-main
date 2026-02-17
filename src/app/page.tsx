import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { FeaturingSection, type CharacterCard } from "@/components/FeaturingSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CopyButton } from "@/components/CopyButton";
import { EmailForm } from "@/components/EmailForm";
import { HeroCarousel } from "@/components/HeroCarousel";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Movie",
  name: "STAGES",
  alternateName: "STAGES Film",
  description:
    "After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. Life on the road feels different now, and Ben must find his footing alongside Rita, his steadfast tour manager, and Jessie Ramos, his charismatic, spotlight-stealing opening act.",
  dateCreated: "2026",
  duration: "PT94M",
  inLanguage: "en",
  countryOfOrigin: {
    "@type": "Country",
    name: "United States",
  },
  director: {
    "@type": "Person",
    name: "Ryan Booth",
  },
  productionCompany: {
    "@type": "Organization",
    name: "Live Nation Studios",
  },
  actor: [
    { "@type": "Person", name: "David Ramirez" },
    { "@type": "Person", name: "Leslie Grace" },
    { "@type": "Person", name: "Jolene" },
    { "@type": "Person", name: "Jake McMullen" },
    { "@type": "Person", name: "Rafael Casal" },
    { "@type": "Person", name: "Abner Ramirez" },
    { "@type": "Person", name: "Amanda Sudano Ramirez" },
    { "@type": "Person", name: "Jerry Ferrara" },
    { "@type": "Person", name: "Marc Menchaca" },
    { "@type": "Person", name: "David Strathairn" },
  ],
  image: "https://stagesfilm.com/opengraph.png",
  url: "https://stagesfilm.com",
  sameAs: [
    "https://schedule.sxsw.com/2026/films/2253651",
  ],
  event: {
    "@type": "ScreeningEvent",
    name: "STAGES — SXSW 2026 World Premiere",
    startDate: "2026-03-12",
    endDate: "2026-03-17",
    location: {
      "@type": "Place",
      name: "SXSW Film Festival",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Austin",
        addressRegion: "TX",
        addressCountry: "US",
      },
    },
    url: "https://schedule.sxsw.com/2026/films/2253651",
  },
};

const screenings = [
  { date: "MAR 12", time: "9:45 PM", venue: "ALAMO LAMAR 7", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19955" },
  { date: "MAR 12", time: "9:45 PM", venue: "ALAMO LAMAR 2", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19956" },
  { date: "MAR 14", time: "3:30 PM", venue: "VIOLET CROWN 1", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19957" },
  { date: "MAR 14", time: "3:30 PM", venue: "VIOLET CROWN 3", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19958" },
  { date: "MAR 17", time: "9:30 PM", venue: "ROLLINS THEATRE", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19959" },
];

const characters: CharacterCard[] = [
  {
    characterName: "Ben Garza",
    performedBy: "Performed by",
    actorName: "David Ramirez",
    image1: "/david-singing.png",
    image2: "/home-hero.png",
    image1Alt: "David Ramirez as Ben Garza",
    image2Alt: "Ben Garza on stage",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
  {
    characterName: "Jessie Claymore",
    performedBy: "Performed by",
    actorName: "Leslie Grace",
    image1: "/home-hero.png",
    image2: "/david-singing.png",
    image1Alt: "Leslie Grace as Jessie Claymore",
    image2Alt: "Jessie Claymore performing",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
  {
    characterName: "Rita Page",
    performedBy: "Performed by",
    actorName: "Jolene",
    image1: "/david-with-gear.png",
    image2: "/david-on-stage.png",
    image1Alt: "Jolene as Rita Page",
    image2Alt: "Rita Page backstage",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
  {
    characterName: "Jason Dunn",
    performedBy: "Performed by",
    actorName: "Jake McMullen",
    image1: "/david-on-stage.png",
    image2: "/david-with-gear.png",
    image1Alt: "Jake McMullen as Jason Dunn",
    image2Alt: "Jason Dunn at soundcheck",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
  {
    characterName: "Noah Ramirez",
    performedBy: "Performed by",
    actorName: "Rafael Casal",
    image1: "/david-singing.png",
    image2: "/david-with-gear.png",
    image1Alt: "Rafael Casal as Noah Ramirez",
    image2Alt: "Noah on tour",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
  {
    characterName: "Kevin Edwards",
    performedBy: "Performed by",
    actorName: "Abner Ramirez",
    image1: "/david-on-stage.png",
    image2: "/home-hero.png",
    image1Alt: "Abner Ramirez as Kevin Edwards",
    image2Alt: "Kevin Edwards backstage",
    quote: "And if you couldn\u2019t get anyone to listen, would you finish what you began? Because I refuse to be letters on a marquee, refuse to be buried on that bandstand.\n\nGod bless the man behind the microphone. God damn that silver ball and chain.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative flex flex-col">
        {/* Background image carousel */}
        <HeroCarousel />

        {/* Hero content — left-aligned with nav logo at 80px gutter */}
        <div className="relative pt-[200px] md:pt-[240px] px-6 md:px-[80px] pb-[96px]">
          {/* SXSW badge — sits above the two-column grid */}
          <div className="w-[160px] md:w-[202px] h-[87px] md:h-[110px] relative mb-[20px] animate-fade-up animate-delay-100">
            <Image
              src="/sxsw-premiere.png"
              alt="SXSW Film Festival 2026 World Premiere"
              fill
              className="object-contain object-left"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-10 md:gap-[80px]">
            {/* Col 1: actor-stages SVG → CTA */}
            <div className="flex flex-col animate-fade-up animate-delay-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/actor-stages.svg"
                alt="David Ramirez, Leslie Grace — STAGES"
                className="w-full max-w-[593px] h-auto"
              />
              <div className="w-fit mt-[40px] md:mt-[69px]">
                <Button href="#screenings">
                  VIEW SCREENINGS
                </Button>
              </div>
            </div>

            {/* Col 2: synopsis, director, year/runtime — aligns with actor-stages */}
            <div className="flex flex-col gap-[40px] animate-fade-up animate-delay-400">
              <p className="text-foreground text-[16px] leading-[26px] max-w-[442px]">
                After the tumultuous breakup of his band, Ben Garza embarks on
                his first-ever solo tour. Life on the road feels different now,
                and Ben must find his footing alongside Rita, his steadfast tour
                manager, and Jessie Ramos, his charismatic,
                spotlight-stealing&nbsp;opening&nbsp;act.
              </p>

              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                    DIRECTED BY
                  </p>
                  <p className="text-foreground font-bold text-[18px] leading-[28px]">
                    RYAN BOOTH
                  </p>
                </div>

                <div className="flex gap-[32px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                      YEAR
                    </p>
                    <p className="text-foreground font-bold text-[16px] leading-[24px]">
                      2026
                    </p>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                      RUNTIME
                    </p>
                    <p className="text-foreground font-bold text-[16px] leading-[24px]">
                      94 MIN
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SXSW 2026 SCREENINGS ══════════════════════════════ */}
      <section id="screenings" className="bg-background border-t border-[rgba(245,245,245,0.2)]">
        <ScrollReveal className="w-full px-6 md:px-[80px] pt-[81px] pb-20">
          <h2 className="font-display text-foreground text-[40px] md:text-[72px] leading-[1] tracking-[-3.6px] uppercase mb-[48px] reveal">
            SXSW 2026
            <br />
            SCREENINGS
          </h2>

          <div className="flex flex-col">
            {screenings.map((s, i) => (
              <Link
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal border-b border-[rgba(245,245,245,0.1)] hover:bg-white/[0.03] transition-colors group"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Desktop row */}
                <div className="hidden md:flex items-center h-[49px]">
                  <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] pl-[24px] w-[224px] shrink-0">
                    {s.date}
                  </span>
                  <span className="font-meta text-foreground text-[16px] leading-[24px] w-[224px] shrink-0">
                    {s.time}
                  </span>
                  <span className="font-meta font-bold text-foreground text-[16px] leading-[24px] flex-1">
                    {s.venue}
                  </span>
                  <span className="font-meta text-foreground/60 text-[16px] leading-[24px] w-[320px] shrink-0">
                    {s.location}
                  </span>
                  <span className="font-meta text-accent text-[14px] font-bold tracking-[0.35px] w-[96px] shrink-0 text-right group-hover:translate-x-1 transition-transform">
                    TICKETS →
                  </span>
                </div>

                {/* Mobile card */}
                <div className="md:hidden flex items-center justify-between py-4 gap-4">
                  <div className="flex flex-col gap-[2px]">
                    <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                      {s.date} · {s.time}
                    </span>
                    <span className="font-meta font-bold text-foreground text-[15px] leading-[20px]">
                      {s.venue}
                    </span>
                  </div>
                  <span className="font-meta text-accent text-[13px] font-bold tracking-[0.35px] shrink-0 group-hover:translate-x-1 transition-transform">
                    TICKETS →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FULL-WIDTH IMAGE ══════════════════════════════════ */}
      <div className="relative w-full aspect-[1470/1005] max-h-[70vh]">
        <Image
          src="/david-on-stage.png"
          alt="David Ramirez performing live"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ═══ ABOUT THE FILM ═══════════════════════════════════ */}
      <section className="bg-background py-[140px] px-6 md:px-[80px]">
        <ScrollReveal>
          <div className="flex flex-col gap-[40px] items-center w-full">
            <h2 className="font-display text-foreground text-[32px] md:text-[48px] leading-[48px] tracking-[-2.4px] uppercase text-center reveal">
              ABOUT THE FILM
            </h2>
            <div className="flex flex-col gap-[24px] items-center opacity-90 w-full">
              <p className="text-foreground text-[16px] leading-[26px] max-w-[646px] text-left reveal">
                It&apos;s make or break time for Ben Garza as he embarks on his
                solo first tour after the collapse of his band. By his side are
                Rita, his former tour manager stepping away from her stable life
                to help him, and Parker, a remaining bandmate who joins Ben as a
                utility player.
              </p>
              <p className="text-foreground text-[16px] leading-[26px] max-w-[646px] text-left reveal">
                However, Rita also secures Jessie Ramos as the opening act, a
                rising star whose sudden surge in popularity will completely
                destabilize Ben. Throughout this musical odyssey, Ben will face
                characters on the road who challenge his ideas of success,
                relevance, and purpose.
              </p>
              <p className="text-foreground text-[16px] leading-[26px] max-w-[646px] text-left reveal">
                By the tour&apos;s end, Ben must decide whether to keep chasing
                the life he once had—or chart a new path forward.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FULL-WIDTH IMAGE ══════════════════════════════════ */}
      <div className="relative w-full aspect-[1470/1008] max-h-[70vh]">
        <Image
          src="/david-with-gear.png"
          alt="On the road with STAGES"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* ═══ DIRECTOR'S NOTE ═════════════════════════════════ */}
      <section className="bg-background pt-[81px] pb-[80px]">
        <ScrollReveal>
          <div className="px-6 md:px-[80px] flex justify-center">
            <div className="flex flex-col gap-[24px] max-w-[895px] w-full">
              <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase reveal">
                Director&apos;s Note
              </p>
              <p className="text-foreground/90 text-[16px] md:text-[20px] leading-[26px] md:leading-[32.5px] reveal">
                &ldquo;STAGES, my debut feature, a story nearly a decade in the
                making, that has mirrored my own journey in so many ways, is making
                its World Premiere at SXSW in just a few weeks. STAGES tells the
                story of two mid-career musicians navigating the uphill journey of
                starting over and touring under their own names for the first
                time.&rdquo;
              </p>
              <p className="text-foreground font-bold text-[14px] leading-[20px] reveal">
                — RYAN BOOTH
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ FEATURING ═══════════════════════════════════════ */}
      <FeaturingSection characters={characters} />

      {/* ═══ STAY UPDATED ════════════════════════════════════ */}
      <section id="updates" className="bg-accent pt-[80px] pb-[80px]">
        <ScrollReveal>
          <div className="px-6 md:px-[80px] flex justify-center">
            <div className="flex flex-col gap-[24px] max-w-[700px] w-full items-center text-center">
              <h2 className="font-display text-[#0a0a0a] text-[36px] md:text-[60px] leading-[60px] tracking-[-3px] uppercase reveal">
                STAY UPDATED
              </h2>
              <p className="text-[#0a0a0a]/90 text-[16px] leading-[24px] reveal">
                Get notified about upcoming screenings, news, and distribution updates.
              </p>
              <div className="reveal">
                <EmailForm />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ═══ SHARE TEASER ═════════════════════════════════════ */}
      <section className="bg-card py-20 px-6 md:px-[80px] border-t border-border">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="font-meta text-muted text-xs tracking-[0.3px] uppercase mb-4 reveal">
                Share
              </p>
              <h2 className="font-display text-foreground text-[32px] md:text-[48px] leading-[48px] tracking-[-2.4px] uppercase reveal">
                SPREAD THE WORD
              </h2>
              <p className="text-muted text-base mt-4 max-w-md leading-relaxed reveal">
                Download posters, stills, and assets for sharing on social.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 reveal">
              <Button href="/share" variant="secondary">
                VIEW ASSETS
              </Button>
              <CopyButton url="https://stagesfilm.com" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
