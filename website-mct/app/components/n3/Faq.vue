<template>
  <section id="faq" class="faq n3-section" aria-labelledby="faq-title">
    <div class="container faq-inner">
      <div class="faq-head">
        <p class="n3-label" data-reveal>Fragen</p>
        <h2 id="faq-title" class="n3-h2" data-reveal="1">Häufige Fragen.</h2>
        <p class="faq-more" data-reveal="2">
          Etwas nicht dabei? Schreib uns auf
          <a :href="`${repositoryUrl}/issues`">GitHub</a>.
        </p>
      </div>
      <div data-reveal="1">
        <FaqList :items="faq" class="faq-list" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { faq } from '~/content/varianten'

const { repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.faq {
  border-top: 1px solid var(--line);
}

.faq-inner {
  display: grid;
  gap: 40px;
}

.faq-head {
  display: grid;
  align-content: start;
  gap: 16px;
}

.faq-more {
  color: var(--muted);
}

.faq-more a {
  color: var(--accent-ink);
  font-weight: 500;
  text-underline-offset: 3px;
}

/* Die eigene Scroll-Animation des Bausteins weicht der ruhigen Einblendung dieser Seite */
.faq-list {
  max-width: none;
  animation: none !important;
}

.faq-list :deep(.faq-question) {
  font-size: 1.0625rem;
}

.faq-list :deep(.faq-question:hover .faq-icon) {
  color: var(--accent);
}

.faq-list :deep(.faq-question:focus-visible) {
  outline-offset: 2px;
}

@media (min-width: 960px) {
  .faq-inner {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 64px;
  }
}
</style>
