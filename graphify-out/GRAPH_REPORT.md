# Graph Report - home-biogas-kenya-final  (2026-08-01)

## Corpus Check
- 112 files · ~77,790 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 531 nodes · 1013 edges · 32 communities (25 shown, 7 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7b543b3a`
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
- [locale]/layout.tsx
- auth-client.ts
- users/page.tsx
- seed-db.mjs
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
- `InviteForm()` --indirect_call--> `inviteStaffAction()`  [INFERRED]
  src/components/admin/InviteForm.tsx → src/app/actions/admin.ts
- `UsersPage()` --calls--> `requirePermission()`  [EXTRACTED]
  src/app/admin/users/page.tsx → src/lib/guard.ts
- `InvitePage()` --calls--> `hashToken()`  [EXTRACTED]
  src/app/auth/invite/[token]/page.tsx → src/lib/legacy-auth.ts
- `AboutPage()` --references--> `SERVICE_GROUPS`  [EXTRACTED]
  src/app/[locale]/about/page.tsx → src/lib/content.ts
- `ApplicationDetail()` --references--> `APPLICATIONS`  [EXTRACTED]
  src/app/[locale]/applications/[slug]/page.tsx → src/lib/content.ts

## Import Cycles
- None detected.

## Communities (32 total, 7 thin omitted)

### Community 0 - "schema.ts"
Cohesion: 0.06
Nodes (54): Approvals(), dynamic, ArticlesPage(), dynamic, AuditLogPage(), dynamic, Dashboard(), dynamic (+46 more)

### Community 1 - "content.ts"
Cohesion: 0.07
Nodes (34): dynamic, SettingsPage(), AboutPage(), ApplicationDetail(), dynamic, HomePage(), inquiryLinks(), ProductsPage() (+26 more)

### Community 2 - "admin.ts"
Cohesion: 0.14
Nodes (28): addLeadActivityAction(), approveTechnicalAction(), createSurveyAction(), FormState, importSourceAction(), inviteStaffAction(), listField(), projectSchema (+20 more)

### Community 3 - "actions/auth.ts"
Cohesion: 0.14
Nodes (25): acceptInvitationAction(), ActionState, bootstrapAction(), ensureNeonAuthUser(), requestPasswordResetAction(), signInAction(), signOutAction(), { GET, POST } (+17 more)

### Community 4 - "devDependencies"
Cohesion: 0.05
Nodes (36): drizzle-kit, eslint, eslint-config-next, devDependencies, drizzle-kit, eslint, eslint-config-next, postcss (+28 more)

### Community 5 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts (+20 more)

### Community 6 - "leads/route.ts"
Cohesion: 0.09
Nodes (25): POST(), POST(), subscriptionSchema, APPS, Configurator(), SITE_FIELDS, STEPS, emailList() (+17 more)

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

### Community 23 - "[locale]/layout.tsx"
Cohesion: 0.12
Nodes (16): LocaleLayout(), RequestAssessment(), FuelSavingsPage(), ConfiguratorPage(), AssessmentForm(), FIELDS, BrandLogo(), FuelSavings() (+8 more)

### Community 29 - "users/page.tsx"
Cohesion: 0.15
Nodes (17): AdminLayout(), dynamic, GROUPS, Item, dynamic, UsersPage(), dynamic, InvitePage() (+9 more)

### Community 33 - "check-forbidden-dashes.mjs"
Cohesion: 0.40
Nodes (3): excludedDirectories, textExtensions, violations

## Knowledge Gaps
- **209 isolated node(s):** `nextConfig`, `name`, `private`, `dev`, `build` (+204 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `db` connect `schema.ts` to `admin.ts`, `actions/auth.ts`, `leads/route.ts`, `queries.ts`, `users/page.tsx`?**
  _High betweenness centrality (0.038) - this node is a cross-community bridge._
- **Why does `PageHeader()` connect `content.ts` to `schema.ts`, `queries.ts`, `[locale]/layout.tsx`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `requirePermission()` connect `schema.ts` to `content.ts`, `admin.ts`, `users/page.tsx`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._
- **What connects `nextConfig`, `name`, `private` to the rest of the system?**
  _209 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `schema.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06394027913015254 - nodes in this community are weakly interconnected._
- **Should `content.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.06557377049180328 - nodes in this community are weakly interconnected._
- **Should `admin.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.14393939393939395 - nodes in this community are weakly interconnected._