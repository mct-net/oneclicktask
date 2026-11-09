<template>
  <section id="so-gehts" ref="root" class="section" aria-labelledby="n1-how-title">
    <div class="container">
      <N1SectionHead index="02" label="Funktion" :title="how.title" title-id="n1-how-title" :text="how.text" />
    </div>

    <nav class="rail" aria-label="Die vier Schritte">
      <div class="container rail-inner">
        <a
          v-for="(step, i) in steps"
          :key="step.id"
          :href="`#${step.id}`"
          class="rail-link"
          :aria-current="activeIndex === i ? 'step' : undefined"
        >
          <span class="rail-num">{{ i + 1 }}</span>
          <span>{{ step.name }}</span>
        </a>
        <span class="rail-progress" aria-hidden="true" :style="{ '--p': (activeIndex + 1) / steps.length }" />
      </div>
    </nav>

    <div class="container">
      <ol class="steps">
        <li v-for="(step, i) in steps" :id="step.id" :key="step.id" class="step">
          <div class="step-text">
            <p class="n1-label" data-reveal>
              <span class="n1-label-index">0{{ i + 1 }}</span>
              <span>{{ step.name }}</span>
            </p>
            <h3 class="step-lead" data-reveal="1">{{ step.lead }}</h3>
            <!-- eslint-disable-next-line vue/no-v-html -- feste Texte aus dieser Datei -->
            <p class="step-body" data-reveal="2" v-html="step.body" />
          </div>

          <div class="stage" data-reveal="3">
            <div class="stage-bar">
              <span class="n1-label"><span class="stage-dot" aria-hidden="true" />Probier’s aus</span>
              <span class="stage-hint">{{ step.hint }}</span>
            </div>
            <div class="stage-body">
              <N1CaptureDemo v-if="step.id === 'erfassen'" />
              <N1TagDemo v-else-if="step.id === 'zuordnen'" />
              <N1DueDemo v-else-if="step.id === 'terminieren'" />
              <ActionRow v-else />
            </div>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
import { how } from '~/content/varianten'

const steps = [
  {
    id: 'erfassen',
    name: 'Erfassen',
    lead: 'Ein Feld zum Suchen und Anlegen.',
    body: 'Während du tippst, filtert die Liste. Gibt es die Aufgabe noch nicht, legst du sie mit Enter an. Beschreibung, Frist und Zuständigkeit ergänzt du später.',
    hint: 'Tippe etwas und drück ↵',
  },
  {
    id: 'zuordnen',
    name: 'Zuordnen',
    lead: 'Ein Hashtag ordnet zu.',
    body: 'Schreib <span class="hashtag">#kunde</span> in den Titel, und die Aufgabe gehört dazu. Ein Klick auf den Tag zeigt alles mit <span class="hashtag">#kunde</span>. Mit <span class="hashtag">-#ops</span> im Suchfeld blendest du einen Tag aus.',
    hint: 'Klick auf einen Tag',
  },
  {
    id: 'terminieren',
    name: 'Terminieren',
    lead: 'Fristen in festen Schritten.',
    body: 'Sechs Schaltflächen setzen die Frist: plus 5 Minuten, 1 Stunde, 1 Tag, 1 Woche, 1 Monat oder 90 Tage. Unter der Liste steht, wie viele Aufgaben heute, morgen und diese Woche fällig sind.',
    hint: 'Klick auf eine Frist',
  },
  {
    id: 'abarbeiten',
    name: 'Abarbeiten',
    lead: 'Jede Aktion ist ein Klick.',
    body: 'Stern, wichtig, Status, Backlog und Papierkorb sitzen direkt an der Aufgabe. Es öffnet sich kein Dialog, und es gibt nichts zu speichern.',
    hint: 'Klick auf eine Aktion',
  },
]

// Die Schrittleiste zeigt, wo du gerade bist
const root = ref<HTMLElement | null>(null)
const activeIndex = ref(0)
let observer: IntersectionObserver | null = null

onMounted(() => {
  const items = [...(root.value?.querySelectorAll<HTMLElement>('.step') ?? [])]
  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) activeIndex.value = items.indexOf(entry.target as HTMLElement)
    }
  }, { rootMargin: '-45% 0px -50% 0px' })
  for (const item of items) observer.observe(item)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.section {
  padding-block: 72px 48px;
}

.rail {
  display: none;
}

.steps {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  margin-top: 40px;
  padding: 0;
  list-style: none;
}

.step {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 28px;
  padding-block: 44px;
  border-top: 1px solid var(--line);
  scroll-margin-top: calc(var(--header-height) + 72px);
}

.step:first-child {
  border-top: 0;
}

.step-text {
  display: grid;
  align-content: start;
  gap: 16px;
  max-width: 30rem;
}

.step-lead {
  color: var(--ink);
  font-size: clamp(1.75rem, 3.4vw, 2.5rem);
  font-weight: 600;
  line-height: 1.08;
  letter-spacing: -0.032em;
}

.step-body {
  color: var(--muted);
  font-size: 1.0625rem;
  line-height: 1.65;
}

.stage {
  align-self: start;
  border-radius: 16px;
  background: var(--surface);
  box-shadow:
    0 0 0 1px var(--line),
    0 1px 2px rgb(var(--shadow) / 0.04),
    0 28px 56px -36px rgb(var(--shadow) / 0.35);
}

.stage-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 0 20px;
  border-bottom: 1px solid var(--line);
}

.stage-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
}

.stage-hint {
  color: var(--muted);
  font-size: 0.8125rem;
  text-align: right;
}

.stage-body {
  padding: 20px;
  font-size: 0.9375rem;
}

/* Schrittleiste: klebt beim Durchscrollen unter der Kopfzeile */
@media (min-width: 900px) {
  .rail {
    position: sticky;
    top: var(--header-height);
    z-index: 10;
    display: block;
    margin-top: 56px;
    border-bottom: 1px solid var(--line);
    background: var(--paper);
  }

  .rail-inner {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .rail-link {
    display: flex;
    align-items: center;
    gap: 12px;
    height: 56px;
    color: var(--muted);
    font-size: 0.9375rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.2s;
  }

  .rail-link:hover {
    color: var(--ink);
  }

  .rail-num {
    display: grid;
    place-items: center;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    box-shadow: inset 0 0 0 1px var(--line-strong);
    font-family: var(--font-mono);
    font-size: 0.75rem;
    transition: background-color 0.25s, color 0.25s, box-shadow 0.25s;
  }

  .rail-link[aria-current='step'] {
    color: var(--ink);
  }

  .rail-link[aria-current='step'] .rail-num {
    background: var(--primary);
    box-shadow: none;
    color: var(--on-primary);
  }

  .rail-progress {
    position: absolute;
    right: 32px;
    bottom: -1px;
    left: 32px;
    height: 2px;
    background: var(--primary);
    transform: scaleX(var(--p, 0.25));
    transform-origin: left;
    transition: transform 0.5s var(--n1-ease);
  }

  .steps {
    margin-top: 0;
  }

  .step {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: 72px;
    padding-block: 80px;
  }

  .step:first-child {
    border-top: 0;
  }

  .stage-body {
    padding: 28px;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-block: 120px 64px;
  }
}

@media (min-width: 1200px) {
  .step {
    gap: 96px;
    padding-block: 96px;
  }
}
</style>
