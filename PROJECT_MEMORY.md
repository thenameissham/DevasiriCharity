# Devasiri Platform — Project Memory and Engineering Source of Truth

**Repository snapshot inspected:** `devasiri-platform-share-20260710-113513.zip`  
**Inspection date:** 2026-07-10  
**Purpose:** Persistent architectural memory for every future development, debugging, UI/UX, database, security, and deployment change.

> This document must be read before changing the project. Update it whenever architecture, routes, database models, business rules, integrations, or major UI composition changes.

---

## 1. Product identity

Devasiri Platform is a role-based charitable trust platform focused on:

- student scholarship and education-support applications;
- donation campaigns and donation-intent tracking;
- campaign-level transparency and receipts;
- donor, student, volunteer, and administrator portals;
- hostel and educational continuity support;
- impact stories, success stories, events, notifications, inquiries, and audit records.

The present codebase is beyond a static website: it contains real PostgreSQL/Prisma persistence, credential authentication, server actions, admin review flows, campaign CRUD, donation administration, and role-protected dashboards. However, several product areas and third-party integrations are represented only by schema/dependencies/UI concepts and are not yet complete production workflows.

---

## 2. Current technology stack

### Runtime and framework

- Next.js App Router
- React and TypeScript with strict mode
- Node.js `>=20.11.0`
- npm `>=10`
- Tailwind CSS through `@tailwindcss/postcss`
- Framer Motion for interactive presentation
- Lucide React icons

### Backend and data

- PostgreSQL
- Prisma ORM 7 with `@prisma/adapter-pg`
- Generated Prisma client committed under `src/generated/prisma`
- Next.js server components and server actions
- Zod validation

### Authentication

- NextAuth credentials provider
- Prisma adapter
- JWT session strategy
- bcrypt password hashing
- Role checks in both middleware/proxy and server-side route guards

### Dependencies present but not confirmed as complete active integrations

- Razorpay
- Stripe
- AWS S3 and presigned URLs
- Redis/ioredis
- Pusher
- Sentry
- PostHog
- Recharts
- Sonner
- several Radix UI packages

Do not describe these as implemented merely because they are installed.

---

## 3. Primary repository structure

```text
prisma/
  schema.prisma              Main relational domain model
  seed.ts                    Demo users, campaigns, and impact story

public/
  brand/                     Devasiri logo
  illustrations/             Homepage and campaign illustrations
  media/                     Media directory

scripts/
  safe-patch-runner.sh       Historical safe patch infrastructure
  phase-*.sh                 Earlier phased UI/experience patch scripts
  checkpoint-current-work.sh Historical checkpoint utility

src/app/                     App Router pages, layouts, auth route, errors
src/components/              UI, layouts, landing, dashboards, motion, story, trust
src/features/                Active domain queries, validation, and server actions
src/generated/prisma/        Generated Prisma client; do not manually edit
src/lib/                     Prisma, auth guards, passwords, formatting, slug helpers
src/data/                    Static homepage data
src/types/                   Shared domain and NextAuth type augmentation
src/auth.ts                  NextAuth configuration
src/env.ts                   Runtime environment validation
src/proxy.ts                 Role-aware protected-route middleware
```

---

## 4. Active route map

### Public routes

- `/` — current premium public homepage
- `/login` — credentials login
- `/campaigns` — public campaign discovery
- `/campaigns/[slug]` — campaign details
- `/campaigns/[slug]/donate` — donation-intent page
- `/donation/success` — donation-intent success view
- `/receipts/[receiptNumber]` — public receipt lookup/view
- `/apply` — scholarship application introduction
- `/apply/start` — scholarship application form
- `/apply/success` — application reference confirmation
- `/unauthorized` — role/access rejection page

### Protected routes

- `/admin` — operational command center
- `/admin/campaigns` — campaign management
- `/admin/campaigns/new` — campaign creation
- `/admin/campaigns/[campaignId]/edit` — campaign editing
- `/admin/applications` — scholarship application queue
- `/admin/applications/[applicationId]` — application review/status workflow
- `/admin/donations` — donation verification list
- `/admin/donations/[donationId]` — donation verification and administration
- `/donor` — donor dashboard
- `/student` — student dashboard
- `/volunteer` — volunteer dashboard

### API routes

- `/api/auth/[...nextauth]` — NextAuth handler

---

## 5. Authentication and authorization flow

1. User submits email and password on `/login`.
2. `src/auth.ts` validates credentials with Zod.
3. Email is normalized to lowercase.
4. User is loaded from Prisma.
5. Suspended users and users without a password hash are rejected.
6. bcrypt verifies the password.
7. `lastLoginAt` is updated.
8. User ID, role, and status are stored in the JWT and projected into the session.
9. `src/proxy.ts` protects role route prefixes.
10. Protected server pages and actions also call `requireRole`, providing defense in depth.

