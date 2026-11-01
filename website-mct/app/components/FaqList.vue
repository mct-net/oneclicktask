<template>
  <div class="faq reveal">
    <details v-for="item in items" :key="item.question" class="faq-item">
      <summary class="faq-question">
        <span>{{ item.question }}</span>
        <Plus class="icon faq-icon" aria-hidden="true" />
      </summary>
      <p class="faq-answer">{{ item.answer }}</p>
    </details>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@lucide/vue'

defineProps<{
  items: Array<{ question: string, answer: string }>
}>()
</script>

<style scoped>
.faq {
  max-width: 50rem;
  border-top: 1px solid var(--line);
}

.faq-item {
  border-bottom: 1px solid var(--line);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 22px;
  color: var(--ink);
  font-size: 1.125rem;
  font-weight: 500;
  list-style: none;
  cursor: pointer;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question:hover .faq-icon {
  color: var(--accent);
}

.faq-icon {
  color: var(--muted);
  transition: transform 0.2s;
}

.faq-item[open] .faq-icon {
  transform: rotate(45deg);
}

.faq-answer {
  max-width: 42rem;
  padding-bottom: 24px;
  color: var(--muted);
}
</style>
