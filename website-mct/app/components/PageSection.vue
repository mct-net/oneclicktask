<template>
  <section :id="id" class="section" :class="{ 'section-tinted': tinted }">
    <div class="container">
      <header v-if="title" class="section-header">
        <h2 class="section-title">{{ title }}</h2>
        <p v-if="description" class="section-description">{{ description }}</p>
      </header>
      <div class="section-body" :class="{ 'section-body-spaced': title }">
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  title?: string
  description?: string
  tinted?: boolean
}>()
</script>

<style scoped>
.section {
  padding-block: 64px;
}

.section-tinted {
  background: color-mix(in srgb, var(--color-elevated) 50%, transparent);
}

.section-header {
  max-width: 48rem;
  margin-inline: auto;
  text-align: center;
}

.section-title {
  color: var(--color-highlighted);
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.section-description {
  margin-top: 24px;
  color: var(--color-muted);
  font-size: 1rem;
  text-wrap: pretty;
}

.section-body-spaced {
  margin-top: 48px;
}

@media (min-width: 640px) {
  .section {
    padding-block: 96px;
  }

  .section-title {
    font-size: 2.25rem;
  }

  .section-description {
    font-size: 1.125rem;
  }

  .section-body-spaced {
    margin-top: 64px;
  }
}

@media (min-width: 1024px) {
  .section-title {
    font-size: 3rem;
  }
}
</style>
