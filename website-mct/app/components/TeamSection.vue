<template>
  <div class="team">
    <dl class="team-facts reveal">
      <div v-for="fact in facts" :key="fact.term">
        <dt>{{ fact.term }}</dt>
        <dd>{{ fact.text }}</dd>
      </div>
    </dl>

    <div class="team-stage reveal" aria-hidden="true">
      <div class="team-panel">
        <p class="team-panel-title">Studio Nordlicht <span>4 members</span></p>
        <ul class="team-members">
          <li v-for="member in members" :key="member.name">
            <span class="team-avatar">{{ member.initials }}</span>
            <span class="team-name">{{ member.name }}</span>
            <span class="team-role" :class="`team-role-${member.role}`">{{ member.role }}</span>
          </li>
        </ul>
      </div>

      <div class="team-drop">
        <FileText class="team-file" />
        <div>
          <p class="team-drop-name">briefing-praxis-klein.pdf</p>
          <p class="team-drop-note">per Drag & Drop als Aufgabe angelegt</p>
        </div>
      </div>

      <div class="team-comment">
        <span class="team-avatar">AD</span>
        <p><b>Aylin Demir</b> Galerie ist gekürzt, die Bilder liegen im Ordner „final“.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { FileText } from '@lucide/vue'

const facts = [{
  term: 'Rollen',
  text: 'Owner, Admin oder Member. Wer verwalten darf, legst du pro Board fest.',
}, {
  term: 'Zuweisen',
  text: 'Jede Aufgabe lässt sich einer Person zuweisen. Ein Filter zeigt nur die eigenen Aufgaben.',
}, {
  term: 'Kommentare',
  text: 'Rückfragen und Antworten stehen als Kommentar an der Aufgabe.',
}, {
  term: 'Dateien',
  text: 'Eine Datei aufs Board ziehen legt eine Aufgabe mit Anhang an. Anhänge sind nur für Mitglieder abrufbar.',
}]

const members = [
  { initials: 'LB', name: 'Lena Brandt', role: 'owner' },
  { initials: 'JW', name: 'Jonas Weber', role: 'admin' },
  { initials: 'AD', name: 'Aylin Demir', role: 'member' },
  { initials: 'MK', name: 'Mert Kaya', role: 'member' },
]
</script>

<style scoped>
.team {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 48px;
}

.team-facts {
  display: grid;
  gap: 28px;
  margin: 0;
}

.team-facts dt {
  color: var(--ink);
  font-weight: 600;
}

.team-facts dd {
  margin: 4px 0 0;
  color: var(--muted);
}

.team-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 12px;
  align-content: start;
}

.team-panel,
.team-drop,
.team-comment {
  padding: 18px 20px;
  border-radius: 12px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line), 0 24px 48px -36px rgb(var(--shadow) / 0.4);
  font-size: 0.9375rem;
}

.team-panel-title {
  display: flex;
  justify-content: space-between;
  color: var(--ink);
  font-weight: 600;
}

.team-panel-title span {
  color: var(--muted);
  font-weight: 400;
}

.team-members {
  display: grid;
  gap: 10px;
  margin-top: 14px;
  padding: 0;
  list-style: none;
}

.team-members li {
  display: flex;
  align-items: center;
  gap: 10px;
}

.team-avatar {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--sunken);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-size: 0.6875rem;
  font-weight: 600;
}

.team-name {
  flex: 1;
  color: var(--ink);
}

.team-role {
  padding: 2px 8px;
  border-radius: 999px;
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.team-role-owner {
  background: var(--accent);
  box-shadow: none;
  color: var(--on-accent);
}

.team-role-admin {
  background: var(--accent-soft);
  box-shadow: none;
  color: var(--accent-ink);
}

.team-drop {
  display: flex;
  align-items: center;
  gap: 14px;
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--accent);
  border: 0;
}

.team-file {
  width: 28px;
  height: 28px;
  color: var(--accent);
}

.team-drop-name {
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.team-drop-note {
  color: var(--accent-ink);
  font-size: 0.875rem;
}

.team-comment {
  display: flex;
  gap: 12px;
}

.team-comment b {
  display: block;
  color: var(--ink);
  font-weight: 600;
}

@media (min-width: 900px) {
  .team {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 64px;
  }

  .team-facts {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-content: start;
    gap: 36px 32px;
  }
}
</style>
