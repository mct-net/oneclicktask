import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const toastMessage = ref<string | null>(null)
  let clearTimer: ReturnType<typeof window.setTimeout> | null = null

  function showToast(message: string, timeoutMs = 3000) {
    toastMessage.value = message
    if (clearTimer) window.clearTimeout(clearTimer)
    clearTimer = window.setTimeout(() => {
      toastMessage.value = null
      clearTimer = null
    }, timeoutMs)
  }

  return { toastMessage, showToast }
})
