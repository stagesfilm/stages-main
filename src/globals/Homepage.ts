import type { GlobalConfig } from "payload";

export const Homepage: GlobalConfig = {
  slug: "homepage",
  admin: {
    group: "Pages",
  },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              name: "heroVideoId",
              type: "text",
              admin: { description: "YouTube video ID for the hero background (e.g. RaeZ8LUgFxA)" },
            },
            {
              name: "heroImages",
              type: "array",
              admin: { description: "Fallback carousel images when video isn't playing" },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
              ],
            },
            {
              name: "laurels",
              type: "array",
              admin: {
                description: "Award laurels displayed above the title. Drag to reorder. They auto-shrink as more are added.",
              },
              fields: [
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                  admin: { description: "Optional link URL for this laurel" },
                },
              ],
            },
          ],
        },
        {
          label: "Film Info",
          fields: [
            {
              name: "logline",
              type: "textarea",
              required: true,
              admin: { description: "Film synopsis / logline shown in the hero" },
            },
            {
              name: "directedBy",
              type: "text",
              required: true,
            },
            {
              name: "year",
              type: "text",
              required: true,
            },
            {
              name: "runtime",
              type: "text",
              required: true,
              admin: { description: 'e.g. "94 MIN"' },
            },
          ],
        },
        {
          label: "About",
          fields: [
            {
              name: "aboutHeading",
              type: "text",
              defaultValue: "ABOUT THE FILM",
            },
            {
              name: "aboutContent",
              type: "richText",
              admin: { description: "Extended film description paragraphs" },
            },
          ],
        },
        {
          label: "Director's Note",
          fields: [
            {
              name: "directorNote",
              type: "richText",
              admin: { description: "Director's statement / quote block" },
            },
            {
              name: "directorName",
              type: "text",
              defaultValue: "RYAN BOOTH",
            },
          ],
        },
        {
          label: "Settings",
          fields: [
            {
              name: "showScreeningsPreview",
              type: "checkbox",
              defaultValue: true,
              admin: {
                description: "Show a condensed upcoming screenings section on the homepage linking to /screenings",
              },
            },
          ],
        },
      ],
    },
  ],
};
