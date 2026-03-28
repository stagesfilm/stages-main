import type { GlobalConfig } from "payload";

export const PressPage: GlobalConfig = {
  slug: "press-page",
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "introText",
      type: "textarea",
      admin: { description: "Introduction text at the top of the press page" },
    },
    {
      name: "filmFacts",
      type: "array",
      admin: { description: "Key/value pairs for film information (Title, Year, Runtime, etc.)" },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "value",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "downloads",
      type: "array",
      admin: { description: "Press material download links" },
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "description",
          type: "text",
        },
        {
          name: "href",
          type: "text",
          required: true,
          admin: { description: "Link URL (e.g. /share#press-promotional)" },
        },
      ],
    },
  ],
};
