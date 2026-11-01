# OneClickTask Website (MCT-Template)

Second version of the public marketing site (German copy), with the same content as
`../website/`. This one is built on the frontend part of
[AxelGanter/web-app-template](https://github.com/AxelGanter/web-app-template) instead of
the Nuxt UI starter template.

## What comes from the template

Generated the way `scripts/lib/frontend.sh` and `scripts/lib/shared.sh` do it:

- `npx nuxi@3.37.0 init … --template minimal --packageManager npm --no-modules`
- Pinned `nuxt 4.5.1`, `vue 3.5.41`, `vue-router 5.2.0`, plus `pinia` and `@pinia/nuxt`
- `nuxt.config.ts` with `apiBase` and `NUXT_HOST` / `NUXT_PORT` (default port 3101)
- `app/composables/useApi.ts`, `useAuth.ts`, `app/stores/auth.ts`, `app.ts`,
  `app/middleware/auth.global.ts`, `app/pages/login.vue`
- `AGENTS.md` and `audio2user.sh` copied from the template root

Only the OneClickTask frontend part is used. The template's Laravel + Backpack backend
was not generated, because the OneClickTask app in the repository root is the backend.

## Changes to the template

- `app/pages/index.vue` is the landing page instead of the signed-in home page.
- `auth.global.ts` lets pages with `definePageMeta({ public: true })` through, so the
  landing page needs no login.
- `app/app.vue` wraps the page in `<NuxtLayout>` for header and footer.
- `nuxt.config.ts` adds `appUrl`, `repositoryUrl`, the global CSS and prerendering of `/`.
- `@lucide/vue` for icons. Styling is plain CSS (`app/assets/css/main.css` plus scoped
  styles), as in the template. Light and dark mode follow the system setting.
- Fonts are Instrument Sans and Geist Mono from `@fontsource-variable/*`, bundled with the site so no
  request goes to Google Fonts.

## Setup

```bash
cd website-mct
npm install
cp .env.example .env
npm run dev            # http://localhost:3101
```

| Variable | Meaning |
|---|---|
| `NUXT_PUBLIC_APP_URL` | OneClickTask app; the site links to `/login`, `/register`, `/privacy` there |
| `NUXT_PUBLIC_API_BASE` | API for the template's auth scaffold (see below) |
| `NUXT_HOST`, `NUXT_PORT` | Dev server address |

`/` is prerendered, so `NUXT_PUBLIC_APP_URL` must be set when running `npm run build`.

## Known gaps

- The template's `/login` page calls `/api/auth/login` (Sanctum). The OneClickTask app
  uses Fortify and has no such endpoints yet, so that page does not work. The landing
  page's "Anmelden" button links to the app's own login instead.
- `npx nuxt typecheck` reports errors in `useApi.ts` and `stores/app.ts`. Both files
  are unchanged from the template.

## Structure

- `app/pages/index.vue` – order of the sections
- `app/content/landing.ts`, `app/content/market.ts` – copy and comparison data. Only verified claims:
  free (no paid plan in the code), hosted in the EU (confirmed), code public on GitHub. Say "Open Source"
  only once the repository has a LICENSE file. Competitor facts come from the vendors' own pages
  (checked 1 Nov 2026); recheck them regularly because comparative advertising must stay accurate.
- `app/components/HeroSection.vue` – dark hero with aurora light, the interactive board and the task ticker
- `app/components/BoardDemo.vue`, `DemoTaskRow.vue`, `BoardDetail.vue`, `app/composables/useDemoBoard.ts`
  – the interactive copy of the app. Search and create work like the app: text filters, `#tag` filters,
  `-#tag` hides, Enter creates. It types one task by itself on load.
- `app/components/TaskLifecycle.vue`, `DueLadder.vue`, `ActionRow.vue` – the four steps of a task
- `app/components/TeamSection.vue` – boards, roles, comments, files
- `app/components/MarketComparison.vue`, `PositionMap.vue`, `TeamCostChart.vue` – market section
- `app/components/AudienceFit.vue`, `DataSection.vue`, `ClosingSection.vue` – remaining sections
- Colours follow the OneClickTask app (`resources/css/app.css`, converted from OKLCH): near-black
  canvas, grey cards, primary buttons in the text colour, small muted accents from the app palette;
  the app's orange-500 marks Enter and hashtags. "Kobalt flach" stays available for comparison at
  `/?look=c` (see `app/composables/useLook.ts` and the tokens in `main.css`).
  The query switch only works with the dev server; the prerendered `/` is always A.
- Animations use CSS only (scroll-driven `animation-timeline` where supported) and stop with
  `prefers-reduced-motion`.
- `app/layouts/default.vue` – header, page, footer
- `app/components/` – `AppHeader`, `AppFooter`, `AppLogo`, `PageSection`, `FeatureList`,
  `FaqList`, `TaskDemo` (interactive demo in the hero), `GithubIcon`
