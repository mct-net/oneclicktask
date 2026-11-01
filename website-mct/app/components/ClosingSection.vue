<template>
  <section class="closing band">
    <div class="container closing-inner reveal">
      <h2 class="closing-title">Die erste Aufgabe ist ein Enter entfernt.</h2>
      <p class="closing-description">Registrieren, ein Board anlegen, lostippen. Kostenlos und in der EU gehostet.</p>
      <a :href="registerUrl" class="btn btn-lg btn-primary closing-button">
        Konto anlegen
        <KeyCap class="closing-key" hot aria-hidden="true">↵</KeyCap>
      </a>
    </div>
  </section>
</template>

<script setup lang="ts">
const { appUrl } = useRuntimeConfig().public
const registerUrl = `${appUrl}/register`
</script>

<style scoped>
.closing {
  padding-block: 128px 144px;
}

.closing-inner {
  display: grid;
  justify-items: center;
  gap: 24px;
  text-align: center;
}

.closing-title {
  max-width: 16ch;
  color: var(--ink);
  font-size: clamp(2.25rem, 6vw, 4.5rem);
  line-height: 1.04;
  letter-spacing: -0.045em;
}

.closing-description {
  max-width: 34rem;
  color: var(--muted);
  font-size: 1.1875rem;
}

.closing-button {
  margin-top: 12px;
  min-height: 60px;
  padding-inline: 28px;
  font-size: 1.125rem;
}

.closing-key {
  font-size: 0.8125rem;
}
</style>
