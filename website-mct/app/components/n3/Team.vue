<template>
  <section id="team" class="team" aria-labelledby="team-title">
    <div class="container">
      <div class="team-card" data-reveal>
        <div class="team-copy">
          <p class="n3-label">Zusammen</p>
          <h2 id="team-title" class="team-title">{{ team.title }}</h2>
          <p class="team-text">{{ team.text }}</p>
        </div>
        <ul class="team-points">
          <li v-for="(point, i) in team.points" :key="point">
            <span class="team-icon" aria-hidden="true"><component :is="icons[i]" /></span>
            {{ point }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LayoutList, MessageSquare, UserCog } from '@lucide/vue'
import { team } from '~/content/varianten'

const icons = [LayoutList, UserCog, MessageSquare]
</script>

<style scoped>
.team {
  padding-block: clamp(24px, 4vw, 48px) clamp(72px, 10vw, 120px);
}

.team-card {
  display: grid;
  gap: 28px;
  padding: clamp(24px, 4vw, 40px);
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.team-copy {
  display: grid;
  gap: 12px;
  max-width: 34rem;
}

.team-title {
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.4vw, 1.75rem);
  font-weight: 620;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.team-text {
  color: var(--muted);
}

.team-points {
  display: grid;
  align-content: center;
  gap: 14px;
  padding: 0;
  list-style: none;
}

.team-points li {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--ink);
  font-weight: 500;
}

.team-icon {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: 9px;
  background: var(--accent-soft);
  color: var(--accent-ink);
}

.team-icon svg {
  width: 17px;
  height: 17px;
}

@media (min-width: 900px) {
  .team-card {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 56px;
  }
}
</style>
