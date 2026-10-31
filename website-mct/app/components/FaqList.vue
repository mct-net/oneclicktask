<template>
  <div class="faq">
    <details v-for="item in items" :key="item.question" class="faq-item">
      <summary class="faq-question">
        <span>{{ item.question }}</span>
        <ChevronDown class="icon faq-chevron" aria-hidden="true" />
      </summary>
      <p class="faq-answer">{{ item.answer }}</p>
    </details>
  </div>
</template>

<script setup lang="ts">
import { ChevronDown } from '@lucide/vue'

defineProps<{
  items: Array<{ question: string, answer: string }>
}>()
</script>

<style scoped>
.faq {
  max-width: 48rem;
  margin-inline: auto;
}

.faq-item {
  border-bottom: 1px solid var(--color-border);
}

.faq-question {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding-block: 14px;
  color: var(--color-highlighted);
  font-weight: 500;
  list-style: none;
  cursor: pointer;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-chevron {
  color: var(--color-muted);
  transition: transform 0.2s;
}

.faq-item[open] .faq-chevron {
  transform: rotate(180deg);
}

.faq-answer {
  padding-bottom: 14px;
  color: var(--color-muted);
}
</style>
