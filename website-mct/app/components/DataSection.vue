<template>
  <section id="daten" class="data band">
    <svg class="data-stars" viewBox="-120 -120 240 240" aria-hidden="true">
      <polygon
        v-for="index in 12"
        :key="index"
        :transform="`rotate(${index * 30}) translate(0 -92)`"
        points="0,-9 2.6,-3 9,-2.8 4,1.4 5.6,8 0,4.4 -5.6,8 -4,1.4 -9,-2.8 -2.6,-3"
      />
    </svg>
    <div class="container data-grid">
      <div class="data-head">
        <h2 class="data-title">Datenschutz ohne Aufpreis</h2>
        <p class="data-description">
          Aufgabenlisten enthalten Kundennamen, interne Notizen und Angebote. Bei vielen Teamtools gibt es
          Datenhaltung in der EU erst in teureren Tarifen. Bei OneClickTask läuft alles auf Servern in der EU,
          ohne Kosten. Der Quellcode ist öffentlich einsehbar.
        </p>
        <a :href="repositoryUrl" target="_blank" rel="noopener" class="btn btn-lg data-link">
          <GithubIcon class="icon" />
          Quellcode auf GitHub
        </a>
      </div>
      <dl class="data-points reveal">
        <div v-for="point in dataPoints" :key="point.title">
          <dt>{{ point.title }}</dt>
          <dd>{{ point.text }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { dataPoints } from '~/content/landing'

const { repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.data {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  padding-block: 96px;
}

/* Zwölf Sterne im Kreis: die EU als flaches Zeichen, dreht sich beim Scrollen ein Stück */
.data-stars {
  position: absolute;
  top: 50%;
  right: 3%;
  z-index: -1;
  width: min(70vw, 560px);
  fill: #ffcc00;
  opacity: 0.22;
  translate: 0 -50%;
}

@media (prefers-reduced-motion: no-preference) {
  @supports (animation-timeline: view()) {
    .data-stars {
      animation: orbit linear both;
      animation-timeline: view();
    }
  }
}

@keyframes orbit {
  from {
    rotate: -30deg;
  }

  to {
    rotate: 30deg;
  }
}

.data-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 56px;
}

.data-head {
  display: grid;
  align-content: start;
  justify-items: start;
  gap: 20px;
}

.data-title {
  font-size: clamp(2rem, 4.6vw, 3.5rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
}

.data-description {
  max-width: 34rem;
  color: var(--muted);
  font-size: 1.1875rem;
}

.data-link {
  margin-top: 8px;
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.data-link:hover {
  box-shadow: inset 0 0 0 1px var(--ink);
}

.data-points {
  display: grid;
  gap: 32px;
  margin: 0;
}

.data-points div {
  padding-top: 20px;
  border-top: 1px solid var(--line);
}

.data-points dt {
  color: var(--ink);
  font-weight: 600;
}

.data-points dd {
  margin: 6px 0 0;
  color: var(--muted);
}

@media (min-width: 640px) {
  .data-points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .data {
    padding-block: 144px;
  }

  .data-grid {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
    gap: 80px;
  }
}
</style>
