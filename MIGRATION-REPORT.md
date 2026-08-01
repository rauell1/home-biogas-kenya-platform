# B1 → Production migration report

Reference prototype: `home-biogas-kenya-branding B1.zip` (single-file Vite/React visual prototype).
The archive was treated strictly as an art-direction reference. No prototype code was carried over.

## Preserved
- Headline: “Waste contains energy. We engineer the system that releases it.”
- Numbered chapter structure across the homepage (01–06).
- Editorial palette: bone, field cream, ink, raw concrete, kiln clay, deep soil, methane blue, digestate olive, safety yellow, oxide red.
- Monospaced technical labels alongside display and editorial typography.
- Large capacity figures (16 m³, 32 m³) treated as engineering data, not decoration.
- Dark digester chapter, project verification concept, waste-to-energy narrative.
- Invitation-controlled administration, project explorer, preliminary configurator.

## Redesigned
- One continuous waste-to-working-energy system replaces disconnected sections; the methane-blue line becomes waste flow, gas pipeline, project connector and configurator progress.
- Emoji application cards replaced by a single animated pipeline scene with nine real applications.
- Project cards replaced by a full-height explorer (index + technical sheet + filters).
- Configurator now demands quantities before any estimate and always exposes assumptions and a disclaimer.

## Removed
- Vite build and the single `App.tsx` component tree.
- Browser state switching between public and admin views.
- Fake login based on email text and unchecked password fields.
- Hard-coded dashboard statistics and local data arrays.
- Arbitrary gas-production calculations and non-submitting forms.
- Public administrator sign-up; generic rounded cards and repetitive bento grids.
- Any imagery or claim belonging to another company or brand.

## Missing assets / broken references
- No authenticated Kenyan project photography shipped with the prototype; the production site therefore uses engineered SVG scenes and a texture/gradient hero until rights-cleared media is uploaded and approved in `/admin/media`.
- All prototype image paths were broken and have been dropped.

## Accessibility concerns found and fixed
- No skip link, no focus styles, animation-dependent content, unlabelled controls.
- Production build adds a skip link, visible focus rings, keyboard-operable SVG hotspots, labelled forms, `role="alert"` error summaries, reduced-motion support and pause controls.

## Security concerns found and fixed
- Client-side “auth”, client-trusted role checks, no validation, no rate limiting.
- Production build uses server sessions (scrypt + hashed session tokens), middleware protection, server-side permission assertions in every action, Zod validation, honeypot + rate limiting, security headers and CSP, and append-only audit logging.

## Content requiring verification
Project inventory (Kerarapon, Gataka, Kwenia Eco Lodge, Nairobi school, slaughterhouse study) is seeded as company-confirmed narrative with evidence labels on every outcome. Any figure not measured is labelled as a company estimate or client report, and unverified claims cannot reach the published state.

## Conceptually reusable vs rebuilt
- Reusable concepts: chapter rhythm, palette, typographic hierarchy, technical annotation style.
- Rebuilt from scratch: routing, data layer, authentication, admin platform, digester interaction, application scene, project explorer, configurator, forms.
