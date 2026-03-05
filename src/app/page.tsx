import Image from "next/image";
import { Button } from "@/components/Button";
import { FeaturingSection, type CharacterCard } from "@/components/FeaturingSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CopyButton } from "@/components/CopyButton";
import { EmailForm } from "@/components/EmailForm";
import { HeroVideo } from "@/components/HeroVideo";
import { ScreeningsSection } from "@/components/ScreeningsSection";

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
    { "@type": "Person", name: "Abner Ramirez" },
    { "@type": "Person", name: "Rafael Casal" },
    { "@type": "Person", name: "Amanda Sudano Ramirez" },
    { "@type": "Person", name: "Marc Menchaca" },
    { "@type": "Person", name: "David Strathairn" },
    { "@type": "Person", name: "Jerry Ferrara" },
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


const characters: CharacterCard[] = [
  {
    characterName: "Ben Garza",
    performedBy: "Performed by",
    actorName: "David Ramirez",
    actorUrl: "https://www.imdb.com/name/nm3273977/",
    image1: "/david-singing.png",
    image2: "/home-hero.png",
    image1Alt: "David Ramirez as Ben Garza",
    image2Alt: "Ben Garza on stage",
  },
  {
    characterName: "Jessie Ramos",
    performedBy: "Performed by",
    actorName: "Leslie Grace",
    actorUrl: "https://www.imdb.com/name/nm6051155/",
    image1: "/cast/Leslie-Grace.jpg",
    image2: "/david-singing.png",
    image1Alt: "Leslie Grace as Jessie Ramos",
    image2Alt: "Jessie Ramos performing",
  },
  {
    characterName: "Rita",
    performedBy: "Performed by",
    actorName: "Jolene",
    actorUrl: "https://www.imdb.com/name/nm0086883/",
    image1: "/cast/Jolene.jpg",
    image2: "/david-on-stage.png",
    image1Alt: "Jolene as Rita",
    image2Alt: "Rita backstage",
  },
  {
    characterName: "Parker",
    performedBy: "Performed by",
    actorName: "Jake McMullen",
    actorUrl: "https://www.louisprince.com/",
    image1: "/cast/Jake-McMullen.jpg",
    image2: "/david-with-gear.png",
    image1Alt: "Jake McMullen as Parker",
    image2Alt: "Parker at soundcheck",
  },
  {
    characterName: "Noah Ramirez",
    performedBy: "Performed by",
    actorName: "Abner Ramirez",
    actorUrl: "https://www.imdb.com/name/nm6914491/",
    image1: "/cast/abner.jpg",
    image2: "/david-with-gear.png",
    image1Alt: "Abner Ramirez as Noah Ramirez",
    image2Alt: "Noah on tour",
  },
  {
    characterName: "Jason",
    performedBy: "Performed by",
    actorName: "Rafael Casal",
    actorUrl: "https://www.imdb.com/name/nm2592137/",
    image1: "/cast/Rafael-Casal.jpg",
    image2: "/david-on-stage.png",
    image1Alt: "Rafael Casal as Jason",
    image2Alt: "Jason on tour",
  },
  {
    characterName: "Lucy",
    performedBy: "Performed by",
    actorName: "Amanda Sudano Ramirez",
    actorUrl: "https://www.imdb.com/name/nm15854802/",
    image1: "/cast/amanda.jpg",
    image2: "/david-with-gear.png",
    image1Alt: "Amanda Sudano Ramirez as Lucy",
    image2Alt: "Lucy on tour",
  },
  {
    characterName: "Pat Byrd",
    performedBy: "Performed by",
    actorName: "Marc Menchaca",
    actorUrl: "https://www.imdb.com/name/nm0578766/",
    image1: "/cast/marc.jpg",
    image2: "/david-singing.png",
    image1Alt: "Marc Menchaca as Pat Byrd",
    image2Alt: "Pat Byrd backstage",
  },
  {
    characterName: "Porter Gates",
    performedBy: "Performed by",
    actorName: "David Strathairn",
    actorUrl: "https://www.imdb.com/name/nm0000657/",
    image1: "/cast/David-Strathairn.jpg",
    image2: "/home-hero.png",
    image1Alt: "David Strathairn as Porter Gates",
    image2Alt: "Porter Gates",
  },
  {
    characterName: "Kevin",
    performedBy: "Performed by",
    actorName: "Jerry Ferrara",
    actorUrl: "https://www.imdb.com/name/nm1483196/",
    image1: "/cast/Jerry-Ferrara.jpg",
    image2: "/home-hero.png",
    image1Alt: "Jerry Ferrara as Kevin",
    image2Alt: "Kevin backstage",
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
        {/* Background video with fallback to image carousel */}
        <HeroVideo />

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

      {/* ═══ SXSW 2026 SCREENINGS (auto-hides when all past) ═══ */}
      <ScreeningsSection />

      {/* ═══ FEATURING ═══════════════════════════════════════ */}
      <FeaturingSection characters={characters} />

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

      {/* ═══ DIRECTOR'S NOTE ═════════════════════════════════ */}
      <section className="bg-background pt-[81px] pb-[80px]">
        <ScrollReveal>
          <div className="px-6 md:px-[80px] flex justify-center">
            <div className="flex flex-col gap-[24px] max-w-[895px] w-full">
              <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase reveal">
                Director&apos;s Note
              </p>
              <p className="text-foreground/90 text-[16px] md:text-[20px] leading-[26px] md:leading-[32.5px] reveal">
                &ldquo;My love of music is where this film begins. Before I ever
                called myself a filmmaker, I was an audio engineer in recording
                studios in Texas and Nashville, spending years watching musicians
                step up to a microphone and try to capture something honest. Over
                the last decade I&apos;ve had the chance to work with artists across
                the entire spectrum of the industry&mdash;from global stars to the
                incredible musicians who spend their lives touring small rooms and
                fighting to be heard. Artists like David Ramirez, who I&apos;ve
                known and worked alongside for years. Those relationships, and the
                time spent in green rooms, on stages, and on long drives between
                shows, shaped the DNA of this film. STAGES is my attempt to bring
                the lives and struggles of musicians like David&mdash;and the beauty
                and vulnerability of live performance&mdash;to a wider
                audience.&rdquo;
              </p>
              <p className="text-foreground font-bold text-[14px] leading-[20px] reveal">
                — RYAN BOOTH
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

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
