<template>
  <section id="moment" class="section" aria-labelledby="n1-moment-title">
    <div class="container">
      <N1SectionHead index="01" label="Der Moment" :title="moment.title" title-id="n1-moment-title" :text="moment.text" />

      <div class="grid">
        <ul class="points">
          <li v-for="(point, i) in moment.points" :key="point.key" class="point" :data-reveal="String(i + 1)">
            <div class="point-specimen" aria-hidden="true">
              <template v-if="point.key === 'write'">
                <span class="spec-field"><span class="spec-typed">Zahnarzt anrufen</span><span class="spec-caret" /></span>
                <KeyCap hot class="spec-key">↵</KeyCap>
              </template>
              <template v-else-if="point.key === 'find'">
                <span class="spec-chip spec-chip-on">#privat</span>
                <span class="spec-chip">#arbeit</span>
                <span class="spec-chip">#ideen</span>
              </template>
              <template v-else-if="point.key === 'click'">
                <span class="spec-btn"><Star /></span>
                <span class="spec-btn"><TriangleAlert /></span>
                <span class="spec-btn spec-btn-on"><CircleCheck /></span>
                <span class="spec-btn"><Trash2 /></span>
              </template>
              <template v-else>
                <KeyCap class="spec-due">+1h</KeyCap>
                <KeyCap class="spec-due">+1d</KeyCap>
                <KeyCap class="spec-due">+1w</KeyCap>
              </template>
            </div>
            <h3 class="point-title">{{ point.title }}</h3>
            <p class="point-text">{{ point.text }}</p>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CircleCheck, Star, Trash2, TriangleAlert } from '@lucide/vue'
import { moment } from '~/content/varianten'
</script>

<style scoped>
.section {
  padding-block: 72px;
}

.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 48px;
}

.points {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1px;
  padding: 0;
  overflow: clip;
  border-radius: 16px;
  background: var(--line);
  box-shadow: 0 0 0 1px var(--line);
  list-style: none;
}

.point {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 28px 24px 32px;
  background: var(--surface);
  transition: background-color 0.2s;
}

.point-specimen {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 40px;
  margin-bottom: 14px;
}

.point-title {
  color: var(--ink);
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: -0.015em;
}

.point-text {
  color: var(--muted);
}

/* Kleine Muster aus der App, die zeigen, worum es geht */
.spec-field {
  display: inline-flex;
  align-items: center;
  height: 36px;
  padding: 0 12px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1.5px var(--ink);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.spec-caret {
  width: 1.5px;
  height: 16px;
  margin-left: 2px;
  background: var(--primary);
}

@media (prefers-reduced-motion: no-preference) {
  .spec-caret {
    animation: blink 1.1s steps(1) infinite;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.spec-key {
  font-size: 0.9375rem;
}

.spec-chip {
  padding: 4px 9px;
  border-radius: 6px;
  background: var(--chip);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.spec-chip-on {
  background: var(--primary);
  color: var(--on-primary);
}

.spec-btn {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
}

.spec-btn svg {
  width: 17px;
  height: 17px;
}

.spec-btn-on {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.spec-due {
  font-size: 0.9375rem;
}

@media (min-width: 720px) {
  .points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .point {
    padding: 36px 32px 40px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: 120px;
  }

  .grid {
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 32px;
    margin-top: 64px;
  }

  .points {
    grid-column: 2;
  }
}
</style>
