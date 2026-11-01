export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  // Schriften liegen lokal, damit beim Seitenaufruf keine Daten an Google gehen
  css: [
    '@fontsource-variable/instrument-sans',
    '@fontsource-variable/geist-mono',
    '~/assets/css/main.css',
  ],
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8101/api',
      // OneClickTask-App: Ziel für Anmelden, Registrieren und Datenschutz
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:8000',
      repositoryUrl: 'https://github.com/mct-net/oneclicktask',
    },
  },
  routeRules: {
    '/': { prerender: true },
  },
  devServer: {
    host: process.env.NUXT_HOST || 'localhost',
    port: Number(process.env.NUXT_PORT || '3101'),
  },
})
