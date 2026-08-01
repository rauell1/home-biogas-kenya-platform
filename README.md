# Home Biogas Kenya  -  Final Consolidated Platform

This package consolidates the strongest work from the A2 and B2 directions and uses the uploaded B1 prototype only as a learning reference.

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
