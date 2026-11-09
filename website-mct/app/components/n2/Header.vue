<template>
  <header class="head" :class="{ 'head-scrolled': scrolled || open }">
    <div class="n2-wrap head-bar">
      <a href="#n2-top" class="head-logo" aria-label="OneClickTask, zum Seitenanfang" @click="open = false">
        <AppLogo />
      </a>

      <nav class="head-nav" aria-label="Hauptnavigation">
        <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>

      <div class="head-actions">
        <a :href="`${appUrl}/login`" class="btn head-login">Anmelden</a>
        <a :href="`${appUrl}/register`" class="btn btn-primary head-cta">Kostenlos starten</a>
        <button
          type="button"
          class="btn head-toggle"
          :aria-expanded="open"
          aria-controls="n2-mobile-menu"
          :aria-label="open ? 'Menü schließen' : 'Menü öffnen'"
          @click="open = !open"
        >
          <X v-if="open" aria-hidden="true" />
          <Menu v-else aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav
      v-show="open"
      id="n2-mobile-menu"
      class="head-mobile"
      aria-label="Hauptnavigation mobil"
    >
      <div class="n2-wrap head-mobile-inner">
        <a v-for="item in nav" :key="item.href" :href="item.href" @click="open = false">
          <span>{{ item.label }}</span>
          <ArrowRight aria-hidden="true" />
        </a>
        <div class="head-mobile-actions">
          <a :href="`${appUrl}/login`" class="btn btn-quiet">Anmelden</a>
          <a :href="`${appUrl}/register`" class="btn btn-primary">Kostenlos starten</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ArrowRight, Menu, X } from '@lucide/vue'

const { appUrl } = useRuntimeConfig().public

const nav = [
  { label: 'So funktioniert’s', href: '#so-gehts' },
  { label: 'Werte', href: '#werte' },
  { label: 'Team', href: '#team' },
  { label: 'FAQ', href: '#faq' },
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
  border-bottom: 1px solid transparent;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(1.4) blur(12px);
  transition: border-color 0.2s, background-color 0.2s;
}

.head-scrolled {
  border-bottom-color: var(--line);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
}

.head-bar {
  display: flex;
  align-items: center;
  gap: 24px;
  height: var(--header-h);
}

.head-logo {
  display: inline-flex;
  border-radius: 6px;
  text-decoration: none;
}

.head-logo :deep(.logo) {
  font-size: 0.9875rem;
  letter-spacing: -0.015em;
}

.head-logo :deep(.logo-mark) {
  width: 22px;
  height: 22px;
}

.head-nav {
  display: none;
  gap: 4px;
  margin-left: 12px;
}

.head-nav a {
  padding: 6px 10px;
  border-radius: 6px;
  color: var(--muted);
  font-size: 0.875rem;
  text-decoration: none;
  transition: color 0.15s, background-color 0.15s;
}

.head-nav a:hover {
  background: var(--card);
  color: var(--ink);
}

.head-actions {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.head-actions .btn {
  min-height: 36px;
  padding: 6px 12px;
  font-size: 0.875rem;
}

.head-login {
  display: none;
  color: var(--muted);
}

.head-login:hover {
  color: var(--ink);
}

.head-cta {
  display: none;
}

.head-toggle {
  width: 40px;
  padding: 0;
  color: var(--ink);
}

.head-toggle:hover {
  background: var(--card);
}

.head-mobile {
  border-top: 1px solid var(--line);
  background: var(--bg);
}

.head-mobile-inner {
  display: grid;
  padding-block: 8px 20px;
}

.head-mobile-inner > a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 2px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 1.0625rem;
  font-weight: 500;
  text-decoration: none;
}

.head-mobile-inner > a svg {
  width: 18px;
  height: 18px;
  color: var(--muted);
}

.head-mobile-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 16px;
}

.head-mobile-actions .btn {
  min-height: 46px;
}

@media (min-width: 560px) {
  .head-cta {
    display: inline-flex;
  }
}

@media (min-width: 900px) {
  .head-nav,
  .head-login {
    display: flex;
  }

  .head-toggle,
  .head-mobile {
    display: none !important;
  }
}
</style>
