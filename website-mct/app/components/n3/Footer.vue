<template>
  <footer class="foot">
    <div class="container foot-inner">
      <div class="foot-brand">
        <AppLogo class="foot-logo" />
        <p class="foot-claim">{{ hero.lines.join(' ') }}</p>
      </div>
      <nav class="foot-nav" aria-label="Fußzeile">
        <a :href="`${appUrl}/privacy`">Datenschutz</a>
        <a :href="`${repositoryUrl}/issues`">Kontakt &amp; Feedback</a>
        <a :href="repositoryUrl" class="foot-gh"><GithubIcon class="foot-gh-icon" />GitHub</a>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { hero } from '~/content/varianten'

const { appUrl, repositoryUrl } = useRuntimeConfig().public
</script>

<style scoped>
.foot {
  padding-block: 40px 48px;
  border-top: 1px solid var(--line);
}

.foot-inner {
  display: grid;
  gap: 24px;
}

.foot-brand {
  display: grid;
  gap: 6px;
}

.foot-logo :deep(.logo-mark) {
  color: var(--accent);
}

.foot-claim {
  color: var(--muted);
  font-size: 0.9375rem;
}

.foot-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 24px;
}

.foot-nav a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding-block: 6px;
  color: var(--muted);
  font-size: 0.9375rem;
  text-decoration: none;
}

.foot-nav a:hover {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.foot-gh-icon {
  width: 16px;
  height: 16px;
}

@media (min-width: 768px) {
  .foot-inner {
    grid-template-columns: 1fr auto;
    align-items: center;
  }
}
</style>
