import { useAuthStore, type AuthUser } from '../stores/auth'

let authInitPromise: Promise<void> | null = null

export function useAuth() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string
  const backendBase = apiBase.replace(/\/api\/?$/, '')
  const authStore = useAuthStore()

  function authHeaders(): Record<string, string> {
    return {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  }

  function csrfHeaders(): Record<string, string> {
    if (!import.meta.client) return {}

    const token = document.cookie
      .split('; ')
      .find(cookie => cookie.startsWith('XSRF-TOKEN='))
      ?.split('=')
      .slice(1)
      .join('=')

    return token ? { 'X-XSRF-TOKEN': decodeURIComponent(token) } : {}
  }

  function clearAuth() {
    authStore.clear()
  }

  async function ensureCsrfCookie() {
    await $fetch(`${backendBase}/sanctum/csrf-cookie`, {
      credentials: 'include',
      headers: authHeaders(),
    })
  }

  async function login(email: string, password: string, remember = true) {
    await ensureCsrfCookie()
    const data = await $fetch<{ user: AuthUser }>(`${apiBase}/auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: { ...authHeaders(), ...csrfHeaders() },
      body: { email, password, remember },
    })
    authStore.setUser(data.user)
    authStore.initialized = true
    return data.user
  }

  async function fetchUser() {
    const data = await $fetch<{ user: AuthUser }>(`${apiBase}/auth/user`, {
      credentials: 'include',
      headers: authHeaders(),
    })
    authStore.setUser(data.user)
    return data.user
  }

  async function initialize() {
    if (authStore.initialized) return

    if (!authInitPromise) {
      authInitPromise = (async () => {
        try {
          await fetchUser()
        } catch {
          clearAuth()
        } finally {
          authStore.initialized = true
          authInitPromise = null
        }
      })()
    }

    await authInitPromise
  }

  async function logout() {
    try {
      await ensureCsrfCookie()
      await $fetch(`${apiBase}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: { ...authHeaders(), ...csrfHeaders() },
      })
    } finally {
      clearAuth()
      authStore.initialized = true
    }
  }

  return {
    user: computed(() => authStore.user),
    initialized: computed(() => authStore.initialized),
    isAuthenticated: computed(() => authStore.isAuthenticated),
    authHeaders,
    csrfHeaders,
    clearAuth,
    ensureCsrfCookie,
    login,
    fetchUser,
    initialize,
    logout,
  }
}
