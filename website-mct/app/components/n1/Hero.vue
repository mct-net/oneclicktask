<template>
  <section id="start" class="hero" aria-labelledby="n1-hero-title">
    <div class="container hero-copy">
      <p class="hero-eyebrow n1-in" style="--d: 0ms">
        <span class="hero-eyebrow-mark" aria-hidden="true" />
        {{ hero.eyebrow }}
      </p>

      <h1 id="n1-hero-title" class="hero-title">
        <span class="hero-line n1-in" style="--d: 90ms">{{ hero.lines[0] }}</span>{{ ' ' }}
        <span class="hero-line n1-in" style="--d: 180ms"><KeyCap hot :pressed="keyPressed" class="hero-key">Enter<span class="hero-key-glyph" aria-hidden="true">↵</span></KeyCap><span class="hero-dot">.</span></span>{{ ' ' }}
        <span class="hero-line n1-in" style="--d: 270ms">{{ hero.lines[2] }}</span>
      </h1>

      <p class="hero-promise n1-in" style="--d: 420ms">{{ hero.promise }}</p>
      <p class="hero-lead n1-in" style="--d: 480ms">{{ hero.lead }}</p>

      <div class="hero-actions n1-in" style="--d: 560ms">
        <a :href="`${appUrl}/register`" class="n1-btn n1-btn-lg n1-btn-primary">
          {{ hero.primary }}
          <ArrowRight class="n1-btn-arrow" aria-hidden="true" />
        </a>
        <a :href="repositoryUrl" target="_blank" rel="noopener" class="n1-btn n1-btn-lg n1-btn-quiet">
          <GithubIcon class="n1-btn-icon" />
          {{ hero.secondary }}
        </a>
      </div>
      <p class="hero-fine n1-in" style="--d: 620ms">{{ hero.fine }}</p>
    </div>

    <div class="container">
      <figure class="stage n1-in" style="--d: 700ms">
        <figcaption class="stage-bar">
          <span class="n1-label"><span class="stage-live" aria-hidden="true" />Live-Demo</span>
          <span class="stage-hint">Tippe eine Aufgabe mit <span class="hashtag">#hashtag</span> und drück <KeyCap class="stage-key">↵</KeyCap></span>
        </figcaption>
        <BoardDemo @submit="press" />
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public

// Die Enter-Taste im Slogan drückt sich mit, sobald im Demo-Board eine Aufgabe entsteht
const keyPressed = ref(false)
let timer: ReturnType<typeof setTimeout> | undefined
function press() {
  keyPressed.value = true
  clearTimeout(timer)
  timer = setTimeout(() => (keyPressed.value = false), 200)
}
onBeforeUnmount(() => clearTimeout(timer))
</script>

<style scoped>
.hero {
  padding-block: 48px 40px;
}

.hero-copy {
  display: grid;
  justify-items: center;
  text-align: center;
}

.hero-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 10px;
  border-radius: 999px;
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.hero-eyebrow-mark {
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: var(--primary);
}

.hero-title {
  margin-top: 28px;
  color: var(--ink);
  font-size: clamp(2.125rem, 9.3vw, 5.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.hero-line {
  display: block;
}

.hero-title .hero-key {
  --travel: 0.11em;

  gap: 0.22em;
  margin-block: 0.06em 0.1em;
  padding: 0.1em 0.32em 0.06em 0.36em;
  border-radius: 0.2em;
  font-size: 0.64em;
  font-weight: 600;
  letter-spacing: -0.03em;
  vertical-align: 0.08em;
}

.hero-key-glyph {
  font-size: 0.86em;
  opacity: 0.85;
}

.hero-dot {
  margin-left: 0.04em;
}

.hero-promise {
  margin-top: 32px;
  color: var(--ink);
  font-size: clamp(1.25rem, 2.4vw, 1.625rem);
  font-weight: 600;
  letter-spacing: -0.02em;
}

.hero-lead {
  max-width: 40rem;
  margin-top: 14px;
  color: var(--muted);
  font-size: 1.125rem;
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
}

@media (max-width: 479px) {
  .hero-actions {
    display: grid;
    justify-content: stretch;
    width: 100%;
    max-width: 22rem;
  }

  .hero-lead {
    font-size: 1.0625rem;
  }
}

.hero-fine {
  margin-top: 16px;
  color: var(--muted);
  font-size: 0.875rem;
}

/* Ruhiger Rahmen um das Demo-Board: feines Raster, keine Farbe */
.stage {
  margin: 64px 0 0;
  padding: 0 8px 8px;
  border-radius: 20px;
  background-color: var(--sunken);
  background-image:
    linear-gradient(rgb(var(--shadow) / 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgb(var(--shadow) / 0.045) 1px, transparent 1px);
  background-position: -1px -1px;
  background-size: 28px 28px;
  box-shadow: inset 0 0 0 1px var(--line);
}

.stage-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 48px;
  padding-inline: 8px;
}

.stage-live {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--primary);
}

@media (prefers-reduced-motion: no-preference) {
  .stage-live {
    animation: live 2.4s ease-in-out infinite;
  }
}

.stage-hint {
  display: none;
  color: var(--muted);
  font-size: 0.875rem;
}

.stage-key {
  font-size: 0.8125rem;
}

/* Orchestrierter Einstieg: alles erscheint nacheinander, dann tippt das Board selbst */
@media (prefers-reduced-motion: no-preference) {
  .n1-in {
    animation: rise 0.9s var(--n1-ease) both;
    animation-delay: var(--d, 0ms);
  }

  .stage.n1-in {
    animation-name: rise-stage;
    animation-duration: 1.1s;
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
}

@keyframes rise-stage {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.985);
  }
}

@keyframes live {
  50% {
    opacity: 0.35;
  }
}

@media (min-width: 640px) {
  .stage {
    padding: 0 16px 16px;
    border-radius: 24px;
  }

  .stage-bar {
    min-height: 56px;
    padding-inline: 6px;
  }

  .stage-hint {
    display: inline;
  }
}

@media (min-width: 1024px) {
  .hero {
    padding-block: 56px 56px;
  }

  .hero-title {
    margin-top: 28px;
  }

  .stage {
    margin-top: 52px;
    padding: 0 40px 40px;
  }

  .stage-bar {
    min-height: 72px;
    padding-inline: 0;
  }
}
</style>
