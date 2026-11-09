<template>
  <div id="top" ref="root" class="n1">
    <a href="#inhalt" class="n1-skip">Zum Inhalt springen</a>
    <N1Header :active="active" />
    <main id="inhalt">
      <N1Hero />
      <N1Moment />
      <N1How />
      <N1Quote />
      <N1Values />
      <N1Team />
      <N1Faq />
      <N1Closing />
    </main>
    <N1Footer />
  </div>
</template>

<script setup lang="ts">
// Variante N1 "Klar": kühles Papierweiß, Tintenschwarz, ein flaches Ultramarin als einziges Signal.
const root = ref<HTMLElement | null>(null)
useReveal(root)

// Welcher Abschnitt gerade im Blick ist, markiert die Navigation
const active = ref('')
let spy: IntersectionObserver | null = null

onMounted(() => {
  const sections = [...(root.value?.querySelectorAll<HTMLElement>('main section[id]') ?? [])]
  spy = new IntersectionObserver((entries) => {
    for (const entry of entries) if (entry.isIntersecting) active.value = entry.target.id
  }, { rootMargin: '-40% 0px -55% 0px' })
  for (const s of sections) spy.observe(s)
})

onBeforeUnmount(() => spy?.disconnect())
</script>

<style>
/* Farb-Tokens für N1. Die Bausteine (BoardDemo, DueLadder, ActionRow, KeyCap) lesen sie mit. */
.n1 {
  color-scheme: light;
  --paper: #f5f7fa;
  --surface: #fff;
  --sunken: #eef1f5;
  --ink: #0c1424;
  --text: #2c3445;
  --muted: #586276;
  --line: #e1e5ec;
  --line-strong: #c8cfda;
  --primary: #2040e0;
  --primary-hover: #1a35c4;
  --on-primary: #fff;
  --accent: #2040e0;
  --accent-hover: #1a35c4;
  --on-accent: #fff;
  --accent-soft: #e8ecfd;
  --accent-ink: #1d39c9;
  --key: #fff;
  --key-edge: #c3cad6;
  --key-hot: #2040e0;
  --key-hot-edge: #12279a;
  --on-key-hot: #fff;
  --chip: #e9edf3;
  --star: #e09b0b;
  --red: #dc3e43;
  --lilac: #dc3e43;
  --green: #1a8f59;
  --teal: #2040e0;
  --shadow: 12 20 36;
  --n1-ease: cubic-bezier(0.16, 1, 0.3, 1);
  --n1-label: 0.75rem;

  min-height: 100vh;
  overflow-x: clip;
  background: var(--paper);
  color: var(--text);
}

@media (prefers-color-scheme: dark) {
  .n1 {
    color-scheme: dark;
    --paper: #111214;
    --surface: #191a1d;
    --sunken: #0b0c0e;
    --ink: #f3f4f6;
    --text: #c9ccd2;
    --muted: #8f949d;
    --line: #25272b;
    --line-strong: #383b41;
    --primary: #4b67f6;
    --primary-hover: #627cff;
    --on-primary: #fff;
    --accent: #4b67f6;
    --accent-hover: #627cff;
    --on-accent: #fff;
    --accent-soft: #1a2142;
    --accent-ink: #a3b3ff;
    --key: #26282c;
    --key-edge: #050506;
    --key-hot: #4b67f6;
    --key-hot-edge: #2236ad;
    --on-key-hot: #fff;
    --chip: #24262a;
    --star: #f0b43c;
    --red: #f2777b;
    --lilac: #f2777b;
    --green: #4cc58c;
    --teal: #8ea1ff;
    --shadow: 0 0 0;
  }
}

body:has(.n1) {
  background: #f5f7fa;
}

@media (prefers-color-scheme: dark) {
  body:has(.n1) {
    background: #111214;
  }
}

.n1 ::selection {
  background: var(--primary);
  color: var(--on-primary);
}

.n1 :focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 3px;
  border-radius: 6px;
}

.n1-skip {
  position: absolute;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 8px 12px;
  border-radius: 8px;
  background: var(--ink);
  color: var(--paper);
  font-size: 0.875rem;
  text-decoration: none;
  transform: translateY(-150%);
}

.n1-skip:focus-visible {
  transform: none;
}

/* Schaltflächen */
.n1-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 44px;
  padding: 10px 18px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: var(--ink);
  font-size: 0.9375rem;
  font-weight: 600;
  line-height: 1.2;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.18s, color 0.18s, box-shadow 0.18s, transform 0.18s var(--n1-ease);
}

.n1-btn-lg {
  min-height: 52px;
  padding: 14px 22px;
  font-size: 1.0625rem;
}

.n1-btn-sm {
  min-height: 38px;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.9063rem;
}

.n1-btn-primary {
  background: var(--primary);
  color: var(--on-primary);
  box-shadow: inset 0 -2px 0 rgb(0 0 0 / 0.18);
}

.n1-btn-primary:hover {
  background: var(--primary-hover);
}

.n1-btn-primary:active {
  transform: translateY(1px);
  box-shadow: inset 0 -1px 0 rgb(0 0 0 / 0.18);
}

.n1-btn-quiet {
  background: var(--surface);
  box-shadow: inset 0 0 0 1px var(--line-strong);
}

.n1-btn-quiet:hover {
  box-shadow: inset 0 0 0 1px var(--ink);
}

.n1-btn-ghost {
  color: var(--text);
  font-weight: 500;
}

.n1-btn-ghost:hover {
  background: var(--sunken);
  color: var(--ink);
}

.n1-btn .n1-btn-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
}

.n1-btn .n1-btn-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.2s var(--n1-ease);
}

.n1-btn:hover .n1-btn-arrow {
  transform: translateX(3px);
}

/* Kleines Etikett in Mono, z. B. über Überschriften */
.n1-label {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: var(--n1-label);
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.n1-label-index {
  color: var(--primary);
}

/* Hashtags sind wie in der App farbig, und nur sie */
.n1 .hashtag {
  color: var(--accent-ink);
  white-space: nowrap;
}

/* Einblendung beim Hinscrollen (useReveal) */
@media (prefers-reduced-motion: no-preference) {
  .n1.reveal-ready [data-reveal] {
    transition:
      opacity 0.8s var(--n1-ease),
      transform 0.8s var(--n1-ease);
    transition-delay: var(--reveal-delay, 0ms);
  }

  .n1.reveal-ready [data-reveal]:not(.is-in) {
    opacity: 0;
    transform: translateY(16px);
  }
}
</style>
