import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { getPayloadClient } from "@/lib/payload";
import type { PressPage as PressPageType, SiteSetting, Credit, Review, Media } from "@/payload-types";

export const revalidate = 3600;

export default async function PressPage() {
  const payload = await getPayloadClient();

  const [pressPage, siteSettings, creditsResult, reviewsResult] = await Promise.all([
    payload.findGlobal({ slug: "press-page" }) as Promise<PressPageType>,
    payload.findGlobal({ slug: "site-settings" }) as Promise<SiteSetting>,
    payload.find({ collection: "credits", sort: "order", limit: 50 }),
    payload.find({ collection: "reviews", sort: "order", limit: 20, depth: 1 }),
  ]);

  const credits = creditsResult.docs as Credit[];
  const reviews = reviewsResult.docs as Review[];
  const contacts = siteSettings.contactEntries ?? [];
  const filmFacts = pressPage.filmFacts ?? [];
  const downloads = pressPage.downloads ?? [];
  const introText = pressPage.introText ?? "Press materials, downloadable assets, and contact information for STAGES.";

  // Get the press contact email for the CTA
  const pressContact = contacts.find((c) => c.title?.toLowerCase().includes("publicity"));
  const pressEmail = pressContact?.email ?? "ChrisDelhomme@LiveNationStudios.com";

  return (
    <>
      {/* Press Header */}
      <section className="pt-[148px] pb-20 bg-background">
        <div className="w-full px-6 md:px-[80px]">
          <h1
            className="font-display text-foreground leading-none tracking-[-1px] mb-6"
            style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
          >
            PRESS &amp;
            <br />
            MATERIALS
          </h1>
          <p className="text-foreground/70 text-base max-w-xl leading-relaxed">{introText}</p>
        </div>
      </section>

      {/* Contacts */}
      {contacts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Contact
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {contacts.map((contact) => (
                <div key={contact.id ?? contact.title} className="min-w-0">
                  <p className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-2">
                    {contact.title}
                  </p>
                  {contact.org && (
                    <p className="font-semibold text-foreground mb-0.5">{contact.org}</p>
                  )}
                  {contact.name && (
                    <p className="text-foreground/80 mb-1">{contact.name}</p>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-accent hover:text-accent-hover transition-colors underline break-all"
                    >
                      {contact.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Press Materials */}
      {downloads.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Press Materials
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {downloads.map((item) => (
                <Link
                  key={item.id ?? item.title}
                  href={item.href}
                  className="group flex items-center justify-between gap-4 p-6 bg-card border border-border hover:border-accent/50 transition-all duration-200"
                >
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    {item.description && (
                      <p className="text-sm text-muted">{item.description}</p>
                    )}
                  </div>
                  <span className="shrink-0 w-10 h-10 flex items-center justify-center border border-border group-hover:border-accent transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Film Information */}
      {filmFacts.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Film Information
            </h2>
            <div className="flex flex-wrap gap-x-14 gap-y-4">
              {filmFacts.map((fact) => (
                <div key={fact.id ?? fact.label} className="flex flex-col gap-0.5">
                  <span className="text-muted text-xs uppercase tracking-[0.4px]">{fact.label}</span>
                  <span className="font-semibold text-foreground">{fact.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Credits */}
      {credits.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Credits
            </h2>
            <div className="space-y-4">
              {credits.map((credit) => (
                <div
                  key={credit.id}
                  className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border pb-3"
                >
                  <span className="text-muted text-sm sm:w-[200px] shrink-0">{credit.role}</span>
                  <span className="font-medium text-sm text-foreground flex-1">{credit.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews & Awards */}
      {reviews.length > 0 && (
        <section className="py-16 border-t border-border">
          <div className="w-full px-6 md:px-[80px]">
            <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
              Reviews &amp; Awards
            </h2>
            <div className="space-y-10">
              {reviews.map((review) => {
                const laurelImg = review.laurelImage as Media | null | undefined;
                // Prefer uploaded media; fall back to public path string
                const laurelSrc = laurelImg?.filename
                  ? `/media/${laurelImg.filename}`
                  : review.laurelImageUrl ?? null;

                return (
                  <div key={review.id} className="flex flex-col sm:flex-row gap-8 items-start">
                    {laurelSrc && (
                      <div className="relative w-[140px] h-[76px] shrink-0">
                        <Image
                          src={laurelSrc}
                          alt={laurelImg?.alt ?? review.award ?? "Award laurel"}
                          fill
                          className="object-contain object-left"
                          unoptimized={!laurelImg}
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-2">
                      {review.award && (
                        <p className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase">
                          {review.award}
                        </p>
                      )}
                      {review.winner && (
                        <p className="text-sm font-semibold text-foreground">{review.winner}</p>
                      )}
                      {review.quote && (
                        <blockquote className="text-foreground/75 text-sm leading-relaxed italic border-l-2 border-accent pl-4 mt-1">
                          &ldquo;{review.quote}&rdquo;
                        </blockquote>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-accent">
        <div className="w-full px-6 md:px-[80px]">
          <h2
            className="font-display text-[#0a0a0a] leading-none tracking-[-1px] mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}
          >
            NEED MORE INFORMATION?
          </h2>
          <p className="text-[#0a0a0a]/75 mb-8 max-w-md text-base leading-relaxed">
            For additional materials or interview requests, contact our press team.
          </p>
          <Button href={`mailto:${pressEmail}`} variant="secondary">
            CONTACT PRESS TEAM
          </Button>
        </div>
      </section>
    </>
  );
}