Role routing:

- `ADMIN` → `/admin`
- `DONOR` and `ADMIN` → `/donor`
- `VOLUNTEER` and `ADMIN` → `/volunteer`
- `STUDENT` and `ADMIN` → `/student`

Important current limitations:

- No public registration/onboarding flow was found.
- No password reset, email verification workflow, MFA, account lockout, or throttling was found.
- User status is copied into the JWT, but route guards currently enforce role rather than actively rechecking database status on every request.
- Credentials authentication uses JWT sessions although Session/Account models remain available for adapter compatibility.

---

## 6. Database domain model

### Core identity

- `User`
- `Account`
- `Session`
- `VerificationToken`

### Funding and campaigns

- `Campaign`
- `Donation`
- `PaymentTransaction`

### Student support

- `Student`
- `StudentApplication`
- `HostelFacility`
- `SuccessStory`

### Volunteer and events

- `Volunteer`
- `Event`
- `EventVolunteer`

### Content, communication, and governance

- `ImpactStory`
- `NewsletterSubscriber`
- `Notification`
- `ContactInquiry`
- `AuditLog`

### Key workflow enums

- user roles/statuses;
- campaign status/category;
- donation and payment statuses/providers;
- student and scholarship-application statuses;
- volunteer status;
- event status;
- notification and inquiry status;
- audit actions.

### Important model observations

- Money is stored as integer paise, which is correct for INR accounting.
- Donation has both general `status` and separate `paymentStatus`/`paymentProvider` fields.
- Payment transaction also has its own provider/status enums. This needs a formal state-transition contract before live gateway integration.
- Campaign `raisedAmountPaise` is stored directly while donations also exist. Any future successful-donation flow must update aggregates transactionally or calculate from verified donations to avoid drift.
- Scholarship applications contain personal and financial data, including Aadhaar last four digits and document URLs. Access control, retention, encryption strategy, secure uploads, and audit policies are mandatory before production use.
- Some schema formatting is inconsistent, and `StudentApplicationStatus` is declared after models. It may still parse, but the schema should be normalized only in a dedicated database-hardening phase.
- No Prisma migrations directory was included in the inspected archive. This is a major deployment/versioning gap unless migrations exist outside this snapshot.

---

## 7. Implemented business flows

### Campaign management

- Admin-only create/update/archive/delete server actions.
- Zod form parsing and text normalization.
- Unique slug generation.
- Rupee-to-paise conversion.
- Campaigns with donations are archived rather than deleted.
- Audit records are created for create, update, delete, and archive/status changes.
- Public campaign queries return only active campaigns.

### Scholarship application

- Public application submission.
- Structured personal, academic, fee, support, and consent fields.
- Server-side Zod validation.
- Generated application reference such as `DSA-<year>-<random>`.
- Admin list/detail review.
- Admin status progression and notes.
- Audit record on status changes.

### Donation intent and administration

- Public campaign-linked donation intent form exists.
- Donation records can be reviewed by administrators.
- Admin donation status actions exist.
- Receipt-number handling and receipt route exist.
- Current system is primarily an intent/manual verification workflow; live payment gateway capture/webhooks were not confirmed as implemented.

### Dashboards

- Admin dashboard aggregates users, campaigns, applications, students, volunteers, successful donations, and requested support.
- Donor dashboard reads the authenticated user’s donation records.
- Student dashboard reads a student profile linked to the authenticated user.
- Volunteer dashboard exists, but its operational depth must not be overstated.

---

## 8. Current homepage and UI architecture

The active `/` route renders `PremiumHomePage` from:

```text
src/app/page.tsx
  -> src/components/landing/premium-home-page.tsx
```

The active homepage:

- is force-dynamic with zero revalidation;
- loads featured campaigns and impact aggregates from the database;
- has its own fixed navigation/header composition;
- uses Devasiri brand artwork and custom illustrations;
- includes education-support programs, pathway storytelling, campaign cards, metrics, trust points, volunteer/application calls to action, and background storytelling;
- uses a green/emerald, slate, white, and warm accent visual language;
- combines Tailwind utilities and a large CSS module.

### Design system characteristics

- Apple/system font stack in global CSS.
- Large rounded surfaces, glass effects, soft shadows, gradients, dense utility styling.
- Motion system built with Framer Motion and CSS keyframes.
- Global `prefers-reduced-motion` handling exists.
- Focus-visible styles are present.
- Custom theme provider/switcher exists.

### UI architecture concern

The repository contains many advanced/experimental visual components under:

