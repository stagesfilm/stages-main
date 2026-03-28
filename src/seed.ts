/**
 * Seed script — migrates all hardcoded content into Payload.
 * Run with: pnpm payload seed
 *
 * Safe to run multiple times: checks for existing data before inserting.
 */
import type { SanitizedConfig } from "payload";
import { getPayload } from "payload";

export const script = async (config: SanitizedConfig) => {
  const payload = await getPayload({ config });

  // ─── Screenings ──────────────────────────────────────────────────────────────

  const { totalDocs: existingScreenings } = await payload.count({ collection: "screenings" });

  if (existingScreenings === 0) {
    payload.logger.info("Seeding screenings...");

    const screeningsData = [
      {
        title: "SXSW Opening Night",
        date: "MAR 12",
        time: "9:45 PM",
        venue: "ALAMO LAMAR 7",
        location: "AUSTIN, TX",
        eventDate: "2026-03-12",
        eventGroup: "SXSW 2026",
        note: "*Q&A to follow with cast and filmmakers",
        visibility: "public" as const,
        ticketingType: "external" as const,
        ticketUrl: "https://schedule.sxsw.com/events/FS19955",
        published: true,
      },
      {
        title: "SXSW Screening",
        date: "MAR 12",
        time: "9:45 PM",
        venue: "ALAMO LAMAR 2",
        location: "AUSTIN, TX",
        eventDate: "2026-03-12",
        eventGroup: "SXSW 2026",
        visibility: "public" as const,
        ticketingType: "external" as const,
        ticketUrl: "https://schedule.sxsw.com/events/FS19956",
        published: true,
      },
      {
        title: "SXSW Screening",
        date: "MAR 14",
        time: "3:30 PM",
        venue: "VIOLET CROWN 1",
        location: "AUSTIN, TX",
        eventDate: "2026-03-14",
        eventGroup: "SXSW 2026",
        note: "*Q&A to follow with cast and filmmakers",
        visibility: "public" as const,
        ticketingType: "external" as const,
        ticketUrl: "https://schedule.sxsw.com/events/FS19957",
        published: true,
      },
      {
        title: "SXSW Screening",
        date: "MAR 14",
        time: "3:30 PM",
        venue: "VIOLET CROWN 3",
        location: "AUSTIN, TX",
        eventDate: "2026-03-14",
        eventGroup: "SXSW 2026",
        visibility: "public" as const,
        ticketingType: "external" as const,
        ticketUrl: "https://schedule.sxsw.com/events/FS19958",
        published: true,
      },
      {
        title: "SXSW Closing Screening",
        date: "MAR 17",
        time: "9:30 PM",
        venue: "ROLLINS THEATRE",
        location: "AUSTIN, TX",
        eventDate: "2026-03-17",
        eventGroup: "SXSW 2026",
        visibility: "public" as const,
        ticketingType: "external" as const,
        ticketUrl: "https://schedule.sxsw.com/events/FS19959",
        published: true,
      },
    ];

    for (const s of screeningsData) {
      await payload.create({ collection: "screenings", data: s });
    }
    payload.logger.info(`Created ${screeningsData.length} screenings.`);
  } else {
    payload.logger.info(`Skipping screenings — ${existingScreenings} already exist.`);
  }

  // ─── Credits ─────────────────────────────────────────────────────────────────

  const { totalDocs: existingCredits } = await payload.count({ collection: "credits" });

  if (existingCredits === 0) {
    payload.logger.info("Seeding credits...");

    const creditsData = [
      { role: "Director", name: "Ryan Booth", order: 1 },
      { role: "Writers", name: "Bradley Jackson, Dan Steele", order: 2 },
      { role: "Producers", name: "Val Hill, Jolene, Morgan Stephenson Cooper, Russell Wayne Groves", order: 3 },
      { role: "Executive Producers", name: "Michael Rapino, Ryan Kroft, Jessica James Batista, Vaughn Trudeau", order: 4 },
      { role: "Co-Executive Producers", name: "Abner Ramirez, Amanda Sudano Ramirez", order: 5 },
      { role: "Director of Photography", name: "Patrick Golan", order: 6 },
      { role: "Production Designer", name: "Thoa Nguyen", order: 7 },
      { role: "Editor", name: "Lucas Harger", order: 8 },
      { role: "Costume Designer", name: "Wlaa Elashkar", order: 9 },
      { role: "Music Composer", name: "Giosue Greco", order: 10 },
      { role: "Casting Director", name: "Amey Rene", order: 11 },
      { role: "Original Music", name: "David Ramirez", order: 12 },
      { role: "Additional Original Music", name: "David Ramirez, Malay, Abner Ramirez", order: 13 },
      { role: "Additional Live Production", name: "Jake McMullen, Christian Harger", order: 14 },
      { role: "Cast", name: "David Ramirez, Leslie Grace, Jolene, Jake McMullen, Abner Ramirez, Rafael Casal, Amanda Sudano Ramirez, Marc Menchaca, David Strathairn, Jerry Ferrara", order: 15 },
    ];

    for (const c of creditsData) {
      await payload.create({ collection: "credits", data: c });
    }
    payload.logger.info(`Created ${creditsData.length} credits.`);
  } else {
    payload.logger.info(`Skipping credits — ${existingCredits} already exist.`);
  }

  // ─── Reviews ─────────────────────────────────────────────────────────────────

  const { totalDocs: existingReviews } = await payload.count({ collection: "reviews" });

  if (existingReviews === 0) {
    payload.logger.info("Seeding reviews...");
    await payload.create({
      collection: "reviews",
      data: {
        award: "SXSW Best of Texas Award",
        winner: "Winner: STAGES directed by Ryan Booth",
        quote:
          "Ryan Booth's Stages is both a heartfelt tribute to what it takes to endure in an often unforgiving industry, and a moving portrait of life as an artist in and around Texas. It's filled with complex emotion, moving music, and a deep admiration for the Lone Star State.",
        laurelImageUrl: "/Best of Texas Award_White.png",
        order: 1,
      },
    });
    await payload.create({
      collection: "reviews",
      data: {
        award: "Dallas International Film Festival",
        winner: "Official Selection",
        laurelImageUrl: "/DIFF-Laurel.png",
        order: 2,
      },
    });
    payload.logger.info("Created 2 reviews.");
  } else {
    payload.logger.info(`Skipping reviews — ${existingReviews} already exist.`);
  }

  // ─── Press Page Global ────────────────────────────────────────────────────────

  const pressPage = await payload.findGlobal({ slug: "press-page" });
  if (!pressPage?.introText) {
    payload.logger.info("Seeding press-page global...");
    await payload.updateGlobal({
      slug: "press-page",
      data: {
        introText: "Press materials, downloadable assets, and contact information for STAGES.",
        filmFacts: [
          { label: "Title", value: "STAGES" },
          { label: "Year", value: "2026" },
          { label: "Runtime", value: "94 min" },
          { label: "Language", value: "English" },
          { label: "Country", value: "USA" },
          { label: "Format", value: "Digital" },
        ],
        downloads: [
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
        ],
      },
    });
    payload.logger.info("Press page seeded.");
  }

  // ─── Site Settings Global ─────────────────────────────────────────────────────

  const siteSettings = await payload.findGlobal({ slug: "site-settings" });
  if (!siteSettings?.siteUrl) {
    payload.logger.info("Seeding site-settings global...");
    await payload.updateGlobal({
      slug: "site-settings",
      data: {
        siteUrl: "https://stages.movie",
        googleAnalyticsId: "G-5KDEP34PFL",
        contactEntries: [
          { title: "Distributor", org: "N/A" },
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
        ],
        socialLinks: [
          {
            platform: "instagram",
            url: "https://www.instagram.com/stagesfilm/",
            label: "Instagram",
          },
        ],
      },
    });
    payload.logger.info("Site settings seeded.");
  }

  // ─── Homepage Global ─────────────────────────────────────────────────────────

  const homepage = await payload.findGlobal({ slug: "homepage" });
  if (!homepage?.heroVideoId) {
    payload.logger.info("Seeding homepage global...");
    await payload.updateGlobal({
      slug: "homepage",
      data: {
        heroVideoId: "RaeZ8LUgFxA",
        logline:
          "After the tumultuous breakup of his band, Ben Garza embarks on his first-ever solo tour. Life on the road feels different now, and Ben must find his footing alongside Rita, his steadfast tour manager, and Jessie Ramos, his charismatic, spotlight-stealing opening act.",
        directedBy: "RYAN BOOTH",
        year: "2026",
        runtime: "94 MIN",
        aboutHeading: "ABOUT THE FILM",
        directorName: "RYAN BOOTH",
        showScreeningsPreview: true,
      },
    });
    payload.logger.info("Homepage seeded.");
  }

  payload.logger.info("Seed complete.");
  process.exit(0);
};
