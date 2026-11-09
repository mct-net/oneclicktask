<!--
  Variante N2 "Werkbank": produktgetrieben, dunkel zuerst, in den Farben der echten App.
  Orange ist nur Signal (Enter-Taste, Hashtags, Fokus). Typo: Geist + Geist Mono.
-->
<template>
  <div ref="root" class="n2">
    <a class="n2-skip" href="#n2-main">Zum Inhalt springen</a>
    <N2Header />
    <main id="n2-main">
      <N2Hero />
      <N2Moment />
      <N2How />
      <N2Quote />
      <N2Values />
      <N2Team />
      <N2Faq />
      <N2Closing />
    </main>
    <N2Footer />
  </div>
</template>

<script setup lang="ts">
import '@fontsource-variable/geist'

const root = ref<HTMLElement | null>(null)
useReveal(root)
</script>

<style>
/* Tokens: hell = App-Hellfarben, dunkel = App-Dunkelfarben. Die Bausteine lesen dieselben Namen. */
.n2 {
  color-scheme: light;

  --font-sans: 'Geist Variable', system-ui, -apple-system, 'Segoe UI', Roboto, Arial, sans-serif;
  --font-mono: 'Geist Mono Variable', ui-monospace, 'Cascadia Mono', Consolas, monospace;
  --header-h: 60px;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);

  --paper: #e6ebef;
  --surface: #f3f6f9;
  --sunken: #dde3e9;
  --ink: #2b333a;
  --text: #3f4850;
  --muted: #5d6570;
  --line: #ccd3da;
  --line-strong: #b4bdc6;
  --primary: #2b333a;
  --on-primary: #f3f6f9;
  --accent: #f9954c;
  --accent-hover: #ffa766;
  --on-accent: #060709;
  --accent-soft: #fde3cf;
  --accent-ink: #a8550f;
  --star: #d9a334;
  --red: #d94a4a;
  --lilac: #b77398;
  --teal: #3f8c89;
  --green: #5f8f2f;
  --key: #f3f6f9;
  --key-edge: #b4bdc6;
  --key-hot: #f9954c;
  --key-hot-edge: #b8682c;
  --on-key-hot: #060709;
  --chip: #d6dee5;
  --shadow: 23 28 33;

  /* Seitenflächen */
  --bg: #e6ebef;
  --bg-raised: #edf1f4;
  --card: #f3f6f9;
  --grid-line: rgb(43 51 58 / 0.055);

  overflow-x: clip;
  min-height: 100vh;
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans);
  font-size: 1.0625rem;
  line-height: 1.6;
  font-feature-settings: 'ss01' off;
}

@media (prefers-color-scheme: dark) {
  .n2 {
    color-scheme: dark;

    --paper: #060709;
    --surface: #17191b;
    --sunken: #111315;
    --ink: #f0f3f7;
    --text: #c9ced4;
    --muted: #8d969e;
    --line: #26292c;
    --line-strong: #3a3e42;
    --primary: #f0f3f7;
    --on-primary: #060709;
    --accent-soft: #3a2414;
    --accent-ink: #f9954c;
    --star: #efc970;
    --red: #f66c6c;
    --teal: #74b9b7;
    --green: #a4c877;
    --key: #292c2e;
    --key-edge: #000;
    --chip: #232629;
    --shadow: 0 0 0;

    --bg: #060709;
    --bg-raised: #0b0c0e;
    --card: #111315;
    --grid-line: rgb(240 243 247 / 0.045);
  }
}

.n2 ::selection {
  background: var(--accent);
  color: var(--on-accent);
}

.n2 h1,
.n2 h2,
.n2 h3 {
  color: var(--ink);
  font-weight: 600;
}

.n2-skip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--on-primary);
  font-size: 0.875rem;
  text-decoration: none;
  transform: translateY(-200%);
}

.n2-skip:focus-visible {
  transform: none;
}

.n2-wrap {
  width: 100%;
  max-width: 1240px;
  margin-inline: auto;
  padding-inline: 20px;
}

@media (min-width: 768px) {
  .n2-wrap {
    padding-inline: 32px;
  }
}

.n2-section {
  padding-block: clamp(80px, 11vw, 144px);
  border-top: 1px solid var(--line);
}

/* Abschnittskopf: Mono-Label, enge Überschrift, ruhiger Absatz */
.n2-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.n2-eyebrow-index {
  color: var(--ink);
}

.n2-eyebrow-index::after {
  content: '';
  display: inline-block;
  width: 18px;
  height: 1px;
  margin-left: 10px;
  vertical-align: middle;
  background: var(--line-strong);
}

.n2-h2 {
  max-width: 22ch;
  font-size: clamp(2rem, 4.2vw, 3.25rem);
  line-height: 1.04;
  letter-spacing: -0.035em;
  text-wrap: balance;
}

.n2-lead {
  max-width: 38rem;
  margin-top: 20px;
  color: var(--muted);
  font-size: clamp(1.0625rem, 1.4vw, 1.1875rem);
  line-height: 1.6;
  text-wrap: pretty;
}

/* Kleine Mono-Chips: ⏎, #tag, +1d */
.n2-chip {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 1px 7px;
  border-radius: 6px;
  background: var(--chip);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.78em;
  font-weight: 500;
  line-height: 1.6;
  white-space: nowrap;
}

.n2-chip-tag {
  color: var(--accent-ink);
}

.n2 .hashtag {
  color: var(--accent-ink);
}

/* Schaltflächen: Hauptbutton in Schriftfarbe, Fokus orange (global über :focus-visible) */
.n2 .btn {
  font-family: var(--font-sans);
  letter-spacing: -0.01em;
}

.n2 .btn-primary {
  background: var(--primary);
  color: var(--on-primary);
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 0.18);
}

.n2 .btn-primary:hover {
  opacity: 1;
  background: color-mix(in srgb, var(--primary) 86%, var(--bg));
}

.n2 .btn-quiet {
  background: transparent;
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
}

.n2 .btn-quiet:hover {
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--muted);
}

.n2 .btn svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.n2 :focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Einblendung beim Scrollen (useReveal) */
@media (prefers-reduced-motion: no-preference) {
  .n2.reveal-ready [data-reveal] {
    transition:
      opacity 0.7s var(--ease-out),
      transform 0.7s var(--ease-out);
    transition-delay: var(--reveal-delay, 0ms);
  }

  .n2.reveal-ready [data-reveal]:not(.is-in) {
    opacity: 0;
    transform: translateY(14px);
  }
}
</style>
