import type { CollectionConfig } from "payload";

export const Screenings: CollectionConfig = {
  slug: "screenings",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "eventGroup", "eventDate", "visibility", "ticketingType"],
    group: "Content",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: 'e.g. "SXSW World Premiere" or "Private Cast & Crew Screening"',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "date",
          type: "text",
          required: true,
          admin: {
            width: "25%",
            description: 'Display date, e.g. "MAR 12"',
          },
        },
        {
          name: "time",
          type: "text",
          required: true,
          admin: {
            width: "25%",
            description: 'e.g. "9:45 PM"',
          },
        },
        {
          name: "venue",
          type: "text",
          required: true,
          admin: {
            width: "25%",
            description: 'e.g. "ALAMO LAMAR 7"',
          },
        },
        {
          name: "location",
          type: "text",
          required: true,
          admin: {
            width: "25%",
            description: 'e.g. "AUSTIN, TX"',
          },
        },
      ],
    },
    {
      name: "eventDate",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayOnly",
          displayFormat: "MMM d, yyyy",
        },
        description: "Used to determine if screening is upcoming or past",
      },
    },
    {
      name: "eventGroup",
      type: "text",
      admin: {
        description:
          "Optional. Leave empty for general public listings (no sub-heading). " +
          'Add a label to group events, e.g. "SXSW 2026", "Regional tour".',
      },
    },
    {
      name: "note",
      type: "textarea",
      admin: {
        description: 'Optional note, e.g. "*Q&A to follow with cast and filmmakers"',
      },
    },
    {
      type: "row",
      fields: [
        {
          name: "visibility",
          type: "select",
          required: true,
          defaultValue: "public",
          options: [
            { label: "Public", value: "public" },
            { label: "Private", value: "private" },
          ],
          admin: {
            width: "50%",
            description: "Public screenings appear on /screenings. Private ones only on landing pages.",
          },
        },
        {
          name: "ticketingType",
          type: "select",
          required: true,
          defaultValue: "external",
          options: [
            { label: "External Festival", value: "external" },
            { label: "Luma (Self-Organized)", value: "luma" },
            { label: "Custom Link", value: "custom" },
          ],
          admin: {
            width: "50%",
            description: "How tickets/RSVP are handled for this screening",
          },
        },
      ],
    },
    {
      name: "ticketUrl",
      type: "text",
      admin: {
        description: "URL to external ticket page (SXSW, Cannes, etc.) or custom link",
        condition: (_data, siblingData) =>
          siblingData?.ticketingType === "external" || siblingData?.ticketingType === "custom",
      },
    },
    {
      name: "lumaEventUrl",
      type: "text",
      admin: {
        description: "Full Luma event URL (e.g. https://lu.ma/abc123) — used to render the RSVP embed widget",
        condition: (_data, siblingData) => siblingData?.ticketingType === "luma",
      },
    },
    {
      name: "linkedLandingPage",
      type: "relationship",
      relationTo: "landing-pages",
      admin: {
        description: "For private screenings, link to the landing page where this screening appears",
        condition: (_data, siblingData) => siblingData?.visibility === "private",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: true,
      admin: {
        position: "sidebar",
      },
    },
  ],
};
