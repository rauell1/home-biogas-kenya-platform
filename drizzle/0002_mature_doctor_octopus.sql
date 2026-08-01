CREATE TABLE "cookie_consent_logs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"consent_id" text NOT NULL,
	"categories" jsonb NOT NULL,
	"region" text DEFAULT 'GLOBAL' NOT NULL,
	"ip_hash" text,
	"user_agent" text,
	"consent_mode_v2" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cookie_consent_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"banner_theme" text DEFAULT 'dark' NOT NULL,
	"banner_position" text DEFAULT 'bottom_bar' NOT NULL,
	"geotargeting_mode" text DEFAULT 'auto' NOT NULL,
	"consent_mode_v2_enabled" boolean DEFAULT true NOT NULL,
	"auto_block_trackers" boolean DEFAULT true NOT NULL,
	"custom_css" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cookie_trackers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"domain" text NOT NULL,
	"category" text NOT NULL,
	"provider" text NOT NULL,
	"expiry" text,
	"description_en" text,
	"description_sw" text,
	"is_auto_scanned" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
