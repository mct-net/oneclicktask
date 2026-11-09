<template>
  <section id="moment" class="moment n3-section" aria-labelledby="moment-title">
    <div class="container moment-inner">
      <div class="moment-head">
        <h2 id="moment-title" class="n3-h2" data-reveal>{{ moment.title }}</h2>
        <p class="n3-lead" data-reveal="1">{{ moment.text }}</p>
      </div>

      <ul class="moment-points">
        <li v-for="(point, i) in moment.points" :key="point.key" class="moment-point" :data-reveal="i + 1">
          <span class="moment-icon" aria-hidden="true"><component :is="icons[point.key]" /></span>
          <h3 class="moment-title">{{ point.title }}</h3>
          <p class="moment-text">
            <template v-for="(part, j) in withTags(point.text)" :key="j">
              <span v-if="part.tag" class="hashtag">{{ part.text }}</span>
              <template v-else>{{ part.text }}</template>
            </template>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Clock, Hash, MousePointerClick, PenLine } from '@lucide/vue'
import type { Component } from 'vue'
import { moment } from '~/content/varianten'

const icons: Record<string, Component> = {
  write: PenLine,
  find: Hash,
  click: MousePointerClick,
  due: Clock,
}

// "#hashtag" im Text wie in der App einfärben
function withTags(text: string) {
  return text.split(/(#[\p{L}\d_-]+)/u).filter(Boolean).map(part => ({ text: part, tag: part.startsWith('#') }))
}
</script>

<style scoped>
.moment-inner {
  display: grid;
  gap: 48px;
}

.moment-head {
  display: grid;
  gap: 20px;
  max-width: 44rem;
}

.moment-points {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  padding: 0;
  list-style: none;
}

.moment-point {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 26px 24px 28px;
  border-radius: 16px;
  background: var(--card);
  box-shadow: var(--card-shadow);
}

.moment-icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  border-radius: 10px;
  background: var(--accent-soft);
  color: var(--accent-ink);
}

.moment-icon svg {
  width: 20px;
  height: 20px;
}

.moment-title {
  font-size: 1.1875rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.3;
}

.moment-text {
  color: var(--muted);
  font-size: 1rem;
}

@media (min-width: 640px) {
  .moment-points {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1080px) {
  .moment-points {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
