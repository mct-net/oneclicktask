<template>
  <section id="werte" class="n2-section values" aria-labelledby="n2-values-title">
    <div class="n2-wrap">
      <div class="values-head">
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">04</span>Werte</p>
        <h2 id="n2-values-title" class="n2-h2" data-reveal="1">Was OneClickTask ausmacht.</h2>
      </div>

      <ul class="values-grid" data-reveal="2">
        <li v-for="(value, index) in values" :key="value.key" class="values-cell">
          <div class="values-top">
            <span class="values-index">0{{ index + 1 }}</span>
            <span class="values-label" :class="{ 'values-label-tag': marks[value.key]?.tag }">{{ marks[value.key]?.label }}</span>
          </div>
          <h3 class="values-title">{{ value.title }}</h3>
          <p class="values-text">{{ value.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { values } from '~/content/varianten'

// Kleine Mono-Marken, die zeigen, woran man den Wert in der Bedienung erkennt
const marks: Record<string, { label: string, tag?: boolean }> = {
  fast: { label: '⏎' },
  simple: { label: '#tag', tag: true },
  reliable: { label: 'kein Abo' },
  open: { label: 'github' },
  yours: { label: 'Dockerfile' },
}
</script>

<style scoped>
.values-head {
  display: grid;
  gap: 0;
}

.values-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1px;
  margin-top: clamp(40px, 5vw, 64px);
  overflow: clip;
  padding: 0;
  border-radius: 14px;
  background: var(--line);
  box-shadow: 0 0 0 1px var(--line);
  list-style: none;
}

.values-cell {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 24px 22px 28px;
  background: var(--card);
}

.values-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.values-index {
  color: var(--muted);
}

.values-label {
  padding: 2px 8px;
  border-radius: 6px;
  background: var(--chip);
  color: var(--ink);
  font-weight: 500;
}

.values-label-tag {
  color: var(--accent-ink);
}

.values-title {
  font-size: 1.1875rem;
  line-height: 1.25;
  letter-spacing: -0.02em;
}

.values-text {
  color: var(--muted);
  font-size: 0.9375rem;
  line-height: 1.55;
}

@media (min-width: 600px) {
  .values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .values-cell:last-child {
    grid-column: 1 / -1;
  }
}

@media (min-width: 900px) {
  .values-grid {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }

  .values-cell {
    grid-column: span 2;
  }

  .values-cell:nth-child(4),
  .values-cell:nth-child(5) {
    grid-column: span 3;
  }
}

@media (min-width: 1180px) {
  .values-grid {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .values-cell,
  .values-cell:nth-child(4),
  .values-cell:nth-child(5) {
    grid-column: auto;
  }
}
</style>
