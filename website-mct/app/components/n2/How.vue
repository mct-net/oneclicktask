<!--
  Scrollytelling: links laufen die vier Schritte vorbei, rechts bleibt das Demo-Panel stehen
  und wechselt mit dem aktiven Schritt. Auf schmalen Bildschirmen steht die Demo unter jedem Schritt.
-->
<template>
  <section id="so-gehts" class="n2-section how" aria-labelledby="n2-how-title">
    <div class="n2-wrap">
      <header class="how-head">
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">02</span>Funktionsweise</p>
        <h2 id="n2-how-title" class="n2-h2" data-reveal="1">{{ how.title }}</h2>
        <p class="n2-lead" data-reveal="2">{{ how.text }}</p>
      </header>

      <div class="how-grid">
        <div ref="track" class="how-track">
          <div class="how-rail" aria-hidden="true">
            <span class="how-rail-fill" :style="{ transform: `scaleY(${progress})` }" />
          </div>

          <ol class="how-steps">
            <li
              v-for="(step, index) in steps"
              :key="step.name"
              ref="stepEls"
              :data-step="index"
              class="how-step"
              :class="{ 'how-step-on': index === active }"
              :aria-current="index === active ? 'step' : undefined"
            >
              <div class="how-step-text">
                <p class="how-step-label">
                  <span class="how-step-num">0{{ index + 1 }}</span>
                  {{ step.name }}
                </p>
                <h3 class="how-step-title">{{ step.title }}</h3>
                <p class="how-step-body">
                  <template v-for="(part, i) in tokens(step.body)" :key="i">
                    <span v-if="part.tag" class="hashtag">{{ part.text }}</span>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </p>
                <div class="how-step-chips" aria-hidden="true">
                  <template v-if="index === 0">
                    <span class="how-chip-pair"><KeyCap hot>⏎</KeyCap> legt an</span>
                  </template>
                  <template v-else-if="index === 1">
                    <span class="how-chip-pair"><span class="n2-chip n2-chip-tag">#kunde</span> filtert</span>
                    <span class="how-chip-pair"><span class="n2-chip n2-chip-tag">-#ops</span> blendet aus</span>
                  </template>
                  <template v-else-if="index === 2">
                    <span v-for="d in dueSteps" :key="d" class="n2-chip">+{{ d }}</span>
                  </template>
                  <template v-else>
                    <span v-for="(icon, i) in actionIcons" :key="i" class="how-icon"><component :is="icon" /></span>
                  </template>
                </div>
              </div>

              <!-- Schmal: Demo direkt unter dem Schritt -->
              <div class="how-inline panel">
                <div class="panel-bar">
                  <span class="panel-title"><b>0{{ index + 1 }}</b> {{ step.name }}</span>
                  <span class="panel-live"><i />Zum Ausprobieren</span>
                </div>
                <div class="panel-body">
                  <component :is="stages[index]" :uid="`n2-inline-${index}`" :active="!wide && inView && index === active" />
                </div>
                <p class="panel-foot">
                  <template v-for="(part, i) in hintTokens(step.hint)" :key="i">
                    <span v-if="part.key" class="panel-key">⏎</span>
                    <span v-else-if="part.tag" class="hashtag">{{ part.text }}</span>
                    <template v-else>{{ part.text }}</template>
                  </template>
                </p>
              </div>
            </li>
          </ol>
        </div>

        <!-- Breit: ein stehendes Panel, das mit dem aktiven Schritt wechselt -->
        <div class="how-aside">
          <div class="how-sticky panel">
            <div class="panel-bar">
              <div class="panel-tabs" role="group" aria-label="Schritt wählen">
                <button
                  v-for="(step, index) in steps"
                  :key="step.name"
                  type="button"
                  class="panel-tab"
                  :class="{ 'panel-tab-on': index === active }"
                  :aria-pressed="index === active"
                  @click="goTo(index)"
                >
                  <b>0{{ index + 1 }}</b><span>{{ step.name }}</span>
                </button>
              </div>
              <span class="panel-live"><i />Live</span>
            </div>

            <div class="panel-body panel-stack">
              <div
                v-for="(stage, index) in stages"
                :key="index"
                class="panel-state"
                :class="{ 'panel-state-on': index === active }"
                :inert="index !== active"
                :aria-hidden="index !== active"
              >
                <component :is="stage" :uid="`n2-panel-${index}`" :active="wide && inView && index === active" />
              </div>
            </div>

            <div class="panel-foot panel-stack">
              <p
                v-for="(step, index) in steps"
                :key="step.name"
                class="panel-state"
                :class="{ 'panel-state-on': index === active }"
                :aria-hidden="index !== active"
              >
                <template v-for="(part, i) in hintTokens(step.hint)" :key="i">
                  <span v-if="part.key" class="panel-key">⏎</span>
                  <span v-else-if="part.tag" class="hashtag">{{ part.text }}</span>
                  <template v-else>{{ part.text }}</template>
                </template>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { CircleCheck, CirclePlay, Star, Telescope, Trash2, TriangleAlert } from '@lucide/vue'
