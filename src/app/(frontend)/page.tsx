import Image from "next/image";
import { Button } from "@/components/Button";
import { FeaturingSection, type CharacterCard } from "@/components/FeaturingSection";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CopyButton } from "@/components/CopyButton";
import { EmailForm } from "@/components/EmailForm";
import { HeroVideo } from "@/components/HeroVideo";
import { getPayloadClient } from "@/lib/payload";
import type { Homepage, Cast, Media } from "@/payload-types";

export const revalidate = 3600;

// ─── JSON-LD (static — schema.org Movie) ─────────────────────────────────────

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
  countryOfOrigin: { "@type": "Country", name: "United States" },
  director: { "@type": "Person", name: "Ryan Booth" },
  productionCompany: { "@type": "Organization", name: "Live Nation Studios" },
  actor: [
    "David Ramirez", "Leslie Grace", "Jolene", "Jake McMullen",
    "Abner Ramirez", "Rafael Casal", "Amanda Sudano Ramirez",
    "Marc Menchaca", "David Strathairn", "Jerry Ferrara",
  ].map((name) => ({ "@type": "Person", name })),
  image: "https://stages.movie/opengraph.png",
  url: "https://stages.movie",
};

// ─── Laurels container ────────────────────────────────────────────────────────
// Max-width matches actor-stages SVG (593px). Each laurel shrinks as more are
// added, wrapping to a second row rather than overflowing.
// Formula: each laurel gets an equal share, capped at 202px (2-laurel baseline)
// and floored at 80px (readable minimum). Gap accounts for the 16px gap.

const LAUREL_MAX_CONTAINER = 593; // matches max-w-[593px] of actor-stages SVG
const LAUREL_HEIGHT_DESKTOP = 110;
const LAUREL_HEIGHT_MOBILE = 87;
const LAUREL_GAP = 16;
const LAUREL_MAX_W = 202;
const LAUREL_MIN_W = 80;

