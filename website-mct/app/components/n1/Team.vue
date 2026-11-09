<template>
  <section id="team" class="section" aria-labelledby="n1-team-title">
    <div class="container">
      <div class="team" data-reveal>
        <div class="team-copy">
          <p class="n1-label">
            <span class="n1-label-index">05</span>
            <span>Im Team</span>
          </p>
          <h2 id="n1-team-title" class="team-title">{{ team.title }}</h2>
          <p class="team-text">{{ team.text }}</p>
        </div>
        <ul class="team-points">
          <li v-for="(point, i) in team.points" :key="point">
            <component :is="icons[i]" aria-hidden="true" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { LayoutGrid, MessageSquare, UserCog } from '@lucide/vue'
import { team } from '~/content/varianten'

const icons = [LayoutGrid, UserCog, MessageSquare]
</script>

<style scoped>
.section {
  padding-block: 24px 72px;
}

.team {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  padding: 28px 24px;
  border-radius: 16px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
}

.team-copy {
  display: grid;
  align-content: start;
  gap: 14px;
}

.team-title {
  color: var(--ink);
  font-size: clamp(1.5rem, 2.8vw, 2rem);
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: -0.028em;
}

.team-text {
  max-width: 34rem;
  color: var(--muted);
}

.team-points {
  display: grid;
  align-content: center;
  padding: 0;
  list-style: none;
}

.team-points li {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-block: 14px;
  border-top: 1px solid var(--line);
  color: var(--ink);
  font-weight: 500;
}

.team-points li:last-child {
  border-bottom: 1px solid var(--line);
}

.team-points svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--muted);
}

@media (min-width: 900px) {
  .team {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 64px;
    padding: 48px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: 0 120px;
  }
}
</style>
