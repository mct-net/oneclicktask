<template>
  <ol class="steps">
    <li class="step">
      <div class="step-text">
        <h3 class="step-title"><KeyCap class="step-key">1</KeyCap>Erfassen</h3>
        <p class="step-lead">Ein Feld zum Suchen und Anlegen</p>
        <p>
          Während du tippst, filtert die Liste. Gibt es die Aufgabe noch nicht, legst du sie mit Enter an.
          Beschreibung, Frist und Zuständigkeit lassen sich später ergänzen.
        </p>
      </div>
      <div class="step-stage reveal" aria-hidden="true">
        <div class="mini-field"><span class="typed">Logo für Praxis Klein anpassen</span><KeyCap>↵</KeyCap></div>
        <div class="mini-row mini-row-new"><Circle /><span>Logo für Praxis Klein anpassen</span></div>
        <div class="mini-row"><Circle /><span>Rückruf Frau Weber wegen Newsletter-Vorlage</span></div>
        <div class="mini-row"><Circle /><span>SSL-Zertifikat für shop.hansen.de erneuern</span></div>
      </div>
    </li>

    <li class="step">
      <div class="step-text">
        <h3 class="step-title"><KeyCap class="step-key">2</KeyCap>Zuordnen</h3>
        <p class="step-lead">Hashtags statt Ordner</p>
        <p>
          Ein Hashtag im Titel, etwa <span class="hashtag">#kunde</span>, ordnet die Aufgabe zu. Im Suchfeld
          filtert <span class="hashtag">#kunde</span> die Liste, <span class="hashtag">-#ops</span> blendet
          einen Tag aus.
        </p>
      </div>
      <div class="step-stage reveal" aria-hidden="true">
        <div class="mini-field"><span class="typed"><span class="hashtag">#kunde</span> <span class="mini-minus">-#ops</span></span></div>
        <div class="mini-chips">
          <span class="mini-chip mini-chip-on">#kunde</span>
          <span class="mini-chip">#bug</span>
          <span class="mini-chip mini-chip-off">#ops</span>
          <span class="mini-chip">#design</span>
        </div>
        <div class="mini-row"><Circle /><span>Relaunch Bäckerei Hansen: Abnahme</span><span class="hashtag">#kunde</span></div>
        <div class="mini-row"><Circle /><span>Rückruf Frau Weber</span><span class="hashtag">#kunde</span></div>
        <div class="mini-row mini-row-gone"><Circle /><span>SSL-Zertifikat erneuern</span><span class="hashtag">#ops</span></div>
      </div>
    </li>

    <li class="step">
      <div class="step-text">
        <h3 class="step-title"><KeyCap class="step-key">3</KeyCap>Terminieren</h3>
        <p class="step-lead">Fristen in festen Schritten</p>
        <p>
          Statt eines Kalenders gibt es sechs Schaltflächen: plus 5 Minuten, 1 Stunde, 1 Tag, 1 Woche, 1 Monat
          oder 90 Tage. Unter der Liste steht, wie viele Aufgaben heute, morgen und diese Woche fällig sind.
        </p>
      </div>
      <div class="step-stage reveal">
        <DueLadder />
      </div>
    </li>

    <li class="step">
      <div class="step-text">
        <h3 class="step-title"><KeyCap class="step-key">4</KeyCap>Abarbeiten</h3>
        <p class="step-lead">Aktionen direkt an der Aufgabe</p>
        <p>
          Stern, Priorität, Status, Backlog und Papierkorb sind jeweils ein Klick. Es öffnet sich kein Dialog,
          und es gibt nichts zu speichern.
        </p>
      </div>
      <div class="step-stage reveal">
        <ActionRow />
      </div>
    </li>
  </ol>
</template>

<script setup lang="ts">
import { Circle } from '@lucide/vue'
</script>

<style scoped>
.steps {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  padding: 0;
  list-style: none;
}

.step {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  padding-block: 48px;
  border-top: 1px solid var(--line);
}

.step:last-child {
  border-bottom: 1px solid var(--line);
}

.step-text {
  display: grid;
  align-content: start;
  gap: 12px;
  max-width: 34rem;
}

.step-title {
  display: flex;
  align-items: center;
  gap: 14px;
  color: var(--muted);
  font-size: 1rem;
  font-weight: 500;
}

.step-key {
  font-size: 1rem;
}

.step-lead {
  color: var(--ink);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  line-height: 1.15;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.step-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-content: start;
  gap: 8px;
  padding: 24px;
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line), 0 24px 48px -32px rgb(var(--shadow) / 0.35);
  font-size: 0.9375rem;
}

.mini-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  height: 46px;
  margin-bottom: 6px;
  padding: 0 10px 0 14px;
  border-radius: 8px;
  box-shadow: inset 0 0 0 2px var(--ink);
  color: var(--ink);
  white-space: nowrap;
  overflow: hidden;
}

.mini-minus {
  color: var(--red);
}

.mini-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 6px;
}

.mini-chip {
  padding: 3px 8px;
  border-radius: 6px;
  box-shadow: inset 0 0 0 1px var(--line);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.mini-chip-on {
  background: var(--accent);
  box-shadow: none;
  color: var(--on-accent);
}

.mini-chip-off {
  color: var(--muted);
  text-decoration: line-through;
}

.mini-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--sunken);
  color: var(--ink);
}

.mini-row svg {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: var(--muted);
}

.mini-row span:first-of-type {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mini-row-new {
  background: var(--accent-soft);
  box-shadow: inset 0 0 0 1.5px var(--accent);
}

.mini-row-gone {
  opacity: 0.35;
  text-decoration: line-through;
}

@media (min-width: 900px) {
  .step {
    grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
    gap: 64px;
    padding-block: 72px;
  }
}
</style>
