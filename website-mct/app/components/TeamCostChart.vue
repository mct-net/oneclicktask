<template>
  <div class="cost">
    <div class="cost-control">
      <label for="team-size" class="cost-label">Teamgröße</label>
      <output for="team-size" class="cost-size">{{ size }} {{ size === 1 ? 'Person' : 'Personen' }}</output>
      <input
        id="team-size"
        v-model.number="size"
        type="range"
        min="2"
        :max="MAX_SIZE"
        class="cost-range"
        :style="{ '--fill': `${((size - 2) / (MAX_SIZE - 2)) * 100}%` }"
      >
    </div>

    <table class="cost-table reveal">
      <caption class="sr-only">Monatliche Kosten für {{ size }} Personen</caption>
      <thead class="sr-only">
        <tr><th scope="col">Tool und Tarif</th><th scope="col">Vergleich</th><th scope="col">Pro Monat</th></tr>
      </thead>
      <tbody>
        <tr v-for="tool in costTools" :key="tool.name" :class="{ 'cost-us': tool.price(size) === 0 }">
          <th scope="row" class="cost-name">
            {{ tool.name }}
            <span class="cost-plan">{{ tool.plan }}</span>
          </th>
          <td class="cost-bar-cell">
            <span v-if="tool.price(size) === 0" class="cost-free">keine Kosten pro Person</span>
            <span v-else class="cost-bar" :style="{ width: `${(tool.price(size) * size / scaleMax) * 100}%` }" />
          </td>
          <td class="cost-sum">{{ money(tool.price(size) * size, tool.currency) }}</td>
        </tr>
        <tr v-for="tool in costWithoutPrice" :key="tool.name" class="cost-other">
          <th scope="row" class="cost-name">{{ tool.name }}</th>
          <td colspan="2" class="cost-text">{{ tool.text }}</td>
        </tr>
      </tbody>
    </table>

    <p class="cost-note">{{ costNote }}</p>
  </div>
</template>

<script setup lang="ts">
import { costNote, costTools, costWithoutPrice, type Currency } from '~/content/market'

const MAX_SIZE = 15

const size = ref(8)
const scaleMax = Math.max(...costTools.map(tool => tool.price(MAX_SIZE))) * MAX_SIZE

const formatters: Record<Currency, Intl.NumberFormat> = {
  EUR: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }),
  USD: new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }),
}

function money(value: number, currency: Currency) {
  return formatters[currency].format(Math.round(value))
}
</script>

<style scoped>
.cost {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
}

.cost-control {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: baseline;
  gap: 4px 16px;
}

.cost-label {
  color: var(--muted);
}

.cost-size {
  color: var(--ink);
  font-size: 1.5rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.02em;
}

.cost-range {
  grid-column: 1 / -1;
  width: 100%;
  height: 28px;
  margin: 8px 0 0;
  background: transparent;
  cursor: pointer;
  appearance: none;
}

.cost-range::-webkit-slider-runnable-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, var(--accent) var(--fill), var(--line-strong) var(--fill));
}

.cost-range::-moz-range-track {
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(to right, var(--accent) var(--fill), var(--line-strong) var(--fill));
}

.cost-range::-webkit-slider-thumb {
  width: 24px;
  height: 24px;
  margin-top: -9px;
  border: 3px solid var(--surface);
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 1px var(--accent), 0 2px 8px rgb(var(--shadow) / 0.25);
  appearance: none;
}

.cost-range::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border: 3px solid var(--surface);
  border-radius: 50%;
  background: var(--accent);
}

.cost-range:focus-visible {
  outline: 0;
}

.cost-range:focus-visible::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px var(--accent), 0 0 0 6px var(--accent-soft);
}

.cost-table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}

.cost-table th,
.cost-table td {
  padding: 14px 0;
  border-top: 1px solid var(--line);
  vertical-align: middle;
}

.cost-table .cost-name {
  width: 1%;
  padding-right: 20px;
  color: var(--ink);
  font-weight: 600;
  text-align: left;
  white-space: nowrap;
}

.cost-plan {
  display: block;
  color: var(--muted);
  font-size: 0.8125rem;
  font-weight: 400;
}

.cost-bar {
  display: block;
  height: 12px;
  border-radius: 6px;
  background: var(--line-strong);
  transition: width 0.25s ease-out;
}

.cost-free {
  color: var(--accent-ink);
  font-size: 0.875rem;
  font-weight: 500;
}

.cost-table .cost-sum {
  width: 1%;
  padding-left: 20px;
  color: var(--ink);
  text-align: right;
  white-space: nowrap;
}

.cost-us .cost-name,
.cost-us .cost-sum {
  color: var(--accent-ink);
}

.cost-table .cost-text {
  color: var(--muted);
  font-size: 0.875rem;
}

.cost-other .cost-name {
  color: var(--muted);
  font-weight: 500;
}

.cost-note {
  color: var(--muted);
  font-size: 0.8125rem;
}

@media (prefers-reduced-motion: reduce) {
  .cost-bar {
    transition: none;
  }
}
</style>
