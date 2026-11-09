<template>
  <div class="n3-stage due">
    <div class="n3-row due-task" :class="{ 'due-set': due }">
      <span class="n3-row-icon" aria-hidden="true"><Circle /></span>
      <span class="n3-row-name">Vermieter wegen Heizung zurückrufen <span class="n3-row-tag">#wohnung</span></span>
    </div>

    <div class="due-keys" role="group" aria-label="Frist verschieben">
      <button
        v-for="step in steps"
        :key="step.label"
        type="button"
        class="due-key"
        :class="{ 'is-pressed': pressedKey === step.label }"
        :aria-label="`Frist um ${step.spoken} verschieben`"
        @click="push(step)"
      >+{{ step.label }}</button>
    </div>

    <div class="due-result">
      <p class="due-line" aria-live="polite">
        <AlarmClock class="due-icon" aria-hidden="true" />
        <span v-if="due">Fällig <b>{{ dueText }}</b></span>
        <span v-else class="due-none">Noch keine Frist</span>
      </p>
      <button v-if="due" type="button" class="due-reset" @click="reset">Frist entfernen</button>
    </div>
    <p class="n3-note">Beispiel: Es ist 13:30 Uhr.</p>
  </div>
</template>

<script setup lang="ts">
import { AlarmClock, Circle } from '@lucide/vue'

const props = defineProps<{ play: boolean }>()

// Dieselben Schritte wie in der App. Die Uhr steht für die Erzählung auf 13:30 Uhr.
const steps = [
  { label: '5m', spoken: '5 Minuten', minutes: 5 },
  { label: '1h', spoken: '1 Stunde', minutes: 60 },
  { label: '1d', spoken: '1 Tag', minutes: 60 * 24 },
  { label: '1w', spoken: '1 Woche', minutes: 60 * 24 * 7 },
  { label: '1mo', spoken: '1 Monat', minutes: 60 * 24 * 30 },
  { label: '90d', spoken: '90 Tage', minutes: 60 * 24 * 90 },
]

function storyNow() {
  const d = new Date()
  d.setHours(13, 30, 0, 0)
  return d
}

const due = ref<Date | null>(null)
const pressedKey = ref<string | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let touched = false

function push(step: typeof steps[number], fromUser = true) {
  if (fromUser) touched = true
  const base = due.value ?? storyNow()
  due.value = new Date(base.getTime() + step.minutes * 60_000)
  pressedKey.value = step.label
  setTimeout(() => (pressedKey.value = null), 160)
}

function reset() {
  touched = true
  due.value = null
}

const dueText = computed(() => {
  if (!due.value) return ''
  const start = storyNow()
  start.setHours(0, 0, 0, 0)
  const day = new Date(due.value)
  day.setHours(0, 0, 0, 0)
  const days = Math.round((day.getTime() - start.getTime()) / 86_400_000)
  const time = due.value.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  if (days === 0) return `heute, ${time} Uhr`
  if (days === 1) return `morgen, ${time} Uhr`
  return `${due.value.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}, ${time} Uhr`
})

watch(() => props.play, (play) => {
  if (!play) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setTimeout(() => {
    if (!touched) push(steps[1]!, false)
  }, reduce ? 0 : 800)
}, { once: true })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.due-task {
  transition: box-shadow 0.3s;
}

.due-set {
  box-shadow: inset 3px 0 0 var(--accent);
}

.due-keys {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin-top: 4px;
}

.due-key {
  min-height: 42px;
  padding: 6px 8px 4px;
  border: 1px solid var(--key-edge);
  border-bottom-width: 3px;
  border-radius: 8px;
  background: var(--key);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.06s, border-bottom-width 0.06s, border-color 0.15s, background-color 0.15s, color 0.15s;
}

.due-key:hover {
  border-color: var(--accent);
}

.due-key:active,
.due-key.is-pressed {
  border-color: var(--key-hot-edge);
  border-bottom-width: 1px;
  background: var(--key-hot);
  color: var(--on-key-hot);
  transform: translateY(2px);
}

.due-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 6px 16px;
  min-height: 44px;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--surface);
}

.due-line {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
}

.due-line b {
  color: var(--accent-ink);
  font-weight: 600;
}

.due-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--accent-ink);
}

.due-none {
  color: var(--muted);
}

.due-reset {
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: 0.8125rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.due-reset:hover {
  color: var(--ink);
}

@media (min-width: 520px) {
  .due-keys {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .due-key {
    transition: none;
  }
}
</style>
