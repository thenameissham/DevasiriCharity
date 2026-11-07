# Devasiri UI Refresh — implementation notes

## Design intent
A light-first, content-led interface inspired by GitHub's clarity and component discipline, adapted for an education charity. Primary typeface stack: Segoe UI, Helvetica Neue, Helvetica, Arial, sans-serif.

## Files changed
- `src/app/globals.css` — light-first tokens, Segoe UI stack, focus/selection colors, shared interface defaults, restrained homepage normalization.
- `src/components/layouts/navbar.tsx` — shared navigation simplified to a restrained bordered surface; removes redundant scroll-state styling.
- `src/components/landing/premium-home-page.tsx` — uses shared `Navbar`; adds a real `#programs` target; reduces hero height.
- `src/components/landing/premium-home-page.module.css` — removes large animated orbs/ribbon, reduces card motion and shadows.
- `src/components/campaigns/campaign-discovery-client.tsx` — normalizes campaign cards, filters, summary surfaces, and page background.
- `src/components/campaigns/public-campaign-card.tsx` — reduces excessive card radius, blur, and shadows.
- `src/components/scholarship/eligibility-screener.tsx` — simplifies panel and control radii.
- `src/components/scholarship/student-application-form.tsx` — standardizes form surfaces and controls.
- `src/app/apply/page.tsx` — aligns the application intro and requirements panel with the new palette.

## Safety boundaries
- This is a UI/UX first pass, not a full security remediation.
- Authentication, authorization, database models, donation actions, eligibility criteria, and business rules were not intentionally changed.
- No payment provider was added.
- The original project files are not modified by the ZIP-generation workflow.

## Validation status
Static source checks were performed for the edited files. A Next.js build, ESLint, TypeScript check, automated tests, and browser/device review have not been run because this source archive does not include dependencies or a package-manager lockfile. Restore the correct lockfile from the original repository before attempting a reproducible install/build.

## Before deployment
1. Run `npm ci` only after restoring the matching `package-lock.json`; otherwise use the project's actual package manager and lockfile.
2. Run `npm run typecheck`, `npm run lint`, and `npm run build`.
3. Test homepage navigation, campaign search/filter, application validation, keyboard focus, reduced motion, and narrow mobile widths.
4. Continue the separate security work: remove/rotate demo credentials, harden production seeding, review student data access, and verify donation status semantics.
