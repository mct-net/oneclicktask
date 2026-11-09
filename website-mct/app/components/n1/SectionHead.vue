<template>
  <header class="head" :class="{ 'head-center': center }">
    <p class="n1-label head-label" data-reveal>
      <span class="n1-label-index">{{ index }}</span>
      <span>{{ label }}</span>
    </p>
    <div class="head-main">
      <h2 :id="titleId" class="head-title" data-reveal="1">{{ title }}</h2>
      <p v-if="text" class="head-text" data-reveal="2">{{ text }}</p>
      <slot />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  index: string
  label: string
  title: string
  titleId?: string
  text?: string
  center?: boolean
}>()
</script>

<style scoped>
/* Schweizer Raster: Etikett links in eigener Spalte, Überschrift rechts */
.head {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid var(--line-strong);
}

.head-label {
  align-self: start;
  padding-top: 4px;
}

.head-main {
  display: grid;
  gap: 18px;
  max-width: 46rem;
}

.head-title {
  color: var(--ink);
  font-size: clamp(2rem, 5.2vw, 3.5rem);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.038em;
}

.head-text {
  max-width: 38rem;
  color: var(--muted);
  font-size: 1.125rem;
  line-height: 1.6;
}

@media (min-width: 1024px) {
  .head {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 32px;
    padding-top: 24px;
  }
}
</style>
