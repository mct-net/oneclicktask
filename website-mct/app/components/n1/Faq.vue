<template>
  <section id="fragen" class="section" aria-labelledby="n1-faq-title">
    <div class="container">
      <div class="qa">
        <div class="qa-head">
          <p class="n1-label" data-reveal>
            <span class="n1-label-index">06</span>
            <span>Fragen</span>
          </p>
          <h2 id="n1-faq-title" class="faq-title" data-reveal="1">Häufige Fragen.</h2>
          <p class="faq-more" data-reveal="2">
            Deine Frage fehlt?
            <a :href="`${repositoryUrl}/issues`" target="_blank" rel="noopener">Schreib sie uns auf GitHub</a>.
          </p>
        </div>
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
.section {
  padding-block: 72px;
}

.qa {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--line-strong);
}

.qa-head {
  display: grid;
  align-content: start;
  gap: 18px;
}

.faq-title {
  color: var(--ink);
  font-size: clamp(2rem, 5.2vw, 3.5rem);
  font-weight: 600;
  line-height: 1.04;
  letter-spacing: -0.038em;
}

.faq-more {
  color: var(--muted);
}

.faq-more a {
  color: var(--ink);
  font-weight: 500;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  transition: color 0.15s, text-decoration-color 0.15s;
}

.faq-more a:hover {
  color: var(--accent-ink);
  text-decoration-color: currentColor;
}

/* FaqList bringt Linien mit; oben schließt die Rasterlinie des Abschnitts ab */
.faq-list {
  max-width: none;
}

@media (min-width: 1024px) {
  .section {
    padding-block: 120px;
  }

  .qa {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 32px;
    padding-top: 24px;
  }

  .qa-head {
    grid-column: 1 / -1;
    grid-template-columns: 260px minmax(0, 1fr);
    column-gap: 32px;
  }

  .qa-head .n1-label {
    grid-row: span 2;
    padding-top: 4px;
  }

  .faq-list {
    grid-column: 2;
    margin-top: 24px;
  }
}
</style>
