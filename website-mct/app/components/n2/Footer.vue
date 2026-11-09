<template>
  <footer class="foot">
    <div class="n2-wrap foot-inner">
      <div class="foot-brand">
        <AppLogo />
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
  border-top: 1px solid var(--line);
  background: var(--bg-raised);
}

.foot-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 24px 40px;
  padding-block: 36px;
}

.foot-brand {
  display: grid;
  gap: 8px;
}

.foot-claim {
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
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
  border-radius: 4px;
  color: var(--muted);
  font-size: 0.9375rem;
  text-decoration: none;
  transition: color 0.15s;
}

.foot-nav a:hover {
  color: var(--ink);
}

.foot-gh-icon {
  width: 16px;
  height: 16px;
}
</style>
