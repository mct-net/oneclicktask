<template>
  <div class="market">
    <PositionMap />

    <ul class="groups reveal">
      <li v-for="group in marketGroups" :key="group.title" class="group" :class="{ 'group-us': group.us }">
        <h3 class="group-title">{{ group.title }}</h3>
        <p class="group-examples">{{ group.examples }}</p>
        <p class="group-text">{{ group.text }}</p>
      </li>
    </ul>

    <div class="insights reveal">
      <article v-for="insight in insights" :key="insight.title" class="insight">
        <p class="insight-kicker">{{ insight.kicker }}</p>
        <h3 class="insight-title">{{ insight.title }}</h3>
        <p>{{ insight.text }}</p>
      </article>
    </div>

    <div class="block">
      <div class="block-head">
        <h3 class="block-title">Was ein Team mit Daten in der EU zahlt</h3>
        <p class="block-text">Der jeweils günstigste Tarif, in dem die Daten in der EU liegen.</p>
      </div>
      <TeamCostChart />
    </div>

    <div class="block block-wide">
      <div class="block-head">
        <h3 class="block-title">Funktionen und Betrieb</h3>
        <p class="block-text">
          OneClickTask kann weniger als die anderen. Dafür ist es in dieser Auswahl das einzige Tool, das laut
          Anbieterangaben kostenlos ist und die Daten in der EU hält, ohne eigenen Server.
        </p>
      </div>
      <div class="table-scroll reveal">
        <table class="compare">
          <thead>
            <tr>
              <th scope="col"><span class="sr-only">Merkmal</span></th>
              <th v-for="tool in compareTools" :key="tool" scope="col" :class="{ 'col-us': tool === 'OneClickTask' }">{{ tool }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in compareRows" :key="row.label">
              <th scope="row">{{ row.label }}</th>
              <td v-for="(cell, index) in row.values" :key="index" :class="{ 'col-us': index === 0 }">
                <Check v-if="cell === true" class="mark mark-yes" aria-label="ja" />
                <Minus v-else-if="cell === false" class="mark mark-no" aria-label="nein" />
                <span v-else class="cell-text">{{ cell }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="source">{{ marketSource }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Check, Minus } from '@lucide/vue'
import { compareRows, compareTools, insights, marketGroups, marketSource } from '~/content/market'
</script>

<style scoped>
.market {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 48px;
}

.market > .block {
  margin-top: 48px;
}

.groups {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1px;
  padding: 0;
  overflow: hidden;
  border-radius: 14px;
  background: var(--line);
  box-shadow: 0 0 0 1px var(--line);
  list-style: none;
}

.group {
  display: grid;
  align-content: start;
  gap: 6px;
  padding: 24px;
  background: var(--paper);
}

.group-title {
  font-size: 1.0625rem;
}

.group-examples {
  color: var(--muted);
  font-size: 0.875rem;
}

.group-text {
  margin-top: 8px;
  font-size: 0.9375rem;
}

.group-us {
  background: var(--accent);
  color: var(--on-accent);
}

.group-us .group-title,
.group-us .group-examples {
  color: var(--on-accent);
}

.insights {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 20px;
}

.insight {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 28px;
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
}

.insight-kicker {
  color: var(--accent-ink);
  font-size: 0.875rem;
  font-weight: 600;
}

.insight-title {
  font-size: 1.5rem;
  letter-spacing: -0.02em;
}

.insight p:last-child {
  color: var(--muted);
}

.block {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 32px;
}

.block-title {
  font-size: clamp(1.5rem, 3vw, 2rem);
  letter-spacing: -0.025em;
}

.block-text {
  margin-top: 8px;
  color: var(--muted);
}

.table-scroll {
  overflow-x: auto;
  border-radius: 14px;
  box-shadow: 0 0 0 1px var(--line);
}

.compare {
  width: 100%;
  min-width: 760px;
  border-collapse: collapse;
  background: var(--surface);
  font-size: 0.9375rem;
}

.compare th,
.compare td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--line);
  text-align: center;
  vertical-align: middle;
}

.compare tbody tr:last-child th,
.compare tbody tr:last-child td {
  border-bottom: 0;
}

.compare thead th {
  color: var(--ink);
  font-weight: 600;
  white-space: nowrap;
}

.compare tbody th {
  color: var(--ink);
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

.compare .col-us {
  background: var(--accent-soft);
}

.compare thead .col-us {
  color: var(--accent-ink);
}

.mark {
  width: 18px;
  height: 18px;
  vertical-align: middle;
}

.mark-yes {
  color: var(--green);
}

.mark-no {
  color: var(--line-strong);
}

.cell-text {
  color: var(--muted);
  font-size: 0.8125rem;
  line-height: 1.3;
}

.source {
  color: var(--muted);
  font-size: 0.8125rem;
}

@media (min-width: 640px) {
  .groups {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 900px) {
  .insights {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .groups {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .block {
    grid-template-columns: minmax(0, 0.35fr) minmax(0, 1fr);
    gap: 48px;
  }

  .block-wide {
    grid-template-columns: minmax(0, 1fr);
  }

  .block-wide .block-head {
    position: static;
    max-width: 44rem;
  }

  .block-head {
    position: sticky;
    top: calc(var(--header-height) + 24px);
    align-self: start;
  }
}
</style>
