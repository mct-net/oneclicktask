# Contributing to OCT

Thank you for your interest in contributing to OCT! This document provides guidelines and instructions for contributing to the project.

## 📙 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Workflow](#-development-workflow)
- [Coding Standards](#-coding-standards)
- [Pull Request Process](#-pull-request-process)

## 📙 Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in your interactions.

### Our Standards

- Use welcoming and inclusive language
- Be respectful of differing viewpoints and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community
- Show empathy towards other community members

## 📙 Getting Started

### Prerequisites

Before contributing, ensure you have the required software installed:

- PHP 8.2 or higher
- Composer 2.x
- Node.js 22.x
- PNPM 9.x
- SQLite 3 (or MySQL/PostgreSQL)

### Setting Up Your Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork:**

    ```bash
    git clone https://github.com/YOUR_USERNAME/oneclicktask.git
    cd oneclicktask
    ```

3. **Add upstream remote:**

    ```bash
    git remote add upstream https://github.com/ORIGINAL_OWNER/oneclicktask.git
    ```

4. **Run the setup script:**

    ```bash
    composer setup
    ```

5. **Start development server:**

    ```bash
    composer dev
    ```

6. **Verify installation** by visiting http://localhost:8000

## 📙 Development Workflow

### Branch Naming Convention

Create a branch from `dev` using this naming pattern:

- `feat/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates
- `chore/description` - Maintenance tasks

Example:

```bash
git checkout dev
git pull upstream dev
git checkout -b feature/add-task-filtering
```

### Making Changes

1. **Create a branch** for your changes

2. **Make your changes** following our [coding standards](#coding-standards)

3. **Write/update tests** for your changes

4. **Run tests locally:**

    ```bash
    composer test
    ```

5. **Check code quality:**

    ```bash
    ./vendor/bin/pint      # Format PHP
    pnpm format            # Format frontend
    pnpm lint              # Lint JavaScript/TypeScript/Vue
    pnpm lint:styles       # Lint styles
    ```

6. **Commit your changes** using [conventional commits](#commit-message-guidelines)

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout dev
git merge upstream/dev
git push origin dev
```

## 📙 Coding Standards

### PHP (Backend)

#### Style Guide

- Use Laravel Pint for automatic formatting
- Run before committing: `./vendor/bin/pint`

#### Best Practices

- **Type Hints**: Always use type hints for method parameters and return types

    ```php
    public function createTask(Board $board, array $data): Task
    {
        // ...
    }
    ```

- **Naming Conventions**:
    - Classes: `PascalCase`
    - Methods: `camelCase`
    - Variables: `camelCase`
    - Constants: `SCREAMING_SNAKE_CASE`

- **Eloquent Models**:
    - Use relationships instead of manual queries
    - Define `$fillable` or `$guarded` properties
    - Use model events when appropriate

- **Controllers**:
    - Keep controllers thin, business logic in services/actions
    - Use resource controllers when possible
    - Return Inertia responses for page views

- **Security**:
    - Always validate user input
    - Use Laravel's built-in CSRF protection
    - Sanitize output to prevent XSS
    - Use parameter binding for SQL queries (Eloquent handles this)

### JavaScript/TypeScript (Frontend)

#### Best Practices

- **TypeScript**: Use strict typing, avoid `any`

    ```typescript
    type Task {
        id: number;
        title: string;
        description: string | null;
    }

    function updateTask(task: Task): void {
        // ...
    }
    ```

- **Vue Components**:
    - Use `<script setup lang="ts">` syntax
    - Define props with TypeScript interfaces
    - Use composition API (not options API)
    - Keep components focused and small

- **Component Organization**:

    ```vue
    <script setup lang="ts">
    // 1. Imports
    import { ref } from 'vue';
    import { useForm } from '@/composables/useForm';

    // 2. Props & Emits
    const props = defineProps<{
        title: string;
    }>();

    // 3. Composables
    const form = useForm();

    // 4. State
    const isOpen = ref(false);

    // 5. Computed
    // 6. Methods
    // 7. Lifecycle hooks
    </script>

    <template>
        <!-- Template -->
    </template>
    ```

- **Naming Conventions**:
    - Components: `PascalCase` (e.g., `TaskCard.vue`)
    - Composables: `camelCase` starting with `use` (e.g., `useTaskManager.ts`)
    - Files: Match component name
    - Props: `camelCase` in script, `kebab-case` in template

- **Routing**:
    - Use Wayfinder route helpers instead of strings

    ```typescript
    // Good
    import { route } from '@/actions/App/Http/Controllers/TaskController';
    router.visit(route('tasks.show', { task: task.id }));

    // Bad
    router.visit(`/tasks/${task.id}`);
    ```

## 📙 Testing Requirements

### Writing Tests

All new features and bug fixes must include tests.

### Test Guidelines

- **Arrange-Act-Assert**: Structure tests clearly
- **Descriptive Names**: Use descriptive test names
- **One Assertion Focus**: Test one thing per test
- **Database**: Use factories instead of manual creation
- **Clean Up**: Tests automatically refresh database

## 📙 Pull Request Process

### Creating a Pull Request

1. **Push your branch** to your fork:

    ```bash
    git push origin feature/your-feature-name
    ```

2. **Create a pull request** on GitHub against the `dev` branch

3. **Fill out the PR template** with:
    - Clear description of changes
    - Related Jira ticket or Github issue link (if applicable)
    - Testing instructions

4. **Request review** from maintainers

### PR Title Format

Use conventional commits format:

```
FEAT: Add task filtering by tags
FIX: Resolve board permission issue
DOCS: Update installation instructions
REFACTOR: Simplify task creation logic
TEST: Add tests for comment functionality
```

### Review Process

- Maintainers will review your PR
- Address feedback by pushing new commits
- Once approved, a maintainer will merge your PR
- Your branch will be deleted after merge

## 📙 Commit Message Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commitlint

Commits are automatically validated using [commitlint](https://commitlint.js.org/). Invalid commit messages will be rejected.

### Database

**Default**: SQLite (file-based for development, in-memory for tests)

**Key Models:**

- `User` - Application users
- `Board` - Task boards (multi-tenancy unit)
- `Task` - Tasks within boards
- `Comment` - Task comments
- `Tag` - Task categorization
- `FileAttachment` - File uploads

## 📙 Questions?

If you have questions not covered here:

1. Check existing [GitHub Issues](https://github.com/ORIGINAL_OWNER/oneclicktask/issues)
2. Review [README.md](README.md) for general information
3. Create a new issue with the `question` label

Thank you for contributing to OneClickTask! 🎉
