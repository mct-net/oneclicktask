export default defineNuxtRouteMiddleware(async (to) => {
  // Öffentliche Seiten setzen definePageMeta({ public: true })
  if (to.path === '/login' || to.meta.public) return

  const { user, initialize } = useAuth()
  await initialize()

  if (!user.value) return navigateTo('/login')
})
