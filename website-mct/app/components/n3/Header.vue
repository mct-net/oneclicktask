<template>
  <header class="head" :class="{ 'head-scrolled': scrolled, 'head-open': open }">
    <div class="container head-inner">
      <a href="#inhalt" class="head-logo" aria-label="OneClickTask, zum Seitenanfang" @click="open = false">
        <AppLogo />
      </a>

      <nav class="head-nav" aria-label="Abschnitte">
        <a v-for="link in links" :key="link.href" :href="link.href">{{ link.label }}</a>
      </nav>

      <div class="head-actions">
        <a :href="`${appUrl}/login`" class="btn btn-ghost head-login">Anmelden</a>
        <a :href="`${appUrl}/register`" class="btn btn-primary head-cta">Kostenlos starten</a>
        <button
          type="button"
          class="head-toggle"
          :aria-expanded="open"
          aria-controls="n3-menu"
          :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
          @click="open = !open"
        >
          <X v-if="open" aria-hidden="true" />
          <Menu v-else aria-hidden="true" />
        </button>
      </div>
    </div>

    <div v-show="open" id="n3-menu" class="head-menu">
      <nav class="container" aria-label="Abschnitte">
        <a v-for="link in links" :key="link.href" :href="link.href" @click="open = false">{{ link.label }}</a>
        <div class="head-menu-actions">
          <a :href="`${appUrl}/login`" class="btn btn-quiet btn-lg">Anmelden</a>
          <a :href="`${appUrl}/register`" class="btn btn-primary btn-lg">Kostenlos starten</a>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, X } from '@lucide/vue'

const { appUrl } = useRuntimeConfig().public

const links = [
  { href: '#so-gehts', label: 'So funktioniert’s' },
  { href: '#werte', label: 'Werte' },
  { href: '#team', label: 'Im Team' },
  { href: '#faq', label: 'Fragen' },
]

const open = ref(false)
const scrolled = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') open.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.head {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--paper) 82%, transparent);
  backdrop-filter: blur(12px) saturate(1.2);
  transition: box-shadow 0.2s;
}

.head-scrolled,
.head-open {
  box-shadow: 0 1px 0 var(--line);
}

.head-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--header-height);
}

.head-logo {
  display: inline-flex;
  border-radius: 6px;
  text-decoration: none;
}

.head-logo :deep(.logo-text) {
  font-size: 1.0625rem;
  letter-spacing: -0.01em;
}

.head-logo :deep(.logo-mark) {
  color: var(--accent);
}

.head-nav {
  display: none;
  gap: 4px;
  margin-left: 12px;
}

.head-nav a {
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s, background-color 0.15s;
}

.head-nav a:hover {
  background: var(--sunken);
  color: var(--ink);
}

.head-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.head-login,
.head-cta {
  display: none;
}

.head-toggle {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
  cursor: pointer;
}

.head-toggle svg {
  width: 20px;
  height: 20px;
}

.head-menu {
  padding-block: 8px 24px;
  border-top: 1px solid var(--line);
}

.head-menu nav {
  display: grid;
}

.head-menu nav > a {
  padding-block: 14px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
}

.head-menu-actions {
  display: grid;
  gap: 10px;
  margin-top: 20px;
}

@media (min-width: 560px) {
  .head-cta {
    display: inline-flex;
  }
}

@media (min-width: 960px) {
  .head-nav,
  .head-login {
    display: flex;
  }

  .head-toggle,
  .head-menu {
    display: none !important;
  }
}
</style>
