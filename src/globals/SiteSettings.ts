import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  admin: {
    group: "System",
  },
  fields: [
    {
      name: "siteUrl",
      type: "text",
      required: true,
      defaultValue: "https://stages.movie",
      admin: { description: "Canonical site URL (no trailing slash)" },
    },
    {
      name: "googleAnalyticsId",
      type: "text",
      admin: { description: "Google Analytics 4 measurement ID (e.g. G-5KDEP34PFL)" },
    },
    {
      name: "contactEntries",
      type: "array",
      admin: { description: "Contact information shown in footer and press page" },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
          admin: { description: 'Role title, e.g. "Distributor", "Publicity Contact"' },
        },
        {
          name: "org",
          type: "text",
          admin: { description: "Organization name" },
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "email",
          type: "email",
        },
      ],
    },
    {
      name: "socialLinks",
      type: "array",
      admin: { description: "Social media links" },
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: [
            { label: "Instagram", value: "instagram" },
            { label: "Twitter / X", value: "twitter" },
            { label: "IMDb", value: "imdb" },
            { label: "YouTube", value: "youtube" },
            { label: "Facebook", value: "facebook" },
            { label: "Other", value: "other" },
          ],
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
        {
          name: "label",
          type: "text",
          admin: { description: "Display label (optional, defaults to platform name)" },
        },
      ],
    },
  ],
};
