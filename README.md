# OCT - One Click Task

A modern, board-based task management application built with Laravel 12, Vue 3, and Inertia.js. OCT provides an intuitive interface for teams to collaborate on tasks with support for comments, tags, file attachments, and more.

## 📙 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Testing](#testing)
- [Code Quality](#code-quality)
- [Building for Production](#building-for-production)
- [Contributing](#contributing)

## 📙 Features

- **Board-based Multi-tenancy**: Create and join multiple boards with role-based access (admin/member)
- **Task Management**: Create, update, and organize tasks within boards
- **Collaboration**: Comments, file attachments, and tags for enhanced teamwork

## 📙 Tech Stack

### Backend

- **Laravel 12** - PHP framework
- **PHP 8.2+** - Required PHP version
- **Laravel Fortify** - Authentication
- **Pest** - Testing framework
- **SQLite** - Default database (MySQL/PostgreSQL supported)

### Frontend

- **Vue 3.5** - Progressive JavaScript framework
- **TypeScript 5.2** - Static type checking
- **Inertia.js** - Modern monolith approach
- **Vite 7** - Fast build tool
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **reka-ui** - Headless UI components
- **Lucide Icons** - Beautiful icon set

### Package Manager

- **PNPM** - Fast, disk space efficient package manager

## 📙 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP 8.2 or higher**

    ```bash
    php -v
    ```

- **Composer 2.x**

    ```bash
    composer --version
    ```

- **Node.js 22.x**

    ```bash
    node -v
    ```

- **PNPM 9.x**

    ```bash
    pnpm -v
    # If not installed:
    npm install -g pnpm
    ```

- **SQLite 3** (or MySQL/PostgreSQL if preferred)
    ```bash
    sqlite3 --version
    ```

## 📙 Installation

### Quick Setup

The fastest way to get started:

```bash
composer setup
```

This command will:

1. Install PHP dependencies
2. Copy `.env.example` to `.env`
3. Generate application key
4. Run database migrations
5. Install Node dependencies
6. Build frontend assets

### Manual Setup

If you prefer to run steps individually:

1. **Clone the repository**

    ```bash
    git clone https://github.com/mct-net/oneclicktask.git
    cd oneclicktask
    ```

2. **Install PHP dependencies**

    ```bash
    composer install
    ```

3. **Install Node dependencies**

    ```bash
    pnpm install
    ```

4. **Environment configuration**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Database setup**

    For SQLite (default):

    ```bash
    touch database/database.sqlite
    php artisan migrate
    ```

    For MySQL/PostgreSQL, update your `.env` file:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=oct
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    Then run migrations:

    ```bash
    php artisan migrate
    ```

6. **Seed database with example tasks (optional)**

    ```bash
    php artisan db:seed --class=TaskSeeder
    ```

7. **Build frontend assets**
    ```bash
    pnpm build
    ```

## 📙 Development

### Running the Development Server

Start all development services (recommended):

```bash
composer dev
```

This runs:

- Laravel development server (http://localhost:8000)
- Queue worker
- Log viewer (Pail)
- Vite dev server with HMR

### Individual Services

Run services separately if needed:

**Backend only:**

```bash
php artisan serve
```

**Frontend only:**

```bash
pnpm dev
```

**Queue worker:**

```bash
php artisan queue:listen
```

**Log viewer:**

```bash
php artisan pail
```

### SSR Development

For server-side rendering:

```bash
composer dev:ssr
```

## 📙 Testing

### Run All Tests

```bash
composer test
# or
php artisan test
```

### Run Specific Tests

**Specific test file:**

```bash
php artisan test --filter=DashboardTest
# or
./vendor/bin/pest tests/Feature/DashboardTest.php
```

**Specific test method:**

```bash
php artisan test --filter=test_user_can_create_board
```

### Test Configuration

- Tests use SQLite in-memory database (`:memory:`)
- Database is automatically refreshed before each test
- Configuration: `tests/Pest.php`

## 📙 Code Quality

### Formatting

**Format PHP code:**

```bash
./vendor/bin/pint
```

**Format frontend code:**

```bash
pnpm format
```

**Check formatting without fixing:**

```bash
pnpm format:check
```

### Linting

**Lint JavaScript/TypeScript/Vue:**

```bash
pnpm lint
```

**Lint styles (CSS/SCSS/Vue):**

```bash
pnpm lint:styles
```

### Pre-commit Hooks

The project uses Husky and lint-staged to automatically format and lint code before commits:

- ESLint runs on `*.{js,ts,vue}` files
- Stylelint runs on `*.{css,scss,sass,html,vue}` files
- Prettier checks all files

Commit messages must follow [Conventional Commits](https://www.conventionalcommits.org/) format.

### CI/CD

All code quality checks run automatically on push and pull requests:

- PHP formatting (Pint)
- Frontend formatting (Prettier)
- ESLint
- Stylelint
- Tests (Pest)

## 📙 Building for Production

### Client-Side Rendering (CSR)

```bash
pnpm build
```

### Server-Side Rendering (SSR)

```bash
pnpm build:ssr
```

This creates both client and SSR bundles.

## 📙 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Pull request process
- Coding standards
- Testing requirements

## 📙 Support

If you encounter any issues or have questions:

1. Check existing [GitHub Issues](https://github.com/mct-net/oneclicktask/issues)
2. Create a new issue with detailed description
3. Join our community discussions

---

Built with ❤️ using Laravel and Vue
