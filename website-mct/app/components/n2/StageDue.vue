<!-- Schritt 3: Fristen über feste Schritte wie in der App: +5m, +1h, +1d, +1w, +1mo, +90d -->
<template>
  <div class="due">
    <div class="due-task">
      <Circle class="due-check" aria-hidden="true" />
      <span class="due-name">Rückruf Frau Weber wegen Newsletter-Vorlage <span class="due-tag">#kunde</span></span>
      <span class="due-badge" :class="{ 'due-badge-set': due, 'due-badge-flash': flash }">
        <Clock aria-hidden="true" />{{ due ? short : 'keine Frist' }}
      </span>
    </div>

    <div class="due-keys" role="group" aria-label="Frist verschieben">
      <button
        v-for="(step, index) in steps"
        :key="step.label"
        type="button"
        class="due-key"
        :class="{ 'due-key-down': down === index }"
        :aria-label="`Frist um ${step.spoken} verschieben`"
        @click="stop(); push(index)"
      >+{{ step.label }}</button>
    </div>

    <div class="due-foot">
      <p class="due-result" aria-live="polite">
        <template v-if="due">Fällig {{ long }}</template>
        <template v-else>Noch keine Frist gesetzt</template>
      </p>
      <button v-if="due" type="button" class="due-reset" @click="stop(); due = null">Frist entfernen</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Circle, Clock } from '@lucide/vue'

const props = defineProps<{ active: boolean, uid?: string }>()

const steps = [
  { label: '5m', spoken: '5 Minuten', minutes: 5 },
  { label: '1h', spoken: '1 Stunde', minutes: 60 },
  { label: '1d', spoken: '1 Tag', minutes: 60 * 24 },
  { label: '1w', spoken: '1 Woche', minutes: 60 * 24 * 7 },
  { label: '1mo', spoken: '1 Monat', minutes: 60 * 24 * 30 },
  { label: '90d', spoken: '90 Tage', minutes: 60 * 24 * 90 },
]

const due = ref<Date | null>(null)
const down = ref<number | null>(null)
const flash = ref(false)
let touched = false
let timers: ReturnType<typeof setTimeout>[] = []

function later(fn: () => void, ms: number) {
  timers.push(setTimeout(fn, ms))
}

function push(index: number) {
  const base = due.value ?? new Date()
  due.value = new Date(base.getTime() + steps[index]!.minutes * 60_000)
  down.value = index
  flash.value = false
  requestAnimationFrame(() => (flash.value = true))
  setTimeout(() => {
    if (down.value === index) down.value = null
  }, 160)
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime()
}

const days = computed(() => due.value ? Math.round((startOfDay(due.value) - startOfDay(new Date())) / 86_400_000) : 0)
const time = computed(() => due.value?.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) ?? '')

const short = computed(() => {
  if (!due.value) return ''
  if (days.value === 0) return `heute ${time.value}`
  if (days.value === 1) return `morgen ${time.value}`
  return due.value.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
})

const long = computed(() => {
  if (!due.value) return ''
  if (days.value === 0) return `heute, ${time.value} Uhr`
  if (days.value === 1) return `morgen, ${time.value} Uhr`
  return `am ${due.value.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}`
})

function clear() {
  timers.forEach(clearTimeout)
  timers = []
}

function stop() {
  if (touched) return
  touched = true
  clear()
}

function play() {
  clear()
  due.value = null
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    due.value = new Date(Date.now() + 86_400_000)
    return
  }
  later(() => push(1), 700)
  later(() => push(2), 1700)
}

watch(() => props.active, (on) => {
  if (touched) return
  if (on) play()
  else clear()
})

onBeforeUnmount(clear)
</script>

<style scoped>
.due {
  display: grid;
  gap: 18px;
}

.due-task {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 9px 10px 9px 12px;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--ink);
  color: var(--ink);
  font-size: 0.875rem;
}

.due-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--muted);
}

.due-name {
  flex: 1;
  min-width: 0;
}

.due-tag {
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.due-badge {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  gap: 5px;
  padding: 3px 8px;
  border-radius: 6px;
  background: var(--chip);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.71875rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.due-badge svg {
  width: 12px;
  height: 12px;
}

.due-badge-set {
  color: var(--ink);
}

.due-badge-flash {
  animation: due-flash 0.9s var(--ease-out);
}

@keyframes due-flash {
  from {
    background: var(--primary);
    color: var(--on-primary);
  }
}

.due-keys {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.due-key {
  height: 44px;
  padding: 0 6px 2px;
  border: 1px solid var(--key-edge);
  border-bottom-width: 4px;
  border-radius: 8px;
  background: var(--key);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.07s ease-out, border-bottom-width 0.07s ease-out, border-color 0.15s;
}

.due-key:hover {
  border-color: var(--muted);
}

.due-key:active,
.due-key-down {
  border-bottom-width: 1px;
  transform: translateY(3px);
}

.due-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 8px 16px;
  min-height: 26px;
}

.due-result {
  color: var(--ink);
  font-weight: 600;
  letter-spacing: -0.01em;
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

  .due-badge-flash {
    animation: none;
  }
}
</style>
