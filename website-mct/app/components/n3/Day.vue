<template>
  <section id="so-gehts" class="day n3-section" aria-labelledby="day-title">
    <div class="container">
      <div class="day-head">
        <p class="n3-label" data-reveal>Ein Beispieltag</p>
        <h2 id="day-title" class="n3-h2" data-reveal="1">{{ how.title }}</h2>
        <p class="n3-lead" data-reveal="2">
          Vier Handgriffe, alle direkt in der Liste. Hier spielen sie an einem ganz normalen Tag,
          und jede Szene kannst du gleich selbst ausprobieren.
        </p>
      </div>

      <ol ref="list" class="day-list" :style="{ '--rail-top': `${rail.top}px`, '--rail-h': `${rail.height}px`, '--fill': fill }">
        <li class="day-rail" aria-hidden="true"><span class="day-rail-fill" /></li>

        <li
          v-for="(step, i) in steps"
          :key="step.time"
          class="day-step"
          :class="{ 'is-reached': reached[i] }"
        >
          <p class="day-time">
            <time :datetime="step.time">{{ step.time }}</time>
            <span class="day-where">{{ step.where }}</span>
          </p>
          <span class="day-dot" aria-hidden="true" />
          <article class="day-card" :aria-labelledby="`day-step-${i}`">
            <div class="day-text">
              <p class="day-kicker"><span class="day-num">0{{ i + 1 }}</span>{{ step.label }}</p>
              <h3 :id="`day-step-${i}`" class="day-title">{{ step.title }}</h3>
              <p class="day-body">
                <template v-for="(part, j) in withTags(step.text)" :key="j">
                  <span v-if="part.tag" class="hashtag">{{ part.text }}</span>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
            </div>
            <div class="day-scene">
              <component :is="step.scene" :play="reached[i]" />
            </div>
          </article>
        </li>

        <li class="day-step day-end" :class="{ 'is-reached': reached[steps.length] }">
          <p class="day-time"><span class="day-where">danach</span></p>
          <span class="day-dot" aria-hidden="true" />
          <p class="day-end-text">Feierabend. Was noch offen ist, wartet morgen in derselben Liste.</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { how } from '~/content/varianten'
import N3SceneCapture from './SceneCapture.vue'
import N3SceneDone from './SceneDone.vue'
import N3SceneDue from './SceneDue.vue'
import N3SceneTag from './SceneTag.vue'

// Die Uhrzeiten sind erzählt, ein Beispiel für einen Tag. Jede Szene zeigt einen der vier Handgriffe.
const steps = [
  {
    time: '07:42',
    where: 'in der Bahn',
    label: 'Erfassen',
    title: 'In der Bahn fällt dir etwas ein.',
    text: 'Du öffnest die Liste, das Feld ist schon aktiv. Gedanke eintippen, Enter, fertig. Datum oder Beschreibung ergänzt du später, wenn überhaupt.',
    scene: N3SceneCapture,
  },
  {
    time: '09:10',
    where: 'am Schreibtisch',
    label: 'Zuordnen',
    title: 'Am Schreibtisch zählt erst mal die Arbeit.',
    text: 'Ein #hashtag im Text ordnet jede Aufgabe zu. Ein Klick auf #arbeit, und die Liste zeigt nur noch, was dazugehört. Ordner legst du dafür keine an.',
    scene: N3SceneTag,
  },
  {
    time: '13:30',
    where: 'nach dem Essen',
    label: 'Terminieren',
    title: 'Der Rückruf passt erst nach dem Meeting.',
    text: 'Ein Klick auf +1h, und die Aufgabe ist in einer Stunde fällig. Für größere Sprünge gibt es +1d, +1w, +1mo und +90d, ganz ohne Kalender.',
    scene: N3SceneDue,
  },
  {
    time: '17:55',
    where: 'vor Feierabend',
    label: 'Abarbeiten',
    title: 'Zum Schluss räumst du auf.',
    text: 'Erledigt, wichtig, später oder weg: jede Aktion ist ein Klick direkt an der Aufgabe. Es öffnet sich kein Dialog, und es gibt nichts zu speichern.',
    scene: N3SceneDone,
  },
]

