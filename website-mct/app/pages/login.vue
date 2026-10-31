<template>
  <main class="auth-page">
    <form class="auth-card" @submit.prevent="submit">
      <h1>Sign in</h1>
      <label>
        <span>Email</span>
        <input v-model="email" type="email" required autocomplete="email" :disabled="loading">
      </label>
      <label>
        <span>Password</span>
        <input v-model="password" type="password" required autocomplete="current-password" :disabled="loading">
      </label>
      <label class="auth-checkbox">
        <input v-model="remember" type="checkbox" :disabled="loading">
        <span>Remember this browser</span>
      </label>
      <p v-if="error" class="auth-error">{{ error }}</p>
      <button type="submit" :disabled="loading">
        {{ loading ? 'Signing in…' : 'Sign in' }}
      </button>
    </form>
  </main>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })

const { login } = useAuth()
const router = useRouter()

const email = ref('')
const password = ref('')
const remember = ref(true)
const loading = ref(false)
const error = ref('')

async function submit() {
  if (loading.value) return

  loading.value = true
  error.value = ''

  try {
    await login(email.value, password.value, remember.value)
    await router.push('/')
  } catch (cause: unknown) {
    error.value = (cause as { data?: { message?: string } })?.data?.message || 'Sign in failed.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: grid;
  place-items: center;
  background: #f4f4f5;
  color: #18181b;
}

.auth-card {
  width: min(420px, calc(100vw - 32px));
  display: grid;
  gap: 14px;
  padding: 32px;
  border: 1px solid #d4d4d8;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(24, 24, 27, 0.08);
}

.auth-card h1 {
  margin: 0;
  font-size: 1.5rem;
}

.auth-card label {
  display: grid;
  gap: 6px;
}

.auth-card input {
  padding: 10px 12px;
  border: 1px solid #d4d4d8;
  border-radius: 8px;
  font: inherit;
}

.auth-checkbox {
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  gap: 10px;
}

.auth-error {
  margin: 0;
  color: #b91c1c;
}

.auth-card button {
  padding: 10px 14px;
  border: 0;
  border-radius: 8px;
  background: #18181b;
  color: #fff;
  font: inherit;
  cursor: pointer;
}
</style>
