<template>
  <div class="ladder">
    <p class="ladder-task">Rückruf Frau Weber wegen Newsletter-Vorlage <span class="hashtag">#kunde</span></p>
    <div class="ladder-keys">
      <button
        v-for="step in steps"
        :key="step.label"
        type="button"
        class="ladder-key"
        :aria-label="`Frist um ${step.spoken} verschieben`"
        @click="push(step.minutes)"
      >+{{ step.label }}</button>
    </div>
    <p class="ladder-result" aria-live="polite">
      <template v-if="due">Fällig {{ dueText }}</template>
      <template v-else>Keine Frist gesetzt</template>
    </p>
    <button v-if="due" type="button" class="ladder-reset" @click="due = null">Frist entfernen</button>
  </div>
</template>

<script setup lang="ts">
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

const dueText = computed(() => {
  if (!due.value) return ''
  const now = new Date()
  const days = Math.round((startOfDay(due.value) - startOfDay(now)) / 86_400_000)
  const time = due.value.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })
  if (days === 0) return `heute, ${time} Uhr`
  if (days === 1) return `morgen, ${time} Uhr`
  return `am ${due.value.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}`
})

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}
</script>

<style scoped>
.ladder {
  display: grid;
  gap: 16px;
}

.ladder-task {
  color: var(--ink);
  font-weight: 500;
}

.ladder-keys {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.ladder-key {
  min-width: 52px;
  padding: 7px 10px 5px;
  border: 1px solid var(--key-edge);
  border-bottom-width: 3px;
  border-radius: 7px;
  background: var(--key);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.06s, border-bottom-width 0.06s;
}

.ladder-key:hover {
  border-color: var(--accent);
}

.ladder-key:active {
  border-bottom-width: 1px;
  transform: translateY(2px);
}

.ladder-result {
  color: var(--accent-ink);
  font-weight: 600;
}

.ladder-reset {
  justify-self: start;
  padding: 0;
  border: 0;
  background: none;
  color: var(--muted);
  font-size: 0.875rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}
</style>
