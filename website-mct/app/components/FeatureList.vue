<template>
  <ul class="features" :class="[`features-${variant}`, { 'features-four': columns === 4 }]">
    <li v-for="item in items" :key="item.title" class="feature">
      <component :is="item.icon" class="icon feature-icon" />
      <h3 class="feature-title">{{ item.title }}</h3>
      <p class="feature-description">{{ item.description }}</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { Component } from 'vue'

export type Feature = {
  icon: Component
  title: string
  description: string
}

withDefaults(defineProps<{
  items: Feature[]
  variant?: 'plain' | 'card'
  columns?: 2 | 4
}>(), {
  variant: 'plain',
  columns: 2,
})
</script>

<style scoped>
.features {
  display: grid;
  gap: 32px;
  padding: 0;
  list-style: none;
}

.features-card {
  gap: 24px;
}

.features-card .feature {
  padding: 24px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--color-border);
  background: var(--color-bg);
}

.feature-icon {
  margin-bottom: 10px;
  color: var(--color-primary);
}

.feature-title {
  color: var(--color-highlighted);
  font-size: 1rem;
  font-weight: 600;
}

.feature-description {
  margin-top: 4px;
  color: var(--color-muted);
  font-size: 0.9375rem;
}

@media (min-width: 640px) {
  .features {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .features-card .feature {
    padding: 32px;
  }
}

@media (min-width: 1024px) {
  .features-four {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
