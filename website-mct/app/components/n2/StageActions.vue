<!-- Schritt 4: Jede Aktion ist ein Klick direkt an der Aufgabe. -->
<template>
  <div class="act">
    <div class="act-task" :class="`act-${status}`">
      <component :is="statusIcon" class="act-status" aria-hidden="true" />
      <span class="act-name">Dependabot-PRs durchsehen und mergen <span class="act-tag">#dev</span></span>
      <span class="act-badges">
        <Star v-if="starred" class="act-badge act-badge-star" aria-label="Mit Stern" />
        <TriangleAlert v-if="important" class="act-badge act-badge-red" aria-label="Wichtig" />
      </span>
    </div>

    <div class="act-bar" role="toolbar" aria-label="Aktionen an der Aufgabe">
      <button
        v-for="action in actions"
        :key="action.key"
        type="button"
        class="act-btn"
        :class="{ 'act-btn-down': down === action.key }"
        :aria-pressed="isOn(action.key)"
        @click="stop(); run(action.key)"
      >
        <component :is="action.icon" aria-hidden="true" />
        <span>{{ action.label }}</span>
      </button>
    </div>

    <p class="act-log" aria-live="polite">
      <span class="act-log-dot" />{{ log }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Circle, CircleCheck, CirclePlay, Star, Telescope, Trash2, TriangleAlert } from '@lucide/vue'

const props = defineProps<{ active: boolean, uid?: string }>()

type Status = 'open' | 'progress' | 'done' | 'backlog' | 'trash'
type Key = 'star' | 'important' | Exclude<Status, 'open'>

const actions = [
  { key: 'star', label: 'Stern', icon: Star },
  { key: 'important', label: 'Wichtig', icon: TriangleAlert },
  { key: 'progress', label: 'In Arbeit', icon: CirclePlay },
  { key: 'done', label: 'Erledigt', icon: CircleCheck },
  { key: 'backlog', label: 'Backlog', icon: Telescope },
  { key: 'trash', label: 'Papierkorb', icon: Trash2 },
] as const

const statusLog: Record<Status, string> = {
  open: 'Status: offen',
  progress: 'Status: in Arbeit',
  done: 'Status: erledigt',
  backlog: 'Ins Backlog verschoben',
  trash: 'In den Papierkorb verschoben',
}

const status = ref<Status>('open')
const starred = ref(false)
const important = ref(false)
const log = ref('Ein Klick genügt, kein Dialog, nichts zu speichern')
const down = ref<Key | null>(null)
let touched = false
let timers: ReturnType<typeof setTimeout>[] = []

const statusIcon = computed(() => {
  if (status.value === 'done') return CircleCheck
  if (status.value === 'progress') return CirclePlay
  if (status.value === 'backlog') return Telescope
  if (status.value === 'trash') return Trash2
  return Circle
})

function isOn(key: Key) {
  if (key === 'star') return starred.value
  if (key === 'important') return important.value
  return status.value === key
}

function run(key: Key) {
  down.value = key
  setTimeout(() => {
    if (down.value === key) down.value = null
  }, 160)
  if (key === 'star') {
    starred.value = !starred.value
    log.value = starred.value ? 'Stern gesetzt' : 'Stern entfernt'
  } else if (key === 'important') {
    important.value = !important.value
    log.value = important.value ? 'Als wichtig markiert' : 'Markierung entfernt'
  } else {
    status.value = status.value === key ? 'open' : key
    log.value = statusLog[status.value]
  }
}

function later(fn: () => void, ms: number) {
  timers.push(setTimeout(fn, ms))
}

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
  status.value = 'open'
  starred.value = false
  important.value = false
  log.value = 'Ein Klick genügt, kein Dialog, nichts zu speichern'
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  later(() => run('star'), 700)
  later(() => run('progress'), 1600)
  later(() => run('done'), 2600)
}

watch(() => props.active, (on) => {
  if (touched) return
  if (on) play()
  else clear()
})

onBeforeUnmount(clear)
</script>

<style scoped>
.act {
  display: grid;
  gap: 16px;
}

.act-task {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 48px;
  padding: 9px 12px;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1.5px var(--ink);
  color: var(--ink);
  font-size: 0.875rem;
  transition: opacity 0.25s, box-shadow 0.25s;
}

.act-status {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  color: var(--muted);
}

.act-progress .act-status {
  color: var(--teal);
}

.act-done .act-status {
  color: var(--green);
}

.act-name {
  flex: 1;
  min-width: 0;
  transition: color 0.2s;
}

.act-done .act-name {
  color: var(--muted);
  text-decoration: line-through;
}

.act-backlog,
.act-trash {
  opacity: 0.5;
}

.act-tag {
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.act-badges {
  display: inline-flex;
  gap: 6px;
}

.act-badge {
  width: 16px;
  height: 16px;
}

.act-badge-star {
  color: var(--star);
  fill: currentColor;
}

.act-badge-red {
  color: var(--red);
}

.act-bar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 6px;
}

.act-btn {
  display: grid;
  justify-items: center;
  gap: 5px;
  padding: 10px 4px 8px;
  border: 0;
  border-radius: 8px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s, transform 0.08s;
}

.act-btn svg {
  width: 18px;
  height: 18px;
}

.act-btn span {
  font-family: var(--font-mono);
  font-size: 0.6875rem;
  white-space: nowrap;
}

.act-btn:hover {
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--ink);
}

.act-btn[aria-pressed='true'] {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.act-btn:active,
.act-btn-down {
  transform: scale(0.95);
}

.act-log {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 24px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.act-log-dot {
  width: 6px;
  height: 6px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--green);
}

@media (min-width: 520px) {
  .act-bar {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (prefers-reduced-motion: reduce) {
  .act-task,
  .act-btn {
    transition: none;
  }
}
</style>
