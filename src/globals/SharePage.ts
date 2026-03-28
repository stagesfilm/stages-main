import type { GlobalConfig } from "payload";

export const SharePage: GlobalConfig = {
  slug: "share-page",
  admin: {
    group: "Pages",
  },
  fields: [
    {
      name: "introText",
      type: "textarea",
      admin: { description: "Introduction text at the top of the share page" },
    },
    {
      name: "usageGuidelines",
      type: "richText",
      admin: { description: "Usage guidelines content (two-column on desktop)" },
    },
    {
      name: "promotionalAssets",
      type: "array",
      admin: { description: "Press & promotional images (posters, social assets, key art)" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "label",
          type: "text",
          admin: { description: "Optional label for the asset" },
        },
      ],
    },
    {
      name: "productionStills",
      type: "array",
      admin: { description: "Production still images for editorial use" },
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
