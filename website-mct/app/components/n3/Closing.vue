<template>
  <section class="closing" aria-labelledby="closing-title">
    <div class="container">
      <div class="closing-card" data-reveal>
        <div class="closing-copy">
          <h2 id="closing-title" class="n3-h2">{{ closing.title }}</h2>
          <p class="closing-text">{{ closing.text }}</p>
        </div>
        <div class="closing-actions">
          <p class="closing-keys" aria-hidden="true">
            <span class="closing-typed">Idee notieren</span>
            <KeyCap hot>Enter</KeyCap>
          </p>
          <div class="closing-ctas">
            <a :href="`${appUrl}/register`" class="btn btn-primary btn-lg">
              {{ closing.primary }}
              <ArrowRight aria-hidden="true" />
            </a>
            <a :href="repositoryUrl" class="btn btn-quiet btn-lg">
              <GithubIcon class="closing-gh" />
              {{ hero.secondary }}
            </a>
          </div>
          <p class="closing-fine">{{ hero.fine }}</p>
        </div>
      </div>
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
  padding-block: 0 clamp(72px, 10vw, 120px);
}

.closing-card {
  display: grid;
  gap: 36px;
  padding: clamp(32px, 6vw, 72px);
  border-radius: 24px;
  background: var(--card);
  box-shadow: var(--card-shadow);
}

.closing-copy {
  display: grid;
  gap: 16px;
  max-width: 36rem;
}

.closing-text {
  color: var(--muted);
  font-size: 1.1875rem;
}

.closing-actions {
  display: grid;
  align-content: end;
  gap: 18px;
}

.closing-keys {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 1.125rem;
}

.closing-typed::after {
  content: '';
  display: inline-block;
  width: 2px;
  height: 1.1em;
  margin-left: 3px;
  background: var(--accent);
  vertical-align: -0.2em;
}

.closing-ctas {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.closing-gh {
  width: 18px;
  height: 18px;
}

.closing-fine {
  color: var(--muted);
  font-size: 0.875rem;
}

@media (min-width: 960px) {
  .closing-card {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 56px;
  }
}

@media (prefers-reduced-motion: no-preference) {
  .closing-typed::after {
    animation: caret 1.1s steps(1) infinite;
  }
}

@keyframes caret {
  50% {
    opacity: 0;
  }
}
</style>
