<template>
  <li
    class="task"
    :class="{ 'task-selected': selected, 'task-done': task.status === 'done', 'task-new': isNew }"
  >
    <button
      type="button"
      class="task-check"
      :aria-label="task.status === 'done' ? `„${task.name}“ wieder öffnen` : `„${task.name}“ erledigen`"
      @click="task.status = task.status === 'done' ? 'pending' : 'done'"
    >
      <CircleCheck v-if="task.status === 'done'" />
      <CirclePlay v-else-if="task.status === 'in_progress'" class="task-progress" />
      <Circle v-else />
    </button>
    <button type="button" class="task-main" @click="emit('select')">
      <span class="task-name">{{ task.name }}</span>
      <span v-for="tag in task.tags" :key="tag" class="task-tag">#{{ tag }}</span>
    </button>
    <span class="task-meta">
      <span v-if="task.color" class="task-color" :style="{ background: task.color }" />
      <TriangleAlert v-if="task.important" class="task-important" aria-label="Wichtig" />
      <button
        type="button"
        class="task-star"
        :aria-pressed="task.starred"
        :aria-label="`„${task.name}“ mit Stern markieren`"
        @click="task.starred = !task.starred"
      ><Star /></button>
      <span class="task-avatar" aria-hidden="true">{{ task.assignee }}</span>
    </span>
  </li>
</template>

<script setup lang="ts">
import { Circle, CircleCheck, CirclePlay, Star, TriangleAlert } from '@lucide/vue'
import type { DemoTask } from '~/composables/useDemoBoard'

defineProps<{ task: DemoTask, selected: boolean, isNew: boolean }>()
const emit = defineEmits<{ select: [] }>()
</script>

<style scoped>
.task {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px 4px 4px;
  border-radius: 8px;
  background: var(--surface);
}

.task-selected {
  box-shadow: inset 0 0 0 1.5px var(--ink);
}

.task-new {
  animation: arrive 0.6s ease-out;
}

@keyframes arrive {
  from {
    background: var(--accent-soft);
    transform: translateY(-6px);
  }
}

.task button {
  border: 0;
  background: none;
  cursor: pointer;
}

.task-check,
.task-star {
  display: grid;
  place-items: center;
  padding: 6px;
  border-radius: 6px;
  color: var(--muted);
}

.task-check svg,
.task-star svg {
  width: 17px;
  height: 17px;
}

.task-progress {
  color: var(--teal, var(--accent));
}

.task-done .task-check {
  color: var(--green);
}

.task-main {
  display: flex;
  flex: 1;
  align-items: baseline;
  gap: 8px;
  min-width: 0;
  padding: 6px 0;
  text-align: left;
}

.task-name {
  overflow: hidden;
  color: var(--ink);
  text-overflow: ellipsis;
  white-space: nowrap;
}

.task-done .task-name {
  color: var(--muted);
  text-decoration: line-through;
}

.task-tag {
  display: none;
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.task-meta {
  display: flex;
  align-items: center;
  gap: 2px;
}

.task-color {
  width: 9px;
  height: 9px;
  margin-right: 4px;
  border-radius: 50%;
}

.task-important {
  width: 16px;
  height: 16px;
  color: var(--lilac, var(--red));
}

.task-star[aria-pressed='true'] {
  color: var(--star);
}

.task-star[aria-pressed='true'] svg {
  fill: currentColor;
}

.task-avatar {
  display: none;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-size: 0.625rem;
  font-weight: 600;
}

@media (min-width: 640px) {
  .task-avatar {
    display: grid;
  }

  .task-tag {
    display: inline;
  }
}

@media (prefers-reduced-motion: reduce) {
  .task-new {
    animation: none;
  }
}
</style>
