import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_screenings_visibility" AS ENUM('public', 'private');
  CREATE TYPE "public"."enum_screenings_ticketing_type" AS ENUM('external', 'luma', 'custom');
  CREATE TYPE "public"."enum_landing_pages_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__landing_pages_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_site_settings_social_links_platform" AS ENUM('instagram', 'twitter', 'imdb', 'youtube', 'facebook', 'other');
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "screenings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"date" varchar NOT NULL,
  	"time" varchar NOT NULL,
  	"venue" varchar NOT NULL,
  	"location" varchar NOT NULL,
  	"event_date" timestamp(3) with time zone NOT NULL,
  	"event_group" varchar NOT NULL,
  	"note" varchar,
  	"visibility" "enum_screenings_visibility" DEFAULT 'public' NOT NULL,
  	"ticketing_type" "enum_screenings_ticketing_type" DEFAULT 'external' NOT NULL,
  	"ticket_url" varchar,
  	"luma_event_url" varchar,
  	"linked_landing_page_id" integer,
  	"published" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "landing_pages" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"slug" varchar,
  	"subtitle" varchar,
  	"teaser_video_id" varchar,
  	"teaser_video_thumbnail_id" integer,
  	"content" jsonb,
  	"cta_label" varchar DEFAULT 'RSVP',
  	"cta_url" varchar,
  	"published" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_landing_pages_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "landing_pages_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"screenings_id" integer
  );
  
  CREATE TABLE "_landing_pages_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_slug" varchar,
  	"version_subtitle" varchar,
  	"version_teaser_video_id" varchar,
  	"version_teaser_video_thumbnail_id" integer,
  	"version_content" jsonb,
  	"version_cta_label" varchar DEFAULT 'RSVP',
  	"version_cta_url" varchar,
  	"version_published" boolean DEFAULT false,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__landing_pages_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_landing_pages_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"screenings_id" integer
  );
  
  CREATE TABLE "cast" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"character_name" varchar NOT NULL,
  	"performed_by" varchar NOT NULL,
  	"actor_name" varchar NOT NULL,
  	"actor_url" varchar,
  	"primary_image_id" integer NOT NULL,
  	"hover_image_id" integer NOT NULL,
  	"quote" varchar,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "credits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"role" varchar NOT NULL,
  	"name" varchar NOT NULL,
  	"order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reviews" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"award" varchar NOT NULL,
  	"winner" varchar,
  	"quote" varchar,
  	"laurel_image_id" integer,
  	"laurel_image_url" varchar,
  	"order" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"screenings_id" integer,
  	"landing_pages_id" integer,
  	"cast_id" integer,
  	"credits_id" integer,
  	"reviews_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "homepage_hero_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "homepage_laurels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"link" varchar
  );
  
  CREATE TABLE "homepage" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_video_id" varchar,
  	"logline" varchar NOT NULL,
  	"directed_by" varchar NOT NULL,
  	"year" varchar NOT NULL,
  	"runtime" varchar NOT NULL,
  	"about_heading" varchar DEFAULT 'ABOUT THE FILM',
  	"about_content" jsonb,
  	"director_note" jsonb,
  	"director_name" varchar DEFAULT 'RYAN BOOTH',
  	"show_screenings_preview" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "press_page_film_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"value" varchar NOT NULL
  );
  
  CREATE TABLE "press_page_downloads" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "press_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_text" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "share_page_promotional_assets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "share_page_production_stills" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "share_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_text" varchar,
  	"usage_guidelines" jsonb,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "site_settings_contact_entries" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"org" varchar,
  	"name" varchar,
  	"email" varchar
  );
  
  CREATE TABLE "site_settings_social_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"platform" "enum_site_settings_social_links_platform" NOT NULL,
  	"url" varchar NOT NULL,
  	"label" varchar
  );
  
  CREATE TABLE "site_settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"site_url" varchar DEFAULT 'https://stages.movie' NOT NULL,
  	"google_analytics_id" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "screenings" ADD CONSTRAINT "screenings_linked_landing_page_id_landing_pages_id_fk" FOREIGN KEY ("linked_landing_page_id") REFERENCES "public"."landing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_pages" ADD CONSTRAINT "landing_pages_teaser_video_thumbnail_id_media_id_fk" FOREIGN KEY ("teaser_video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "landing_pages_rels" ADD CONSTRAINT "landing_pages_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "landing_pages_rels" ADD CONSTRAINT "landing_pages_rels_screenings_fk" FOREIGN KEY ("screenings_id") REFERENCES "public"."screenings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_parent_id_landing_pages_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."landing_pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v" ADD CONSTRAINT "_landing_pages_v_version_teaser_video_thumbnail_id_media_id_fk" FOREIGN KEY ("version_teaser_video_thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_rels" ADD CONSTRAINT "_landing_pages_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_landing_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_landing_pages_v_rels" ADD CONSTRAINT "_landing_pages_v_rels_screenings_fk" FOREIGN KEY ("screenings_id") REFERENCES "public"."screenings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "cast" ADD CONSTRAINT "cast_primary_image_id_media_id_fk" FOREIGN KEY ("primary_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "cast" ADD CONSTRAINT "cast_hover_image_id_media_id_fk" FOREIGN KEY ("hover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "reviews" ADD CONSTRAINT "reviews_laurel_image_id_media_id_fk" FOREIGN KEY ("laurel_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_screenings_fk" FOREIGN KEY ("screenings_id") REFERENCES "public"."screenings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_landing_pages_fk" FOREIGN KEY ("landing_pages_id") REFERENCES "public"."landing_pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cast_fk" FOREIGN KEY ("cast_id") REFERENCES "public"."cast"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_credits_fk" FOREIGN KEY ("credits_id") REFERENCES "public"."credits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reviews_fk" FOREIGN KEY ("reviews_id") REFERENCES "public"."reviews"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_hero_images" ADD CONSTRAINT "homepage_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_hero_images" ADD CONSTRAINT "homepage_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "homepage_laurels" ADD CONSTRAINT "homepage_laurels_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "homepage_laurels" ADD CONSTRAINT "homepage_laurels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."homepage"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_film_facts" ADD CONSTRAINT "press_page_film_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_page_downloads" ADD CONSTRAINT "press_page_downloads_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "share_page_promotional_assets" ADD CONSTRAINT "share_page_promotional_assets_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "share_page_promotional_assets" ADD CONSTRAINT "share_page_promotional_assets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."share_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "share_page_production_stills" ADD CONSTRAINT "share_page_production_stills_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "share_page_production_stills" ADD CONSTRAINT "share_page_production_stills_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."share_page"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_contact_entries" ADD CONSTRAINT "site_settings_contact_entries_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "site_settings_social_links" ADD CONSTRAINT "site_settings_social_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."site_settings"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "screenings_linked_landing_page_idx" ON "screenings" USING btree ("linked_landing_page_id");
  CREATE INDEX "screenings_updated_at_idx" ON "screenings" USING btree ("updated_at");
  CREATE INDEX "screenings_created_at_idx" ON "screenings" USING btree ("created_at");
  CREATE UNIQUE INDEX "landing_pages_slug_idx" ON "landing_pages" USING btree ("slug");
  CREATE INDEX "landing_pages_teaser_video_thumbnail_idx" ON "landing_pages" USING btree ("teaser_video_thumbnail_id");
  CREATE INDEX "landing_pages_updated_at_idx" ON "landing_pages" USING btree ("updated_at");
  CREATE INDEX "landing_pages_created_at_idx" ON "landing_pages" USING btree ("created_at");
  CREATE INDEX "landing_pages__status_idx" ON "landing_pages" USING btree ("_status");
  CREATE INDEX "landing_pages_rels_order_idx" ON "landing_pages_rels" USING btree ("order");
  CREATE INDEX "landing_pages_rels_parent_idx" ON "landing_pages_rels" USING btree ("parent_id");
  CREATE INDEX "landing_pages_rels_path_idx" ON "landing_pages_rels" USING btree ("path");
  CREATE INDEX "landing_pages_rels_screenings_id_idx" ON "landing_pages_rels" USING btree ("screenings_id");
  CREATE INDEX "_landing_pages_v_parent_idx" ON "_landing_pages_v" USING btree ("parent_id");
  CREATE INDEX "_landing_pages_v_version_version_slug_idx" ON "_landing_pages_v" USING btree ("version_slug");
  CREATE INDEX "_landing_pages_v_version_version_teaser_video_thumbnail_idx" ON "_landing_pages_v" USING btree ("version_teaser_video_thumbnail_id");
  CREATE INDEX "_landing_pages_v_version_version_updated_at_idx" ON "_landing_pages_v" USING btree ("version_updated_at");
  CREATE INDEX "_landing_pages_v_version_version_created_at_idx" ON "_landing_pages_v" USING btree ("version_created_at");
  CREATE INDEX "_landing_pages_v_version_version__status_idx" ON "_landing_pages_v" USING btree ("version__status");
  CREATE INDEX "_landing_pages_v_created_at_idx" ON "_landing_pages_v" USING btree ("created_at");
  CREATE INDEX "_landing_pages_v_updated_at_idx" ON "_landing_pages_v" USING btree ("updated_at");
  CREATE INDEX "_landing_pages_v_latest_idx" ON "_landing_pages_v" USING btree ("latest");
  CREATE INDEX "_landing_pages_v_rels_order_idx" ON "_landing_pages_v_rels" USING btree ("order");
  CREATE INDEX "_landing_pages_v_rels_parent_idx" ON "_landing_pages_v_rels" USING btree ("parent_id");
  CREATE INDEX "_landing_pages_v_rels_path_idx" ON "_landing_pages_v_rels" USING btree ("path");
  CREATE INDEX "_landing_pages_v_rels_screenings_id_idx" ON "_landing_pages_v_rels" USING btree ("screenings_id");
  CREATE INDEX "cast_primary_image_idx" ON "cast" USING btree ("primary_image_id");
  CREATE INDEX "cast_hover_image_idx" ON "cast" USING btree ("hover_image_id");
  CREATE INDEX "cast_updated_at_idx" ON "cast" USING btree ("updated_at");
  CREATE INDEX "cast_created_at_idx" ON "cast" USING btree ("created_at");
  CREATE INDEX "credits_updated_at_idx" ON "credits" USING btree ("updated_at");
  CREATE INDEX "credits_created_at_idx" ON "credits" USING btree ("created_at");
  CREATE INDEX "reviews_laurel_image_idx" ON "reviews" USING btree ("laurel_image_id");
  CREATE INDEX "reviews_updated_at_idx" ON "reviews" USING btree ("updated_at");
  CREATE INDEX "reviews_created_at_idx" ON "reviews" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_screenings_id_idx" ON "payload_locked_documents_rels" USING btree ("screenings_id");
  CREATE INDEX "payload_locked_documents_rels_landing_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("landing_pages_id");
  CREATE INDEX "payload_locked_documents_rels_cast_id_idx" ON "payload_locked_documents_rels" USING btree ("cast_id");
  CREATE INDEX "payload_locked_documents_rels_credits_id_idx" ON "payload_locked_documents_rels" USING btree ("credits_id");
  CREATE INDEX "payload_locked_documents_rels_reviews_id_idx" ON "payload_locked_documents_rels" USING btree ("reviews_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "homepage_hero_images_order_idx" ON "homepage_hero_images" USING btree ("_order");
  CREATE INDEX "homepage_hero_images_parent_id_idx" ON "homepage_hero_images" USING btree ("_parent_id");
  CREATE INDEX "homepage_hero_images_image_idx" ON "homepage_hero_images" USING btree ("image_id");
  CREATE INDEX "homepage_laurels_order_idx" ON "homepage_laurels" USING btree ("_order");
  CREATE INDEX "homepage_laurels_parent_id_idx" ON "homepage_laurels" USING btree ("_parent_id");
  CREATE INDEX "homepage_laurels_image_idx" ON "homepage_laurels" USING btree ("image_id");
  CREATE INDEX "press_page_film_facts_order_idx" ON "press_page_film_facts" USING btree ("_order");
  CREATE INDEX "press_page_film_facts_parent_id_idx" ON "press_page_film_facts" USING btree ("_parent_id");
  CREATE INDEX "press_page_downloads_order_idx" ON "press_page_downloads" USING btree ("_order");
  CREATE INDEX "press_page_downloads_parent_id_idx" ON "press_page_downloads" USING btree ("_parent_id");
  CREATE INDEX "share_page_promotional_assets_order_idx" ON "share_page_promotional_assets" USING btree ("_order");
  CREATE INDEX "share_page_promotional_assets_parent_id_idx" ON "share_page_promotional_assets" USING btree ("_parent_id");
  CREATE INDEX "share_page_promotional_assets_image_idx" ON "share_page_promotional_assets" USING btree ("image_id");
  CREATE INDEX "share_page_production_stills_order_idx" ON "share_page_production_stills" USING btree ("_order");
  CREATE INDEX "share_page_production_stills_parent_id_idx" ON "share_page_production_stills" USING btree ("_parent_id");
  CREATE INDEX "share_page_production_stills_image_idx" ON "share_page_production_stills" USING btree ("image_id");
  CREATE INDEX "site_settings_contact_entries_order_idx" ON "site_settings_contact_entries" USING btree ("_order");
  CREATE INDEX "site_settings_contact_entries_parent_id_idx" ON "site_settings_contact_entries" USING btree ("_parent_id");
  CREATE INDEX "site_settings_social_links_order_idx" ON "site_settings_social_links" USING btree ("_order");
  CREATE INDEX "site_settings_social_links_parent_id_idx" ON "site_settings_social_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "screenings" CASCADE;
  DROP TABLE "landing_pages" CASCADE;
  DROP TABLE "landing_pages_rels" CASCADE;
  DROP TABLE "_landing_pages_v" CASCADE;
  DROP TABLE "_landing_pages_v_rels" CASCADE;
  DROP TABLE "cast" CASCADE;
  DROP TABLE "credits" CASCADE;
  DROP TABLE "reviews" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "homepage_hero_images" CASCADE;
  DROP TABLE "homepage_laurels" CASCADE;
  DROP TABLE "homepage" CASCADE;
  DROP TABLE "press_page_film_facts" CASCADE;
  DROP TABLE "press_page_downloads" CASCADE;
  DROP TABLE "press_page" CASCADE;
  DROP TABLE "share_page_promotional_assets" CASCADE;
  DROP TABLE "share_page_production_stills" CASCADE;
  DROP TABLE "share_page" CASCADE;
  DROP TABLE "site_settings_contact_entries" CASCADE;
  DROP TABLE "site_settings_social_links" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_screenings_visibility";
  DROP TYPE "public"."enum_screenings_ticketing_type";
  DROP TYPE "public"."enum_landing_pages_status";
  DROP TYPE "public"."enum__landing_pages_v_version_status";
  DROP TYPE "public"."enum_site_settings_social_links_platform";`)
}
