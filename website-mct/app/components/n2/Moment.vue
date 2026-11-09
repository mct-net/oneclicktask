<template>
  <section id="moment" class="n2-section moment" aria-labelledby="n2-moment-title">
    <div class="n2-wrap moment-grid">
      <div class="moment-head">
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">01</span>Der Moment</p>
        <h2 id="n2-moment-title" class="n2-h2" data-reveal="1">{{ moment.title }}</h2>
        <p class="n2-lead" data-reveal="2">{{ moment.text }}</p>
      </div>

      <ul class="moment-points" data-reveal="2">
        <li
          v-for="point in moment.points"
          :key="point.key"
          class="moment-point"
        >
          <div class="moment-mark" aria-hidden="true">
            <template v-if="point.key === 'write'">
              <span class="moment-field">Idee<span class="moment-caret" /></span>
              <KeyCap hot>⏎</KeyCap>
            </template>
            <template v-else-if="point.key === 'find'">
              <span class="n2-chip n2-chip-tag">#kunde</span>
              <span class="n2-chip n2-chip-tag">#bug</span>
              <span class="n2-chip n2-chip-tag">#idee</span>
            </template>
            <template v-else-if="point.key === 'click'">
              <span class="moment-icon"><Star /></span>
              <span class="moment-icon"><TriangleAlert /></span>
              <span class="moment-icon moment-icon-on"><CircleCheck /></span>
              <span class="moment-icon"><Trash2 /></span>
            </template>
            <template v-else>
              <span class="n2-chip">+1h</span>
              <span class="n2-chip moment-chip-on">+1d</span>
              <span class="n2-chip">+1w</span>
            </template>
          </div>
          <h3 class="moment-title">{{ point.title }}</h3>
          <p class="moment-text">{{ point.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CircleCheck, Star, Trash2, TriangleAlert } from '@lucide/vue'
import { moment } from '~/content/varianten'
</script>

<style scoped>
.moment-grid {
  display: grid;
  gap: 48px;
}

.moment-points {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1px;
  overflow: clip;
  padding: 0;
  border-radius: 14px;
  background: var(--line);
  box-shadow: 0 0 0 1px var(--line);
  list-style: none;
}

.moment-point {
  display: grid;
  align-content: start;
  gap: 8px;
  padding: 28px 24px 30px;
  background: var(--card);
}

.moment-mark {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  margin-bottom: 14px;
  font-size: 1rem;
}

.moment-field {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding-inline: 10px;
  border-radius: 7px;
  background: var(--bg);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.moment-caret {
  width: 1.5px;
  height: 14px;
  margin-left: 2px;
  background: var(--ink);
}

.moment-icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
}

.moment-icon svg {
  width: 15px;
  height: 15px;
}

.moment-icon-on {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.moment-chip-on {
  background: var(--primary);
  color: var(--on-primary);
}

.moment-title {
  font-size: 1.125rem;
  line-height: 1.3;
  letter-spacing: -0.015em;
}

.moment-text {
  color: var(--muted);
  font-size: 0.96875rem;
  line-height: 1.55;
}

@media (prefers-reduced-motion: no-preference) {
  .moment-caret {
    animation: caret 1.1s steps(1) infinite;
  }
}

@keyframes caret {
  50% {
    opacity: 0;
  }
}

@media (min-width: 640px) {
  .moment-points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .moment-grid {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    align-items: start;
    gap: 72px;
  }

  .moment-head {
    position: sticky;
    top: calc(var(--header-h) + 48px);
  }

  .moment-point {
    min-height: 236px;
    padding: 32px 30px;
  }
}
</style>