function withTags(text: string) {
  return text.split(/(#[\p{L}\d_-]+)/u).filter(Boolean).map(part => ({ text: part, tag: part.startsWith('#') }))
}

// Die Linie füllt sich mit der Scroll-Position. Erreicht sie einen Punkt, startet dessen Szene.
const list = ref<HTMLOListElement | null>(null)
const rail = reactive({ top: 0, height: 0 })
const fill = ref(0)
const reached = ref<boolean[]>(Array.from({ length: steps.length + 1 }, () => false))
let frame = 0

function measure() {
  frame = 0
  const el = list.value
  const points = el ? [...el.querySelectorAll<HTMLElement>('.day-dot')] : []
  if (!el || points.length < 2) return
  const box = el.getBoundingClientRect()
  const centers = points.map((dot) => {
    const r = dot.getBoundingClientRect()
    return r.top + r.height / 2
  })
  const first = centers[0]!
  const last = centers[centers.length - 1]!
  rail.top = first - box.top
  rail.height = Math.max(0, last - first)
  const anchor = window.innerHeight * 0.6
  fill.value = rail.height ? Math.min(1, Math.max(0, (anchor - first) / rail.height)) : 0
  const next = centers.map(c => c <= anchor)
  // Einmal erreicht, bleibt erreicht: die Szenen laufen nur einmal von selbst
  reached.value = reached.value.map((was, i) => was || next[i]!)
}

function schedule() {
  if (!frame) frame = requestAnimationFrame(measure)
}

onMounted(() => {
  measure()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', schedule)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', schedule)
  window.removeEventListener('resize', schedule)
})
</script>

<style scoped>
.day-head {
  display: grid;
  gap: 16px;
  max-width: 44rem;
  margin-bottom: clamp(48px, 7vw, 80px);
}

.day-list {
  --dot: 16px;

  position: relative;
  display: grid;
  gap: clamp(28px, 4vw, 48px);
  padding: 0;
  list-style: none;
}

/* Linie: grauer Grund, Petrol füllt von oben */
.day-rail {
  position: absolute;
  top: var(--rail-top);
  left: calc(var(--dot) / 2 - 1px);
  width: 2px;
  height: var(--rail-h);
  border-radius: 2px;
  background: var(--line);
}

.day-rail-fill {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: var(--accent);
  transform: scaleY(var(--fill));
  transform-origin: top;
}

.day-step {
  display: grid;
  grid-template-areas:
    'dot time'
    '. card';
  grid-template-columns: var(--dot) minmax(0, 1fr);
  column-gap: 12px;
  row-gap: 12px;
}

.day-time {
  display: flex;
  grid-area: time;
  align-items: baseline;
  gap: 10px;
  align-self: center;
  font-family: var(--font-mono);
  line-height: 1.2;
}

.day-time time {
  color: var(--muted);
  font-size: 1.0625rem;
  font-weight: 600;
  letter-spacing: 0.01em;
  transition: color 0.4s;
}

.day-where {
  color: var(--muted);
  font-size: 0.8125rem;
}

.day-dot {
  position: relative;
  z-index: 1;
  grid-area: dot;
  align-self: center;
  width: var(--dot);
  height: var(--dot);
  border: 2px solid var(--line-strong);
  border-radius: 50%;
  background: var(--paper);
  transition: background-color 0.4s, border-color 0.4s, box-shadow 0.4s;
}

.is-reached .day-dot {
  border-color: var(--accent);
  background: var(--accent);
  box-shadow: 0 0 0 5px var(--accent-soft);
}

.is-reached .day-time time {
  color: var(--accent-ink);
}

.day-card {
  display: grid;
  grid-area: card;
  gap: 24px;
  padding: 22px 16px 16px;
  border-radius: 18px;
  background: var(--card);
  box-shadow: var(--card-shadow);
}

.day-text {
  display: grid;
  align-content: start;
  gap: 10px;
}

.day-kicker {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.day-num {
  display: inline-grid;
  place-items: center;
  min-width: 28px;
  height: 22px;
  padding-inline: 6px;
  border-radius: 6px;
  background: var(--accent-soft);
  font-size: 0.75rem;
}

.day-title {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.6vw, 1.75rem);
  font-weight: 620;
  letter-spacing: -0.02em;
  line-height: 1.15;
}

.day-body {
  color: var(--text);
}

.day-scene {
  min-width: 0;
}

.day-end .day-time {
  align-self: center;
}

.day-end-text {
  grid-area: card;
  max-width: 34rem;
  color: var(--muted);
  font-size: 1.0625rem;
}

@media (min-width: 640px) {
  .day-card {
    padding: 28px;
  }
}

/* Breit: Uhrzeit links der Linie, Karte rechts mit Text und Szene nebeneinander */
@media (min-width: 900px) {
  .day-list {
    --dot: 18px;
    --time-col: 132px;
  }

  .day-rail {
    left: calc(var(--time-col) + 24px + var(--dot) / 2 - 1px);
  }

  .day-step {
    grid-template-areas: 'time dot card';
    grid-template-columns: var(--time-col) var(--dot) minmax(0, 1fr);
    column-gap: 24px;
  }

  .day-time {
    flex-direction: column;
    align-items: flex-end;
    align-self: start;
    gap: 4px;
    padding-top: 30px;
    text-align: right;
  }

  .day-time time {
    font-size: 1.375rem;
  }

  .day-dot {
    align-self: start;
    margin-top: 34px;
  }

  .day-end .day-time,
  .day-end .day-dot {
    align-self: center;
    margin-top: 0;
    padding-top: 0;
  }

  .day-end-text {
    align-self: center;
  }
}

@media (min-width: 1100px) {
  .day-card {
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 40px;
    padding: 32px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .day-dot,
  .day-time time {
    transition: none;
  }
}
</style>

<style>
/* Gemeinsame Mini-Oberfläche der vier Szenen: ein Ausschnitt der App, ohne Rahmenwerk */
.n3 .n3-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 10px;
  padding: 14px;
  border-radius: 12px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1px var(--line);
  font-size: 0.9375rem;
}

@media (max-width: 479px) {
  .n3 .n3-stage {
    margin-inline: -4px;
    padding: 10px;
  }
}

.n3 .n3-field {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 8px 0 12px;
  border-radius: 8px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.n3 .n3-row {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 42px;
  padding: 4px 6px 4px 4px;
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
}

.n3 .n3-row-name {
  flex: 1;
  min-width: 0;
  padding-block: 3px;
  line-height: 1.35;
  overflow-wrap: anywhere;
}

.n3 .n3-row-tag {
  margin-left: 4px;
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  white-space: nowrap;
}

.n3 .n3-row-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 30px;
  height: 30px;
  color: var(--muted);
}

.n3 .n3-row-icon svg,
.n3 .n3-icon-btn svg {
  width: 17px;
  height: 17px;
}

.n3 .n3-icon-btn {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 7px;
  background: none;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.15s, background-color 0.15s;
}

.n3 .n3-icon-btn:hover {
  background: var(--sunken);
  color: var(--ink);
}

.n3 .n3-note {
  min-height: 1.5em;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

@keyframes n3-arrive {
  from {
    background: var(--accent-soft);
    transform: translateY(-6px);
  }
}
</style>
