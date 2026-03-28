import type { CollectionConfig } from "payload";

export const Cast: CollectionConfig = {
  slug: "cast",
  admin: {
    useAsTitle: "actorName",
    defaultColumns: ["actorName", "characterName", "order"],
    group: "Content",
  },
  fields: [
    {
      name: "characterName",
      type: "text",
      required: true,
      admin: { description: 'Character name, e.g. "Ben Garza"' },
    },
    {
      name: "performedBy",
      type: "text",
      required: true,
      admin: { description: 'Credit label, e.g. "Performed by"' },
    },
    {
      name: "actorName",
      type: "text",
      required: true,
      admin: { description: 'Actor name, e.g. "David Ramirez"' },
    },
    {
      name: "actorUrl",
      type: "text",
      admin: { description: "Optional link (e.g. IMDb profile)" },
    },
    {
      type: "row",
      fields: [
        {
          name: "primaryImage",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: { width: "50%" },
        },
        {
          name: "hoverImage",
          type: "upload",
          relationTo: "media",
          required: true,
          admin: { width: "50%" },
        },
      ],
    },
    {
      name: "quote",
      type: "textarea",
      admin: { description: "Optional character quote" },
    },
    {
      name: "order",
      type: "number",
      required: true,
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Display order (lower = first)",
      },
    },
  ],
};
