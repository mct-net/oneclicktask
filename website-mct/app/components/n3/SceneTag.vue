<template>
  <div class="n3-stage tagger">
    <div class="n3-field tagger-field" aria-hidden="true">
      <span v-if="active" class="hashtag">#{{ active }}</span>
      <span v-else class="tagger-placeholder">Find or create...</span>
    </div>

    <div class="tagger-chips" role="group" aria-label="Nach Hashtag filtern">
      <button
        v-for="tag in tags"
        :key="tag"
        type="button"
        class="tagger-chip"
        :aria-pressed="active === tag"
        @click="toggle(tag)"
      >#{{ tag }}</button>
    </div>

    <ul class="tagger-list">
      <li
        v-for="task in tasks"
        :key="task.name"
        class="tagger-item"
        :class="{ 'is-out': active && !task.tags.includes(active) }"
        :aria-hidden="active && !task.tags.includes(active) ? 'true' : undefined"
      >
        <div class="tagger-clip">
          <div class="n3-row">
            <span class="n3-row-icon" aria-hidden="true"><Circle /></span>
            <span class="n3-row-name">{{ task.name }} <span v-for="tag in task.tags" :key="tag" class="n3-row-tag">#{{ tag }}</span></span>
          </div>
        </div>
      </li>
    </ul>
    <p class="n3-note" aria-live="polite">{{ note }}</p>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

const props = defineProps<{ play: boolean }>()

const tags = ['arbeit', 'privat', 'wohnung']
const tasks = [
  { name: 'Folien für Donnerstag gliedern', tags: ['arbeit'] },
  { name: 'Zahnarzttermin ausmachen', tags: ['privat'] },
  { name: 'Angebot an Kanzlei Voss schicken', tags: ['arbeit'] },
  { name: 'Nebenkostenabrechnung prüfen', tags: ['wohnung'] },
  { name: 'Urlaubsantrag stellen', tags: ['arbeit'] },
]

const active = ref<string | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let touched = false

const note = computed(() => {
  if (!active.value) return `${tasks.length} Aufgaben, alle Hashtags`
  const count = tasks.filter(t => t.tags.includes(active.value!)).length
  return `${count} von ${tasks.length} Aufgaben mit #${active.value}`
})

function toggle(tag: string) {
  touched = true
  clearTimeout(timer)
  active.value = active.value === tag ? null : tag
}

watch(() => props.play, (play) => {
  if (!play) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setTimeout(() => {
    if (!touched) active.value = 'arbeit'
  }, reduce ? 0 : 700)
}, { once: true })

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.tagger-placeholder {
  color: var(--muted);
}

.tagger-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tagger-chip {
  padding: 4px 10px;
  border: 0;
  border-radius: 7px;
  background: var(--chip);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s, box-shadow 0.2s;
}

.tagger-chip:hover {
  box-shadow: inset 0 0 0 1px var(--accent);
}

.tagger-chip[aria-pressed='true'] {
  background: var(--accent);
  color: var(--on-accent);
  box-shadow: none;
}

.tagger-list {
  display: grid;
  padding: 0;
  list-style: none;
}

/* Ausgefilterte Zeilen klappen weich zusammen */
.tagger-item {
  display: grid;
  grid-template-rows: 1fr;
  opacity: 1;
  transition: grid-template-rows 0.4s var(--ease-out), opacity 0.3s;
}

.tagger-clip {
  min-height: 0;
  overflow: clip;
}

.tagger-clip > .n3-row {
  margin-bottom: 4px;
}

.tagger-item.is-out {
  grid-template-rows: 0fr;
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .tagger-item {
    transition: none;
  }
}
</style>
