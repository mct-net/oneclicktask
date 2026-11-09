<template>
  <section class="n2-section quote" aria-label="Referenz">
    <div class="n2-wrap">
      <figure class="quote-figure">
        <p class="n2-eyebrow" data-reveal><span class="n2-eyebrow-index">03</span>Aus der Praxis</p>
        <blockquote class="quote-text" data-reveal="1">
          <p>
            <span class="quote-mark" aria-hidden="true">„</span>{{ quote.text }}<span aria-hidden="true">“</span>
          </p>
        </blockquote>
        <figcaption class="quote-by" data-reveal="2">
          <span class="quote-avatar" aria-hidden="true">{{ quote.initials }}</span>
          <span class="quote-name">{{ quote.name }}</span>
        </figcaption>
      </figure>
    </div>
  </section>
</template>

<script setup lang="ts">
import { quote } from '~/content/varianten'
</script>

<style scoped>
.quote {
  background: var(--bg-raised);
}

.quote-figure {
  max-width: 60rem;
  margin-inline: auto;
}

.quote-text {
  margin: 0;
}

.quote-text p {
  color: var(--ink);
  font-size: clamp(1.625rem, 3.6vw, 2.875rem);
  font-weight: 500;
  line-height: 1.22;
  letter-spacing: -0.03em;
  text-wrap: pretty;
}

.quote-mark {
  margin-left: -0.42em;
  color: var(--muted);
}

.quote-by {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.quote-avatar {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--card);
  box-shadow: inset 0 0 0 1px var(--line-strong);
  color: var(--ink);
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  font-weight: 600;
}

.quote-name {
  color: var(--ink);
  font-weight: 600;
}

@media (max-width: 1100px) {
  .quote-mark {
    margin-left: 0;
  }
}
</style>
