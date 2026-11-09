<template>
  <section id="faq" class="n2-section faq" aria-labelledby="n2-faq-title">
    <div class="n2-wrap faq-grid">
      <div class="faq-head">
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">06</span>FAQ</p>
        <h2 id="n2-faq-title" class="n2-h2" data-reveal="1">Häufige Fragen.</h2>
        <p class="faq-more" data-reveal="2">
          Noch etwas offen?
          <a :href="`${repositoryUrl}/issues`">Frag uns auf GitHub<ArrowUpRight aria-hidden="true" /></a>
        </p>
      </div>

      <div class="faq-list" data-reveal="2">
        <details v-for="(item, index) in faq" :key="item.question" class="faq-item">
          <summary class="faq-q">
            <span class="faq-index" aria-hidden="true">0{{ index + 1 }}</span>
            <span class="faq-q-text">{{ item.question }}</span>
            <Plus class="faq-icon" aria-hidden="true" />
          </summary>
          <p class="faq-a">{{ item.answer }}</p>
        </details>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowUpRight, Plus } from '@lucide/vue'
import { faq } from '~/content/varianten'

const { repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.faq-grid {
  display: grid;
  gap: 40px;
}

.faq-more {
  margin-top: 20px;
  color: var(--muted);
}

.faq-more a {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  margin-left: 4px;
  border-radius: 4px;
  color: var(--ink);
  font-weight: 500;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
}

.faq-more a:hover {
  text-decoration-color: var(--ink);
}

.faq-more svg {
  width: 16px;
  height: 16px;
}

.faq-list {
  border-top: 1px solid var(--line);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-q {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding-block: 22px;
  color: var(--ink);
  font-size: 1.0625rem;
  font-weight: 500;
  letter-spacing: -0.01em;
  list-style: none;
  cursor: pointer;
}

.faq-q::-webkit-details-marker {
  display: none;
}

.faq-q:focus-visible {
  outline-offset: 4px;
}

.faq-index {
  flex-shrink: 0;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 400;
}

.faq-q-text {
  flex: 1;
}

.faq-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  align-self: center;
  color: var(--muted);
  transition: transform 0.25s var(--ease-out), color 0.15s;
}

.faq-q:hover .faq-icon {
  color: var(--ink);
}

.faq-item[open] .faq-icon {
  transform: rotate(45deg);
  color: var(--ink);
}

.faq-a {
  max-width: 40rem;
  padding: 0 34px 24px 34px;
  color: var(--muted);
}

@media (prefers-reduced-motion: no-preference) {
  .faq-item[open] .faq-a {
    animation: faq-open 0.35s var(--ease-out);
  }
}

@keyframes faq-open {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
}

@media (min-width: 960px) {
  .faq-grid {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 80px;
    align-items: start;
  }

  .faq-head {
    position: sticky;
    top: calc(var(--header-h) + 48px);
  }
}
</style>
