# Graph Report - home-biogas-kenya-final  (2026-08-01)

## Corpus Check
- 111 files · ~77,006 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 527 nodes · 1007 edges · 29 communities (23 shown, 6 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `79d5530e`
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
- [locale]/layout.tsx
- auth-client.ts
- check-forbidden-dashes.mjs

## God Nodes (most connected - your core abstractions)
1. `requirePermission()` - 31 edges
2. `db` - 25 edges
3. `audit()` - 25 edges
4. `assertPermission()` - 18 edges
5. `PageHeader()` - 17 edges
6. `can()` - 17 edges
7. `compilerOptions` - 17 edges
8. `AdminHeader()` - 14 edges
9. `getDict()` - 12 edges
10. `scripts` - 11 edges

## Surprising Connections (you probably didn't know these)
- `ProjectForm()` --indirect_call--> `saveProjectAction()`  [INFERRED]
  src/components/admin/ProjectForm.tsx → src/app/actions/admin.ts
- `AboutPage()` --references--> `SERVICE_GROUPS`  [EXTRACTED]
  src/app/[locale]/about/page.tsx → src/lib/content.ts
- `ApplicationDetail()` --references--> `APPLICATIONS`  [EXTRACTED]
  src/app/[locale]/applications/[slug]/page.tsx → src/lib/content.ts
- `HomePage()` --calls--> `getDict()`  [EXTRACTED]
  src/app/[locale]/page.tsx → src/lib/i18n.ts
- `ProductDetail()` --references--> `PRODUCTS`  [EXTRACTED]
  src/app/[locale]/products/[slug]/page.tsx → src/lib/catalogue.ts

## Import Cycles
- None detected.

## Communities (29 total, 6 thin omitted)

### Community 0 - "schema.ts"
Cohesion: 0.06
Nodes (65): Approvals(), dynamic, ArticlesPage(), dynamic, AuditLogPage(), dynamic, Dashboard(), dynamic (+57 more)

### Community 1 - "content.ts"
Cohesion: 0.05
Nodes (47): AboutPage(), ApplicationDetail(), dynamic, GUIDES, dynamic, HomePage(), inquiryLinks(), ProductsPage() (+39 more)

### Community 2 - "admin.ts"
Cohesion: 0.13
Nodes (30): addLeadActivityAction(), approveTechnicalAction(), createSurveyAction(), FormState, importSourceAction(), inviteStaffAction(), listField(), projectSchema (+22 more)

### Community 3 - "actions/auth.ts"
Cohesion: 0.12
Nodes (29): acceptInvitationAction(), ActionState, bootstrapAction(), ensureNeonAuthUser(), requestPasswordResetAction(), signInAction(), signOutAction(), { GET, POST } (+21 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (36): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, postcss (+28 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+20 more)

### Community 6 - "leads/route.ts"
Cohesion: 0.10
Nodes (24): POST(), POST(), subscriptionSchema, APPS, Configurator(), SITE_FIELDS, STEPS, escapeHtml() (+16 more)

### Community 7 - "dependencies"
Cohesion: 0.07
Nodes (27): better-auth, dotenv, drizzle-orm, @neondatabase/auth, @neondatabase/serverless, next, dependencies, better-auth (+19 more)

### Community 8 - "Neon"
Cohesion: 0.07
Nodes (26): Architecture: How to Use Neon, Backend Primitives, Branch configuration, Branch-First Dev Flow, Choosing the Right Skill, Fetching Docs as Markdown, Finding the Right Page, Getting Started with Neon (+18 more)

### Community 9 - "Design direction and implementation requirements"
Cohesion: 0.11
Nodes (17): 1. Hero, 2. Narrative flow, 3. Interactive modules, 4. Services and proof, 5. Navigation, footer, and CTAs, 6. Responsive behavior, 7. Accessibility and motion, 8. Content and encoding (+9 more)

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

### Community 23 - "[locale]/layout.tsx"
Cohesion: 0.12
Nodes (16): LocaleLayout(), RequestAssessment(), FuelSavingsPage(), ConfiguratorPage(), AssessmentForm(), FIELDS, BrandLogo(), FuelSavings() (+8 more)

### Community 33 - "check-forbidden-dashes.mjs"
Cohesion: 0.40
Nodes (3): excludedDirectories, textExtensions, violations

## Knowledge Gaps
- **207 isolated node(s):** `nextConfig`, `name`, `private`, `dev`, `build` (+202 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **6 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `schema.ts` to `content.ts`, `admin.ts`, `actions/auth.ts`, `leads/route.ts`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `PageHeader()` connect `content.ts` to `[locale]/layout.tsx`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `schema.ts` to `admin.ts`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `private` to the rest of the system?**
  _207 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05613951266125179 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.05031645569620253 - nodes in this community are weakly interconnected._
- **Should `admin.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.12698412698412698 - nodes in this community are weakly interconnected._