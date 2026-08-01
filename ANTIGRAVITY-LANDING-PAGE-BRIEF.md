# Antigravity brief: understand the platform and beautify the landing page

You are working in the `home-biogas-kenya-platform` repository. Treat this as an existing production application, not a greenfield redesign. Your task is to understand the system first, then deliver a polished, distinctive, accessible beautification of the public landing page without disrupting its architecture, data flow, bilingual routes, authentication, admin workflows, or engineering credibility.

## Required first steps

1. Read this brief completely.
2. Read `README.md`, `FINAL-CHANGELOG.md`, `MIGRATION-REPORT.md`, `package.json`, and any repository instructions under `.agents/`.
3. Use the installed Graphify integration before making changes. Run `/graphify .` to generate or refresh the locally ignored `graphify-out/graph.json`, report, and visualization. Then use Graphify queries to trace `HomePage`, `LocaleLayout`, `SiteNav`, `getDict`, `getPublishedProjects`, `DigesterCutaway`, `ApplicationScene`, `ProjectExplorer`, and `Configurator`.
4. Run `git status --short` and preserve all unrelated user changes. Do not reset, discard, or broadly reformat existing work.
5. Inspect the current landing page at both `/en` and `/sw` at desktop and mobile widths before editing. Take screenshots for comparison if browser tooling is available.
6. Read these files before proposing or editing UI:
   - `src/app/[locale]/page.tsx`
   - `src/app/[locale]/layout.tsx`
   - `src/app/layout.tsx`
   - `src/app/globals.css`
   - `src/components/SiteNav.tsx`
   - `src/components/DigesterCutaway.tsx`
   - `src/components/ApplicationScene.tsx`
   - `src/components/ProjectExplorer.tsx`
   - `src/components/Configurator.tsx`
   - `src/lib/i18n.ts`
   - `src/lib/content.ts`
   - `src/lib/queries.ts`

Do not begin implementation until you can explain how the landing page gets localized copy, live project data, service content, and interactive sections.

## System context

This is Home Biogas Kenya's bilingual public platform and invitation-only staff administration system. It presents biogas engineering services, technologies, applications, verified projects, training, knowledge resources, assessment requests, and practical sizing/savings tools.

The production stack is:

- Next.js 16 App Router with React 19 and TypeScript 5.9
- Tailwind CSS 4, with the main design tokens and reusable utility classes in `src/app/globals.css`
- Neon PostgreSQL with Drizzle ORM
- Neon Auth / Better Auth foundations, plus role-aware legacy staff-profile and session compatibility
- Vercel deployment and Vercel Analytics
- Vitest for unit tests

Important architectural boundaries:

- Public localized pages live below `src/app/[locale]/`, currently supporting English (`en`) and Kiswahili (`sw`).
- `src/app/[locale]/layout.tsx` owns the shared public navigation, footer, skip link, and locale shell.
- `src/app/[locale]/page.tsx` is an async server component. It calls `getDict(locale)` and `getPublishedProjects()`, computes truthful statistics from published database records, and composes the homepage sections.
- Published project evidence is database-backed. Never replace it with hard-coded projects, fake numbers, invented counties, fake testimonials, or unverified impact claims.
- Shared service, process, application, and digester content lives in `src/lib/content.ts`.
- Interactive homepage modules are established components. Preserve their behavior and accessibility; beautify their framing only unless a tightly scoped internal change is demonstrably needed.
- The authentication and admin routes are not part of this visual task. Do not alter database schemas, migrations, auth handlers, middleware, roles, invitations, or admin workflows.
- The company represented here is the Kenyan organization linked in `README.md`. Do not import identity, claims, media, or copy from unrelated international businesses with similar names.

Graphify currently maps approximately 413 nodes, 872 relationships, and 22 communities. Its architectural hubs include `db`, `getDict()`, `PageHeader()`, permission helpers, and audit helpers. For this task, stay on the public-rendering path around `HomePage()`, its four interactive children, localized content, and published-project queries.

## Existing visual language to preserve and elevate

The current design system is “Industrial Organic Editorial.” Keep that identity, but make it feel more deliberate, premium, human, and visually memorable.

Existing palette tokens include:

- ink `#121412`
- cream `#f5f1e7`
- bone `#eae5d8`
- methane cyan `#5db7c4`
- clay `#a85532`
- soil `#372b22`
- olive `#6e7445`
- safety yellow `#e5b83b`
- oxide `#a8432f`

Existing typography combines Unbounded-style display type, Newsreader-style editorial type, Manrope-style sans, and IBM Plex Mono-style labels through CSS variables set by `next/font`. Existing primitives include `.shell`, `.section`, `.display-*`, `.lede`, `.mono-label`, `.chapter-marker`, `.btn`, `.panel`, `.grid-lines`, and `.grain`.

Do not turn the site into a generic green-energy SaaS template. Avoid neon gradients, excessive glassmorphism, pill-shaped everything, floating feature-card grids, generic leaf icons, decorative dashboard mockups, stock-photo clichés, and animation for animation's sake. The desired feeling is grounded Kenyan engineering: earth, masonry, pipework, gas flow, farm systems, technical drawings, field evidence, and editorial confidence.

## Landing-page objective

Beautify the landing page so that a farmer, institution, commercial operator, partner, or engineer can immediately understand:

1. what Home Biogas Kenya builds;
2. what waste streams become useful energy;
3. which real applications the gas can power;
4. what verified project evidence exists;
5. how the organization surveys, designs, builds, commissions, trains, and maintains; and
6. how to request an assessment or use the configurator.

