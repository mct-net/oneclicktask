<template>
  <div class="tags">
    <div class="tags-field">
      <label for="n1-tags" class="sr-only">Nach Hashtags filtern</label>
      <Search class="tags-search" aria-hidden="true" />
      <input id="n1-tags" v-model="query" autocomplete="off" spellcheck="false" placeholder="#tag oder -#tag">
      <button v-if="query" type="button" class="tags-clear" aria-label="Filter leeren" @click="query = ''"><X /></button>
    </div>

    <div class="tags-chips" role="group" aria-label="Tags">
      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        class="tags-chip"
        :class="{ 'tags-chip-off': parsed.exclude.includes(tag) }"
        :aria-pressed="parsed.include.includes(tag)"
        @click="toggle(tag)"
      >#{{ tag }}</button>
      <button type="button" class="tags-try" :disabled="parsed.exclude.includes('ops')" @click="hideOps">-#ops ausprobieren</button>
    </div>

    <TransitionGroup tag="ul" name="tagrow" class="tags-list">
      <li v-for="task in visible" :key="task.id" class="tags-row">
        <Circle aria-hidden="true" />
        <span class="tags-name">{{ task.name }}</span>
        <span v-for="tag in task.tags" :key="tag" class="hashtag tags-tag">#{{ tag }}</span>
      </li>
      <li v-if="visible.length === 0" key="empty" class="tags-empty">Keine Aufgabe passt zu diesem Filter.</li>
    </TransitionGroup>
    <p class="tags-count" aria-live="polite">{{ visible.length }} von {{ tasks.length }} Aufgaben</p>
  </div>
</template>

<script setup lang="ts">
import { Circle, Search, X } from '@lucide/vue'

const TAG = /(-?)#([\p{L}\d_-]+)/gu

const tasks = [
  { id: 1, name: 'Relaunch Bäckerei Hansen: Abnahme', tags: ['kunde'] },
  { id: 2, name: 'Rückruf Frau Weber', tags: ['kunde'] },
  { id: 3, name: 'Server-Umzug Praxis Klein planen', tags: ['kunde', 'ops'] },
  { id: 4, name: 'Login-Fehler nachstellen', tags: ['bug'] },
  { id: 5, name: 'SSL-Zertifikat erneuern', tags: ['ops'] },
  { id: 6, name: 'Bilder komprimieren', tags: ['design'] },
]
const allTags = ['kunde', 'bug', 'ops', 'design']

const query = ref('#kunde')

const parsed = computed(() => {
  const include: string[] = []
  const exclude: string[] = []
  for (const m of query.value.matchAll(TAG)) (m[1] ? exclude : include).push(m[2]!.toLowerCase())
  const text = query.value.replace(TAG, '').trim().toLowerCase()
  return { include, exclude, text }
})

const visible = computed(() => {
  const { include, exclude, text } = parsed.value
  return tasks.filter(t =>
    include.every(tag => t.tags.includes(tag))
    && !exclude.some(tag => t.tags.includes(tag))
    && t.name.toLowerCase().includes(text),
  )
})

// Wie in der App: Ein Klick auf einen Tag setzt oder entfernt ihn im Suchfeld
function toggle(tag: string) {
  const token = new RegExp(`(^|\\s)-?#${tag}(?=\\s|$)`, 'u')
  query.value = token.test(query.value)
    ? query.value.replace(token, ' ').replace(/\s+/g, ' ').trim()
    : `${query.value} #${tag}`.trim()
}

function hideOps() {
  const cleaned = query.value.replace(/(^|\s)-?#ops(?=\s|$)/u, ' ').replace(/\s+/g, ' ').trim()
  query.value = `${cleaned || '#kunde'} -#ops`
}
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
  height: 48px;
  padding: 0 44px 0 40px;
  border: 0;
  border-radius: 10px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
  transition: box-shadow 0.15s;
}

.tags-field input:hover {
  box-shadow: inset 0 0 0 1.5px var(--muted);
}

.tags-field input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--primary);
}

.tags-field input::placeholder {
  color: var(--muted);
}

.tags-search {
  position: absolute;
  top: 50%;
  left: 14px;
  width: 16px;
  height: 16px;
  color: var(--muted);
  translate: 0 -50%;
  pointer-events: none;
}

.tags-clear {
  position: absolute;
  top: 50%;
  right: 8px;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 6px;
  background: none;
  color: var(--muted);
  translate: 0 -50%;
  cursor: pointer;
}

.tags-clear:hover {
  background: var(--sunken);
  color: var(--ink);
}

.tags-clear svg {
  width: 16px;
  height: 16px;
}

.tags-chips {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.tags-chip {
  padding: 5px 10px;
  border: 0;
  border-radius: 6px;
  background: var(--chip);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s, box-shadow 0.15s;
}

.tags-chip:hover {
  box-shadow: inset 0 0 0 1px var(--ink);
}

.tags-chip[aria-pressed='true'] {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.tags-chip-off {
  color: var(--muted);
  text-decoration: line-through;
}

.tags-try {
  margin-left: auto;
  padding: 5px 2px;
  border: 0;
  background: none;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  text-decoration: underline;
  text-decoration-color: var(--line-strong);
  text-underline-offset: 4px;
  cursor: pointer;
}

.tags-try:hover:not(:disabled) {
  color: var(--ink);
  text-decoration-color: currentColor;
}

.tags-try:disabled {
  opacity: 0.45;
  cursor: default;
}

.tags-list {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 6px;
  min-height: 150px;
  align-content: start;
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.tags-row {
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

.tags-row svg {
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
  flex-shrink: 0;
  font-size: 0.8125rem;
}

.tags-empty {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px dashed var(--line-strong);
  border-radius: 8px;
  color: var(--muted);
  font-size: 0.9375rem;
}

.tags-count {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.tagrow-move,
.tagrow-enter-active,
.tagrow-leave-active {
  transition: opacity 0.3s var(--n1-ease), transform 0.4s var(--n1-ease);
}

.tagrow-enter-from,
.tagrow-leave-to {
  opacity: 0;
  transform: translateX(-8px);
}

.tagrow-leave-active {
  position: absolute;
  transition-duration: 0.18s;
}

@media (max-width: 479px) {
  .tags-tag:nth-of-type(n + 3) {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .tagrow-move,
  .tagrow-enter-active,
  .tagrow-leave-active {
    transition: none;
  }
}
</style>
