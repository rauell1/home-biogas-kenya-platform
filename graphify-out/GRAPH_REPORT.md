# Graph Report - home-biogas-kenya-final  (2026-08-01)

## Corpus Check
- 133 files · ~85,661 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 595 nodes · 1134 edges · 43 communities (35 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5d49a784`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- schema.ts
- applications/page.tsx
- admin.ts
- actions/auth.ts
- devDependencies
- compilerOptions
- leads/route.ts
- dependencies
- Neon
- Design direction and implementation requirements
- queries.ts
- Lakebase Postgres
- B1 → Production migration report
- Home Biogas Kenya — Final Consolidated Platform
- app/layout.tsx
- Final consolidation changelog
- middleware.ts
- guides/[slug]/page.tsx
- rules/graphify.md
- workflows/graphify.md
- next.config.ts
- postcss.config.mjs
- i18n.ts
- auth-client.ts
- PageHeader.tsx
- seed-db.mjs
- [locale]/page.tsx
- consent-manager.ts
- check-forbidden-dashes.mjs
- products/[slug]/page.tsx
- [locale]/layout.tsx
- apply-migration.mjs
- content.ts
- opengraph-image.tsx

## God Nodes (most connected - your core abstractions)
1. `requirePermission()` - 37 edges
2. `db` - 30 edges
3. `audit()` - 25 edges
4. `PageHeader()` - 20 edges
5. `assertPermission()` - 18 edges
6. `can()` - 17 edges
7. `compilerOptions` - 17 edges
8. `AdminHeader()` - 16 edges
9. `getPublishedProjects()` - 13 edges
10. `getDict()` - 12 edges

## Surprising Connections (you probably didn't know these)
- `UsersPage()` --calls--> `requirePermission()`  [EXTRACTED]
  src/app/admin/users/page.tsx → src/lib/guard.ts
- `AboutPage()` --references--> `SERVICE_GROUPS`  [EXTRACTED]
  src/app/[locale]/about/page.tsx → src/lib/content.ts
- `ApplicationDetail()` --references--> `APPLICATIONS`  [EXTRACTED]
  src/app/[locale]/applications/[slug]/page.tsx → src/lib/content.ts
- `HomePage()` --calls--> `getDict()`  [EXTRACTED]
  src/app/[locale]/page.tsx → src/lib/i18n.ts
- `HomePage()` --calls--> `getPublishedProjects()`  [EXTRACTED]
  src/app/[locale]/page.tsx → src/lib/queries.ts

## Import Cycles
- None detected.

## Communities (43 total, 8 thin omitted)

### Community 0 - "schema.ts"
Cohesion: 0.06
Nodes (62): Approvals(), dynamic, ArticlesPage(), dynamic, AuditLogPage(), dynamic, AdminConsentLogsPage(), dynamic (+54 more)

### Community 1 - "applications/page.tsx"
Cohesion: 0.39
Nodes (3): ApplicationDetail(), ApplicationScene(), APPLICATIONS

### Community 2 - "admin.ts"
Cohesion: 0.09
Nodes (44): addLeadActivityAction(), approveTechnicalAction(), createSurveyAction(), FormState, importSourceAction(), inviteStaffAction(), listField(), projectSchema (+36 more)

### Community 3 - "actions/auth.ts"
Cohesion: 0.11
Nodes (31): acceptInvitationAction(), ActionState, bootstrapAction(), ensureNeonAuthUser(), requestPasswordResetAction(), signInAction(), signOutAction(), { GET, POST } (+23 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (36): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, postcss (+28 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+20 more)

### Community 6 - "leads/route.ts"
Cohesion: 0.11
Nodes (22): POST(), POST(), subscriptionSchema, APPS, Configurator(), SITE_FIELDS, STEPS, emailList() (+14 more)

### Community 7 - "dependencies"
Cohesion: 0.07
Nodes (27): better-auth, dotenv, drizzle-orm, @neondatabase/auth, @neondatabase/serverless, next, dependencies, better-auth (+19 more)

### Community 8 - "Neon"
Cohesion: 0.07
Nodes (26): Architecture: How to Use Neon, Backend Primitives, Branch configuration, Branch-First Dev Flow, Choosing the Right Skill, Fetching Docs as Markdown, Finding the Right Page, Getting Started with Neon (+18 more)

### Community 9 - "Design direction and implementation requirements"
Cohesion: 0.11
Nodes (17): 1. Hero, 2. Narrative flow, 3. Interactive modules, 4. Services and proof, 5. Navigation, footer, and CTAs, 6. Responsive behavior, 7. Accessibility and motion, 8. Content and encoding (+9 more)

### Community 10 - "queries.ts"
Cohesion: 0.14
Nodes (17): dynamic, GET(), dynamic, GET(), dynamic, ProjectsPage(), dynamic, pretty() (+9 more)

### Community 11 - "Lakebase Postgres"
Cohesion: 0.12
Nodes (15): 1. Select the organization and project, 2. Get the connection string, 3. Pick the connection method and driver, 4. Set up the schema, Autoscaling, Branching, Connection Pooling, Instant Restore (+7 more)

### Community 12 - "B1 → Production migration report"
Cohesion: 0.20
Nodes (9): Accessibility concerns found and fixed, B1 → Production migration report, Conceptually reusable vs rebuilt, Content requiring verification, Missing assets / broken references, Preserved, Redesigned, Removed (+1 more)

### Community 13 - "Home Biogas Kenya — Final Consolidated Platform"
Cohesion: 0.22
Nodes (8): Better Auth, Company identity, Content verification, First administrator, Home Biogas Kenya  -  Final Consolidated Platform, Neon setup, Production checklist, What is included

### Community 14 - "app/layout.tsx"
Cohesion: 0.29
Nodes (5): display, editorial, metadata, mono, sans

### Community 15 - "Final consolidation changelog"
Cohesion: 0.33
Nodes (5): Added or consolidated, Final consolidation changelog, Foundation selected, Learnings incorporated from A and B, Removed from earlier prototypes

### Community 16 - "middleware.ts"
Cohesion: 0.40
Nodes (3): config, FRAME_ANCESTORS, SECURITY_HEADERS

### Community 23 - "i18n.ts"
Cohesion: 0.18
Nodes (12): LocaleLayout(), RequestAssessment(), FuelSavingsPage(), ConfiguratorPage(), AssessmentForm(), FIELDS, FuelSavings(), Dict (+4 more)

### Community 29 - "PageHeader.tsx"
Cohesion: 0.14
Nodes (8): dynamic, dynamic, dynamic, ROWS, TONE, COURSES, CourseDetail(), PageHeader()

### Community 31 - "[locale]/page.tsx"
Cohesion: 0.16
Nodes (13): AboutPage(), dynamic, HomePage(), SolutionsPage(), DigesterCutaway(), FEEDSTOCKS, HOTSPOTS, ExplorerProject (+5 more)

### Community 32 - "consent-manager.ts"
Cohesion: 0.22
Nodes (12): POST(), CookieConsentBanner(), ALL_GRANTED_CONSENT, applyGoogleConsentModeV2(), buildConsentModeV2(), ConsentCategories, ConsentModeV2Payload, ConsentRegion (+4 more)

### Community 33 - "check-forbidden-dashes.mjs"
Cohesion: 0.40
Nodes (3): excludedDirectories, textExtensions, violations

### Community 34 - "products/[slug]/page.tsx"
Cohesion: 0.31
Nodes (5): ProductDetail(), ShopPreview(), CatalogueItem, PLANT_SIZES, PRODUCTS

### Community 35 - "[locale]/layout.tsx"
Cohesion: 0.27
Nodes (4): BrandLogo(), JsonLd(), NewsletterForm(), SiteNav()

### Community 37 - "content.ts"
Cohesion: 0.28
Nodes (8): inquiryLinks(), ProductsPage(), AppItem, COMPANY, DIGESTER_TECHNOLOGIES, PROCESS_CHAIN, ServiceGroup, SOCIALS

### Community 38 - "opengraph-image.tsx"
Cohesion: 0.33
Nodes (4): alt, contentType, runtime, size

## Knowledge Gaps
- **226 isolated node(s):** `securityHeaders`, `nextConfig`, `name`, `private`, `dev` (+221 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `schema.ts` to `admin.ts`, `actions/auth.ts`, `leads/route.ts`, `queries.ts`, `PageHeader.tsx`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `PageHeader()` connect `PageHeader.tsx` to `schema.ts`, `applications/page.tsx`, `products/[slug]/page.tsx`, `content.ts`, `queries.ts`, `i18n.ts`, `[locale]/page.tsx`?**
  _High betweenness centrality (0.034) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `schema.ts` to `admin.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `securityHeaders`, `nextConfig`, `name` to the rest of the system?**
  _226 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.055921855921855924 - nodes in this community are weakly interconnected._
- **Should `admin.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.08525506638714186 - nodes in this community are weakly interconnected._
- **Should `actions/auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11265969802555169 - nodes in this community are weakly interconnected._