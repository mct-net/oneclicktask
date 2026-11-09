<template>
  <div class="n3-stage capture">
    <form class="capture-form" @submit.prevent="submit">
      <label for="n3-capture-input" class="sr-only">Aufgabe eintippen, Enter legt sie an</label>
      <div class="n3-field capture-field">
        <input
          id="n3-capture-input"
          v-model="text"
          class="capture-input"
          autocomplete="off"
          spellcheck="false"
          placeholder="Find or create..."
          @focus="stop"
          @pointerdown="stop"
        >
        <button type="submit" class="capture-enter" aria-label="Aufgabe anlegen">
          <KeyCap hot :pressed="pressed">↵</KeyCap>
        </button>
      </div>
    </form>

    <ul class="capture-list" aria-live="polite">
      <li v-for="task in tasks" :key="task.id" class="n3-row" :class="{ 'capture-new': task.id === newId }">
        <span class="n3-row-icon" aria-hidden="true"><Circle /></span>
        <span class="n3-row-name">{{ task.name }} <span v-for="tag in task.tags" :key="tag" class="n3-row-tag">#{{ tag }}</span></span>
      </li>
    </ul>
    <p class="n3-note">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

const props = defineProps<{ play: boolean }>()

const TAG = /#([\p{L}\d_-]+)/gu
const SCRIPT = 'Zahnarzttermin ausmachen #privat'

type Task = { id: number, name: string, tags: string[] }

const tasks = ref<Task[]>([
  { id: 1, name: 'Folien für Donnerstag gliedern', tags: ['arbeit'] },
  { id: 2, name: 'Nebenkostenabrechnung prüfen', tags: ['wohnung'] },
])
const text = ref('')
const pressed = ref(false)
const newId = ref<number | null>(null)
const note = ref('Tippen, Enter, gespeichert.')
let nextId = 3
let timer: ReturnType<typeof setTimeout> | undefined
let auto = false

function submit() {
  const name = text.value.replace(TAG, '').replace(/\s+/g, ' ').trim()
  if (!name) return
  const tags = [...text.value.matchAll(TAG)].map(m => m[1]!.toLowerCase())
  const task = { id: nextId++, name, tags }
  tasks.value = [task, ...tasks.value].slice(0, 4)
  newId.value = task.id
  text.value = ''
  note.value = `Angelegt: „${name}“`
  pressed.value = true
  setTimeout(() => (pressed.value = false), 160)
}

// Einmal vormachen, sobald die Zeitleiste hier ankommt. Eigene Eingabe bricht ab.
function start() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    text.value = SCRIPT
    submit()
    return
  }
  auto = true
  let typed = 0
  const step = () => {
    if (!auto) return
    if (typed < SCRIPT.length) {
      text.value = SCRIPT.slice(0, ++typed)
      timer = setTimeout(step, 45 + Math.random() * 50)
    } else {
      timer = setTimeout(() => {
        auto = false
        submit()
      }, 550)
    }
  }
  timer = setTimeout(step, 400)
}

function stop() {
  if (!auto) return
  auto = false
  clearTimeout(timer)
  text.value = ''
}

watch(() => props.play, (play) => {
  if (play) start()
}, { once: true })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.capture-field {
  padding-left: 0;
}

.capture-field:focus-within {
  box-shadow: inset 0 0 0 2px var(--accent);
}

.capture-input {
  flex: 1;
  min-width: 0;
  height: 42px;
  padding: 0 0 0 12px;
  border: 0;
  background: none;
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.capture-input:focus-visible {
  outline: 0;
}

.capture-input::placeholder {
  color: var(--muted);
}

.capture-enter {
  display: grid;
  place-items: center;
  padding: 4px;
  border: 0;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  font-size: 1rem;
}

.capture-list {
  display: grid;
  gap: 4px;
  padding: 0;
  list-style: none;
}

.capture-new {
  animation: n3-arrive 0.6s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .capture-new {
    animation: none;
  }
}
</style>
