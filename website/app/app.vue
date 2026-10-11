<script setup lang="ts">
const { appUrl, repositoryUrl } = useRuntimeConfig().public

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
  ],
  htmlAttrs: {
    lang: 'de'
  }
})

const title = 'OneClickTask – Die schnelle Aufgabenliste für Web- und Entwicklerteams'
const description = 'OneClickTask ist die kostenlose Open-Source-Aufgabenliste für kleine Web- und Entwicklerteams: ein Feld zum Suchen und Anlegen, Hashtags als Filter, selbst hostbar.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const navigation = [
  { label: 'Funktionen', to: '#funktionen' },
  { label: 'Für Teams', to: '#teams' },
  { label: 'Open Source', to: '#open-source' },
  { label: 'FAQ', to: '#faq' }
]
</script>

<template>
  <UApp>
    <UHeader>
      <template #left>
        <NuxtLink
          to="/"
          class="rounded-md p-1 -ms-1 outline-primary/25 focus-visible:outline-3"
        >
          <AppLogo />
        </NuxtLink>
      </template>

      <UNavigationMenu
        :items="navigation"
        variant="link"
      />

      <template #right>
        <UColorModeButton class="hidden sm:inline-flex" />

        <UButton
          :to="`${appUrl}/login`"
          label="Anmelden"
          color="neutral"
          variant="ghost"
          class="hidden sm:inline-flex"
        />
        <UButton
          :to="`${appUrl}/register`"
          label="Kostenlos starten"
          color="neutral"
        />
      </template>

      <template #body>
        <UNavigationMenu
          :items="navigation"
          orientation="vertical"
          class="-mx-2.5"
        />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <USeparator />

    <UFooter>
      <template #left>
        <p class="text-sm text-muted">
          © {{ new Date().getFullYear() }} OneClickTask
        </p>
      </template>

      <template #right>
        <UButton
          :to="`${appUrl}/privacy`"
          label="Datenschutz"
          color="neutral"
          variant="link"
        />
        <UButton
          :to="`${repositoryUrl}/issues`"
          target="_blank"
          label="Kontakt & Feedback"
          color="neutral"
          variant="link"
        />
        <UButton
          :to="repositoryUrl"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
          color="neutral"
          variant="ghost"
        />
      </template>
    </UFooter>
  </UApp>
</template>
