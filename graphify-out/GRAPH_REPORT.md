# Graph Report - home-biogas-kenya-final  (2026-08-01)

## Corpus Check
- 124 files · ~84,189 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 570 nodes · 1097 edges · 37 communities (29 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `839600e5`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- schema.ts
- content.ts
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
- getDict
- auth-client.ts
- PageHeader.tsx
- seed-db.mjs
- [locale]/page.tsx
- consent-manager.ts
- check-forbidden-dashes.mjs
- products/page.tsx
- [locale]/layout.tsx
- apply-migration.mjs

## God Nodes (most connected - your core abstractions)
1. `requirePermission()` - 37 edges
2. `db` - 30 edges
3. `audit()` - 25 edges
4. `PageHeader()` - 20 edges
5. `assertPermission()` - 18 edges
6. `can()` - 17 edges
7. `compilerOptions` - 17 edges
8. `AdminHeader()` - 16 edges
9. `getDict()` - 12 edges
10. `scripts` - 11 edges

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

## Communities (37 total, 8 thin omitted)

### Community 0 - "schema.ts"
Cohesion: 0.05
Nodes (70): Approvals(), dynamic, ArticlesPage(), dynamic, AuditLogPage(), dynamic, AdminConsentLogsPage(), dynamic (+62 more)

### Community 1 - "content.ts"
Cohesion: 0.16
Nodes (12): AboutPage(), HomePage(), SolutionsPage(), SolutionDetail(), ALL_SERVICES, AppItem, COMPANY, DIGESTER_TECHNOLOGIES (+4 more)

### Community 2 - "admin.ts"
Cohesion: 0.12
Nodes (33): addLeadActivityAction(), approveTechnicalAction(), createSurveyAction(), FormState, importSourceAction(), inviteStaffAction(), listField(), projectSchema (+25 more)

### Community 3 - "actions/auth.ts"
Cohesion: 0.11
Nodes (32): acceptInvitationAction(), ActionState, bootstrapAction(), ensureNeonAuthUser(), requestPasswordResetAction(), signInAction(), signOutAction(), dynamic (+24 more)

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
Cohesion: 0.20
Nodes (13): dynamic, ProjectsPage(), dynamic, pretty(), ProjectPage(), SECTIONS, ExplorerProject, FILTERS (+5 more)

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

### Community 23 - "getDict"
Cohesion: 0.16
Nodes (13): LocaleLayout(), RequestAssessment(), FuelSavingsPage(), ConfiguratorPage(), AssessmentForm(), FIELDS, FuelSavings(), Dict (+5 more)

### Community 29 - "PageHeader.tsx"
Cohesion: 0.11
Nodes (10): dynamic, dynamic, GUIDES, dynamic, dynamic, ROWS, TONE, COURSES (+2 more)

### Community 31 - "[locale]/page.tsx"
Cohesion: 0.18
Nodes (8): ApplicationDetail(), dynamic, ApplicationScene(), DigesterCutaway(), FEEDSTOCKS, HOTSPOTS, APPLICATIONS, PLANT_COMPONENTS

### Community 32 - "consent-manager.ts"
Cohesion: 0.22
Nodes (12): POST(), CookieConsentBanner(), ALL_GRANTED_CONSENT, applyGoogleConsentModeV2(), buildConsentModeV2(), ConsentCategories, ConsentModeV2Payload, ConsentRegion (+4 more)

### Community 33 - "check-forbidden-dashes.mjs"
Cohesion: 0.40
Nodes (3): excludedDirectories, textExtensions, violations

### Community 34 - "products/page.tsx"
Cohesion: 0.26
Nodes (7): inquiryLinks(), ProductsPage(), ProductDetail(), ShopPreview(), CatalogueItem, PLANT_SIZES, PRODUCTS

### Community 35 - "[locale]/layout.tsx"
Cohesion: 0.43
Nodes (3): BrandLogo(), NewsletterForm(), SiteNav()

## Knowledge Gaps
- **219 isolated node(s):** `nextConfig`, `name`, `private`, `dev`, `build` (+214 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `schema.ts` to `admin.ts`, `actions/auth.ts`, `leads/route.ts`, `queries.ts`, `PageHeader.tsx`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **Why does `PageHeader()` connect `PageHeader.tsx` to `content.ts`, `products/page.tsx`, `queries.ts`, `getDict`, `[locale]/page.tsx`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `schema.ts` to `admin.ts`, `actions/auth.ts`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `private` to the rest of the system?**
  _219 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05256648113790971 - nodes in this community are weakly interconnected._
- **Should `admin.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.11923076923076924 - nodes in this community are weakly interconnected._
- **Should `actions/auth.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10676532769556026 - nodes in this community are weakly interconnected._