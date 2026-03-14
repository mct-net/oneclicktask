# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a task management application built with Laravel 12 + Vue 3 + Inertia.js. It uses a board-based multi-tenancy model where users can create/join boards and manage tasks within them. The frontend uses TypeScript, Tailwind CSS v4, and reka-ui (headless components with shadcn-vue conventions).

**Tech Stack:**

- Backend: Laravel 12, PHP 8.2+, Fortify (auth), Pest (testing)
- Frontend: Vue 3.5, TypeScript 5.2, Inertia.js, Vite 7
- UI: Tailwind CSS 4.1, reka-ui, Lucide icons
- Package Manager: PNPM

## Development Commands

### Initial Setup

```bash
composer setup  # Full setup: install deps, copy .env, generate key, migrate, build assets
```

### Development

```bash
composer dev     # Run all services: Laravel serve + queue + pail (logs) + Vite
composer dev:ssr # Same but with Inertia SSR instead of Vite dev server
pnpm dev         # Just Vite dev server (if running Laravel separately)
```

### Testing

```bash
composer test          # Run all Pest tests (config clears first)
php artisan test       # Alternative: run tests directly
php artisan test --filter=DashboardTest  # Run specific test
./vendor/bin/pest tests/Feature/DashboardTest.php  # Run specific file
```

### Code Quality

```bash
./vendor/bin/pint      # Format PHP code (Laravel Pint)
pnpm format            # Format frontend code (Prettier)
pnpm format:check      # Check formatting without fixing
pnpm lint              # Run ESLint with auto-fix
```

### Building

```bash
pnpm build             # Production build (CSR)
pnpm build:ssr         # Production build with SSR support
```

### Database

```bash
php artisan migrate                    # Run migrations
php artisan migrate:fresh --seed       # Fresh DB with seeders
php artisan db:seed --class=TaskSeeder # Run specific seeder
```

### Artisan Commands

```bash
php artisan route:list          # List all routes
php artisan tinker              # Interactive REPL
php artisan queue:listen        # Run queue worker
php artisan pail                # Tail logs in real-time
```

## Architecture

### Backend Structure

**App Organization:**

- `app/Models/` - Eloquent models with extensive relationships
    - Core models: User, Board, Task, Comment, Tag, FileAttachment
    - Board-user pivot with roles (admin, member)
- `app/Http/Controllers/` - Resource controllers organized by domain
    - Main: BoardController, TaskController, CommentController, etc.
    - `Settings/` subdirectory for settings-specific controllers
- `app/Http/Middleware/` - Custom middleware
    - `HandleInertiaRequests` - Shares global data (app name, auth user, sidebar state, inspiring quotes)
    - `EnsureBoardMember` - Authorization middleware for board access
    - `HandleAppearance` - Theme (light/dark) management
- `app/Actions/Fortify/` - Fortify authentication actions

**Routing:**

- `routes/web.php` - Main routes with nested resources under `board.member` middleware
- `routes/settings.php` - Settings routes
- Board routes use nested resource pattern: `boards.tasks.comments.*`

**Key Patterns:**

- Board-based multi-tenancy with owner/member roles
- Pivot table `board_user` stores role (admin/member)
- `EnsureBoardMember` middleware protects board-specific routes
- Fortify handles all authentication (login, register, 2FA, password reset)

### Frontend Structure

**Inertia.js Integration:**

- Pages auto-discovered from `resources/js/pages/**/*.vue`
- SSR support via `resources/js/ssr.ts`
- Global shared data includes: app name, auth user, sidebar state, inspiring quotes

**Component Organization:**

- `resources/js/components/core/ui/` - 20+ shadcn-vue style UI primitives (reka-ui based)
- `resources/js/components/core/` - App-specific components
- `resources/js/layouts/` - Layout components (App, Auth, Settings) with variants
- `resources/js/pages/` - Inertia page components
- `resources/js/routes/` - Additional organization mirroring backend routes

**TypeScript:**

- Types in `resources/js/types/`
- Path alias: `@/*` → `resources/js/*`
- Strict mode enabled
- Wayfinder generates type-safe route helpers

**Composables:**

- `useAppearance` - Theme management (light/dark)
- `useTwoFactorAuth` - 2FA logic
- `useInitials` - User initials helper

**Wayfinder:**

- Laravel package that generates type-safe route helpers for Vue
- Routes available in `resources/js/actions/` (auto-generated)
- Form variants enabled (`formVariants: true` in vite.config.ts)
- Import with: `import { route } from '@/actions/App/Http/Controllers/...'`

### Testing

**Pest PHP:**

- Configuration: `tests/Pest.php`
- Feature tests use `RefreshDatabase`
- Test database: SQLite in-memory (`:memory:`)
- Custom expectation: `toBeOne()`
- Comprehensive auth and settings test coverage

## Important Conventions

### Component Naming

- All components use `laravel/` prefix for namespace organization
- UI components follow shadcn-vue conventions (e.g., `Button`, `Card`, `Dialog`)
- reka-ui primitives are wrapped with custom styling

### Routing Between Frontend and Backend

- Use Wayfinder route helpers instead of string routes
- Example: `route('boards.show', { board: board.id })` instead of `/boards/${board.id}`
- Form variants provide `action` and `method` props for forms

### Middleware

- Board-specific routes should use `board.member` middleware group
- This applies `EnsureBoardMember` middleware for authorization
- `HandleInertiaRequests` runs on all Inertia requests

### Shared Inertia Data

- `auth.user` - Current authenticated user
- `appName` - Application name
- `inspiringQuote` - Random quote displayed on pages
- `sidebar.isOpen` - Sidebar state (persisted via cookie)

### Theme Management

- Theme stored in cookie via `HandleAppearance` middleware
- Use `useAppearance` composable to access/update theme
- Supports: light, dark, system

### Code Quality

- Husky runs pre-commit hooks (lint-staged)
- Commit messages must follow conventional commits format
- ESLint/Stylelint/Prettier run on staged files

## Configuration Files

- `vite.config.ts` - Vite with Laravel, Tailwind, Wayfinder, Vue plugins
- `tsconfig.json` - TypeScript with path aliases
- `eslint.config.js` - Flat config format (modern ESLint 9)
- `components.json` - shadcn-vue configuration for UI components
- `.prettierrc` - Prettier with Tailwind plugin (4-space tabs)
- `phpunit.xml` - PHPUnit/Pest configuration
- `composer.json` - Includes custom scripts for dev workflow

## Database

**Default:** SQLite (single `database/database.sqlite` file)

- Development uses file-based SQLite
- Testing uses in-memory SQLite
- Production can use MySQL/PostgreSQL (configure in `.env`)

**Seeders:**

- `TaskSeeder` generates quirky demo data for development

## CI/CD

**GitHub Actions:**

- `.github/workflows/tests.yml` - Runs Pest tests on push/PR
- `.github/workflows/lint.yml` - Code quality checks
- Uses PNPM with Node 22 and PHP 8.4

## Key Files

- `app/Http/Middleware/HandleInertiaRequests.php:26-48` - Global Inertia shared data
- `resources/js/app.ts:11-17` - Inertia app initialization with page resolution
- `resources/js/wayfinder/index.ts` - Route helper utilities
- `resources/js/lib/utils.ts` - cn() utility (clsx + tailwind-merge)
- `routes/web.php:30-52` - Board resource routes with nested resources
