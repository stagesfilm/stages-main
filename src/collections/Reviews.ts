import type { CollectionConfig } from "payload";

export const Reviews: CollectionConfig = {
  slug: "reviews",
  admin: {
    useAsTitle: "award",
    defaultColumns: ["award", "updatedAt"],
    group: "Content",
  },
  fields: [
    {
      name: "award",
      type: "text",
      required: true,
      admin: { description: 'e.g. "SXSW Best of Texas Award"' },
    },
    {
      name: "winner",
      type: "text",
      admin: { description: 'e.g. "Winner: Stages directed by Ryan Booth"' },
    },
    {
      name: "quote",
      type: "textarea",
      admin: { description: "Review quote or award description" },
    },
    {
      name: "laurelImage",
      type: "upload",
      relationTo: "media",
      admin: { description: "Laurel or award badge image (upload to Media)" },
    },
    {
      name: "laurelImageUrl",
      type: "text",
      admin: {
        description: "Fallback: public path to laurel image if not using Media upload (e.g. /Best of Texas Award_White.png)",
      },
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      admin: {
        position: "sidebar",
        description: "Display order (lower = first)",
      },
    },
  ],
};
