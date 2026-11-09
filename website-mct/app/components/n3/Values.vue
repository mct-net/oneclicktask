<template>
  <section id="werte" class="values n3-section" aria-labelledby="values-title">
    <div class="container values-inner">
      <div class="values-head">
        <p class="n3-label" data-reveal>Werte</p>
        <h2 id="values-title" class="n3-h2" data-reveal="1">Was OneClickTask ausmacht.</h2>
      </div>

      <ul class="values-list">
        <li v-for="(value, i) in values" :key="value.key" class="values-item" :data-reveal="(i % 3) + 1">
          <span class="values-icon" aria-hidden="true"><component :is="icons[value.key]" /></span>
          <div>
            <h3 class="values-title">{{ value.title }}</h3>
            <p class="values-text">{{ value.text }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CodeXml, Feather, Server, ShieldCheck, Zap } from '@lucide/vue'
import type { Component } from 'vue'
import { values } from '~/content/varianten'

const icons: Record<string, Component> = {
  fast: Zap,
  simple: Feather,
  reliable: ShieldCheck,
  open: CodeXml,
  yours: Server,
}
</script>

<style scoped>
.values-inner {
  display: grid;
  gap: 40px;
}

.values-head {
  display: grid;
  align-content: start;
  gap: 16px;
}

.values-list {
  display: grid;
  padding: 0;
  list-style: none;
  border-top: 1px solid var(--line);
}

.values-item {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 18px;
  padding-block: 24px;
  border-bottom: 1px solid var(--line);
}

.values-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--card);
  box-shadow: var(--card-shadow);
  color: var(--accent-ink);
}

.values-icon svg {
  width: 19px;
  height: 19px;
}

.values-title {
  font-size: 1.1875rem;
  font-weight: 600;
  line-height: 1.35;
}

.values-text {
  margin-top: 4px;
  color: var(--muted);
}

@media (min-width: 960px) {
  .values-inner {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 64px;
  }

  .values-head {
    position: sticky;
    top: calc(var(--header-height) + 40px);
    align-self: start;
  }

  .values-item {
    grid-template-columns: 40px minmax(0, 0.7fr) minmax(0, 1.3fr);
    align-items: start;
    padding-block: 28px;
  }

  .values-item > div {
    display: contents;
  }

  .values-title {
    padding-top: 6px;
  }

  .values-text {
    margin-top: 0;
    padding-top: 6px;
  }
}
</style>
