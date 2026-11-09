<!-- Schritt 2: #tag filtert, -#tag blendet aus. Chips schalten: aus, filtern, ausblenden. -->
<template>
  <div class="tags">
    <div class="tags-field">
      <label :for="`${uid}-tags`" class="sr-only">Nach Hashtags filtern</label>
      <input
        :id="`${uid}-tags`"
        v-model="query"
        autocomplete="off"
        spellcheck="false"
        placeholder="Find or create..."
        @focus="stop"
        @keydown="stop"
      >
      <span class="tags-count" aria-live="polite">{{ hits }} / {{ tasks.length }}</span>
    </div>

    <div class="tags-chips" role="group" aria-label="Hashtags">
      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        class="tags-chip"
        :class="`tags-chip-${modeOf(tag)}`"
        :aria-label="`#${tag}: ${modeLabel[modeOf(tag)]}`"
        @click="cycle(tag)"
      >
        <span v-if="modeOf(tag) === 'out'" aria-hidden="true">-</span>#{{ tag }}
      </button>
    </div>

    <ul class="tags-list">
      <li v-for="task in tasks" :key="task.id" class="tags-row" :class="{ 'tags-row-out': !matches(task) }">
        <div class="tags-row-inner">
          <Circle class="tags-check" aria-hidden="true" />
          <span class="tags-name">{{ task.name }}</span>
          <span v-for="tag in task.tags" :key="tag" class="tags-tag">#{{ tag }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

const props = defineProps<{ active: boolean, uid: string }>()

type Mode = 'off' | 'in' | 'out'
const TAG = /(-?)#([\p{L}\d_-]+)/gu
const modeLabel: Record<Mode, string> = { off: 'aus', in: 'filtert', out: 'blendet aus' }

const tasks = [
  { id: 1, name: 'Relaunch Bäckerei Hansen: Abnahme', tags: ['kunde'] },
  { id: 2, name: 'Login-Fehler nachstellen', tags: ['bug'] },
  { id: 3, name: 'Rückruf Frau Weber', tags: ['kunde'] },
  { id: 4, name: 'SSL-Zertifikat shop.hansen.de', tags: ['kunde', 'ops'] },
  { id: 5, name: 'Teamseite: Bilder komprimieren', tags: ['design'] },
]
const allTags = ['kunde', 'bug', 'ops', 'design']

const query = ref('')
let touched = false
let timers: ReturnType<typeof setTimeout>[] = []

const parsed = computed(() => {
  const include: string[] = []
  const exclude: string[] = []
  for (const m of query.value.matchAll(TAG)) (m[1] ? exclude : include).push(m[2]!.toLowerCase())
  // Halbfertige Eingaben wie "-" oder "#" filtern noch nicht
  const text = query.value.replace(TAG, '').replace(/(^|\s)-?#?(?=\s|$)/g, ' ').trim().toLowerCase()
  return { include, exclude, text }
})

function matches(task: { name: string, tags: string[] }) {
  const { include, exclude, text } = parsed.value
  // Präfix, damit die Liste beim Tippen von "#kunde" nicht kurz leer wird
  return include.every(t => task.tags.some(tag => tag.startsWith(t)))
    && !exclude.some(t => task.tags.some(tag => tag.startsWith(t)))
    && task.name.toLowerCase().includes(text)
}

const hits = computed(() => tasks.filter(matches).length)

function modeOf(tag: string): Mode {
  if (parsed.value.exclude.includes(tag)) return 'out'
  if (parsed.value.include.includes(tag)) return 'in'
  return 'off'
}

function cycle(tag: string) {
  stop()
  const mode = modeOf(tag)
  const rest = query.value
    .split(/\s+/)
    .filter(token => token && token !== `#${tag}` && token !== `-#${tag}`)
  if (mode === 'off') rest.push(`#${tag}`)
  if (mode === 'in') rest.push(`-#${tag}`)
  query.value = rest.join(' ')
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

function type(target: string, then?: () => void) {
  const step = () => {
    if (query.value.length < target.length) {
      query.value = target.slice(0, query.value.length + 1)
      later(step, 70 + Math.random() * 40)
    } else if (then) {
      then()
    }
  }
  step()
}

function play() {
  clear()
  query.value = ''
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    query.value = '#kunde -#ops'
    return
  }
  later(() => type('#kunde', () => later(() => type('#kunde -#ops'), 1300)), 600)
}

watch(() => props.active, (on) => {
  if (touched) return
  if (on) play()
  else clear()
})

onBeforeUnmount(clear)
</script>

<style scoped>
.tags {
  display: grid;
  gap: 12px;
}

.tags-field {
  position: relative;
}

.tags-field input {
  width: 100%;
  height: 46px;
  padding: 0 72px 0 14px;
  border: 0;
  border-radius: 8px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
  font-weight: 500;
}

.tags-field input::placeholder {
  color: var(--muted);
  font-weight: 400;
}

.tags-field input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--ink);
}

.tags-count {
  position: absolute;
  top: 50%;
  right: 14px;
  translate: 0 -50%;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-variant-numeric: tabular-nums;
}

.tags-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags-chip {
  padding: 4px 9px;
  border: 0;
  border-radius: 6px;
  background: var(--chip);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
  transition: background-color 0.18s, color 0.18s, box-shadow 0.18s;
}

.tags-chip:hover {
  box-shadow: inset 0 0 0 1px var(--muted);
}

.tags-chip-in {
  background: var(--primary);
  color: var(--on-primary);
}

.tags-chip-out {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
  text-decoration: line-through;
}

.tags-list {
  display: grid;
  padding: 0;
  list-style: none;
}

.tags-row {
  display: grid;
  grid-template-rows: 1fr;
  transition: grid-template-rows 0.36s var(--ease-out), opacity 0.26s;
}

.tags-row-inner {
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
  transition: padding 0.36s var(--ease-out), margin 0.36s var(--ease-out);
}

.tags-row-out {
  grid-template-rows: 0fr;
  opacity: 0;
}

.tags-row-out .tags-row-inner {
  margin-bottom: 0;
  padding-block: 0;
}

.tags-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--muted);
}

.tags-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tags-tag {
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

@media (prefers-reduced-motion: reduce) {
  .tags-row,
  .tags-row-inner {
    transition: none;
  }
}
</style>
