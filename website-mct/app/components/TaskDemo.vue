<template>
  <div class="demo" aria-label="Interaktive Demo" role="group">
    <form @submit.prevent="createTask">
      <label for="task-demo-input" class="sr-only">Aufgabe suchen oder anlegen</label>
      <div class="demo-field">
        <input
          id="task-demo-input"
          ref="input"
          v-model="query"
          class="demo-input"
          autocomplete="off"
          placeholder="Suchen oder anlegen … probier „Changelog schreiben #release“"
        >
        <Search class="icon demo-field-icon" aria-hidden="true" />
      </div>
    </form>

    <div class="demo-tags">
      <button
        v-for="tag in allTags"
        :key="tag"
        type="button"
        class="demo-tag"
        :class="{ 'demo-tag-active': activeTag === tag }"
        :aria-pressed="activeTag === tag"
        @click="toggleTag(tag)"
      >#{{ tag }}</button>
    </div>

    <ul class="demo-tasks" aria-live="polite">
      <li v-for="task in visibleTasks" :key="task.id" class="demo-task">
        <button
          type="button"
          class="btn btn-ghost demo-icon-btn"
          :aria-label="task.done ? `„${task.name}“ wieder öffnen` : `„${task.name}“ erledigen`"
          @click="task.done = !task.done"
        >
          <CircleCheck v-if="task.done" class="icon" />
          <Circle v-else class="icon" />
        </button>
        <span class="demo-task-name" :class="{ 'demo-task-done': task.done }">{{ task.name }}</span>
        <span v-for="tag in task.tags" :key="tag" class="demo-task-tag">#{{ tag }}</span>
        <button
          type="button"
          class="btn btn-ghost demo-icon-btn"
          :class="{ 'demo-starred': task.starred }"
          :aria-label="`„${task.name}“ markieren`"
          :aria-pressed="task.starred"
          @click="task.starred = !task.starred"
        >
          <Star class="icon" />
        </button>
      </li>
      <li v-if="visibleTasks.length === 0" class="demo-empty">
        Nichts gefunden. Enter legt die Aufgabe an.
      </li>
    </ul>

    <p class="demo-note">Das ist eine Demo: Nichts davon wird gespeichert.</p>
  </div>
</template>

<script setup lang="ts">
import { Circle, CircleCheck, Search, Star } from '@lucide/vue'

type DemoTask = {
  id: number
  name: string
  tags: string[]
  done: boolean
  starred: boolean
}

const HASHTAG_PATTERN = /#([\p{L}\d_-]+)/gu

const tasks = ref<DemoTask[]>([
  { id: 1, name: 'Angebot für Relaunch schicken', tags: ['kunde'], done: false, starred: true },
  { id: 2, name: 'Login-Fehler auf Staging prüfen', tags: ['bug'], done: false, starred: false },
  { id: 3, name: 'Zertifikat erneuern', tags: ['ops'], done: true, starred: false },
])

const query = ref('')
const activeTag = ref<string | null>(null)
const input = useTemplateRef<HTMLInputElement>('input')
let nextId = tasks.value.length + 1

const allTags = computed(() => [...new Set(tasks.value.flatMap(task => task.tags))])

const searchTerm = computed(() => query.value.replace(HASHTAG_PATTERN, '').trim().toLowerCase())

const visibleTasks = computed(() => tasks.value.filter(task =>
  (!activeTag.value || task.tags.includes(activeTag.value))
  && task.name.toLowerCase().includes(searchTerm.value),
))

function createTask() {
  const name = query.value.replace(HASHTAG_PATTERN, '').trim()
  if (!name) return

  const tags = [...query.value.matchAll(HASHTAG_PATTERN)].map(match => match[1]!.toLowerCase())

  tasks.value.unshift({ id: nextId++, name, tags, done: false, starred: false })
  query.value = ''
  activeTag.value = null
}

function toggleTag(tag: string) {
  activeTag.value = activeTag.value === tag ? null : tag
}

onMounted(() => {
  // Wie in der App: Das Feld ist sofort bereit. Auf Touch-Geräten würde
  // der Fokus die Tastatur über die Seite schieben.
  if (window.matchMedia('(pointer: fine)').matches) {
    input.value?.focus({ preventScroll: true })
  }
})
</script>

<style scoped>
.demo {
  padding: 16px;
  border-radius: 8px;
  background: var(--color-bg);
  box-shadow: inset 0 0 0 1px var(--color-border), 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.demo-field {
  position: relative;
}

.demo-input {
  width: 100%;
  padding: 10px 40px 10px 12px;
  border: 0;
  border-radius: 6px;
  background: var(--color-bg);
  box-shadow: inset 0 0 0 1px var(--color-accented);
  font-size: 1rem;
}

.demo-input::placeholder {
  color: var(--color-muted);
}

.demo-input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--color-primary);
}

.demo-field-icon {
  position: absolute;
  top: 50%;
  right: 12px;
  color: var(--color-muted);
  transform: translateY(-50%);
  pointer-events: none;
}

.demo-tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  margin-top: 12px;
}

.demo-tag {
  padding: 2px 8px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--color-accented);
  color: var(--color-text);
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.demo-tag:hover {
  background: var(--color-elevated);
}

.demo-tag-active,
.demo-tag-active:hover {
  background: var(--color-inverted);
  box-shadow: none;
  color: var(--color-on-inverted);
}

.demo-tasks {
  display: grid;
  gap: 6px;
  margin-top: 12px;
  padding: 0;
  list-style: none;
}

.demo-task {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px 4px 4px;
  border-radius: 6px;
  background: color-mix(in srgb, var(--color-elevated) 60%, transparent);
  font-size: 0.875rem;
}

.demo-icon-btn {
  padding: 6px;
}

.demo-icon-btn .icon {
  width: 18px;
  height: 18px;
}

.demo-starred {
  color: var(--color-warning);
}

.demo-starred .icon {
  fill: currentColor;
}

.demo-task-name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  color: var(--color-highlighted);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.demo-task-done {
  color: var(--color-muted);
  text-decoration: line-through;
}

.demo-task-tag {
  display: none;
  color: var(--color-muted);
  font-size: 0.75rem;
}

.demo-empty {
  padding: 8px 12px;
  border: 1px dashed var(--color-accented);
  border-radius: 6px;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.demo-note {
  margin-top: 12px;
  color: var(--color-muted);
  font-size: 0.75rem;
}

@media (min-width: 640px) {
  .demo {
    padding: 24px;
  }

  .demo-task-tag {
    display: inline;
  }
}
</style>
