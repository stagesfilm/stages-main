import type { CollectionConfig } from "payload";
import {
  lexicalEditor,
  FixedToolbarFeature,
  InlineToolbarFeature,
  HeadingFeature,
  LinkFeature,
  UnorderedListFeature,
  OrderedListFeature,
  BlockquoteFeature,
  HorizontalRuleFeature,
  UploadFeature,
  BlocksFeature,
  BoldFeature,
  ItalicFeature,
  UnderlineFeature,
  AlignFeature,
} from "@payloadcms/richtext-lexical";

export const LandingPages: CollectionConfig = {
  slug: "landing-pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "published", "updatedAt"],
    group: "Content",
    description: "Private, unlisted pages for invited audiences. Not crawlable by search engines.",
    preview: (doc) => {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
      return `${base}/p/${doc["slug"]}`;
    },
  },
  versions: {
    drafts: true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        description: "URL path: /p/{slug}. Use lowercase, hyphens only.",
      },
      validate: (value: string | null | undefined) => {
        if (!value) return "Slug is required";
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
          return "Slug must be lowercase letters, numbers, and hyphens only";
        }
        return true;
      },
    },
    {
      name: "subtitle",
      type: "textarea",
      admin: {
        description: "Optional subtitle or tagline for the page",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Teaser",
          fields: [
            {
              name: "teaserVideoId",
              type: "text",
              admin: {
                description: "YouTube video ID for the teaser (e.g. RaeZ8LUgFxA)",
              },
            },
            {
              name: "teaserVideoThumbnail",
              type: "upload",
              relationTo: "media",
              admin: {
                description: "Optional custom thumbnail for the video player",
              },
            },
          ],
        },
        {
          label: "Content",
          fields: [
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: [
                  FixedToolbarFeature(),
                  InlineToolbarFeature(),
                  BoldFeature(),
                  ItalicFeature(),
                  UnderlineFeature(),
                  AlignFeature(),
                  HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                  UnorderedListFeature(),
                  OrderedListFeature(),
                  BlockquoteFeature(),
                  HorizontalRuleFeature(),
                  LinkFeature({ enabledCollections: [] }),
                  UploadFeature({
                    collections: {
                      media: {
                        fields: [
                          { name: "caption", type: "text" },
                          {
                            name: "link",
                            type: "text",
                            admin: {
                              description:
                                "Optional URL — clicking the image will open this link",
                            },
                          },
                          {
                            name: "size",
                            type: "select",
                            defaultValue: "medium",
                            options: [
                              { label: "Small", value: "small" },
                              { label: "Medium", value: "medium" },
                              { label: "Full Width", value: "full" },
                            ],
                          },
                        ],
                      },
                    },
                  }),
                  BlocksFeature({
                    blocks: [
                      {
                        slug: "textSection",
                        labels: { singular: "Text Section", plural: "Text Sections" },
                        fields: [
                          {
                            name: "content",
                            type: "richText",
                            required: true,
                            editor: lexicalEditor({
                              features: [
                                FixedToolbarFeature(),
                                InlineToolbarFeature(),
                                BoldFeature(),
                                ItalicFeature(),
                                UnderlineFeature(),
                                AlignFeature(),
                                HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
                                UnorderedListFeature(),
                                OrderedListFeature(),
                                BlockquoteFeature(),
                                HorizontalRuleFeature(),
                                LinkFeature({ enabledCollections: [] }),
                              ],
                            }),
                          },
                          {
                            name: "width",
                            type: "select",
                            defaultValue: "medium",
                            options: [
                              { label: "Small (narrow)", value: "small" },
                              { label: "Medium (default)", value: "medium" },
                              { label: "Full width", value: "full" },
                            ],
                            admin: {
                              description: "How wide this text section should be on the page",
                            },
                          },
                        ],
                      },
                      {
                        slug: "videoEmbed",
                        labels: { singular: "Video Embed", plural: "Video Embeds" },
                        fields: [
                          {
                            name: "url",
                            type: "text",
                            required: true,
                            admin: {
                              description:
                                "YouTube or Vimeo URL (e.g. https://www.youtube.com/watch?v=abc123 or https://vimeo.com/123456)",
                            },
                          },
                          {
                            name: "caption",
                            type: "text",
                          },
                        ],
                      },
                      {
                        slug: "logoBar",
                        labels: { singular: "Logo Bar", plural: "Logo Bars" },
                        fields: [
                          {
                            name: "logos",
                            type: "array",
                            minRows: 1,
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
                                admin: { description: "Optional URL the logo links to" },
                              },
                            ],
                            admin: {
                              description: "Add logos — they display inline and wrap automatically",
                            },
                          },
                          {
                            name: "height",
                            type: "select",
                            defaultValue: "medium",
                            options: [
                              { label: "Small (28px)", value: "small" },
                              { label: "Medium (36px)", value: "medium" },
                              { label: "Large (48px)", value: "large" },
                            ],
                            admin: {
                              description: "Logo height — all logos in the bar use the same height",
                            },
                          },
                          {
                            name: "alignment",
                            type: "select",
                            defaultValue: "left",
                            options: [
                              { label: "Left", value: "left" },
                              { label: "Center", value: "center" },
                            ],
                          },
                        ],
                      },
                    ],
                  }),
                ],
              }),
              admin: {
                description: "Main content blocks for the landing page — supports headings, links, images, lists, and blockquotes",
              },
            },
          ],
        },
        {
          label: "Screenings & RSVP",
          fields: [
            {
              name: "screenings",
              type: "relationship",
              relationTo: "screenings",
              hasMany: true,
              admin: {
                description: "Link private screenings to this page. Their Luma RSVP embeds will render inline.",
              },
            },
            {
              name: "ctaLabel",
              type: "text",
              defaultValue: "RSVP",
              admin: {
                description: "Fallback CTA button label if no screenings are linked",
              },
            },
            {
              name: "ctaUrl",
              type: "text",
              admin: {
                description: "Fallback CTA URL if no screenings are linked (e.g. a direct Luma link)",
              },
            },
          ],
        },
      ],
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
        description: "Only published pages are accessible. Unpublished returns 404.",
      },
    },
  ],
};
