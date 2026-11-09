<!-- Schritt 1: Ein Feld sucht und legt an. Tippt sich beim Aktivieren selbst vor. -->
<template>
  <div class="cap">
    <form class="cap-field" @submit.prevent="submit">
      <label :for="`${uid}-capture`" class="sr-only">Aufgabe suchen oder anlegen</label>
      <input
        :id="`${uid}-capture`"
        v-model="query"
        autocomplete="off"
        spellcheck="false"
        placeholder="Find or create..."
        @focus="stop"
        @keydown="stop"
      >
      <KeyCap class="cap-key" hot :pressed="pressed" aria-hidden="true">⏎</KeyCap>
    </form>

    <ul class="cap-list" aria-live="polite">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="cap-row"
        :class="{ 'cap-row-out': !matches(task), 'cap-row-new': task.id === newId }"
      >
        <div class="cap-row-inner">
          <Circle class="cap-check" aria-hidden="true" />
          <span class="cap-name">{{ task.name }}</span>
          <span v-for="tag in task.tags" :key="tag" class="cap-tag">#{{ tag }}</span>
        </div>
      </li>
      <li class="cap-row cap-empty" :class="{ 'cap-row-out': hits > 0 || !text }">
        <div class="cap-row-inner">
          <span>Keine Treffer.</span>
          <span class="cap-empty-key">⏎</span>
          <span>legt „{{ text }}“ an</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

const props = defineProps<{ active: boolean, uid: string }>()

type Task = { id: number, name: string, tags: string[] }
const TAG = /(-?)#([\p{L}\d_-]+)/gu
const SCRIPT = 'Logo für Praxis Dr. Klein anpassen #kunde'

const seed: Task[] = [
  { id: 1, name: 'Rückruf Frau Weber wegen Newsletter-Vorlage', tags: ['kunde'] },
  { id: 2, name: 'Login-Fehler nach Passwort-Reset nachstellen', tags: ['bug'] },
  { id: 3, name: 'SSL-Zertifikat für shop.hansen.de erneuern', tags: ['ops'] },
]

const tasks = ref<Task[]>(seed.map(t => ({ ...t })))
const query = ref('')
const pressed = ref(false)
const newId = ref<number | null>(null)
let nextId = 10
let touched = false
let timers: ReturnType<typeof setTimeout>[] = []

const text = computed(() => query.value.replace(TAG, '').replace(/\s+/g, ' ').trim())
const tags = computed(() => [...query.value.matchAll(TAG)].filter(m => !m[1]).map(m => m[2]!.toLowerCase()))

function matches(task: Task) {
  return task.name.toLowerCase().includes(text.value.toLowerCase())
    && tags.value.every(tag => task.tags.includes(tag))
}

const hits = computed(() => tasks.value.filter(matches).length)

function submit() {
  if (!text.value) return
  const id = nextId++
  tasks.value.unshift({ id, name: text.value, tags: tags.value })
  newId.value = id
  query.value = ''
  pressed.value = true
  later(() => (pressed.value = false), 170)
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
  query.value = ''
}

function play() {
  clear()
  tasks.value = seed.map(t => ({ ...t }))
  newId.value = null
  query.value = ''
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    tasks.value.unshift({ id: nextId++, name: 'Logo für Praxis Dr. Klein anpassen', tags: ['kunde'] })
    return
  }
  let typed = 0
  const step = () => {
    if (typed < SCRIPT.length) {
      query.value = SCRIPT.slice(0, ++typed)
      later(step, 38 + Math.random() * 46)
    } else {
      later(submit, 650)
    }
  }
  later(step, 550)
}

watch(() => props.active, (on) => {
  if (touched) return
  if (on) play()
  else clear()
})

onBeforeUnmount(clear)
</script>

<style scoped>
.cap {
  display: grid;
  gap: 12px;
}

.cap-field {
  position: relative;
}

.cap-field input {
  width: 100%;
  height: 46px;
  padding: 0 52px 0 14px;
  border: 0;
  border-radius: 8px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.cap-field input::placeholder {
  color: var(--muted);
}

.cap-field input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--ink);
}

.cap-key {
  position: absolute;
  top: 50%;
  right: 10px;
  translate: 0 -50%;
  font-size: 0.875rem;
}

.cap-list {
  display: grid;
  padding: 0;
  list-style: none;
}

/* Zeilen klappen weich zu, wenn sie nicht passen */
.cap-row {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.32s var(--ease-out), opacity 0.24s;
}

.cap-row-inner {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 0;
  margin-bottom: 4px;
  padding: 9px 12px;
  overflow: hidden;
  border-radius: 8px;
  background: var(--surface);
  color: var(--ink);
  font-size: 0.875rem;
}

.cap-row-out {
  grid-template-rows: 0fr;
  opacity: 0;
}

.cap-row-out .cap-row-inner {
  padding-block: 0;
  margin-bottom: 0;
}

.cap-row-inner,
.cap-row-out .cap-row-inner {
  transition: padding 0.32s var(--ease-out), margin 0.32s var(--ease-out), background-color 1.2s;
}

.cap-row-new .cap-row-inner {
  animation: cap-arrive 1.6s var(--ease-out);
}

@keyframes cap-arrive {
  from {
    background: var(--accent-soft);
    box-shadow: inset 0 0 0 1px var(--accent);
  }
}

.cap-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--muted);
}

.cap-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.cap-tag {
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.cap-empty .cap-row-inner {
  flex-wrap: wrap;
  gap: 6px;
  background: transparent;
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--muted);
  border-radius: 8px;
}

.cap-empty-key {
  display: inline-grid;
  place-items: center;
  min-width: 22px;
  height: 20px;
  padding-inline: 4px;
  border: 1px solid var(--key-hot-edge);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: var(--key-hot);
  color: var(--on-key-hot);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 600;
}

@media (prefers-reduced-motion: reduce) {
  .cap-row,
  .cap-row-inner {
    transition: none;
  }

  .cap-row-new .cap-row-inner {
    animation: none;
  }
}
</style>