function laurelWidth(count: number): number {
  if (count <= 0) return LAUREL_MAX_W;
  const share = (LAUREL_MAX_CONTAINER - (count - 1) * LAUREL_GAP) / count;
  return Math.max(LAUREL_MIN_W, Math.min(LAUREL_MAX_W, Math.floor(share)));
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function Home() {
  const payload = await getPayloadClient();

  const [homepage, castResult] = await Promise.all([
    payload.findGlobal({ slug: "homepage", depth: 1 }) as Promise<Homepage>,
    payload.find({
      collection: "cast",
      sort: "order",
      limit: 20,
      depth: 1,
    }),
  ]);

  const castItems = castResult.docs as Cast[];

  // Map CMS cast data to CharacterCard shape
  const characters: CharacterCard[] = castItems.map((c) => ({
    characterName: c.characterName,
    performedBy: c.performedBy,
    actorName: c.actorName,
    actorUrl: c.actorUrl ?? undefined,
    // If images are populated as Media objects, use their URL; else keep the stored string
    image1: typeof c.primaryImage === "object" ? `/media/${(c.primaryImage as Media).filename}` : String(c.primaryImage),
    image2: typeof c.hoverImage === "object" ? `/media/${(c.hoverImage as Media).filename}` : String(c.hoverImage),
    image1Alt: `${c.actorName} as ${c.characterName}`,
    image2Alt: `${c.characterName}`,
    quote: c.quote ?? undefined,
  }));

  // Laurels from CMS — fall back to empty if not yet configured
  const laurels = (homepage.laurels ?? []) as Array<{
    id?: string | null;
    image: number | Media;
    link?: string | null;
  }>;
  const laurelW = laurelWidth(laurels.length);

  // If no CMS cast yet, fall back to hardcoded characters for visual continuity
  const hasNoCastInCMS = castItems.length === 0;

  const logline = homepage.logline ??
    "After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. Life on the road feels different now, and Ben must find his footing alongside Rita, his steadfast tour manager, and Jessie Ramos, his charismatic, spotlight-stealing opening act.";

  const directedBy = homepage.directedBy ?? "RYAN BOOTH";
  const year = homepage.year ?? "2026";
  const runtime = homepage.runtime ?? "94 MIN";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ═══ HERO ═══════════════════════════════════════════════ */}
      <section className="relative flex flex-col">
        <HeroVideo />

        <div className="relative pt-[200px] md:pt-[240px] px-6 md:px-[80px] pb-[96px]">

          {/* Award laurels — dynamic, constrained to SVG width, wrapping */}
          {laurels.length > 0 ? (
            <div
              className="flex flex-wrap gap-4 mb-[20px] animate-fade-up animate-delay-100"
              style={{ maxWidth: `${LAUREL_MAX_CONTAINER}px` }}
            >
              {laurels.map((laurel, i) => {
                const img = laurel.image as Media;
                const src = img?.filename ? `/media/${img.filename}` : null;
                if (!src) return null;

                const tile = (
                  <div
                    key={laurel.id ?? i}
                    className="relative flex-shrink-0"
                    style={{
                      width: `${laurelW}px`,
                      height: `${LAUREL_HEIGHT_MOBILE}px`,
                    }}
                  >
                    <style>{`
                      @media (min-width: 768px) {
                        .laurel-${i} { height: ${LAUREL_HEIGHT_DESKTOP}px !important; }
                      }
                    `}</style>
                    <div
                      className={`laurel-${i} relative w-full`}
                      style={{ height: `${LAUREL_HEIGHT_MOBILE}px` }}
                    >
                      <Image
                        src={src}
                        alt={img.alt ?? "Award laurel"}
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                );

                return laurel.link ? (
                  <a
                    key={laurel.id ?? i}
                    href={laurel.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0"
                  >
                    {tile}
                  </a>
                ) : tile;
              })}
            </div>
          ) : (
            /* Hardcoded laurels until CMS is populated */
            <div className="flex items-center gap-4 mb-[20px] animate-fade-up animate-delay-100">
              <div className="w-[160px] md:w-[202px] h-[87px] md:h-[110px] relative flex-shrink-0">
                <Image
                  src="/Best of Texas Award_White.png"
                  alt="Best of Texas Award"
                  fill
                  className="object-contain object-left"
                />
              </div>
              <div className="w-[160px] md:w-[202px] h-[87px] md:h-[110px] relative flex-shrink-0">
                <Image
                  src="/DIFF-Laurel.png"
                  alt="Dallas International Film Festival Laurel"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </div>
          )}

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
                <Button href="/screenings">VIEW SCREENINGS</Button>
              </div>
            </div>

            {/* Col 2: synopsis, director, year/runtime */}
            <div className="flex flex-col gap-[40px] animate-fade-up animate-delay-400">
              <p className="text-foreground text-[16px] leading-[26px] max-w-[442px]">
                {logline}
              </p>

              <div className="flex flex-col gap-[35px]">
                <div className="flex flex-col gap-[4px]">
                  <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                    DIRECTED BY
                  </p>
                  <p className="text-foreground font-bold text-[18px] leading-[28px]">
                    {directedBy}
                  </p>
                </div>

                <div className="flex gap-[32px]">
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                      YEAR
                    </p>
                    <p className="text-foreground font-bold text-[16px] leading-[24px]">
                      {year}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <p className="font-meta text-foreground/60 text-[12px] tracking-[0.3px] leading-[16px] uppercase">
                      RUNTIME
                    </p>
                    <p className="text-foreground font-bold text-[16px] leading-[24px]">
                      {runtime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FEATURING ═══════════════════════════════════════ */}
      {!hasNoCastInCMS && <FeaturingSection characters={characters} />}

      {/* ═══ ABOUT THE FILM ═══════════════════════════════════ */}
      <section className="bg-background py-[140px] px-6 md:px-[80px]">
        <ScrollReveal>
          <div className="flex flex-col gap-[40px] items-center w-full">
            <h2 className="font-display text-foreground text-[32px] md:text-[48px] leading-[48px] tracking-[-2.4px] uppercase text-center reveal">
              {homepage.aboutHeading ?? "ABOUT THE FILM"}
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
                — {homepage.directorName ?? "RYAN BOOTH"}
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
              <CopyButton url="https://stages.movie" />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
