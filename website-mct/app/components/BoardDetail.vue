<template>
  <aside class="detail" aria-label="Ausgewählte Aufgabe">
    <template v-if="task">
      <div class="detail-tools" aria-hidden="true">
        <Brush class="detail-tool" />
        <List class="detail-tool" />
        <ListOrdered class="detail-tool" />
        <Paperclip class="detail-tool" />
      </div>
      <h3 class="detail-title">{{ task.name }}</h3>
      <p class="detail-body" :class="{ 'detail-placeholder': !task.content }">
        {{ task.content ?? 'Noch keine Beschreibung' }}
      </p>
      <div class="detail-due" aria-hidden="true">
        <span v-for="step in steps" :key="step" class="detail-step">+{{ step }}</span>
      </div>
      <div class="detail-feed">
        <p class="detail-created"><b>Lena Brandt</b> created this task.</p>
        <div v-for="comment in task.comments ?? []" :key="comment.text" class="detail-comment">
          <span class="detail-avatar">{{ comment.initials }}</span>
          <div>
            <p class="detail-author"><b>{{ comment.author }}</b> <span>{{ comment.ago }}</span></p>
            <p>{{ comment.text }}</p>
          </div>
        </div>
        <p class="detail-input">Add a comment...</p>
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { Brush, List, ListOrdered, Paperclip } from '@lucide/vue'
import type { DemoTask } from '~/composables/useDemoBoard'

defineProps<{ task: DemoTask | null }>()

const steps = ['5m', '1h', '1d', '1w', '1mo', '90d']
</script>

<style scoped>
.detail {
  flex-direction: column;
  gap: 14px;
  padding: 20px 24px;
  border-left: 1px solid var(--line);
  background: var(--surface);
}

.detail-tools {
  display: flex;
  gap: 8px;
  color: var(--muted);
}

.detail-tool {
  width: 28px;
  height: 28px;
  padding: 6px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--line);
}

.detail-title {
  font-size: 1rem;
  line-height: 1.35;
}

.detail-body {
  color: var(--text);
  line-height: 1.6;
}

.detail-placeholder {
  color: var(--muted);
}

.detail-due {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.detail-step {
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.detail-feed {
  display: grid;
  gap: 12px;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid var(--line);
}

.detail-created {
  color: var(--muted);
  font-size: 0.8125rem;
}

.detail-created b,
.detail-author b {
  color: var(--ink);
  font-weight: 600;
}

.detail-comment {
  display: flex;
  gap: 10px;
}

.detail-avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-size: 0.6875rem;
  font-weight: 600;
}

.detail-author span {
  color: var(--muted);
  font-size: 0.75rem;
}

.detail-input {
  padding: 9px 12px;
  border-radius: 8px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
}
</style>
