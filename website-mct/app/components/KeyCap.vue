<template>
  <kbd class="key" :class="{ 'key-pressed': pressed, 'key-hot': hot }"><slot /></kbd>
</template>

<script setup lang="ts">
defineProps<{
  pressed?: boolean
  hot?: boolean
}>()
</script>

<style scoped>
/* Eine Taste wie auf der Tastatur: die untere Kante ist der Tastenhub */
.key {
  --travel: 0.14em;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3em;
  min-width: 1.9em;
  padding: 0.16em 0.45em 0.1em;
  border: 1px solid var(--key-edge);
  border-bottom-width: var(--travel);
  border-radius: 0.28em;
  background: var(--key);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.8em;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  transition: transform 0.08s ease-out, border-bottom-width 0.08s ease-out;
}

/* Die Signaltaste: Akzentfarbe, dunklere Unterkante als Hub, kein Leuchten */
.key-hot {
  --travel: 0.16em;

  border-color: var(--key-hot-edge);
  background: var(--key-hot);
  color: var(--on-key-hot);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35);
}

.key-pressed {
  border-bottom-width: 1px;
  transform: translateY(calc(var(--travel) - 1px));
}

@media (prefers-reduced-motion: reduce) {
  .key {
    transition: none;
  }
}
</style>