import { how } from '~/content/varianten'
import StageCapture from './StageCapture.vue'
import StageTags from './StageTags.vue'
import StageDue from './StageDue.vue'
import StageActions from './StageActions.vue'

const stages = [StageCapture, StageTags, StageDue, StageActions]
const dueSteps = ['5m', '1h', '1d', '1w', '1mo', '90d']
const actionIcons = [Star, TriangleAlert, CirclePlay, CircleCheck, Telescope, Trash2]

const steps = [
  {
    name: 'Erfassen',
    title: 'Tippen, Enter, fertig.',
    body: 'Das Feld sucht und legt an. Während du tippst, filtert die Liste. Gibt es die Aufgabe noch nicht, legt Enter sie an. Details ergänzt du später.',
    hint: 'Tippe eine Aufgabe und drück ⏎',
  },
  {
    name: 'Zuordnen',
    title: 'Hashtags statt Ordner.',
    body: 'Ein #hashtag im Titel ordnet die Aufgabe zu. Im Feld zeigt #kunde alles, was dazugehört, und -#ops blendet ein Thema aus.',
    hint: 'Klick auf einen #tag oder tippe ins Feld',
  },
  {
    name: 'Terminieren',
    title: 'Fristen mit einem Klick.',
    body: 'Statt eines Kalenders gibt es feste Schritte: plus 5 Minuten, 1 Stunde, 1 Tag, 1 Woche, 1 Monat oder 90 Tage. Unter der Liste siehst du, was heute, morgen und diese Woche fällig ist.',
    hint: 'Klick auf einen Schritt',
  },
  {
    name: 'Abarbeiten',
    title: 'Ein Klick pro Aktion.',
    body: 'Stern, wichtig, in Arbeit, erledigt, Backlog oder Papierkorb: Alles passiert direkt an der Aufgabe. Es öffnet sich kein Dialog, und es gibt nichts zu speichern.',
    hint: 'Klick auf eine Aktion',
  },
]

function tokens(text: string) {
  return text.split(/(-?#[\p{L}\d_-]+)/u).filter(Boolean).map(part => ({ text: part, tag: /^-?#/.test(part) }))
}

function hintTokens(text: string) {
  return text.split(/(⏎|-?#[\p{L}\d_-]+)/u).filter(Boolean).map(part => ({ text: part, key: part === '⏎', tag: /^-?#/.test(part) }))
}

const track = ref<HTMLElement | null>(null)
const stepEls = ref<HTMLElement[]>([])
const active = ref(0)
const inView = ref(false)
const progress = ref(0)
const wide = ref(false)

let observer: IntersectionObserver | null = null
let media: MediaQueryList | null = null
let frame = 0
const crossing = new Set<number>()

function measure() {
  frame = 0
  const el = track.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  const line = window.innerHeight / 2
  progress.value = Math.min(1, Math.max(0, (line - rect.top) / rect.height))
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(measure)
}

function onMedia() {
  wide.value = media?.matches ?? false
}

function goTo(index: number) {
  const el = stepEls.value.find(item => Number(item.dataset.step) === index)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const rect = el.getBoundingClientRect()
  const y = window.scrollY + rect.top + rect.height / 2 - window.innerHeight / 2
  window.scrollTo({ top: y, behavior: reduce ? 'auto' : 'smooth' })
}

onMounted(() => {
  media = window.matchMedia('(min-width: 960px)')
  onMedia()
  media.addEventListener('change', onMedia)

  // Aktiver Schritt = der Schritt, der gerade die Bildschirmmitte schneidet
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const index = Number((entry.target as HTMLElement).dataset.step)
      if (entry.isIntersecting) {
        crossing.add(index)
        active.value = index
      } else {
        crossing.delete(index)
      }
    }
    inView.value = crossing.size > 0
  }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 })
  for (const el of stepEls.value) observer.observe(el)

  measure()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  media?.removeEventListener('change', onMedia)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  cancelAnimationFrame(frame)
})
</script>

<style scoped>
.how-head {
  max-width: 44rem;
}

.how-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: clamp(40px, 6vw, 72px);
}

.how-track {
  position: relative;
}

.how-rail {
  display: none;
}

.how-steps {
  display: grid;
  gap: 56px;
  padding: 0;
  list-style: none;
}

.how-step {
  display: grid;
  gap: 24px;
}

.how-step-text {
  display: grid;
  align-content: start;
  gap: 12px;
  max-width: 34rem;
}

.how-step-label {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.how-step-num {
  display: inline-grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 7px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
  letter-spacing: 0;
  transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
}

.how-step-title {
  font-size: clamp(1.5rem, 2.6vw, 2.125rem);
  line-height: 1.1;
  letter-spacing: -0.03em;
}

.how-step-body {
  color: var(--muted);
  font-size: 1.0625rem;
  line-height: 1.6;
}

.how-step-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 14px;
  margin-top: 6px;
  color: var(--muted);
  font-size: 0.875rem;
}

