<template>
  <div class="ticker" aria-hidden="true">
    <div class="ticker-track">
      <span v-for="(item, index) in [...items, ...items]" :key="index" class="ticker-item">
        <Circle class="ticker-icon" />
        {{ item.text }}
        <span class="ticker-tag">#{{ item.tag }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'

const items = [
  { text: 'Startseite zur Abnahme schicken', tag: 'kunde' },
  { text: 'Login nach Passwort-Reset prüfen', tag: 'bug' },
  { text: 'SSL-Zertifikat erneuern', tag: 'ops' },
  { text: 'Changelog für 2.4 schreiben', tag: 'release' },
  { text: 'Bilder für die Teamseite komprimieren', tag: 'design' },
  { text: 'Angebot Praxis Dr. Klein nachfassen', tag: 'kunde' },
  { text: 'Dependabot-PRs mergen', tag: 'dev' },
  { text: 'Cookie-Banner prüfen', tag: 'recht' },
]
</script>

<style scoped>
.ticker {
  overflow: hidden;
  padding-block: 8px;
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}

.ticker-track {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: ticker 60s linear infinite;
}

.ticker:hover .ticker-track {
  animation-play-state: paused;
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 10px 16px;
  border-radius: 999px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--text);
  font-size: 0.9375rem;
  white-space: nowrap;
}

.ticker-icon {
  width: 15px;
  height: 15px;
  color: var(--muted);
}

.ticker-tag {
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

@keyframes ticker {
  to {
    transform: translateX(calc(-50% - 6px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .ticker-track {
    animation: none;
  }
}
</style>
