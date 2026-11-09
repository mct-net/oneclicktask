<template>
  <div class="n3-stage done">
    <ul class="done-list">
      <li
        v-for="task in tasks"
        :key="task.id"
        class="n3-row done-row"
        :class="`is-${task.status}`"
      >
        <button
          type="button"
          class="n3-icon-btn done-check"
          :aria-pressed="task.status === 'done'"
          :aria-label="`„${task.name}“ erledigen`"
          @click="set(task, 'done')"
        >
          <CircleCheck v-if="task.status === 'done'" />
          <Circle v-else />
        </button>
        <span class="n3-row-name done-name">
          {{ task.name }}
          <span v-if="task.status === 'backlog'" class="done-badge">später</span>
          <span v-if="task.status === 'trash'" class="done-badge">Papierkorb</span>
        </span>
        <span class="done-actions">
          <button
            type="button"
            class="n3-icon-btn"
            :aria-pressed="task.important"
            :aria-label="`„${task.name}“ als wichtig markieren`"
            @click="toggleImportant(task)"
          ><TriangleAlert /></button>
          <button
            type="button"
            class="n3-icon-btn"
            :aria-pressed="task.status === 'backlog'"
            :aria-label="`„${task.name}“ auf später schieben`"
            @click="set(task, 'backlog')"
          ><Telescope /></button>
          <button
            type="button"
            class="n3-icon-btn"
            :aria-pressed="task.status === 'trash'"
            :aria-label="`„${task.name}“ in den Papierkorb`"
            @click="set(task, 'trash')"
          ><Trash2 /></button>
        </span>
      </li>
    </ul>
    <div class="done-foot">
      <span class="done-meter" aria-hidden="true"><span :style="{ width: `${(doneCount / tasks.length) * 100}%` }" /></span>
      <p class="n3-note done-note" aria-live="polite">{{ note }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Circle, CircleCheck, Telescope, Trash2, TriangleAlert } from '@lucide/vue'

const props = defineProps<{ play: boolean }>()

type Status = 'open' | 'done' | 'backlog' | 'trash'
type Task = { id: number, name: string, status: Status, important: boolean }

const tasks = ref<Task[]>([
  { id: 1, name: 'Folien für Donnerstag gliedern', status: 'open', important: true },
  { id: 2, name: 'Vermieter zurückrufen', status: 'open', important: false },
  { id: 3, name: 'Zahnarzttermin ausmachen', status: 'open', important: false },
  { id: 4, name: 'Steuerordner sortieren', status: 'open', important: false },
])

const doneCount = computed(() => tasks.value.filter(t => t.status === 'done').length)
const last = ref('')
const note = computed(() => last.value || `${doneCount.value} von ${tasks.value.length} erledigt`)

let timers: ReturnType<typeof setTimeout>[] = []
let touched = false

const messages: Record<Status, string> = {
  open: 'Wieder offen',
  done: 'Erledigt',
  backlog: 'Auf später geschoben',
  trash: 'Im Papierkorb, wiederherstellbar',
}

function set(task: Task, status: Status, fromUser = true) {
  if (fromUser) {
    touched = true
    timers.forEach(clearTimeout)
  }
  task.status = task.status === status ? 'open' : status
  last.value = `${messages[task.status]}. ${doneCount.value} von ${tasks.value.length} erledigt`
}

function toggleImportant(task: Task) {
  touched = true
  timers.forEach(clearTimeout)
  task.important = !task.important
  last.value = task.important ? 'Als wichtig markiert' : 'Markierung entfernt'
}

// Einmal vormachen: zwei abhaken, eine auf später schieben
watch(() => props.play, (play) => {
  if (!play) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const script: Array<[number, Status, number]> = [[0, 'done', 700], [1, 'done', 1300], [3, 'backlog', 2000]]
  for (const [index, status, delay] of script) {
    timers.push(setTimeout(() => {
      if (!touched) set(tasks.value[index]!, status, false)
    }, reduce ? 0 : delay))
  }
}, { once: true })

onBeforeUnmount(() => timers.forEach(clearTimeout))
</script>

<style scoped>
.done-list {
  display: grid;
  gap: 4px;
  padding: 0;
  list-style: none;
}

.done-row {
  gap: 4px;
  transition: opacity 0.3s;
}

.done-name {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px 8px;
  padding-block: 4px;
  transition: color 0.3s;
}

.done-badge {
  padding: 1px 6px;
  border-radius: 5px;
  background: var(--chip);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}

.done-check[aria-pressed='true'] {
  color: var(--accent);
}

.is-done .done-name {
  color: var(--muted);
  text-decoration: line-through;
  text-decoration-color: var(--line-strong);
}

.is-done .done-check svg {
  animation: tick 0.35s var(--ease-out);
}

.is-backlog,
.is-trash {
  opacity: 0.55;
}

.is-trash .done-name {
  text-decoration: line-through;
}

.done-actions {
  display: flex;
  flex-shrink: 0;
}

.done-actions .n3-icon-btn[aria-pressed='true'] {
  background: var(--accent-soft);
  color: var(--accent-ink);
}

.done-foot {
  display: grid;
  gap: 8px;
  margin-top: 4px;
}

.done-meter {
  display: block;
  height: 4px;
  overflow: clip;
  border-radius: 4px;
  background: var(--line);
}

.done-meter span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--accent);
  transition: width 0.5s var(--ease-out);
}

@keyframes tick {
  from {
    transform: scale(0.6);
  }
}

@media (max-width: 420px) {
  .done-actions .n3-icon-btn {
    width: 30px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .is-done .done-check svg {
    animation: none;
  }

  .done-meter span {
    transition: none;
  }
}
</style>
