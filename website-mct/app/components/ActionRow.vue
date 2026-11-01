<template>
  <div class="actions">
    <div class="actions-task" :class="`actions-${status}`">
      <span class="actions-name">Dependabot-PRs durchsehen und mergen <span class="hashtag">#dev</span></span>
      <span v-if="starred" class="actions-badge actions-badge-star"><Star /></span>
      <span v-if="important" class="actions-badge actions-badge-red"><TriangleAlert /></span>
    </div>
    <div class="actions-bar" role="toolbar" aria-label="Aktionen an der Aufgabe">
      <button type="button" :aria-pressed="starred" aria-label="Stern" @click="set('star')"><Star /></button>
      <button type="button" :aria-pressed="important" aria-label="Wichtig" @click="set('important')"><TriangleAlert /></button>
      <span class="actions-gap" />
      <button
        v-for="action in statusActions"
        :key="action.status"
        type="button"
        :aria-pressed="status === action.status"
        :aria-label="action.label"
        @click="set(action.status)"
      ><component :is="action.icon" /></button>
    </div>
    <p class="actions-log" aria-live="polite">{{ log }}</p>
  </div>
</template>

<script setup lang="ts">
import { CirclePlay, CircleCheck, Star, Telescope, Trash2, TriangleAlert } from '@lucide/vue'

type Status = 'open' | 'progress' | 'done' | 'backlog' | 'trash'

const statusActions = [
  { status: 'progress', label: 'In Arbeit', icon: CirclePlay, log: 'Status: in Arbeit' },
  { status: 'done', label: 'Erledigt', icon: CircleCheck, log: 'Status: erledigt' },
  { status: 'backlog', label: 'Ins Backlog', icon: Telescope, log: 'Ins Backlog verschoben' },
  { status: 'trash', label: 'Papierkorb', icon: Trash2, log: 'In den Papierkorb verschoben, wiederherstellbar' },
] as const

const status = ref<Status>('open')
const starred = ref(false)
const important = ref(false)
const log = ref('Klick auf eine Aktion')

function set(action: 'star' | 'important' | Status) {
  if (action === 'star') {
    starred.value = !starred.value
    log.value = starred.value ? 'Stern gesetzt' : 'Stern entfernt'
  } else if (action === 'important') {
    important.value = !important.value
    log.value = important.value ? 'Als wichtig markiert' : 'Markierung entfernt'
  } else {
    const next = status.value === action ? 'open' : action
    status.value = next
    log.value = statusActions.find(a => a.status === next)?.log ?? 'Status: offen'
  }
}
</script>

<style scoped>
.actions {
  display: grid;
  gap: 14px;
}

.actions-task {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 48px;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--sunken);
  color: var(--ink);
  transition: opacity 0.2s;
}

.actions-name {
  flex: 1;
  min-width: 0;
}

.actions-done .actions-name {
  color: var(--muted);
  text-decoration: line-through;
}

.actions-progress {
  box-shadow: inset 3px 0 0 var(--accent);
}

.actions-backlog,
.actions-trash {
  opacity: 0.45;
}

.actions-badge svg {
  width: 16px;
  height: 16px;
}

.actions-badge-star {
  color: var(--star);
}

.actions-badge-star svg {
  fill: currentColor;
}

.actions-badge-red {
  color: var(--red);
}

.actions-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
}

.actions-bar button {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
  cursor: pointer;
}

.actions-bar button:hover {
  color: var(--ink);
  box-shadow: inset 0 0 0 1px var(--ink);
}

.actions-bar button[aria-pressed='true'] {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.actions-bar svg {
  width: 18px;
  height: 18px;
}

.actions-gap {
  width: 1px;
  height: 24px;
  margin-inline: 4px;
  background: var(--line-strong);
}

.actions-log {
  color: var(--muted);
  font-size: 0.9375rem;
}
</style>