The result should feel cohesive from the first viewport through the final call to action, with stronger rhythm, hierarchy, visual storytelling, and transitions between sections. It must remain credible when the database contains zero published projects.

## Design direction and implementation requirements

### 1. Hero

- Keep the core localized headline and CTAs, but create a more striking first composition with an intentional balance between editorial copy and an engineering visual.
- Prefer an original CSS/SVG technical motif derived from the existing waste-to-energy process or digester geometry. Reuse the project's own assets and components. Do not fetch or add unlicensed imagery.
- Make the primary assessment action unmistakable and keep a meaningful secondary route into the story.
- Keep database-derived statistics, but present them as evidence rather than oversized vanity metrics. Handle zero projects, missing capacities, and missing counties gracefully.
- Preserve good first-paint performance; do not make the hero a heavy client component.

### 2. Narrative flow

- Make the process chain legible as a continuous transformation from organic waste to useful gas and bio-slurry, not merely a horizontal list.
- Improve the handoff between the hero, digester cutaway, application scene, project explorer, services, configurator, and final CTA.
- Retain chapter-based editorial storytelling, but vary section composition enough to prevent repetitive “heading then content” blocks.
- Add subtle visual continuity—lines, numbered markers, pipe-like paths, material textures, or measured technical annotations—using CSS or lightweight SVG.

### 3. Interactive modules

- Keep `DigesterCutaway`, `ApplicationScene`, `ProjectExplorer`, and `Configurator` functional and keyboard accessible.
- Improve their surrounding layouts, introductions, legends, affordances, responsive framing, and empty/loading states where necessary.
- Do not hide essential content behind hover-only interaction. Touch and keyboard users must receive equivalent information.
- Do not introduce unnecessary client-side state into the server-rendered page.

### 4. Services and proof

- Turn the service inventory into an easier-to-scan capability story while preserving routes and source data from `SERVICE_GROUPS`.
- Keep project content sourced from `getPublishedProjects()` and respect its publication/media-review rules.
- If no approved projects are returned, show an intentional, honest empty state and preserve a strong route to the project archive or assessment form.
- Do not invent logos, customer quotes, performance figures, awards, or certifications.

### 5. Navigation, footer, and CTAs

- Ensure the sticky navigation feels integrated with both the dark hero and light content while retaining mobile-menu behavior and locale switching.
- Preserve every current public route and label contract.
- Refine the footer only as needed to complete the landing-page visual arc; keep social links, tool links, language switching, and staff sign-in.
- Use clear, consistent CTA hierarchy. The primary conversion is a site assessment; the configurator is a valuable lower-commitment path.

### 6. Responsive behavior

- Design intentionally for approximately 360px, 768px, 1024px, and 1440px widths.
- Prevent horizontal overflow except where an explicitly usable scroller is warranted.
- Keep tap targets comfortable, text readable, navigation stable, and interactive diagrams usable on narrow screens.
- Do not rely on desktop hover states to communicate meaning.

### 7. Accessibility and motion

- Preserve semantic headings, landmarks, the skip link, focus-visible styling, meaningful labels, and logical keyboard order.
- Meet WCAG AA contrast for text and controls.
- Decorative SVG and texture layers must be hidden from assistive technology; informative graphics need an accessible text equivalent.
- Use restrained motion only where it clarifies gas flow, progression, or hierarchy. Respect `prefers-reduced-motion` and avoid scroll-jacking.

### 8. Content and encoding

- Preserve both English and Kiswahili behavior. Any new user-facing copy must be represented in the locale dictionaries rather than hard-coded in only one language.
- Correct visible mojibake such as `mÂ³`, `â€”`, `â†’`, `Â©`, or malformed en-dashes encountered in files you touch, replacing it with correct UTF-8 text (`m³`, `—`, `→`, `©`, `–`). Confirm that files remain UTF-8.
- Keep copy concise, factual, and rooted in the existing service/process data.

### 9. Code quality and scope

- Prefer improving existing components and design primitives over adding a new UI framework or dependency.
- Keep server/client boundaries clean and avoid hydration risks.
- Use `next/link` for internal navigation and `next/image` for raster images if approved local images exist.
- Avoid inline duplication when a small reusable component or token clearly improves consistency, but do not over-abstract a one-page composition.
- Do not touch secrets or commit `.env.local`.
- Do not modify auth, admin, database, migration, lead-processing, email, permissions, or audit behavior for this task.
- Keep the patch reviewable and focused on the public landing experience.

## Expected deliverables

1. A completed landing-page beautification in the existing codebase.
2. A concise explanation of the design decisions and files changed.
3. Before/after screenshots at desktop and mobile sizes for both `/en` and `/sw`, if browser tooling is available.
4. A note covering empty-project behavior and any corrected encoding issues.
5. Verification results, including any pre-existing failures clearly separated from regressions.

## Definition of done

Before finishing:

1. Run `npm run typecheck`.
2. Run `npm test`.
3. Run `npm run lint`.
4. Run `npm run build`.
5. Exercise `/en` and `/sw` at mobile and desktop widths.
6. Verify navigation, locale switching, assessment links, configurator behavior, project explorer behavior, keyboard focus, reduced motion, and the zero-project state.
7. Review the browser console and terminal for hydration, accessibility, runtime, and image warnings.
8. Run `graphify update .` after code changes so `graphify-out/graph.json` stays current.
9. Show `git diff --stat` and summarize the final diff; do not commit or push unless explicitly asked.

Start by reporting your understanding of the relevant architecture and a short visual plan. Then implement the improvement end to end. Do not stop at a mockup or recommendations.
