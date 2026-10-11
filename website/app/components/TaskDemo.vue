<script setup lang="ts">
interface DemoTask {
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
  { id: 3, name: 'Zertifikat erneuern', tags: ['ops'], done: true, starred: false }
])

const query = ref('')
const activeTag = ref<string | null>(null)
const input = useTemplateRef('input')
let nextId = tasks.value.length + 1

const allTags = computed(() => [...new Set(tasks.value.flatMap(task => task.tags))])

const searchTerm = computed(() => query.value.replace(HASHTAG_PATTERN, '').trim().toLowerCase())

const visibleTasks = computed(() => tasks.value.filter(task =>
  (!activeTag.value || task.tags.includes(activeTag.value))
  && task.name.toLowerCase().includes(searchTerm.value)
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
    input.value?.inputRef?.focus({ preventScroll: true })
  }
})
</script>

<template>
  <UCard
    aria-label="Interaktive Demo"
    class="shadow-lg"
  >
    <form @submit.prevent="createTask">
      <label
        for="task-demo-input"
        class="sr-only"
      >Aufgabe suchen oder anlegen</label>
      <UInput
        id="task-demo-input"
        ref="input"
        v-model="query"
        size="xl"
        autocomplete="off"
        trailing-icon="i-lucide-search"
        placeholder="Suchen oder anlegen … probier „Changelog schreiben #release“"
        class="w-full"
      />
    </form>

    <div class="mt-3 flex min-h-7 flex-wrap items-center gap-1.5">
      <UButton
        v-for="tag in allTags"
        :key="tag"
        :label="`#${tag}`"
        :aria-pressed="activeTag === tag"
        size="xs"
        color="neutral"
        :variant="activeTag === tag ? 'solid' : 'outline'"
        @click="toggleTag(tag)"
      />
    </div>

    <ul
      class="mt-3 space-y-1.5"
      aria-live="polite"
    >
      <li
        v-for="task in visibleTasks"
        :key="task.id"
        class="flex items-center gap-1 rounded-md bg-elevated/60 py-1 ps-1 pe-2 text-sm"
      >
        <UButton
          :icon="task.done ? 'i-lucide-circle-check' : 'i-lucide-circle'"
          :aria-label="task.done ? `„${task.name}“ wieder öffnen` : `„${task.name}“ erledigen`"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="task.done = !task.done"
        />
        <span
          class="min-w-0 flex-1 truncate"
          :class="{ 'text-muted line-through': task.done }"
        >{{ task.name }}</span>
        <span
          v-for="tag in task.tags"
          :key="tag"
          class="hidden text-xs text-muted sm:inline"
        >#{{ tag }}</span>
        <UButton
          icon="i-lucide-star"
          :aria-label="`„${task.name}“ markieren`"
          :aria-pressed="task.starred"
          :color="task.starred ? 'warning' : 'neutral'"
          variant="ghost"
          size="sm"
          @click="task.starred = !task.starred"
        />
      </li>
      <li
        v-if="visibleTasks.length === 0"
        class="rounded-md border border-dashed border-default px-3 py-2 text-sm text-muted"
      >
        Nichts gefunden. Enter legt die Aufgabe an.
      </li>
    </ul>

    <p class="mt-3 text-xs text-muted">
      Das ist eine Demo: Nichts davon wird gespeichert.
    </p>
  </UCard>
</template>
