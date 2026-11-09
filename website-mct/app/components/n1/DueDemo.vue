<template>
  <div class="due">
    <div class="due-task">
      <Circle aria-hidden="true" />
      <span class="due-name">Rückruf Frau Weber wegen Newsletter-Vorlage <span class="hashtag">#kunde</span></span>
    </div>

    <div class="due-keys" role="group" aria-label="Frist setzen">
      <button
        v-for="step in steps"
        :key="step.label"
        type="button"
        class="due-key"
        :aria-label="`Frist um ${step.spoken} verschieben`"
        @click="push(step.minutes)"
      >+{{ step.label }}</button>
    </div>

    <div class="due-result">
      <p aria-live="polite">
        <template v-if="due"><Clock aria-hidden="true" />Fällig {{ dueText }}</template>
        <template v-else>Keine Frist gesetzt</template>
      </p>
      <button v-if="due" type="button" class="due-reset" @click="due = null">Frist entfernen</button>
    </div>

    <p class="due-counts" aria-label="Fälligkeiten im Board">
      <span v-for="c in counts" :key="c.label" :class="{ 'due-count-hit': c.hit }"><b>{{ c.label }}:</b> {{ c.value }}</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Circle, Clock } from '@lucide/vue'

// Kopie von DueLadder, ergänzt um die Fälligkeitszeile unter der Liste.
// Dieselben Schritte wie in der App: +5m, +1h, +1d, +1w, +1mo, +90d
const steps = [
  { label: '5m', spoken: '5 Minuten', minutes: 5 },
  { label: '1h', spoken: '1 Stunde', minutes: 60 },
  { label: '1d', spoken: '1 Tag', minutes: 60 * 24 },
  { label: '1w', spoken: '1 Woche', minutes: 60 * 24 * 7 },
  { label: '1mo', spoken: '1 Monat', minutes: 60 * 24 * 30 },
  { label: '90d', spoken: '90 Tage', minutes: 60 * 24 * 90 },
]

const due = ref<Date | null>(null)

function push(minutes: number) {
  const base = due.value ?? new Date()
  due.value = new Date(base.getTime() + minutes * 60_000)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const days = computed(() => due.value ? Math.round((startOfDay(due.value) - startOfDay(new Date())) / 86_400_000) : null)

const dueText = computed(() => {
  if (!due.value) return ''
  const time = due.value.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  if (days.value === 0) return `heute, ${time} Uhr`
  if (days.value === 1) return `morgen, ${time} Uhr`
  return `am ${due.value.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}`
})

// Die übrigen Aufgaben im Board plus diese eine
const counts = computed(() => {
  const d = days.value
  const today = d === 0
  const tomorrow = d === 1
  const week = d !== null && d < 7
  return [
    { label: 'Today', value: 1 + (today ? 1 : 0), hit: today },
    { label: 'Tomorrow', value: 1 + (tomorrow ? 1 : 0), hit: tomorrow },
    { label: 'This week', value: 3 + (week ? 1 : 0), hit: week },
    { label: 'Overdue', value: 0, hit: false },
  ]
})
</script>

<style scoped>
.due {
  display: grid;
  gap: 16px;
}

.due-task {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 10px 14px 10px 12px;
  border-radius: 8px;
  background: var(--sunken);
  color: var(--ink);
}

.due-task svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--muted);
}

.due-name {
  min-width: 0;
}

.due-keys {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.due-key {
  min-width: 56px;
  padding: 8px 10px 6px;
  border: 1px solid var(--key-edge);
  border-bottom-width: 3px;
  border-radius: 8px;
  background: var(--key);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.06s, border-bottom-width 0.06s, border-color 0.15s, color 0.15s;
}

.due-key:hover {
  border-color: var(--primary);
  color: var(--accent-ink);
}

.due-key:active {
  border-bottom-width: 1px;
  transform: translateY(2px);
}

.due-result {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 8px 16px;
  min-height: 28px;
  color: var(--muted);
}

.due-result p {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.due-result p:has(svg) {
  color: var(--accent-ink);
  font-weight: 600;
}

.due-result svg {
  width: 16px;
  height: 16px;
}

.due-reset {
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: 0.875rem;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 3px;
  cursor: pointer;
}

.due-reset:hover {
  color: var(--ink);
  text-decoration-color: currentColor;
}

.due-counts {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  padding-top: 14px;
  border-top: 1px dashed var(--line-strong);
  color: var(--muted);
  font-size: 0.8125rem;
}

.due-counts b {
  color: var(--ink);
  font-weight: 600;
}

.due-counts span {
  padding: 2px 6px;
  margin-inline: -6px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

.due-counts .due-count-hit {
  background: var(--accent-soft);
  color: var(--accent-ink);
}

.due-count-hit b {
  color: inherit;
}

@media (prefers-reduced-motion: reduce) {
  .due-key,
  .due-counts span {
    transition: none;
  }
}
</style>
