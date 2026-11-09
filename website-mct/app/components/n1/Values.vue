<template>
  <section id="werte" class="section" aria-labelledby="n1-values-title">
    <div class="container">
      <N1SectionHead
        index="04"
        label="Werte"
        title="Was OneClickTask ausmacht."
        title-id="n1-values-title"
      />

      <ul class="values">
        <li v-for="(value, i) in values" :key="value.key" class="value" :data-reveal="String(i + 1)">
          <component :is="icons[value.key]" class="value-icon" aria-hidden="true" />
          <h3 class="value-title">{{ value.title }}</h3>
          <p class="value-text">{{ value.text }}</p>
          <a
            v-if="value.key === 'open'"
            :href="repositoryUrl"
            target="_blank"
            rel="noopener"
            class="value-link"
          >Zum Quellcode<ArrowUpRight aria-hidden="true" /></a>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Component } from 'vue'
import { ArrowUpRight, Code, MousePointerClick, Server, ShieldCheck, Zap } from '@lucide/vue'
import { values } from '~/content/varianten'

const { repositoryUrl } = useRuntimeConfig().public

const icons: Record<string, Component> = {
  fast: Zap,
  simple: MousePointerClick,
  reliable: ShieldCheck,
  open: Code,
  yours: Server,
}
</script>

<style scoped>
.section {
  padding-block: 72px;
}

.values {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 48px;
  padding: 0;
  list-style: none;
}

.value {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  column-gap: 16px;
  row-gap: 6px;
  align-content: start;
  padding-block: 24px;
  border-top: 1px solid var(--line);
}

.value-icon {
  grid-row: span 3;
  width: 22px;
  height: 22px;
  margin-top: 3px;
  color: var(--primary);
  stroke-width: 1.75;
}

.value-title {
  color: var(--ink);
  font-size: 1.1875rem;
  font-weight: 600;
  letter-spacing: -0.012em;
}

.value-text {
  color: var(--muted);
  font-size: 1rem;
}

.value-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  justify-self: start;
  margin-top: 6px;
  color: var(--ink);
  font-size: 0.9375rem;
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  transition: text-decoration-color 0.15s, color 0.15s;
}

.value-link:hover {
  color: var(--accent-ink);
  text-decoration-color: currentColor;
}

.value-link svg {
  width: 15px;
  height: 15px;
}

@media (min-width: 640px) {
  .values {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 32px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: 120px;
  }

  .values {
    grid-template-columns: repeat(5, minmax(0, 1fr));
    column-gap: 0;
    margin-top: 72px;
    border-top: 1px solid var(--line);
  }

  .value {
    grid-template-columns: minmax(0, 1fr);
    row-gap: 10px;
    padding: 28px 28px 8px;
    border-top: 0;
    border-left: 1px solid var(--line);
  }

  .value:first-child {
    padding-left: 0;
    border-left: 0;
  }

  .value:last-child {
    padding-right: 0;
  }

  .value-icon {
    grid-row: auto;
    margin: 0 0 18px;
  }
}
</style>
