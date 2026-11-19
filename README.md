# Home Biogas Kenya platform

Bilingual (English and Kiswahili) website and operations platform for Home Biogas Kenya: household biogas information, a verified project explorer, a preliminary system configurator, site-assessment requests and an invitation-only admin for projects, leads, approvals and content.

It consolidates the strongest work from the earlier A2 and B2 design directions; the B1 prototype served only as a learning reference.

## What is included

- Next.js App Router, React and TypeScript
- English and Kiswahili route structure
- Industrial Organic Editorial design system
- Continuous waste-to-working-energy homepage narrative
- Interactive SVG digester cutaway
- Connected gas-application scene without emoji UI
- Full-height verified-project explorer
- Quantity-based preliminary configurator with engineering disclaimer
- Site-assessment form and lead persistence
- Neon PostgreSQL schema and Drizzle migrations
- Invitation-only admin access
- Projects, source records, approvals, media-rights, articles, leads and site-survey modules
- Role-based permissions and audit logging
- Resend-ready transactional email adapter
- Better Auth API foundation for Neon-backed authentication
- Security headers, rate limiting and server-side validation

## Company identity

Use content only from the Home Biogas Kenya represented by:

- LinkedIn: https://www.linkedin.com/company/homebiogas-kenya/posts/?feedView=all
- Facebook: https://www.facebook.com/homebiogask/

Do not merge content from the international HomeBiogas brand or HomeBiogas Ventures Limited.

## Neon setup

Target project:

- Project ID: `withered-bread-55661570`
- Database: `neondb`

From the project root, authenticate to the correct Neon account and run:

```bash
npx neon@latest init
```

Then populate `.env.local` from `.env.example` and run:

```bash
npm install
npm run db:generate
npm run db:migrate
npm run dev
```

Never commit `.env.local` or expose a database connection string in browser code.

## First administrator

Set:

```env
ADMIN_BOOTSTRAP_ENABLED=true
ADMIN_BOOTSTRAP_EMAIL=approved-admin@example.com
```

Open `/auth/sign-in`, create the one-time super-admin account, then immediately set:

```env
ADMIN_BOOTSTRAP_ENABLED=false
```

All later staff access is invitation-only.

## Better Auth

The package includes a Better Auth server configuration and `/api/auth/[...all]` route. Before switching all staff authentication to Better Auth, generate or migrate its required tables and connect the staff profile to the Better Auth user ID. The existing invitation-controlled Neon session flow remains available during that transition.

## Content verification

Projects must pass:

`DRAFT → SOURCE REVIEW → TECHNICAL REVIEW → MEDIA RIGHTS REVIEW → CONTENT REVIEW → TRANSLATION REVIEW → APPROVED → PUBLISHED`

Do not publish imported social content automatically.

## Production checklist

1. Replace placeholder contact values.
2. Add authenticated Home Biogas Kenya media with rights metadata.
3. Verify all project capacities, locations and applications.
4. Configure Resend, Turnstile and storage.
5. Run type checking, linting, tests and production build in an environment with full npm registry access.
6. Test invitation, lead, survey, approval and publication workflows.
7. Verify mobile performance and reduced-motion behaviour.

## Cloudflare deployment

The site runs on Cloudflare Workers through the OpenNext Cloudflare adapter (`open-next.config.ts`, `wrangler.jsonc`). `.github/workflows/deploy-cloudflare.yml` builds and deploys on every push to `main`.

- GitHub repository secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `DATABASE_URL`, `NEON_AUTH_BASE_URL`, `NEON_AUTH_COOKIE_SECRET`, `BETTER_AUTH_SECRET`.
- GitHub repository variables: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_PHONE_NUMBER`, `NEXT_PUBLIC_WHATSAPP_NUMBER`.
- Worker secrets (`npx wrangler secret put NAME` or the Cloudflare dashboard): every runtime variable in `.env.example`.
- On Workers the database pool is created per request (`src/db/index.ts`), because Workers cannot share a socket between requests.
- Local check: `npm run cf:preview` with the variables in a `.dev.vars` file.

## Project information

| | |
|---|---|
| Live site | https://home-biogas-kenya-platform.rauell.workers.dev/en |
| Hosting | Cloudflare Workers |
| Default branch | `main` |
| Repository | Public |

### Stack

- Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4
- Drizzle ORM with Neon PostgreSQL
- Neon Auth and Better Auth
- Vitest for tests

### Deployment

Production runs on Cloudflare Workers at https://home-biogas-kenya-platform.rauell.workers.dev/en. `.github/workflows/deploy-cloudflare.yml` builds and deploys on every push to `main`, using the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Public build-time values are repository variables; runtime secrets are Worker secrets.

### Contributing and security

- How to set up, test and submit changes: [CONTRIBUTING.md](CONTRIBUTING.md)
- How to report a vulnerability: [SECURITY.md](SECURITY.md)
- Expected behaviour in project spaces: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

### Licence

No open-source licence has been granted. The code, content and brand assets belong to the project owner and all rights are reserved. Ask the owner before reusing any part of this repository.
