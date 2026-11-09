<template>
  <div ref="root" class="cap">
    <form class="cap-field" @submit.prevent="add">
      <label for="n1-capture" class="sr-only">Aufgabe suchen oder anlegen</label>
      <input
        id="n1-capture"
        v-model="query"
        autocomplete="off"
        spellcheck="false"
        placeholder="Find or create..."
        @focus="stop"
        @keydown="stop"
      >
      <KeyCap hot :pressed="pressed" class="cap-key" aria-hidden="true">↵</KeyCap>
    </form>

    <TransitionGroup tag="ul" name="cap" class="cap-list" aria-live="polite">
      <li v-for="task in visible" :key="task.id" class="cap-row" :class="{ 'cap-row-new': task.id === newId }">
        <Circle aria-hidden="true" />
        <span class="cap-name">{{ task.name }}</span>
        <span v-for="tag in task.tags" :key="tag" class="hashtag cap-tag">#{{ tag }}</span>
      </li>
      <li v-if="visible.length === 0" key="empty" class="cap-empty">
        Keine Treffer. <KeyCap>↵</KeyCap> legt „{{ preview }}“ an.
      </li>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

type Row = { id: number, name: string, tags: string[] }

const TAG = /#([\p{L}\d_-]+)/gu
const AUTOPLAY = 'Logo für Praxis Klein anpassen #kunde'

const root = ref<HTMLElement | null>(null)
const query = ref('')
const pressed = ref(false)
const newId = ref<number | null>(null)
const rows = ref<Row[]>([
  { id: 1, name: 'Rückruf Frau Weber wegen Newsletter-Vorlage', tags: ['kunde'] },
  { id: 2, name: 'SSL-Zertifikat für shop.hansen.de erneuern', tags: ['ops'] },
  { id: 3, name: 'Bilder für die Teamseite komprimieren', tags: ['design'] },
])
let nextId = 4

const preview = computed(() => query.value.replace(TAG, '').replace(/\s+/g, ' ').trim() || query.value.trim())

// Wie in der App: Während du tippst, filtert die Liste
const visible = computed(() => {
  const words = query.value.toLowerCase().split(/\s+/).filter(Boolean)
  if (!words.length) return rows.value
  return rows.value.filter((row) => {
    const hay = `${row.name} ${row.tags.map(t => `#${t}`).join(' ')}`.toLowerCase()
    return words.every(word => hay.includes(word))
  })
})

function add() {
  const name = query.value.replace(TAG, '').replace(/\s+/g, ' ').trim()
  if (!name) return
  const tags = [...query.value.matchAll(TAG)].map(m => m[1]!.toLowerCase())
  const row = { id: nextId++, name, tags }
  rows.value = [row, ...rows.value].slice(0, 4)
  newId.value = row.id
  query.value = ''
  pressed.value = true
  setTimeout(() => (pressed.value = false), 180)
}

// Einmal vormachen, sobald der Schritt im Blick ist. Eigene Eingabe bricht ab.
let timer: ReturnType<typeof setTimeout> | undefined
let observer: IntersectionObserver | null = null
let playing = false
let played = false

function play() {
  if (played) return
  played = true
  playing = true
  let i = 0
  const step = () => {
    if (!playing) return
    if (i < AUTOPLAY.length) {
      query.value = AUTOPLAY.slice(0, ++i)
      timer = setTimeout(step, 45 + Math.random() * 50)
    } else {
      timer = setTimeout(() => {
        playing = false
        add()
      }, 650)
    }
  }
  timer = setTimeout(step, 500)
}

function stop() {
  played = true
  if (!playing) return
  playing = false
  clearTimeout(timer)
  query.value = ''
}

onMounted(() => {
  if (!root.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  observer = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      observer?.disconnect()
      play()
    }
  }, { threshold: 0.7 })
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(timer)
})
</script>

<style scoped>
.cap {
  display: grid;
  gap: 10px;
}

.cap-field {
  position: relative;
  margin-bottom: 4px;
}

.cap-field input {
  width: 100%;
  height: 48px;
  padding: 0 52px 0 14px;
  border: 0;
  border-radius: 10px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  transition: box-shadow 0.15s;
}

.cap-field input:hover {
  box-shadow: inset 0 0 0 1.5px var(--muted);
}

.cap-field input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--primary);
}

.cap-field input::placeholder {
  color: var(--muted);
}

.cap-key {
  position: absolute;
  top: 50%;
  right: 10px;
  translate: 0 -50%;
  font-size: 0.875rem;
}

.cap-list {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  min-height: 196px;
  align-content: start;
  margin: 0;
  padding: 0;
  list-style: none;
}

.cap-row {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--sunken);
  color: var(--ink);
  font-size: 0.9375rem;
}

.cap-row svg {
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
  flex-shrink: 0;
  font-size: 0.8125rem;
}

.cap-row-new {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--primary);
}

.cap-empty {
  padding: 12px 14px;
  border: 1.5px dashed var(--line-strong);
  border-radius: 8px;
  color: var(--muted);
  font-size: 0.9375rem;
}

.cap-move,
.cap-enter-active,
.cap-leave-active {
  transition: opacity 0.3s var(--n1-ease), transform 0.4s var(--n1-ease);
}

.cap-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}

.cap-leave-to {
  opacity: 0;
}

.cap-leave-active {
  position: absolute;
  transition-duration: 0.12s;
}

@media (prefers-reduced-motion: reduce) {
  .cap-move,
  .cap-enter-active,
  .cap-leave-active {
    transition: none;
  }
}
</style>
