# OneClickTask Website

Public marketing site for OneClickTask (German copy). Built from the
[Nuxt UI starter template](https://github.com/nuxt-ui-templates/starter)
(Nuxt 4, Nuxt UI 4, Tailwind CSS 4) and independent of the Laravel app in the
repository root: it has its own `package.json`, lockfile and pnpm workspace.

## Setup

```bash
cd website
pnpm install
cp .env.example .env   # set NUXT_PUBLIC_APP_URL to the app's URL
pnpm dev               # http://localhost:3000
```

`NUXT_PUBLIC_APP_URL` is the base URL of the OneClickTask app. The start page is
prerendered, so the value must be set when running `pnpm build`. The site links
to `/login`, `/register` and `/privacy` there.

## Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

The same lint and typecheck steps run in `.github/workflows/website.yml`.

## Structure

- `app/app.vue` – header, footer, SEO meta
- `app/pages/index.vue` – landing page sections and their copy
- `app/components/TaskDemo.vue` – interactive find-or-create demo in the hero
- `app/components/AppLogo.vue` – logo
