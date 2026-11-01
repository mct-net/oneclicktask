<template>
  <footer class="footer">
    <div class="container footer-bar">
      <p class="footer-copy">© {{ year }} OneClickTask</p>
      <div class="footer-links">
        <a :href="`${appUrl}/privacy`" class="btn btn-link">Datenschutz</a>
        <a :href="`${repositoryUrl}/issues`" target="_blank" rel="noopener" class="btn btn-link">Kontakt &amp; Feedback</a>
        <a
          :href="repositoryUrl"
          target="_blank"
          rel="noopener"
          class="btn btn-ghost"
          aria-label="GitHub"
        >
          <GithubIcon class="icon" />
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { appUrl, repositoryUrl } = useRuntimeConfig().public
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  border-top: 1px solid var(--line);
}

.footer-bar {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 12px;
  padding-block: 32px;
}

.footer-copy {
  color: var(--muted);
  font-size: 0.875rem;
}

.footer-links {
  display: flex;
  align-items: center;
  gap: 16px;
}

@media (min-width: 1024px) {
  .footer-bar {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
