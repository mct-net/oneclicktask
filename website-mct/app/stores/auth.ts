import { defineStore } from 'pinia'

export type AuthUser = {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const initialized = ref(false)
  const isAuthenticated = computed(() => user.value !== null)

  function setUser(value: AuthUser | null) {
    user.value = value
  }

  function clear() {
    user.value = null
  }

  return { user, initialized, isAuthenticated, setUser, clear }
})
