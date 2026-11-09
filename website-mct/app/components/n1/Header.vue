<template>
  <header class="header" :class="{ 'header-open': menuOpen }">
    <div class="container header-bar">
      <a href="#top" class="header-logo" aria-label="OneClickTask, zum Seitenanfang" @click="menuOpen = false">
        <AppLogo />
      </a>

      <nav class="header-nav" aria-label="Hauptnavigation">
        <a
          v-for="item in navigation"
          :key="item.id"
          :href="`#${item.id}`"
          :aria-current="active === item.id ? 'true' : undefined"
        >{{ item.label }}</a>
      </nav>

      <div class="header-actions">
        <a :href="`${appUrl}/login`" class="n1-btn n1-btn-sm n1-btn-ghost header-login">Anmelden</a>
        <a :href="`${appUrl}/register`" class="n1-btn n1-btn-sm n1-btn-primary header-cta">Kostenlos starten</a>
        <button
          type="button"
          class="header-toggle"
          :aria-expanded="menuOpen"
          aria-controls="n1-menu"
          :aria-label="menuOpen ? 'Menü schließen' : 'Menü öffnen'"
          @click="menuOpen = !menuOpen"
        >
          <X v-if="menuOpen" aria-hidden="true" />
          <Menu v-else aria-hidden="true" />
        </button>
      </div>
    </div>

    <nav v-show="menuOpen" id="n1-menu" class="header-menu" aria-label="Hauptnavigation mobil">
      <div class="container header-menu-inner">
        <a
          v-for="item in navigation"
          :key="item.id"
          :href="`#${item.id}`"
          class="header-menu-link"
          @click="menuOpen = false"
        >{{ item.label }}<ArrowRight aria-hidden="true" /></a>
        <div class="header-menu-actions">
          <a :href="`${appUrl}/login`" class="n1-btn n1-btn-quiet">Anmelden</a>
          <a :href="`${appUrl}/register`" class="n1-btn n1-btn-primary">Kostenlos starten</a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ArrowRight, Menu, X } from '@lucide/vue'

defineProps<{ active: string }>()

const { appUrl } = useRuntimeConfig().public
const menuOpen = ref(false)

const navigation = [
  { id: 'moment', label: 'Warum' },
  { id: 'so-gehts', label: 'So geht’s' },
  { id: 'werte', label: 'Werte' },
  { id: 'team', label: 'Team' },
  { id: 'fragen', label: 'Fragen' },
]

function onKey(event: KeyboardEvent) {
  if (event.key === 'Escape') menuOpen.value = false
}

onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  border-bottom: 1px solid var(--line);
  background: color-mix(in srgb, var(--paper) 86%, transparent);
  backdrop-filter: saturate(1.4) blur(12px);
}

.header-open {
  background: var(--paper);
}

.header-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  height: var(--header-height);
}

.header-logo {
  margin-inline-start: -6px;
  padding: 6px;
  border-radius: 8px;
  text-decoration: none;
}

.header-nav {
  display: none;
  gap: 2px;
}

.header-nav a {
  position: relative;
  padding: 8px 12px;
  border-radius: 8px;
  color: var(--muted);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s, background-color 0.15s;
}

.header-nav a:hover {
  color: var(--ink);
  background: var(--sunken);
}

/* Aktiver Abschnitt: feiner Strich in Signalfarbe */
.header-nav a::after {
  content: '';
  position: absolute;
  right: 12px;
  bottom: 2px;
  left: 12px;
  height: 2px;
  border-radius: 2px;
  background: var(--primary);
  transform: scaleX(0);
  transition: transform 0.3s var(--n1-ease);
}

.header-nav a[aria-current='true'] {
  color: var(--ink);
}

.header-nav a[aria-current='true']::after {
  transform: scaleX(1);
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
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-inline-end: -8px;
  border: 0;
  border-radius: 8px;
  background: none;
  color: var(--ink);
  cursor: pointer;
}

.header-toggle:hover {
  background: var(--sunken);
}

.header-toggle svg {
  width: 20px;
  height: 20px;
}

.header-menu {
  border-top: 1px solid var(--line);
}

.header-menu-inner {
  display: grid;
  padding-block: 8px 20px;
}

.header-menu-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-block: 14px;
  border-bottom: 1px solid var(--line);
  color: var(--ink);
  font-size: 1.125rem;
  font-weight: 500;
  text-decoration: none;
}

.header-menu-link svg {
  width: 18px;
  height: 18px;
  color: var(--muted);
}

.header-menu-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

@media (max-width: 374px) {
  .header-cta {
    display: none;
  }
}

@media (min-width: 640px) {
  .header-login {
    display: inline-flex;
  }
}

@media (min-width: 960px) {
  .header-nav {
    display: flex;
  }

  .header-toggle,
  .header-menu {
    display: none !important;
  }
}
</style>
