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
    org: null,
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
    title: "Electronic Press Kit",
    description: "Complete press materials, synopsis, and key art",
    href: "#",
  },
  {
    title: "Production Stills",
    description: "High-resolution images for editorial use",
    href: "#",
  },
  // {
  //   title: "Official Poster",
  //   description: "Print-ready poster in multiple formats",
  //   href: "#",
  // },
  // {
  //   title: "Festival Laurels",
  //   description: "SXSW 2026 graphics and logos",
  //   href: "#",
  // },
];

const filmFacts = [
  { label: "Title", value: "STAGES" },
  { label: "Year", value: "2026" },
  { label: "Runtime", value: "94 min" },
  { label: "Language", value: "English" },
  { label: "Country", value: "USA" },
  { label: "Format", value: "Digital" },
];

const credits = [
  { role: "Director", name: "Ryan Booth" },
  { role: "Executive Producer", name: "Ryan Booth, Michael Rapino" },
  { role: "Producer", name: "Val Hill, Morgan Stevenson Cooper, Jolene Rapino, Russell Wayne Groves" },
  { role: "Screenwriter", name: "Bradley Jackson, Dan Steele" },
  { role: "Cinematography", name: "Patrick Bolen" },
  { role: "Editor", name: "Laura Ranger" },
  { role: "Production Designer", name: "Thoa Nguyen" },
  { role: "Score", name: "Mark Bartels, Steve Home, Beth Davis" },
  { role: "Music", name: "David Ramirez, Steve Green" },
  {
    role: "Cast",
    name: "David Ramirez, Leslie Grace, Jolene, Jane McMullen, Rafael Cueva, Xavier Ramirez, Amanda Sudano Ramirez, Jerry Ferrera, Marc Menchaca, David Strathairn",
  },
];

export default function PressPage() {
  return (
    <>
      {/* Press Header */}
      <section className="pt-[120px] pb-20 bg-background">
        <div className="w-full px-6 md:px-[80px]">
          <p className="font-meta text-muted text-xs tracking-[0.3px] uppercase mb-4">
            Press & Media
          </p>
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
          <div className="grid md:grid-cols-4 gap-10">
            {contacts.map((contact) => (
              <div key={contact.title}>
                <p className="font-meta text-[10px] tracking-[0.5px] text-muted uppercase mb-2">
                  {contact.title}
                </p>
                {contact.org && <p className="font-semibold text-foreground mb-0.5">{contact.org}</p>}
                {contact.name && <p className="text-foreground/80 mb-1">{contact.name}</p>}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-sm text-accent hover:text-accent-hover transition-colors underline"
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
              <a
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </span>
              </a>
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
