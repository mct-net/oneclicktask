<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero-top">
        <div class="hero-copy">
          <p class="n3-label hero-eyebrow">{{ hero.eyebrow }}</p>
          <h1 id="hero-title" class="hero-title">
            <span class="hero-line" style="--i: 0">{{ hero.lines[0] }}</span>
            <span class="hero-line" style="--i: 1">
              <KeyCap hot :pressed="pressed" class="hero-key" aria-hidden="true">Enter<CornerDownLeft class="hero-key-icon" /></KeyCap><span class="sr-only">{{ hero.lines[1] }}</span>
            </span>
            <span class="hero-line" style="--i: 2">{{ hero.lines[2] }}</span>
          </h1>
        </div>

        <div class="hero-side">
          <p class="hero-promise">{{ hero.promise }}</p>
          <p class="hero-lead">{{ hero.lead }}</p>
          <div class="hero-ctas">
            <a :href="`${appUrl}/register`" class="btn btn-primary btn-lg">
              {{ hero.primary }}
              <ArrowRight aria-hidden="true" />
            </a>
            <a :href="repositoryUrl" class="btn btn-quiet btn-lg">
              <GithubIcon class="hero-gh" />
              {{ hero.secondary }}
            </a>
          </div>
          <p class="hero-fine">{{ hero.fine }}</p>
        </div>
      </div>

      <div class="hero-stage">
        <p class="hero-try">
          <span class="hero-try-dot" />Zum Ausprobieren: tipp etwas ein und drück Enter
        </p>
        <BoardDemo class="hero-board" @submit="press" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, CornerDownLeft } from '@lucide/vue'
import { hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public

// Die Enter-Taste in der Überschrift drückt mit, sobald im Demo-Board eine Aufgabe angelegt wird
const pressed = ref(false)
function press() {
  pressed.value = true
  setTimeout(() => (pressed.value = false), 180)
}
</script>

<style scoped>
.hero {
  padding-block: clamp(40px, 7vw, 88px) clamp(8px, 2vw, 24px);
}

.hero-top {
  display: grid;
  gap: 32px;
}

.hero-eyebrow {
  margin-bottom: 20px;
}

.hero-title {
  display: grid;
  justify-items: start;
  font-family: var(--font-display);
  font-size: clamp(2.75rem, 8.4vw, 5.5rem);
  font-weight: 640;
  letter-spacing: -0.035em;
  line-height: 1.02;
}

.hero-line {
  display: block;
}

/* Die Taste sitzt in der Zeile wie ein Wort: gleiche Höhe wie die Großbuchstaben, eigener Hub */
.hero-title .hero-key {
  --travel: 0.09em;

  gap: 0.18em;
  margin-block: 0.06em 0.1em;
  padding: 0.1em 0.3em 0.06em 0.34em;
  border-radius: 0.16em;
  font-size: 0.74em;
  font-weight: 600;
  letter-spacing: -0.02em;
  vertical-align: 0.04em;
}

.hero-key-icon {
  width: 0.62em;
  height: 0.62em;
  stroke-width: 2.5;
  opacity: 0.85;
}

.hero-side {
  display: grid;
  align-content: end;
  gap: 18px;
  max-width: 34rem;
}

.hero-promise {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.375rem, 2.4vw, 1.75rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.hero-lead {
  color: var(--text);
  font-size: 1.0625rem;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.hero-gh {
  width: 18px;
  height: 18px;
}

.hero-fine {
  color: var(--muted);
  font-size: 0.875rem;
}

.hero-stage {
  margin-top: clamp(48px, 7vw, 80px);
}

.hero-try {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 14px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
}

.hero-try-dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  margin-top: 0.5em;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-soft);
}

.hero-board {
  position: relative;
}

@media (prefers-color-scheme: dark) {
  .hero .hero-board {
    box-shadow: 0 0 0 1px var(--line-strong), 0 40px 80px -30px rgb(0 0 0 / 0.9);
  }
}

@media (min-width: 960px) {
  .hero-top {
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 0.75fr);
    gap: 56px;
    align-items: end;
  }

  .hero-side {
    padding-bottom: 10px;
  }
}

/* Die drei Zeilen kommen beim Laden nacheinander, danach steht alles still */
@media (prefers-reduced-motion: no-preference) {
  .hero-line {
    animation: line-in 0.8s var(--ease-out) both;
    animation-delay: calc(120ms + var(--i) * 140ms);
  }

  .hero-side,
  .hero-eyebrow {
    animation: line-in 0.8s var(--ease-out) both;
    animation-delay: 520ms;
  }

  .hero-eyebrow {
    animation-delay: 0ms;
  }

  .hero-stage {
    animation: stage-in 1s var(--ease-out) both;
    animation-delay: 640ms;
  }
}

@keyframes line-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@keyframes stage-in {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
}
</style>
