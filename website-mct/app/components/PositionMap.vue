<template>
  <figure class="map reveal">
    <div class="map-scroll">
      <svg class="map-svg" :viewBox="`0 0 ${W} ${H}`" role="img" aria-labelledby="map-title map-desc">
        <title id="map-title">Positionierung von 14 Aufgaben- und Projekttools</title>
        <desc id="map-desc">
          Horizontal: von wenigen Funktionen bis zu vielen Funktionen. Vertikal: von bezahlt mit geschlossenem Code
          bis kostenlos mit öffentlichem Code. Im Feld oben links steht nur OneClickTask.
        </desc>

        <rect class="map-zone" :x="X0" :y="Y0" :width="xMid - X0" :height="yMid - Y0" rx="10" />
        <text class="map-zone-label" :x="X0 + 16" :y="Y0 + 28">Einfach und frei</text>

        <rect class="map-frame" :x="X0" :y="Y0" :width="X1 - X0" :height="Y1 - Y0" rx="10" />
        <line class="map-frame" :x1="X0" :y1="yMid" :x2="X1" :y2="yMid" />
        <line class="map-frame" :x1="xMid" :y1="Y0" :x2="xMid" :y2="Y1" />

        <text class="map-axis" :x="X0" :y="Y1 + 28">Wenige Funktionen, schnell</text>
        <text class="map-axis" :x="X1" :y="Y1 + 28" text-anchor="end">Viele Funktionen</text>
        <text class="map-axis" :transform="`translate(${X0 - 18} ${Y0}) rotate(-90)`" text-anchor="end">Kostenlos, Code öffentlich</text>
        <text class="map-axis" :transform="`translate(${X0 - 18} ${Y1}) rotate(-90)`">Bezahlt, Code geschlossen</text>

        <g v-for="tool in tools" :key="tool.name">
          <circle class="map-dot" :class="{ 'map-dot-open': tool.open }" :cx="sx(tool.x)" :cy="sy(tool.y)" r="6" />
          <text
            class="map-name"
            :x="sx(tool.x) + 12 * tool.side"
            :y="sy(tool.y) + 4.5"
            :text-anchor="tool.side > 0 ? 'start' : 'end'"
          >{{ tool.name }}</text>
        </g>

        <circle class="map-us-ring" :cx="sx(US.x)" :cy="sy(US.y)" r="24" />
        <circle class="map-us" :cx="sx(US.x)" :cy="sy(US.y)" r="11" />
        <text class="map-us-name" :x="sx(US.x) + 34" :y="sy(US.y) + 6">OneClickTask</text>
      </svg>
    </div>
    <p class="map-hint">Seitlich wischen, um die ganze Karte zu sehen.</p>
    <figcaption class="map-legend">
      <span><i class="map-key map-key-us" />OneClickTask</span>
      <span><i class="map-key map-key-open" />Open Source</span>
      <span><i class="map-key" />Kommerziell</span>
      <span class="map-source">Qualitative Einordnung aus unserer Marktanalyse, Stand Oktober 2026</span>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
type Tool = { name: string, x: number, y: number, open?: boolean, side: 1 | -1 }

const W = 800
const H = 450
const X0 = 70
const X1 = 780
const Y0 = 20
const Y1 = 400
const xMid = (X0 + X1) / 2
const yMid = (Y0 + Y1) / 2
const sx = (v: number) => X0 + v * (X1 - X0)
const sy = (v: number) => Y1 - v * (Y1 - Y0)

const US = { x: 0.13, y: 0.8 }

// Einordnung aus dem Produkt-Workshop (Recherche-Stand 11.10.2026)
const tools: Tool[] = [
  { name: 'Microsoft To Do', x: 0.1, y: 0.3, side: 1 },
  { name: 'Todoist', x: 0.2, y: 0.22, side: 1 },
  { name: 'Things 3', x: 0.16, y: 0.08, side: 1 },
  { name: 'TickTick', x: 0.31, y: 0.14, side: 1 },
  { name: 'Trello', x: 0.46, y: 0.3, side: 1 },
  { name: 'Linear', x: 0.55, y: 0.17, side: 1 },
  { name: 'MeisterTask', x: 0.64, y: 0.25, side: 1 },
  { name: 'awork', x: 0.72, y: 0.1, side: 1 },
  { name: 'Stackfield', x: 0.81, y: 0.17, side: -1 },
  { name: 'Asana', x: 0.87, y: 0.33, side: -1 },
  { name: 'ClickUp', x: 0.95, y: 0.06, side: -1 },
  { name: 'Kanboard', x: 0.56, y: 0.86, open: true, side: 1 },
  { name: 'Planka', x: 0.66, y: 0.75, open: true, side: 1 },
  { name: 'Vikunja', x: 0.86, y: 0.9, open: true, side: -1 },
]
</script>

<style scoped>
.map {
  padding: 24px;
  border-radius: 14px;
  background: var(--surface);
  box-shadow: 0 0 0 1px var(--line);
}

.map-scroll {
  overflow-x: auto;
  scrollbar-width: thin;
}

.map-svg {
  display: block;
  width: 100%;
  min-width: 620px;
  height: auto;
  font-family: var(--font-sans);
}

.map-zone {
  fill: var(--accent-soft);
}

.map-zone-label {
  fill: var(--accent-ink);
  font-size: 14px;
  font-weight: 600;
}

.map-frame {
  fill: none;
  stroke: var(--line);
  stroke-width: 1;
}

.map-axis {
  fill: var(--muted);
  font-size: 12px;
}

.map-dot {
  fill: var(--line-strong);
  stroke: var(--surface);
  stroke-width: 2;
}

.map-dot-open {
  fill: var(--muted);
}

.map-name {
  fill: var(--text);
  font-size: 13px;
}

.map-us {
  fill: var(--accent);
  stroke: var(--surface);
  stroke-width: 3;
}

.map-us-ring {
  fill: none;
  stroke: var(--accent);
  stroke-width: 1.5;
  opacity: 0.45;
  transform-box: fill-box;
  transform-origin: center;
}

.map-us-name {
  fill: var(--ink);
  font-size: 17px;
  font-weight: 700;
}

.map-hint {
  margin-top: 8px;
  color: var(--muted);
  font-size: 0.8125rem;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px 20px;
  margin-top: 16px;
  color: var(--muted);
  font-size: 0.875rem;
}

.map-legend span {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.map-source {
  margin-left: auto;
  font-size: 0.8125rem;
}

.map-key {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--line-strong);
}

.map-key-open {
  background: var(--muted);
}

.map-key-us {
  background: var(--accent);
}

@media (min-width: 640px) {
  .map-hint {
    display: none;
  }
}
</style>
