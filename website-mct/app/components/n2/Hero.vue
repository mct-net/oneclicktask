<template>
  <section id="n2-top" class="hero" aria-labelledby="n2-hero-title">
    <div class="hero-grid" aria-hidden="true" />
    <div class="n2-wrap">
      <p class="hero-eyebrow enter" style="--d: 0ms">
        <span class="hero-dot" />{{ hero.eyebrow }}
      </p>

      <h1 id="n2-hero-title" class="hero-title">
        <span class="hero-line enter" style="--d: 90ms">{{ hero.lines[0] }}</span>
        <span class="hero-line enter" style="--d: 230ms">
          <kbd class="hero-key" :class="{ 'hero-key-down': pressed }">Enter</kbd><span class="hero-stop">.</span>
        </span>
        <span class="hero-line enter" style="--d: 370ms">{{ hero.lines[2] }}</span>
      </h1>

      <div class="hero-row">
        <div class="hero-copy enter" style="--d: 520ms">
          <p class="hero-promise">{{ hero.promise }}</p>
          <p class="hero-lead">{{ hero.lead }}</p>
        </div>
        <div class="hero-side enter" style="--d: 620ms">
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

      <div class="hero-stage enter enter-board" style="--d: 760ms">
        <span class="hero-tick hero-tick-tl" aria-hidden="true" />
        <span class="hero-tick hero-tick-tr" aria-hidden="true" />
        <span class="hero-tick hero-tick-bl" aria-hidden="true" />
        <span class="hero-tick hero-tick-br" aria-hidden="true" />
        <div class="hero-frame">
          <div class="hero-frame-bar">
            <span class="hero-frame-dots" aria-hidden="true"><i /><i /><i /></span>
            <span class="hero-frame-label">Live-Demo</span>
            <span class="hero-frame-hint" aria-hidden="true">
              tippen <span class="hero-mini-key">⏎</span> anlegen
              <span class="hero-frame-sep" />
              <span class="n2-chip n2-chip-tag">#kunde</span> filtern
            </span>
          </div>
          <BoardDemo class="hero-board" @submit="press" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public

// Die Enter-Taste im Slogan drückt sich mit, wenn im Demo-Board eine Aufgabe angelegt wird
const pressed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined

function press() {
  pressed.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (pressed.value = false), 180)
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.hero {
  position: relative;
  isolation: isolate;
  padding-top: clamp(40px, 5.5vw, 72px);
  padding-bottom: clamp(64px, 8vw, 112px);
}

/* Feines Arbeitsraster hinter dem Kopf, nach unten ausgeblendet */
.hero-grid {
  position: absolute;
  inset: 0 0 30% 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-position: center top;
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 70% 80% at 50% 0%, #000 30%, transparent 75%);
  pointer-events: none;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 5px 12px 5px 10px;
  border-radius: 999px;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.01em;
}

.hero-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--green);
}

.hero-title {
  display: grid;
  margin-top: 24px;
  font-size: clamp(2.6rem, 7vw, 5.5rem);
  font-weight: 620;
  line-height: 0.98;
  letter-spacing: -0.052em;
}

.hero-line {
  display: block;
  padding-block: 0.02em;
}

.hero-key {
  --travel: 0.075em;

  display: inline-block;
  margin-block: 0.06em;
  padding: 0.04em 0.26em 0.02em;
  border: 1px solid var(--key-hot-edge);
  border-bottom-width: var(--travel);
  border-radius: 0.14em;
  background: var(--key-hot);
  box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.35);
  color: var(--on-key-hot);
  font-family: var(--font-mono);
  font-size: 0.74em;
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.04em;
  vertical-align: 0.04em;
  transition: transform 0.09s ease-out, border-bottom-width 0.09s ease-out;
}

.hero-key-down {
  border-bottom-width: 1px;
  transform: translateY(calc(var(--travel) - 1px));
}

.hero-stop {
  margin-left: 0.04em;
}