.how-step-chips .n2-chip {
  font-size: 0.75rem;
}

.how-chip-pair {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.how-chip-pair :deep(.key) {
  font-size: 0.8125rem;
}

.how-icon {
  display: inline-grid;
  place-items: center;
  width: 28px;
  height: 28px;
  margin-right: -8px;
  border-radius: 7px;
  background: var(--chip);
  color: var(--ink);
}

.how-icon svg {
  width: 14px;
  height: 14px;
}

/* Panel: gemeinsamer Rahmen für Inline- und Sticky-Demo */
.panel {
  overflow: clip;
  border-radius: 14px;
  background: var(--card);
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 1px 2px rgb(var(--shadow) / 0.05),
    0 32px 64px -40px rgb(var(--shadow) / 0.4);
}

.panel-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 0 8px 0 14px;
  border-bottom: 1px solid var(--line);
  background: var(--sunken);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.panel-title {
  color: var(--ink);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.panel-title b {
  margin-right: 6px;
  color: var(--muted);
  font-weight: 500;
}

.panel-live {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding-right: 6px;
  color: var(--muted);
  white-space: nowrap;
}

.panel-live i {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
}

.panel-body {
  min-height: 320px;
  padding: 22px 20px;
  background: var(--paper);
}

.panel-foot {
  min-height: 46px;
  padding: 12px 16px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.panel-foot .hashtag {
  font-size: 1em;
}

.panel-key {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  margin-left: 2px;
  padding-inline: 4px;
  border: 1px solid var(--key-hot-edge);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: var(--key-hot);
  color: var(--on-key-hot);
  font-weight: 600;
  vertical-align: -3px;
}

.how-aside {
  display: none;
}

/* Zustände übereinander, sauber überblendet */
.panel-stack {
  display: grid;
}

.panel-stack > .panel-state {
  grid-area: 1 / 1;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition:
    opacity 0.32s ease,
    transform 0.5s var(--ease-out),
    visibility 0s linear 0.32s;
}

.panel-stack > .panel-state-on {
  visibility: visible;
  opacity: 1;
  transform: none;
  transition:
    opacity 0.45s ease 0.12s,
    transform 0.6s var(--ease-out) 0.12s,
    visibility 0s;
}

.panel-tabs {
  display: flex;
  gap: 2px;
  min-width: 0;
}

.panel-tab {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 30px;
  padding: 0 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.71875rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background-color 0.25s, color 0.25s, box-shadow 0.25s;
}

.panel-tab b {
  font-weight: 500;
  opacity: 0.7;
}

.panel-tab:hover {
  color: var(--ink);
}

.panel-tab-on {
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
}

@media (min-width: 960px) {
  .how-grid {
    grid-template-columns: minmax(0, 0.82fr) minmax(0, 1fr);
    gap: clamp(48px, 6vw, 96px);
  }

  .how-track {
    padding-left: 52px;
  }

  /* Dünner Fortschrittsbalken neben den Schritten */
  .how-rail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 14px;
    display: block;
    width: 2px;
    border-radius: 2px;
    background: var(--line);
  }

  .how-rail-fill {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background: var(--ink);
    transform-origin: top;
    will-change: transform;
  }

  .how-steps {
    gap: 0;
  }

  .how-step {
    position: relative;
    align-content: center;
    min-height: 74vh;
    padding-block: 48px;
  }

  .how-step-num {
    position: absolute;
    left: -52px;
    width: 30px;
    height: 30px;
  }

  .how-step-label {
    padding-left: 0;
  }

  .how-step-title,
  .how-step-body,
  .how-step-chips {
    transition: opacity 0.4s ease, color 0.4s ease;
  }

  .how-step:not(.how-step-on) .how-step-title {
    color: var(--muted);
    opacity: 0.7;
  }

  .how-step:not(.how-step-on) .how-step-body,
  .how-step:not(.how-step-on) .how-step-chips {
    opacity: 0.4;
  }

  .how-step-on .how-step-num {
    background: var(--primary);
    box-shadow: none;
    color: var(--on-primary);
  }

  .how-inline {
    display: none;
  }

  .how-aside {
    display: block;
  }

  .how-sticky .panel-live {
    display: none;
  }

  .how-sticky .panel-tab {
    padding-inline: 8px;
  }

  .how-sticky {
    position: sticky;
    top: max(calc(var(--header-h) + 24px), calc(50vh - 236px));
  }
}

@media (min-width: 1200px) {
  .how-sticky .panel-live {
    display: inline-flex;
  }

  .how-sticky .panel-tab {
    padding-inline: 10px;
  }
}

@media (max-width: 479px) {
  .panel-body {
    padding: 18px 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .panel-stack > .panel-state,
  .panel-stack > .panel-state-on {
    transform: none;
    transition: none;
  }
}
</style>
