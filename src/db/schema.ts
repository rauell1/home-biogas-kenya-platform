import {
  pgTable,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  jsonb,
  serial,
  uuid,
} from "drizzle-orm/pg-core";

/* ---------------- Access control ---------------- */

export const staffProfiles = pgTable("staff_profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  neonAuthUserId: text("neon_auth_user_id").unique(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("viewer"),
  status: text("status").notNull().default("active"), // active | disabled
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => staffProfiles.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const invitations = pgTable("invitations", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull(),
  role: text("role").notNull(),
  tokenHash: text("token_hash").notNull(),
  invitedBy: uuid("invited_by").references(() => staffProfiles.id, { onDelete: "set null" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  acceptedAt: timestamp("accepted_at", { withTimezone: true }),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const loginEvents = pgTable("login_events", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  userId: uuid("user_id"),
  success: boolean("success").notNull(),
  ip: text("ip"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  actorId: uuid("actor_id"),
  actorEmail: text("actor_email"),
  action: text("action").notNull(),
  entityType: text("entity_type"),
  entityId: text("entity_id"),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Projects ---------------- */

export const projects = pgTable("projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  theme: text("theme"),
  county: text("county"),
  locality: text("locality"),
  clientCategory: text("client_category"), // domestic | farm | institutional | commercial
  plantType: text("plant_type"), // fixed_dome | flexible_pvc | wastewater | study
  capacityM3: numeric("capacity_m3"),
  feedstocks: jsonb("feedstocks").$type<string[]>().default([]).notNull(),
  applications: jsonb("applications").$type<string[]>().default([]).notNull(),
  completionDate: text("completion_date"),
  projectStatus: text("project_status").notNull().default("completed"),
  durationText: text("duration_text"),
  lat: numeric("lat"),
  lng: numeric("lng"),
  summary: text("summary"),
  challenge: text("challenge"),
  siteConditions: text("site_conditions"),
  feedstockAssessment: text("feedstock_assessment"),
  energyDemand: text("energy_demand"),
  engineeringResponse: text("engineering_response"),
  constructionSequence: text("construction_sequence"),
  gasHandling: text("gas_handling"),
  applianceConnections: text("appliance_connections"),
  slurryManagement: text("slurry_management"),
  commissioning: text("commissioning"),
  outcomes: jsonb("outcomes").$type<{ claim: string; evidence: string }[]>().default([]).notNull(),
  heroImage: text("hero_image"),
  mediaRightsStatus: text("media_rights_status").notNull().default("unknown"),
  technicalReviewStatus: text("technical_review_status").notNull().default("unreviewed"),
  workflowState: text("workflow_state").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const projectMedia = pgTable("project_media", {
  id: uuid("id").primaryKey().defaultRandom(),
  projectId: uuid("project_id").references(() => projects.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  altText: text("alt_text"),
  captionEn: text("caption_en"),
  captionSw: text("caption_sw"),
  rightsOwner: text("rights_owner"),
  rightsStatus: text("rights_status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- Source verification ---------------- */

export const sourceRecords = pgTable("source_records", {
  id: uuid("id").primaryKey().defaultRandom(),
  platform: text("platform").notNull(),
  sourceUrl: text("source_url").notNull(),
  title: text("title"),
  rawText: text("raw_text").notNull(),
  publicationDate: timestamp("publication_date", { withTimezone: true }),
  importedAt: timestamp("imported_at", { withTimezone: true }).defaultNow().notNull(),
  companyIdentityStatus: text("company_identity_status").notNull().default("pending"),
  possibleProjectTitle: text("possible_project_title"),
  possibleCounty: text("possible_county"),
  possibleLocation: text("possible_location"),
  possibleTechnology: text("possible_technology"),
  possibleCapacityM3: numeric("possible_capacity_m3"),
  possibleFeedstocks: jsonb("possible_feedstocks").$type<string[]>().default([]).notNull(),
  possibleApplications: jsonb("possible_applications").$type<string[]>().default([]).notNull(),
  possibleAppliances: jsonb("possible_appliances").$type<string[]>().default([]).notNull(),
  confidenceScore: numeric("confidence_score").default("0").notNull(),
  rightsStatus: text("rights_status").notNull().default("unknown"),
  reviewStatus: text("review_status").notNull().default("unreviewed"),
});

/* ---------------- Content ---------------- */

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  summary: text("summary").notNull(),
  detail: text("detail"),
  sortOrder: integer("sort_order").default(0).notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt"),
  body: text("body"),
  workflowState: text("workflow_state").notNull().default("draft"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
});

/* ---------------- Leads & surveys ---------------- */

export const leads = pgTable("leads", {
  id: uuid("id").primaryKey().defaultRandom(),
  reference: text("reference").notNull().unique(),
  fullName: text("full_name").notNull(),
  organisation: text("organisation"),
  phone: text("phone").notNull(),
  whatsapp: text("whatsapp"),
  email: text("email"),
  county: text("county"),
  locality: text("locality"),
  preferredContact: text("preferred_contact"),
  timeline: text("timeline"),
  budgetRange: text("budget_range"),
  notes: text("notes"),
  stage: text("stage").notNull().default("NEW"),
  assignedTo: uuid("assigned_to").references(() => staffProfiles.id, { onDelete: "set null" }),
  source: text("source").notNull().default("website"),
  configurator: jsonb("configurator"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const leadActivities = pgTable("lead_activities", {
  id: serial("id").primaryKey(),
  leadId: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  type: text("type").notNull(),
  body: text("body"),
  actorEmail: text("actor_email"),
  dueAt: timestamp("due_at", { withTimezone: true }),
  doneAt: timestamp("done_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const siteSurveys = pgTable("site_surveys", {
  id: uuid("id").primaryKey().defaultRandom(),
  leadId: uuid("lead_id").references(() => leads.id, { onDelete: "set null" }),
  clientName: text("client_name").notNull(),
  organisation: text("organisation"),
  contact: text("contact"),
  location: text("location"),
  coordinates: text("coordinates"),
  surveyDate: text("survey_date"),
  engineer: text("engineer"),
  feedstock: jsonb("feedstock"),
  site: jsonb("site"),
  energy: jsonb("energy"),
  slurry: jsonb("slurry"),
  recommendation: jsonb("recommendation"),
  status: text("status").notNull().default("scheduled"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

/* ---------------- GDPR & Cookie Compliance ---------------- */

export const cookieConsentLogs = pgTable("cookie_consent_logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  consentId: text("consent_id").notNull(),
  categories: jsonb("categories").$type<{ necessary: boolean; functional: boolean; analytics: boolean; marketing: boolean }>().notNull(),
  region: text("region").notNull().default("GLOBAL"), // EU | US_CA | GLOBAL
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  consentModeV2: jsonb("consent_mode_v2").$type<{ ad_storage: string; analytics_storage: string; ad_user_data: string; ad_personalization: string }>(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cookieConsentSettings = pgTable("cookie_consent_settings", {
  id: serial("id").primaryKey(),
  bannerTheme: text("banner_theme").notNull().default("dark"), // dark | light | organic
  bannerPosition: text("banner_position").notNull().default("bottom_bar"), // bottom_bar | modal
  geotargetingMode: text("geotargeting_mode").notNull().default("auto"), // auto | eu_opt_in | us_ca_opt_out | global_opt_in
  consentModeV2Enabled: boolean("consent_mode_v2_enabled").notNull().default(true),
  autoBlockTrackers: boolean("auto_block_trackers").notNull().default(true),
  customCss: text("custom_css"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const cookieTrackers = pgTable("cookie_trackers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  domain: text("domain").notNull(),
  category: text("category").notNull(), // necessary | functional | analytics | marketing
  provider: text("provider").notNull(),
  expiry: text("expiry"),
  descriptionEn: text("description_en"),
  descriptionSw: text("description_sw"),
  isAutoScanned: boolean("is_auto_scanned").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