- `src/components/experience`
- `src/components/story`
- `src/components/trust`
- `src/components/blocks`
- `src/components/motion`

Not all of these are used by the current homepage or current routes. Future work must trace actual imports before editing. Do not assume every visually impressive component is active.

### CSS concern

`src/app/globals.css` contains repeated definitions of the same Devasiri animation/grid classes and keyframes from earlier patch phases. This creates maintenance ambiguity and should be consolidated later through a controlled visual-regression-safe cleanup, not casually removed.

---

## 9. Data flow and rendering model

- Public pages are mostly server components.
- Database reads are performed directly in server pages or feature query modules.
- Mutations use Next.js server actions.
- Client components are used for animation, forms requiring interactivity, theme controls, campaign filtering, journey progress, and experience layers.
- `revalidatePath` is used after campaign and admin mutations.
- Homepage is always dynamically rendered and therefore database failures are partly handled through fallbacks.
- Campaign query functions catch database errors and return empty arrays; impact summary on the homepage has a fallback object.

Potential issue: silently returning empty campaign data can make a database outage look like a legitimate “no campaigns” state. A future reliability phase should distinguish empty data from unavailable data.

---

## 10. Security and privacy posture

### Existing strengths

- strict TypeScript;
- Zod validation for key forms;
- password hashing with bcrypt cost 12;
- role checks at proxy and server layers;
- no direct client access to Prisma;
- parameterized ORM queries;
- audit logging for several sensitive admin mutations;
- text cleaning helper used by application and campaign inputs;
- private environment values separated from public variables.

### High-priority risks

1. `.env.example` contains demo credentials as comments. Even demo passwords should not live in environment templates.
2. `prisma/seed.ts` uses predictable public demo passwords and prints them to logs.
3. No rate limiting or brute-force protection on credential login or public submissions.
4. No CSRF/abuse strategy was identified beyond framework/server-action defaults.
5. No secure file-upload pipeline was identified; application documents are accepted as URLs.
6. No payment webhook verification flow was confirmed.
7. No formal transactional invariant between donations, payments, receipts, and campaign totals.
8. Public receipt access must be reviewed for enumeration/privacy leakage.
9. Personal and financial student information requires explicit retention, consent, access, and breach-response rules.
10. Installed integrations and `latest` dependency ranges increase supply-chain and upgrade risk.

---

## 11. Dependency and build observations

- Many dependencies use the mutable `latest` range in `package.json`.
- The lockfile is therefore essential for reproducible installation.
- Core versions explicitly visible include Prisma 7.8 and Framer Motion 12.42.
- Next.js, React, NextAuth, Zod, and many UI/integration packages are not pinned in `package.json`.
- `AGENTS.md` correctly warns that the installed Next.js version may contain breaking changes and that local framework docs should be checked before edits.
- Generated Prisma code is committed and excluded from ESLint.
- No automated test suite or test script was found.
- Quality scripts exist for typecheck, lint, and Prettier checks.
- The inspected archive excluded `node_modules`, as intended.
- A clean dependency installation/build validation could not be completed in the inspection sandbox because npm encountered a filesystem cleanup/install error. This is not evidence that the project itself fails to build; local validation remains required.

---

## 12. Historical and potentially obsolete artifacts

The root includes hidden marker/backup files and `scripts/phase-*.sh` files representing earlier patch phases. These are useful historical evidence but are not automatically the current source of truth.

Before modifying any feature:

1. inspect the active route;
2. follow its imports;
3. identify currently rendered components;
4. distinguish active files from orphaned experiments;
5. preserve or archive historical patch scripts only through an intentional cleanup decision.

---

## 13. Current maturity assessment

### Substantially implemented

- public premium homepage;
- credential login;
- role-aware route protection;
- campaign public listing/detail;
- admin campaign CRUD/archive workflow;
- scholarship application submission;
- admin application review/status workflow;
- donation-intent records and admin verification surface;
- role dashboards;
- audit records for selected admin operations;
- Prisma relational model and seed data.

### Partially implemented

- end-to-end donation payment lifecycle;
- receipt security and formal issuance process;
- student support lifecycle after approval/funding/disbursement;
- volunteer lifecycle and event assignment operations;
- notifications;
- impact/success story administration;
- hostel support operations;
- contact inquiries/newsletter administration;
- analytics and operational observability;
- file/document uploads;
- user management and onboarding.

### Not confirmed as implemented

- Razorpay/Stripe checkout and verified webhooks;
- S3 uploads;
- Redis caching/rate limiting;
- Pusher real-time updates;
- Sentry monitoring;
- PostHog analytics;
- email/SMS notifications;
- automated tests;
- CI/CD quality gates;
- Prisma migration history;
- backup/restore and disaster recovery procedures.

