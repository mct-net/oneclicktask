<template>
  <section id="team" class="n2-section team" aria-labelledby="n2-team-title">
    <div class="n2-wrap team-grid">
      <div>
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">05</span>Zusammen</p>
        <h2 id="n2-team-title" class="team-title" data-reveal="1">{{ team.title }}</h2>
        <p class="team-text" data-reveal="2">{{ team.text }}</p>
        <ul class="team-points" data-reveal="3">
          <li v-for="point in team.points" :key="point">
            <Check aria-hidden="true" />{{ point }}
          </li>
        </ul>
      </div>

      <div class="team-card" data-reveal="2" aria-hidden="true">
        <div class="team-card-bar">
          <span>Studio Nordlicht</span>
          <span class="team-card-count">4 Mitglieder</span>
        </div>
        <ul class="team-members">
          <li v-for="member in members" :key="member.initials">
            <span class="team-avatar">{{ member.initials }}</span>
            <span class="team-name">{{ member.name }}</span>
            <span class="team-role" :class="{ 'team-role-admin': member.role === 'Admin' }">{{ member.role }}</span>
          </li>
        </ul>
        <div class="team-comment">
          <span class="team-avatar">AD</span>
          <p><b>Aylin Demir</b> Galerie ist gekürzt, die Bilder liegen im Ordner „final“.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Check } from '@lucide/vue'
import { team } from '~/content/varianten'

// Dieselben Demo-Personen wie im Board oben
const members = [
  { initials: 'LB', name: 'Lena Brandt', role: 'Admin' },
  { initials: 'AD', name: 'Aylin Demir', role: 'Member' },
  { initials: 'JW', name: 'Jonas Weber', role: 'Member' },
  { initials: 'MK', name: 'Mira Krause', role: 'Member' },
]
</script>

<style scoped>
.team {
  padding-block: clamp(64px, 8vw, 104px);
}

.team-grid {
  display: grid;
  gap: 40px;
  align-items: center;
}

.team-title {
  max-width: 24ch;
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
  text-wrap: balance;
}

.team-text {
  max-width: 34rem;
  margin-top: 14px;
  color: var(--muted);
}

.team-points {
  display: grid;
  gap: 8px;
  margin-top: 20px;
  padding: 0;
  list-style: none;
}

.team-points li {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--text);
  font-size: 0.96875rem;
}

.team-points svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--ink);
}

.team-card {
  overflow: clip;
  border-radius: 14px;
  background: var(--paper);
  box-shadow: 0 0 0 1px var(--line-strong), 0 24px 48px -36px rgb(var(--shadow) / 0.4);
  font-size: 0.875rem;
}

.team-card-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 42px;
  padding-inline: 16px;
  border-bottom: 1px solid var(--line);
  background: var(--sunken);
  color: var(--ink);
  font-weight: 500;
}

.team-card-count {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.71875rem;
  font-weight: 400;
}

.team-members {
  display: grid;
  gap: 2px;
  padding: 10px;
  list-style: none;
}

.team-members li {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 7px 8px;
  border-radius: 8px;
}

.team-members li:first-child {
  background: var(--surface);
}

.team-avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.65625rem;
  font-weight: 600;
}

.team-name {
  flex: 1;
  color: var(--ink);
}

.team-role {
  padding: 1px 8px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.6875rem;
}

.team-role-admin {
  background: var(--primary);
  box-shadow: none;
  color: var(--on-primary);
}

.team-comment {
  display: flex;
  gap: 10px;
  margin: 0 10px 10px;
  padding: 12px;
  border-radius: 8px;
  background: var(--surface);
  color: var(--text);
}

.team-comment b {
  margin-right: 4px;
  color: var(--ink);
  font-weight: 600;
}

@media (min-width: 900px) {
  .team-grid {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
    gap: 80px;
  }
}
</style>
