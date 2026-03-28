import type { CollectionConfig } from "payload";

export const Credits: CollectionConfig = {
  slug: "credits",
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "name", "order"],
    group: "Content",
  },
  fields: [
    {
      name: "role",
      type: "text",
      required: true,
      admin: { description: 'e.g. "Director", "Writers", "Producers"' },
    },
    {
      name: "name",
      type: "text",
      required: true,
      admin: { description: "Person or people in this role" },
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