---

## 14. Mandatory engineering rules for future work

1. **Understand before editing.** Inspect the active route, imports, data path, schema, and side effects first.
2. **Do not redesign working modules without an explicit request.** Preserve behavior and backward compatibility.
3. **Never claim a dependency equals an implemented feature.** Confirm executable flows.
4. **No partial code.** Changes must be complete, production-oriented, strongly typed, and directly applicable.
5. **Provide exact paths and commands.** Include validation and rollback for every material change.
6. **Protect data invariants.** Donation/payment/receipt/campaign totals and application status transitions require transactional reasoning.
7. **Enforce authorization server-side.** Client hiding is never access control.
8. **Validate every boundary.** Forms, route params, environment variables, external callbacks, and uploaded content.
9. **Maintain accessibility.** Keyboard support, focus states, semantic markup, contrast, and reduced motion.
10. **Respect active visual language.** Devasiri uses premium rounded surfaces, restrained glass effects, emerald/slate branding, system typography, and purposeful motion.
11. **Avoid visual accumulation.** Reuse/consolidate existing design primitives rather than adding another parallel style system.
12. **Do not edit generated Prisma files manually.** Change schema, then regenerate.
13. **Do not expose secrets or demo passwords.** Remove credentials from templates/logs before production.
14. **Run quality gates after changes:** Prisma validation/generation where relevant, typecheck, lint, formatting check, and production build.
15. **Update this file** after architectural, business-flow, schema, route, integration, or deployment changes.

---

## 15. Required change-record format

For every future significant implementation, append a concise record here or in a dedicated `docs/CHANGELOG-DEVELOPMENT.md` if one is later created:

```text
Date:
Objective:
Files changed:
Business behavior changed:
Database/schema impact:
Security/privacy impact:
Compatibility notes:
Validation performed:
Rollback path:
Known limitations:
```

---

## 16. Recommended next technical sequence

Do not start all items simultaneously. Use this order unless the user explicitly prioritizes another feature:

1. Establish a reproducible local baseline: install, Prisma validate/generate, typecheck, lint, format check, production build.
2. Remove credential leakage from templates/seed logging and formalize local-only demo accounts.
3. Add migration history and define database deployment strategy.
4. Define donation/payment/receipt state machine and transactional invariants.
5. Decide whether payments remain admin-verified/manual or become gateway-driven.
6. Add rate limiting, abuse controls, secure document upload, and privacy controls.
7. Add automated tests for auth, campaign actions, applications, donations, and authorization.
8. Consolidate duplicate CSS and identify orphaned UI components without changing current appearance.
9. Complete one business vertical at a time: donation lifecycle, scholarship lifecycle, volunteer/events, then content/notifications.
10. Add observability, CI quality gates, backup/restore, and production deployment documentation.

---

## 17. Files to inspect first for common future tasks

### Homepage/UI

- `src/app/page.tsx`
- `src/components/landing/premium-home-page.tsx`
- `src/components/landing/premium-home-page.module.css`
- `src/app/globals.css`
- `src/components/storytelling/section-background-storytelling.tsx`

### Authentication/access

- `src/auth.ts`
- `src/proxy.ts`
- `src/lib/auth/require-role.ts`
- `src/components/blocks/login-form.tsx`
- `src/app/login/page.tsx`
- `src/types/next-auth.d.ts`

### Database

- `prisma/schema.prisma`
- `prisma/seed.ts`
- `src/lib/prisma.ts`
- `src/env.ts`

### Campaigns

- `src/features/campaigns/campaign.actions.ts`
- `src/features/campaigns/campaign.queries.ts`
- `src/features/campaigns/campaign.schemas.ts`
- `src/components/admin/campaign-form.tsx`

### Donations

- `src/features/donations/donation.actions.ts`
- `src/features/donations/donation-admin.actions.ts`
- `src/features/donations/donation.schemas.ts`
- `src/features/donations/donation-intent-form.tsx`
- `src/app/admin/donations/**`

### Scholarship applications

- `src/features/student-applications/student-application.actions.ts`
- `src/features/student-applications/student-application.schemas.ts`
- `src/components/scholarship/student-application-form.tsx`
- `src/app/admin/applications/**`

---

## 18. Source-of-truth statement

For future work, the source of truth is:

1. the latest user-provided project archive or repository state;
2. the active executable route/import path;
3. the current Prisma schema and applied migrations;
4. verified runtime behavior and quality-gate output;
5. this memory document, updated to reflect verified changes.

Never rely solely on old patch scripts, filenames, visual assumptions, or earlier chat descriptions when they conflict with the latest code.
