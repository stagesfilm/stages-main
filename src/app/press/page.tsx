import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";

const contacts = [
  {
    title: "Distributor",
    org: "N/A",
    name: null,
    email: null,
  },
  {
    title: "Public Film Contact",
    org: "The Ranch Productions",
    name: "Kat Delby",
    email: "kat@theranchproductions.com",
  },
  {
    title: "Publicity Contact",
    org: "Live Nation Studios",
    name: "Chris Delhomme",
    email: "ChrisDelhomme@LiveNationStudios.com",
  },
  {
    title: "Sales Agent",
    org: "Live Nation Studios",
    name: "Ross Putman",
    email: "RossPutman@LiveNationStudios.com",
  },
];

const downloads = [
  {
    title: "Press & Promotional",
    description: "Poster, social assets, and key art",
    href: "/share#press-promotional",
  },
  {
    title: "Production Stills",
    description: "High-resolution images for editorial use",
    href: "/share#production-stills",
  },
];

const filmFacts = [
  { label: "Title", value: "STAGES" },
  { label: "Year", value: "2026" },
  { label: "Runtime", value: "94 min" },
  { label: "Language", value: "English" },
  { label: "Country", value: "USA" },
  { label: "Format", value: "Digital" },
];

const reviews = [
  {
    laurel: "/Best of Texas Award_White.png",
    laurelAlt: "SXSW Best of Texas Award",
    award: "SXSW Best of Texas Award",
    winner: "Winner: Stages directed by Ryan Booth",
    quote:
      "Ryan Booth's Stages is both a heartfelt tribute to what it takes to endure in an often unforgiving industry, and a moving portrait of life as an artist in and around Texas. It's filled with complex emotion, moving music, and a deep admiration for the Lone Star State.",
  },
];

const credits = [
  { role: "Director", name: "Ryan Booth" },
  { role: "Writers", name: "Bradley Jackson, Dan Steele" },
  { role: "Producers", name: "Val Hill, Jolene, Morgan Stephenson Cooper, Russell Wayne Groves" },
  { role: "Executive Producers", name: "Michael Rapino, Ryan Kroft, Jessica James Batista, Vaughn Trudeau" },
  { role: "Co-Executive Producers", name: "Abner Ramirez, Amanda Sudano Ramirez" },
  { role: "Director of Photography", name: "Patrick Golan" },
  { role: "Production Designer", name: "Thoa Nguyen" },
  { role: "Editor", name: "Lucas Harger" },
  { role: "Costume Designer", name: "Wlaa Elashkar" },
  { role: "Music Composer", name: "Giosue Greco" },
  { role: "Casting Director", name: "Amey Rene" },
  { role: "Original Music", name: "David Ramirez" },
  { role: "Additional Original Music", name: "David Ramirez, Malay, Abner Ramirez" },
  { role: "Additional Live Production", name: "Jake McMullen, Christian Harger" },
  {
    role: "Cast",
    name: "David Ramirez, Leslie Grace, Jolene, Jake McMullen, Abner Ramirez, Rafael Casal, Amanda Sudano Ramirez, Marc Menchaca, David Strathairn, Jerry Ferrara",
  },
];

export default function PressPage() {
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
          <p className="text-foreground/70 text-base max-w-xl leading-relaxed">
            Press materials, downloadable assets, and contact information for STAGES.
          </p>
        </div>
      </section>

      {/* Contacts */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Contact
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {contacts.map((contact) => (
              <div key={contact.title} className="min-w-0">
                <p className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-2">
                  {contact.title}
                </p>
                {contact.org && <p className="font-semibold text-foreground mb-0.5">{contact.org}</p>}
                {contact.name && <p className="text-foreground/80 mb-1">{contact.name}</p>}
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

      {/* Press Materials */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Press Materials
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {downloads.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between gap-4 p-6 bg-card border border-border hover:border-accent/50 transition-all duration-200"
              >
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted">{item.description}</p>
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

      {/* Film Information — full-width */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Film Information
          </h2>
          <div className="flex flex-wrap gap-x-14 gap-y-4">
            {filmFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-0.5">
                <span className="text-muted text-xs uppercase tracking-[0.4px]">{fact.label}</span>
                <span className="font-semibold text-foreground">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Credits — full-width */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Credits
          </h2>
          <div className="space-y-4">
            {credits.map((credit) => (
              <div key={credit.role} className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b border-border pb-3">
                <span className="text-muted text-sm sm:w-[200px] shrink-0">{credit.role}</span>
                <span className="font-medium text-sm text-foreground flex-1">
                  {credit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 border-t border-border">
        <div className="w-full px-6 md:px-[80px]">
          <h2 className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-10">
            Reviews &amp; Awards
          </h2>
          <div className="space-y-10">
            {reviews.map((review) => (
              <div key={review.award} className="flex flex-col sm:flex-row gap-8 items-start">
                <div className="relative w-[140px] h-[76px] shrink-0">
                  <Image
                    src={review.laurel}
                    alt={review.laurelAlt}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase">
                    {review.award}
                  </p>
                  <p className="text-sm font-semibold text-foreground">{review.winner}</p>
                  <blockquote className="text-foreground/75 text-sm leading-relaxed italic border-l-2 border-accent pl-4 mt-1">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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
          <Button href="mailto:ChrisDelhomme@LiveNationStudios.com" variant="secondary">
            CONTACT PRESS TEAM
          </Button>
        </div>
      </section>
    </>
  );
}
