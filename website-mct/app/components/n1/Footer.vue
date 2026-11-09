<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <AppLogo />
        <p class="footer-claim">Die kostenlose To-do-Liste für alles, was dir zwischendurch einfällt.</p>
      </div>
      <nav class="footer-nav" aria-label="Fußzeile">
        <a :href="`${appUrl}/privacy`">Datenschutz</a>
        <a :href="`${repositoryUrl}/issues`" target="_blank" rel="noopener">Kontakt &amp; Feedback</a>
        <a :href="repositoryUrl" target="_blank" rel="noopener" class="footer-gh">
          <GithubIcon class="footer-gh-icon" />
          GitHub
        </a>
      </nav>
    </div>
    <div class="container footer-base">
      <p>© {{ year }} OneClickTask</p>
      <a href="#top" class="footer-top">Nach oben<ArrowUp aria-hidden="true" /></a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'

const { appUrl, repositoryUrl } = useRuntimeConfig().public
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
  font-size: 0.9375rem;
}

.footer-inner {
  display: grid;
  gap: 28px;
  padding-block: 48px 32px;
}

.footer-brand {
  display: grid;
  gap: 12px;
}

.footer-claim {
  max-width: 24rem;
  color: var(--muted);
}

.footer-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 28px;
}

.footer-nav a,
.footer-top {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--text);
  text-decoration: none;
  transition: color 0.15s;
}

.footer-nav a:hover,
.footer-top:hover {
  color: var(--accent-ink);
}

.footer-gh-icon {
  width: 16px;
  height: 16px;
}

.footer-base {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-block: 20px 32px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-family: var(--font-mono);
  font-size: 0.75rem;
}

.footer-top {
  color: var(--muted);
  font-family: var(--font-mono);
}

.footer-top svg {
  width: 14px;
  height: 14px;
}

@media (min-width: 768px) {
  .footer-inner {
    grid-template-columns: 1fr auto;
    align-items: start;
  }

  .footer-nav {
    padding-top: 2px;
  }
}
</style>
