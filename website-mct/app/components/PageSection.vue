<template>
  <section :id="id" class="section" :class="{ 'section-surface': surface }">
    <div class="container">
      <header v-if="title" class="section-header reveal">
        <h2 class="section-title">
          {{ title }} <span v-if="description" class="section-description">{{ description }}</span>
        </h2>
      </header>
      <div :class="{ 'section-body': title }">
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
  surface?: boolean
}>()
</script>

<style scoped>
.section {
  padding-block: 80px;
}

.section-surface {
  border-block: 1px solid var(--line);
  background: var(--surface);
}

.section-header {
  max-width: 54rem;
}

/* Zweifarbig: Titel kräftig, die Erklärung läuft gedämpft im selben Satz weiter */
.section-title {
  font-size: clamp(1.875rem, 4.2vw, 3.25rem);
  line-height: 1.1;
  letter-spacing: -0.035em;
}

.section-description {
  color: var(--muted);
}

.section-body {
  margin-top: 56px;
}

@media (min-width: 768px) {
  .section {
    padding-block: 128px;
  }

  .section-body {
    margin-top: 72px;
  }
}
</style>
