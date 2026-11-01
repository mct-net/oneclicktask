<template>
  <section class="hero" :class="look === 'c' ? 'hero-c band' : 'hero-a grain'">
    <div class="container hero-copy">
      <h1 class="hero-title">
        <span class="hero-line" style="--i: 0">Aufgabe eintippen.</span>
        <span class="hero-line" style="--i: 1"><KeyCap class="hero-key" hot :pressed="keyPressed">Enter ↵</KeyCap></span>
        <span class="hero-line" style="--i: 2">Weiterarbeiten.</span>
      </h1>
      <p class="hero-description hero-enter" style="--i: 3">
        Die gemeinsame Aufgabenliste für Teams mit 2 bis 15 Personen, denen ein Ticketsystem zu schwer und eine
        geteilte Notiz zu chaotisch ist. Ein Feld zum Suchen und Anlegen, Hashtags statt Ordner.
      </p>
      <div class="hero-actions hero-enter" style="--i: 4">
        <a :href="registerUrl" class="btn btn-lg btn-primary">Kostenlos starten</a>
        <a :href="repositoryUrl" target="_blank" rel="noopener" class="btn btn-lg btn-quiet">
          <GithubIcon class="icon" />
          Quellcode auf GitHub
        </a>
      </div>
      <p class="hero-note hero-enter" style="--i: 5">Kostenlos. Gehostet in der EU. Oberfläche auf Englisch.</p>
    </div>

    <div class="container hero-stage base-scope hero-enter" style="--i: 6">
      <div class="stage-tilt">
        <BoardDemo @submit="pressKey" />
      </div>
      <p class="stage-caption">
        Interaktive Vorschau: Aufgabe mit <span class="hashtag">#hashtag</span> eingeben und Enter drücken oder
        einen Tag anklicken. Es wird nichts gespeichert.
      </p>
    </div>

    <TaskTicker class="hero-ticker base-scope" />
  </section>
</template>

<script setup lang="ts">
const look = useLook()
const { appUrl, repositoryUrl } = useRuntimeConfig().public
const registerUrl = `${appUrl}/register`

// Die Enter-Taste in der Überschrift drückt sich mit, sobald in der Demo eine Aufgabe entsteht
const keyPressed = ref(false)
function pressKey() {
  keyPressed.value = true
  setTimeout(() => (keyPressed.value = false), 180)
}
</script>

<style scoped>
.hero {
  overflow: hidden;
  padding-block: 72px 40px;
  background: var(--paper);
}

/* C: Kobalt als harte Plakatfläche, die schräg hinter dem Board endet */
.hero-c {
  background: linear-gradient(173deg, var(--paper) 0 58%, var(--page-c) calc(58% + 1px));
}

.hero-c .hero-stage,
.hero-c .hero-ticker {
  background: transparent;
}

.hero-copy {
  display: grid;
  justify-items: center;
  text-align: center;
}

.hero-title {
  color: var(--ink);
  font-size: clamp(2.6rem, 8vw, 5.75rem);
  font-weight: 600;
  line-height: 1.02;
  letter-spacing: -0.045em;
}

.hero-line {
  display: block;
}

.hero-key {
  margin-block: 0.08em 0.14em;
  font-size: 0.7em;
  letter-spacing: -0.02em;
}

.hero-description {
  max-width: 38rem;
  margin-top: 28px;
  color: var(--muted);
  font-size: 1.1875rem;
  line-height: 1.55;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-top: 36px;
}

.hero-note {
  margin-top: 18px;
  color: var(--muted);
  font-size: 0.875rem;
}

.hero-stage {
  margin-top: 72px;
  background: transparent;
}

/* Das Board liegt flach im Licht des Raums: Haarlinie und neutraler Schatten, kein Leuchten */
.stage-tilt {
  border-radius: 16px;
  box-shadow:
    0 0 0 1px var(--line-strong),
    0 2px 0 rgb(var(--shadow) / 0.06),
    0 40px 80px -40px rgb(var(--shadow) / 0.45);
  transform-origin: 50% 0;
}

.stage-caption {
  margin-top: 20px;
  color: var(--muted);
  font-size: 0.875rem;
  text-align: center;
}

.hero-ticker {
  margin-top: 56px;
  background: transparent;
}

@media (prefers-reduced-motion: no-preference) {
  .hero-line,
  .hero-enter {
    animation: rise 0.8s var(--ease-out) both;
    animation-delay: calc(var(--i) * 90ms + 80ms);
  }

  @supports (animation-timeline: view()) {
    .stage-tilt {
      animation: flatten linear both;
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }
  }
}

@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
}

@keyframes flatten {
  from {
    transform: perspective(1800px) rotateX(14deg) scale(0.95);
  }
}

@media (min-width: 1024px) {
  .hero {
    padding-block: 112px 48px;
  }

  .hero-stage {
    margin-top: 96px;
  }
}
</style>
