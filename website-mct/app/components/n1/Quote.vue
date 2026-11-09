<template>
  <section id="stimme" class="section" aria-label="Referenz">
    <div class="container">
      <figure class="quote">
        <p class="n1-label quote-label" data-reveal>
          <span class="n1-label-index">03</span>
          <span>Referenz</span>
        </p>
        <blockquote class="quote-text" data-reveal="1">
          <p>„{{ quote.text }}“</p>
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
.section {
  padding-block: 56px 72px;
}

.quote {
  display: grid;
  justify-items: center;
  gap: 32px;
  margin: 0;
  padding: 56px 0;
  border-block: 1px solid var(--line-strong);
  text-align: center;
}

.quote-text {
  max-width: 54rem;
  margin: 0;
}

.quote-text p {
  color: var(--ink);
  font-size: clamp(1.625rem, 3.6vw, 2.75rem);
  font-weight: 500;
  line-height: 1.22;
  letter-spacing: -0.028em;
  text-wrap: balance;
  hanging-punctuation: first;
}

.quote-by {
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.quote-avatar {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--primary);
  color: var(--on-primary);
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.02em;
}

.quote-name {
  color: var(--ink);
  font-weight: 600;
}

@media (min-width: 1024px) {
  .section {
    padding-block: 64px 120px;
  }

  .quote {
    gap: 40px;
    padding: 96px 0;
  }
}
</style>