.hero-row {
  display: grid;
  gap: 28px;
  margin-top: clamp(28px, 3.4vw, 44px);
}

.hero-lead {
  max-width: 36rem;
  margin-top: 10px;
  color: var(--text);
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
  line-height: 1.55;
  text-wrap: pretty;
}

.hero-promise {
  color: var(--ink);
  font-size: clamp(1.1875rem, 1.7vw, 1.375rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.hero-ctas .btn {
  min-height: 48px;
  font-size: 1rem;
}

.hero-gh {
  width: 18px;
  height: 18px;
}

.hero-fine {
  margin-top: 14px;
  color: var(--muted);
  font-size: 0.875rem;
}

/* Fenster mit Schnittmarken */
.hero-stage {
  position: relative;
  margin-top: clamp(40px, 4.4vw, 64px);
}

.hero-tick {
  position: absolute;
  width: 14px;
  height: 14px;
  border-color: var(--line-strong);
  border-style: solid;
  border-width: 0;
}

.hero-tick-tl { top: -10px; left: -10px; border-top-width: 1px; border-left-width: 1px; }
.hero-tick-tr { top: -10px; right: -10px; border-top-width: 1px; border-right-width: 1px; }
.hero-tick-bl { bottom: -10px; left: -10px; border-bottom-width: 1px; border-left-width: 1px; }
.hero-tick-br { right: -10px; bottom: -10px; border-right-width: 1px; border-bottom-width: 1px; }

.hero-frame {
  overflow: clip;
  border-radius: 14px;
  background: var(--paper);
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 1px 2px rgb(var(--shadow) / 0.06),
    0 32px 64px -32px rgb(var(--shadow) / 0.35);
}

.hero-frame-bar {
  display: flex;
  align-items: center;
  gap: 14px;
  height: 38px;
  padding-inline: 14px;
  border-bottom: 1px solid var(--line);
  background: var(--sunken);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.71875rem;
}

.hero-frame-dots {
  display: inline-flex;
  gap: 6px;
}

.hero-frame-dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.hero-frame-label {
  color: var(--text);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.hero-frame-hint {
  display: none;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.hero-frame-sep {
  width: 1px;
  height: 12px;
  margin-inline: 6px;
  background: var(--line-strong);
}

.hero-mini-key {
  display: inline-grid;
  place-items: center;
  min-width: 20px;
  height: 18px;
  padding-inline: 4px;
  border: 1px solid var(--key-hot-edge);
  border-bottom-width: 2px;
  border-radius: 4px;
  background: var(--key-hot);
  color: var(--on-key-hot);
  font-weight: 600;
}

.hero-board {
  border-radius: 0 !important;
  box-shadow: none !important;
}

@media (min-width: 640px) {
  .hero-frame-hint {
    display: inline-flex;
  }
}

@media (min-width: 960px) {
  .hero-row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 64px;
  }

  .hero-side {
    justify-self: end;
    text-align: right;
  }

  .hero-ctas {
    justify-content: flex-end;
  }

  .hero-fine {
    max-width: 27rem;
    margin-left: auto;
    text-wrap: balance;
  }
}

@media (max-width: 479px) {
  .hero-tick {
    display: none;
  }

  .hero-ctas .btn {
    flex: 1 1 100%;
  }
}

/* Orchestrierter Einstieg: Zeilen gestaffelt, dann das Board */
@media (prefers-reduced-motion: no-preference) {
  .enter {
    animation: hero-in 0.9s var(--ease-out) both;
    animation-delay: var(--d, 0ms);
  }

  .hero-line.enter {
    animation-name: hero-line-in;
  }

  .enter-board {
    animation-name: hero-board-in;
    animation-duration: 1.1s;
  }
}

@keyframes hero-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
}

@keyframes hero-line-in {
  from {
    opacity: 0;
    transform: translateY(0.28em);
    filter: blur(6px);
  }
}

@keyframes hero-board-in {
  from {
    opacity: 0;
    transform: translateY(28px) scale(0.985);
  }
}
</style>
