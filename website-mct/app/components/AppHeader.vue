<template>
  <header class="header">
    <div class="container header-bar">
      <NuxtLink to="/" class="header-logo" @click="menuOpen = false">
        <AppLogo />
      </NuxtLink>

      <nav class="header-nav" aria-label="Hauptnavigation">
        <a v-for="item in navigation" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <div class="header-actions">
        <a :href="`${appUrl}/login`" class="btn btn-ghost header-login">Anmelden</a>
        <a :href="`${appUrl}/register`" class="btn btn-solid">Kostenlos starten</a>
        <button
          type="button"
          class="btn btn-ghost header-toggle"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" class="icon" />
          <Menu v-else class="icon" />
        </button>
      </div>
    </div>

    <nav
      v-show="menuOpen"
      id="mobile-menu"
      class="container header-mobile"
      aria-label="Hauptnavigation mobil"
    >
      <a
        v-for="item in navigation"
        :key="item.href"
        :href="item.href"
        @click="menuOpen = false"
      >{{ item.label }}</a>
      <a :href="`${appUrl}/login`">Anmelden</a>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

const { appUrl } = useRuntimeConfig().public
const menuOpen = ref(false)

const navigation = [
  { label: 'Funktionen', href: '#funktionen' },
  { label: 'Für Teams', href: '#teams' },
  { label: 'Open Source', href: '#open-source' },
  { label: 'FAQ', href: '#faq' },
]
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--color-border);
  background: color-mix(in srgb, var(--color-bg) 80%, transparent);
  backdrop-filter: blur(8px);
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: var(--header-height);
}

.header-logo {
  margin-inline-start: -4px;
  padding: 4px;
  border-radius: 6px;
  text-decoration: none;
}

.header-nav {
  display: none;
  gap: 24px;
}

.header-nav a,
.header-mobile a {
  color: var(--color-muted);
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.header-nav a:hover,
.header-mobile a:hover {
  color: var(--color-highlighted);
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 6px;
}

.header-login {
  display: none;
}

.header-toggle {
  padding: 6px;
}

.header-mobile {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-block: 12px 16px;
}

.header-mobile a {
  padding-block: 8px;
  font-size: 1rem;
}

@media (min-width: 640px) {
  .header-login {
    display: inline-flex;
  }
}

@media (min-width: 1024px) {
  .header-nav {
    display: flex;
  }

  .header-toggle,
  .header-mobile {
    display: none !important;
  }
}
</style>
