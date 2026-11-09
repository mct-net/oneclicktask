<template>
  <section class="closing" aria-labelledby="n2-closing-title">
    <div class="closing-grid" aria-hidden="true" />
    <div class="n2-wrap closing-inner">
      <div class="closing-field" data-reveal aria-hidden="true">
        <span class="closing-placeholder">Find or create...<span class="closing-caret" /></span>
        <KeyCap hot>⏎</KeyCap>
      </div>
      <h2 id="n2-closing-title" class="closing-title" data-reveal="1">{{ closing.title }}</h2>
      <p class="closing-text" data-reveal="2">{{ closing.text }}</p>
      <div class="closing-ctas" data-reveal="3">
        <a :href="`${appUrl}/register`" class="btn btn-primary btn-lg">
          {{ closing.primary }}
          <ArrowRight aria-hidden="true" />
        </a>
        <a :href="repositoryUrl" class="btn btn-quiet btn-lg">
          <GithubIcon class="closing-gh" />
          {{ hero.secondary }}
        </a>
      </div>
      <p class="closing-fine" data-reveal="3">{{ hero.fine }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from '@lucide/vue'
import { closing, hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.closing {
  position: relative;
  isolation: isolate;
  padding-block: clamp(96px, 13vw, 168px);
  border-top: 1px solid var(--line);
  text-align: center;
}

.closing-grid {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(var(--grid-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-line) 1px, transparent 1px);
  background-position: center center;
  background-size: 56px 56px;
  mask-image: radial-gradient(ellipse 60% 70% at 50% 50%, #000 20%, transparent 72%);
  pointer-events: none;
}

.closing-inner {
  display: grid;
  justify-items: center;
}

.closing-field {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: min(100%, 360px);
  height: 50px;
  margin-bottom: 40px;
  padding: 0 10px 0 16px;
  border-radius: 10px;
  background: var(--paper);
  box-shadow: inset 0 0 0 1.5px var(--line-strong), 0 20px 40px -28px rgb(var(--shadow) / 0.5);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.875rem;
}

.closing-placeholder {
  display: inline-flex;
  align-items: center;
}

.closing-caret {
  width: 1.5px;
  height: 16px;
  margin-left: 3px;
  background: var(--ink);
}

.closing-title {
  max-width: 16ch;
  font-size: clamp(2.25rem, 5.6vw, 4.5rem);
  line-height: 1.02;
  letter-spacing: -0.045em;
  text-wrap: balance;
}

.closing-text {
  max-width: 32rem;
  margin-top: 20px;
  color: var(--muted);
  font-size: clamp(1.0625rem, 1.5vw, 1.25rem);
}

.closing-ctas {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 36px;
}

.closing-ctas .btn {
  min-height: 48px;
  font-size: 1rem;
}

.closing-gh {
  width: 18px;
  height: 18px;
}

.closing-fine {
  margin-top: 16px;
  color: var(--muted);
  font-size: 0.875rem;
}

@media (prefers-reduced-motion: no-preference) {
  .closing-caret {
    animation: closing-caret 1.1s steps(1) infinite;
  }
}

@keyframes closing-caret {
  50% {
    opacity: 0;
  }
}

@media (max-width: 479px) {
  .closing-ctas .btn {
    flex: 1 1 100%;
  }
}
</style>
