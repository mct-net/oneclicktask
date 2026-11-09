<template>
  <section class="quote n3-section" aria-label="Stimme aus der Nutzung">
    <div class="container">
      <figure class="quote-card" data-reveal>
        <svg class="quote-mark" viewBox="0 0 48 36" aria-hidden="true">
          <path
            fill="currentColor"
            d="M0 36V22.4C0 9.6 6.2 2.1 18.6 0l2 5.1C13.6 7 10.3 11 9.8 17H19v19H0Zm28 0V22.4C28 9.6 34.2 2.1 46.6 0l2 5.1C41.6 7 38.3 11 37.8 17H47v19H28Z"
          />
        </svg>
        <blockquote class="quote-text">
          <p>{{ quote.text }}</p>
        </blockquote>
        <figcaption class="quote-by">
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
  padding-block: clamp(24px, 4vw, 48px);
}

.quote-card {
  position: relative;
  display: grid;
  gap: 32px;
  max-width: 62rem;
  margin-inline: auto;
  padding: clamp(36px, 6vw, 72px) clamp(24px, 6vw, 80px);
  border-radius: 24px;
  background: var(--card);
  box-shadow: var(--card-shadow);
}

.quote-mark {
  width: 44px;
  height: 33px;
  color: var(--accent);
}

.quote-text p {
  color: var(--ink);
  font-family: var(--font-display);
  font-size: clamp(1.5rem, 3.4vw, 2.375rem);
  font-weight: 520;
  letter-spacing: -0.02em;
  line-height: 1.28;
  text-wrap: pretty;
}

.quote-by {
  display: flex;
  align-items: center;
  gap: 14px;
}

.quote-avatar {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--accent-soft);
  color: var(--accent-ink);
  font-family: var(--font-display);
  font-size: 1rem;
  font-weight: 650;
  letter-spacing: 0.02em;
}

.quote-name {
  color: var(--ink);
  font-size: 1.0625rem;
  font-weight: 600;
}
</style>
