<template>
  <div class="board" role="group" aria-label="Demo von OneClickTask zum Ausprobieren" @pointerdown="stopAutoplay">
    <div class="board-bar">
      <PanelLeft class="board-bar-icon" aria-hidden="true" />
      <span class="board-crumb">Boards</span>
      <ChevronRight class="board-bar-icon" aria-hidden="true" />
      <span class="board-crumb board-crumb-current">Studio Nordlicht</span>
      <span class="board-bar-note">Demo: Nichts wird gespeichert</span>
    </div>

    <div class="board-panes">
      <div class="board-list">
        <form class="board-field" @submit.prevent="submit">
          <label for="demo-input" class="sr-only">Aufgabe suchen oder anlegen</label>
          <input
            id="demo-input"
            ref="input"
            v-model="query"
            autocomplete="off"
            spellcheck="false"
            placeholder="Find or create..."
            @keydown="onKeydown"
          >
          <KeyCap class="board-field-key" :pressed="keyPressed" aria-hidden="true">↵</KeyCap>
        </form>

        <div class="board-tools">
          <div class="board-filters" aria-hidden="true">
            <Star class="board-tool" />
            <TriangleAlert class="board-tool" />
            <CirclePlay class="board-tool" />
            <CircleCheck class="board-tool" />
            <Telescope class="board-tool" />
            <Trash2 class="board-tool" />
          </div>
          <div class="board-tags">
            <button
              v-for="tag in allTags"
              :key="tag"
              type="button"
              class="board-tag"
              :aria-pressed="parsed.include.includes(tag)"
              @click="toggleTag(tag)"
            >#{{ tag }}</button>
          </div>
        </div>

        <ul class="board-tasks" aria-live="polite">
          <DemoTaskRow
            v-for="task in visibleTasks"
            :key="task.id"
            :task="task"
            :selected="task.id === selectedId"
            :is-new="task.id === newId"
            @select="selectedId = task.id"
          />
          <li v-if="visibleTasks.length === 0" class="board-empty">
            Keine Treffer. <KeyCap>↵</KeyCap> legt „{{ query.replace(/-?#[\p{L}\d_-]+/gu, '').trim() || query }}“ an.
          </li>
        </ul>

        <p class="board-counts" aria-hidden="true">
          <span><b>Today:</b> 2</span>
          <span><b>Tomorrow:</b> 1</span>
          <span><b>This week:</b> 4</span>
          <span><b>Overdue:</b> 0</span>
        </p>
      </div>

      <BoardDetail :task="selectedTask" class="board-detail" />
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronRight, CircleCheck, CirclePlay, PanelLeft, Star, Telescope, TriangleAlert, Trash2,
} from '@lucide/vue'

const emit = defineEmits<{ submit: [] }>()

const { query, selectedId, selectedTask, allTags, parsed, visibleTasks, create, toggleTag } = useDemoBoard()

const AUTOPLAY_TEXT = 'Briefing Praxis Dr. Klein lesen #kunde'

const input = useTemplateRef<HTMLInputElement>('input')
const keyPressed = ref(false)
const newId = ref<number | null>(null)
let timer: ReturnType<typeof setTimeout> | undefined
let autoplay = false

function submit() {
  if (!create()) return
  newId.value = selectedId.value
  keyPressed.value = true
  emit('submit')
  setTimeout(() => (keyPressed.value = false), 160)
}

// Einmal vormachen: tippen, die Liste filtert mit, Enter legt an. Jede eigene Eingabe bricht ab.
function startAutoplay() {
  autoplay = true
  let typed = 0
  const step = () => {
    if (typed < AUTOPLAY_TEXT.length) {
      query.value = AUTOPLAY_TEXT.slice(0, ++typed)
      timer = setTimeout(step, 40 + Math.random() * 55)
    } else {
      timer = setTimeout(() => {
        autoplay = false
        submit()
      }, 700)
    }
  }
  timer = setTimeout(step, 1200)
}

function stopAutoplay() {
  if (!autoplay) return
  clearTimeout(timer)
  autoplay = false
  query.value = ''
}

function onKeydown(event: KeyboardEvent) {
  if (!autoplay) return
  stopAutoplay()
  if (event.key === 'Enter') event.preventDefault()
}

onMounted(() => {
  // Wie in der App ist das Feld sofort bereit; auf Touch-Geräten würde die Tastatur aufspringen
  if (window.matchMedia('(pointer: fine)').matches) input.value?.focus({ preventScroll: true })
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) startAutoplay()
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.board {
  overflow: hidden;
  border-radius: 14px;
  background: var(--paper);
  box-shadow: 0 0 0 1px rgb(var(--shadow) / 0.08), 0 2px 4px rgb(var(--shadow) / 0.06), 0 40px 80px -24px rgb(var(--shadow) / 0.45);
  color: var(--text);
  font-size: 0.875rem;
  text-align: left;
}

.board-bar {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding-inline: 16px;
  border-bottom: 1px solid var(--line);
  color: var(--muted);
}

.board-bar-icon {
  width: 16px;
  height: 16px;
}

.board-crumb-current {
  color: var(--ink);
  font-weight: 500;
}

.board-bar-note {
  margin-left: auto;
  font-size: 0.75rem;
}

.board-panes {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.board-list {
  padding: 16px;
}

.board-field {
  position: relative;
}

.board-field input {
  width: 100%;
  height: 46px;
  padding: 0 52px 0 14px;
  border: 0;
  border-radius: 8px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.9375rem;
}

.board-field input::placeholder {
  color: var(--muted);
}

.board-field input:focus-visible {
  outline: 0;
  box-shadow: inset 0 0 0 2px var(--ink);
}

.board-field-key {
  position: absolute;
  top: 50%;
  right: 10px;
  translate: 0 -50%;
  font-size: 0.875rem;
}

.board-tools {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 12px;
}

.board-filters {
  display: none;
  gap: 12px;
  color: var(--muted);
}

.board-tool {
  width: 17px;
  height: 17px;
}

.board-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.board-tag {
  padding: 3px 8px;
  border: 0;
  border-radius: 6px;
  background: var(--chip, var(--sunken));
  box-shadow: none;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  cursor: pointer;
}

.board-tag:hover {
  box-shadow: inset 0 0 0 1px var(--ink);
}

.board-tag[aria-pressed='true'] {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.board-tasks {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 4px;
  min-height: 260px;
  margin-top: 14px;
  padding: 0;
  list-style: none;
  align-content: start;
}

.board-empty {
  padding: 14px;
  border: 1.5px dashed var(--line-strong);
  border-radius: 8px;
  color: var(--muted);
}

.board-counts {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 4px 20px;
  margin-top: 16px;
  color: var(--muted);
  font-size: 0.8125rem;
}

.board-counts b {
  color: var(--ink);
  font-weight: 600;
}

.board-detail {
  display: none;
}

@media (min-width: 640px) {
  .board-filters {
    display: flex;
  }
}

@media (min-width: 1024px) {
  .board-panes {
    grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr);
  }

  .board-list {
    padding: 20px 24px;
  }

  .board-detail {
    display: flex;
  }
}

@media (max-width: 479px) {
  .board-bar-note {
    display: none;
  }
}
</style>
