<template>
  <section id="los" class="section" aria-labelledby="n1-closing-title">
    <div class="container">
      <div class="closing" data-reveal>
        <h2 id="n1-closing-title" class="closing-title">{{ closing.title }}</h2>
        <p class="closing-text">{{ closing.text }}</p>
        <div class="closing-actions">
          <a :href="`${appUrl}/register`" class="n1-btn n1-btn-lg closing-btn">
            {{ closing.primary }}
            <KeyCap class="closing-key" aria-hidden="true">↵</KeyCap>
          </a>
          <a :href="repositoryUrl" target="_blank" rel="noopener" class="n1-btn n1-btn-lg closing-ghost">
            <GithubIcon class="n1-btn-icon" />
            {{ hero.secondary }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { closing, hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.section {
  padding-block: 24px 72px;
}

/* Die eine große Fläche in Signalfarbe, ganz am Ende */
.closing {
  --ink: #fff;
  --key: #fff;
  --key-edge: #b9c3f0;

  display: grid;
  justify-items: center;
  gap: 18px;
  padding: 64px 24px;
  border-radius: 24px;
  background: #2040e0;
  color: #dfe5ff;
  text-align: center;
}

.closing-title {
  max-width: 16ch;
  color: #fff;
  font-size: clamp(2.25rem, 6.4vw, 4.5rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.042em;
}

.closing-text {
  max-width: 30rem;
  font-size: 1.1875rem;
}

.closing-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 16px;
}

.closing-btn {
  background: #fff;
  color: #0c1424;
  box-shadow: inset 0 -2px 0 rgb(12 20 36 / 0.12);
}

.closing-btn:hover {
  background: #eef1ff;
}

.closing-key {
  --ink: #0c1424;
  --key-edge: #c3cad6;

  font-size: 0.8125rem;
}

.closing-ghost {
  color: #fff;
  box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.4);
}

.closing-ghost:hover {
  background: rgb(255 255 255 / 0.1);
  box-shadow: inset 0 0 0 1px #fff;
}

.closing :focus-visible {
  outline-color: #fff;
}

@media (prefers-color-scheme: dark) {
  .closing {
    background: #2a46d8;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: 0 120px;
  }

  .closing {
    gap: 22px;
    padding: 120px 48px;
    border-radius: 28px;
  }
}
</style>
