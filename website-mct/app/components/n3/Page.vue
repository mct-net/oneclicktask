<template>
  <div ref="root" class="n3">
    <a class="n3-skip" href="#inhalt">Zum Inhalt springen</a>
    <N3Header />
    <main id="inhalt">
      <N3Hero />
      <N3Moment />
      <N3Day />
      <N3Quote />
      <N3Values />
      <N3Team />
      <N3Faq />
      <N3Closing />
    </main>
    <N3Footer />
  </div>
</template>

<script setup lang="ts">
import '@fontsource-variable/bricolage-grotesque'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<style>
/*
 * N3 "Alltag": die helle App-Fläche mit weißen Karten, ein einziger Akzent in Petrol.
 * Die Tokens überschreiben main.css nur innerhalb dieser Seite, die Bausteine lesen sie mit.
 */
.n3 {
  color-scheme: light;
  --paper: #e6ebef;
  --surface: #f3f6f9;
  --sunken: #dde3e9;
  --card: #fff;
  --ink: #232b31;
  --text: #3a434b;
  --muted: #5a636c;
  --line: #d3dae0;
  --line-strong: #b4bdc6;
  --primary: #2f7471;
  --on-primary: #fff;
  --accent: #2f7471;
  --accent-hover: #27615e;
  --on-accent: #fff;
  --accent-soft: #d5e7e5;
  --accent-ink: #235c59;
  --key: #fff;
  --key-edge: #b4bdc6;
  --key-hot: #2f7471;
  --key-hot-edge: #1b4644;
  --on-key-hot: #fff;
  --chip: #d6dee5;
  --shadow: 30 45 55;
  --font-display: 'Bricolage Grotesque Variable', var(--font-sans);
  --card-shadow: 0 0 0 1px rgb(var(--shadow) / 0.06), 0 1px 2px rgb(var(--shadow) / 0.06), 0 12px 32px -18px rgb(var(--shadow) / 0.35);
  --header-height: 68px;

  min-height: 100vh;
  background: var(--paper);
  color: var(--text);
}

@media (prefers-color-scheme: dark) {
  .n3 {
    color-scheme: dark;
    --paper: #060709;
    --surface: #17191b;
    --sunken: #111315;
    --card: #131517;
    --ink: #f0f3f7;
    --text: #c9ced4;
    --muted: #8f989f;
    --line: #232629;
    --line-strong: #3a3e42;
    --primary: #74b9b7;
    --on-primary: #060709;
    --accent: #74b9b7;
    --accent-hover: #8fcac8;
    --on-accent: #060709;
    --accent-soft: #14292a;
    --accent-ink: #86c6c4;
    --key: #292c2e;
    --key-edge: #000;
    --key-hot: #74b9b7;
    --key-hot-edge: #3d6e6c;
    --on-key-hot: #060709;
    --chip: #292c2e;
    --shadow: 0 0 0;
    --card-shadow: 0 0 0 1px var(--line), 0 18px 40px -24px rgb(0 0 0 / 0.9);
  }
}

.n3 ::selection {
  background: var(--accent);
  color: var(--on-accent);
}

.n3 :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
  border-radius: 6px;
}

.n3 .hashtag {
  color: var(--accent-ink);
}

/* Überschriften: Bricolage nur für die großen Zeilen, ruhig gesetzt */
.n3 .n3-h2 {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(2rem, 4.2vw, 3rem);
  font-weight: 620;
  letter-spacing: -0.025em;
  line-height: 1.08;
}

.n3 .n3-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--accent-ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.02em;
}

.n3 .n3-section {
  padding-block: clamp(72px, 10vw, 128px);
}

.n3 .n3-lead {
  max-width: 38rem;
  color: var(--muted);
  font-size: 1.125rem;
}

/* Schaltflächen dieser Seite */
.n3 .btn-primary {
  background: var(--primary);
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 0.18);
  color: var(--on-primary);
}

.n3 .btn-primary:hover {
  background: var(--accent-hover);
  opacity: 1;
}

.n3 .btn-quiet {
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.n3 .btn-quiet:hover {
  box-shadow: inset 0 0 0 1px var(--ink);
}

.n3 .btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.n3-skip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--card);
  color: var(--ink);
  font-weight: 600;
  translate: 0 -200%;
}

.n3-skip:focus-visible {
  translate: 0 0;
}

/* Einblenden beim Hinscrollen (useReveal) */
.n3.reveal-ready [data-reveal] {
  transition: opacity 0.7s var(--ease-out), transform 0.7s var(--ease-out);
  transition-delay: var(--reveal-delay, 0ms);
}

.n3.reveal-ready [data-reveal]:not(.is-in) {
  opacity: 0;
  transform: translateY(16px);
}

@media (prefers-reduced-motion: reduce) {
  .n3.reveal-ready [data-reveal] {
    transition: none;
  }
}
</style>
