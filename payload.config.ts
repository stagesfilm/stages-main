import sharp from "sharp";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import { buildConfig } from "payload";
import path from "path";
import { fileURLToPath } from "url";

import { Screenings } from "./src/collections/Screenings";
import { LandingPages } from "./src/collections/LandingPages";
import { Cast } from "./src/collections/Cast";
import { Credits } from "./src/collections/Credits";
import { Reviews } from "./src/collections/Reviews";
import { Homepage } from "./src/globals/Homepage";
import { PressPage } from "./src/globals/PressPage";
import { SharePage } from "./src/globals/SharePage";
import { SiteSettings } from "./src/globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || "",
  editor: lexicalEditor(),
  collections: [
    {
      slug: "users",
      auth: true,
      admin: { group: "System" },
      fields: [],
    },
    {
      slug: "media",
      admin: { group: "System" },
      upload: {
        // In production (Vercel), files go to Blob Storage (see plugins below).
        // Locally they land in public/media which is gitignored.
        staticDir: path.resolve(dirname, "public/media"),
        mimeTypes: ["image/*", "application/pdf"],
      },
      fields: [
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    Screenings,
    LandingPages,
    Cast,
    Credits,
    Reviews,
  ],
  globals: [Homepage, PressPage, SharePage, SiteSettings],
  secret: process.env.PAYLOAD_SECRET || "REPLACE-WITH-A-SECURE-SECRET",
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  plugins: [
    // Only activate Blob storage when the token is present (production / preview).
    // Locally, files are written to public/media on disk.
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      graphics: {
        Logo: "/src/components/payload/AdminLogo",
        Icon: "/src/components/payload/AdminIcon",
      },
    },
  },
  bin: [
    {
      scriptPath: path.resolve(dirname, "src/seed.ts"),
      key: "seed",
    },
  ],
});
