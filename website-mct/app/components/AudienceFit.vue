<template>
  <div class="fit">
    <figure class="fit-case reveal">
      <blockquote>
        Eine Webagentur mit acht Leuten. Aufgaben kommen aus Kundenanrufen, aus dem Chat und aus Code-Reviews.
        Ein Ticketsystem ist dem Team zu schwer, eine geteilte Notiz zu chaotisch, und Kundendaten sollen nicht
        bei einem US-Anbieter liegen.
      </blockquote>
      <figcaption>Für genau dieses Team ist OneClickTask gebaut.</figcaption>
    </figure>

    <div class="fit-col">
      <h3 class="fit-title">
        <Check class="fit-icon fit-icon-yes" aria-hidden="true" />
        Passt gut für
      </h3>
      <ul class="fit-yes">
        <li v-for="item in fitsWell" :key="item">{{ item }}</li>
      </ul>
    </div>
    <div class="fit-col">
      <h3 class="fit-title">
        <Minus class="fit-icon" aria-hidden="true" />
        Nicht enthalten
      </h3>
      <dl class="fit-no">
        <div v-for="item in fitsPoorly" :key="item.title">
          <dt>{{ item.title }}</dt>
          <dd>{{ item.text }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Minus } from '@lucide/vue'
import { fitsPoorly, fitsWell } from '~/content/landing'
</script>

<style scoped>
.fit {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 48px;
}

.fit-case {
  max-width: 50rem;
  margin: 0;
  padding-left: 28px;
  border-left: 3px solid var(--accent);
}

.fit-case blockquote {
  margin: 0;
  color: var(--ink);
  font-size: clamp(1.25rem, 2.4vw, 1.625rem);
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: -0.015em;
}

.fit-case figcaption {
  margin-top: 16px;
  color: var(--accent-ink);
  font-weight: 600;
}

.fit-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.125rem;
}

.fit-icon {
  width: 28px;
  height: 28px;
  padding: 5px;
  border-radius: 50%;
  background: var(--sunken);
  color: var(--muted);
}

.fit-icon-yes {
  background: var(--accent);
  color: var(--on-accent);
}

.fit-yes {
  display: grid;
  margin-top: 24px;
  padding: 0;
  list-style: none;
}

.fit-yes li {
  padding-block: 16px;
  border-top: 1px solid var(--line);
  color: var(--ink);
}

.fit-no {
  display: grid;
  margin: 24px 0 0;
}

.fit-no div {
  padding-block: 16px;
  border-top: 1px solid var(--line);
}

.fit-no dt {
  color: var(--ink);
  font-weight: 600;
}

.fit-no dd {
  margin: 4px 0 0;
  color: var(--muted);
}

@media (min-width: 900px) {
  .fit {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 72px 64px;
  }

  .fit-case {
    grid-column: 1 / -1;
  }
}
</style>
