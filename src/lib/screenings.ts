export interface Screening {
  date: string;
  time: string;
  venue: string;
  location: string;
  href: string;
  note?: string;
  /** ISO date used for auto-hide once the event day has passed (in CT) */
  eventDate: string;
}

export const screenings: Screening[] = [
  { date: "MAR 12", time: "9:45 PM", venue: "ALAMO LAMAR 7", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19955", note: "*Q&A to follow with cast and filmmakers", eventDate: "2026-03-12" },
  { date: "MAR 12", time: "9:45 PM", venue: "ALAMO LAMAR 2", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19956", eventDate: "2026-03-12" },
  { date: "MAR 14", time: "3:30 PM", venue: "VIOLET CROWN 1", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19957", note: "*Q&A to follow with cast and filmmakers", eventDate: "2026-03-14" },
  { date: "MAR 14", time: "3:30 PM", venue: "VIOLET CROWN 3", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19958", eventDate: "2026-03-14" },
  { date: "MAR 17", time: "9:30 PM", venue: "ROLLINS THEATRE", location: "AUSTIN, TX", href: "https://schedule.sxsw.com/events/FS19959", eventDate: "2026-03-17" },
];

/** Returns only screenings whose event date hasn't passed yet. */
export function getUpcomingScreenings(): Screening[] {
  const today = new Date().toISOString().slice(0, 10);
  return screenings.filter((s) => s.eventDate >= today);
}

export function hasUpcomingScreenings(): boolean {
  return getUpcomingScreenings().length > 0;
}
