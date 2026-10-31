type ApiOptions<T> = Parameters<typeof $fetch<T>>[1]
type UseApiFetchOptions<T> = Parameters<typeof useFetch<T>>[1]

function resolveApiUrl(apiBase: string, endpoint: string): string {
  if (/^https?:\/\//.test(endpoint)) return endpoint
  const base = apiBase.endsWith('/') ? apiBase.slice(0, -1) : apiBase
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${path}`
}

function mergeHeaders(...headers: Array<Record<string, string> | undefined>): Record<string, string> {
  return Object.assign({}, ...headers)
}

export function useApi() {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase as string
  const auth = useAuth()
  const unsafeMethods = new Set(['POST', 'PUT', 'PATCH', 'DELETE'])

  function backendUrl(path = ''): string {
    const backendBase = apiBase.replace(/\/api\/?$/, '')
    if (!path) return backendBase
    return `${backendBase}${path.startsWith('/') ? path : `/${path}`}`
  }

  async function handleUnauthorized() {
    auth.clearAuth()
    if (import.meta.client) await navigateTo('/login')
  }

  async function apiFetch<T>(endpoint: string, options?: ApiOptions<T>) {
    const url = resolveApiUrl(apiBase, endpoint)
    const method = String(options?.method ?? 'GET').toUpperCase()

    if (unsafeMethods.has(method)) {
      await auth.ensureCsrfCookie()
    }

    return await $fetch<T>(url, {
      ...options,
      credentials: 'include',
      headers: mergeHeaders(
        auth.authHeaders(),
        unsafeMethods.has(method) ? auth.csrfHeaders() : undefined,
        options?.headers as Record<string, string> | undefined,
      ),
      async onResponseError(context) {
        if (context.response.status === 401) await handleUnauthorized()
        await options?.onResponseError?.(context)
      },
    })
  }

  function useApiFetch<T>(endpoint: string, options?: UseApiFetchOptions<T>) {
    const url = resolveApiUrl(apiBase, endpoint)
    return useFetch<T>(url, {
      ...options,
      credentials: 'include',
      headers: mergeHeaders(auth.authHeaders(), options?.headers as Record<string, string> | undefined),
      async onRequest(context) {
        const method = String(context.options.method ?? 'GET').toUpperCase()
        if (unsafeMethods.has(method)) {
          await auth.ensureCsrfCookie()
          context.options.headers = mergeHeaders(
            auth.authHeaders(),
            auth.csrfHeaders(),
            context.options.headers as Record<string, string> | undefined,
          )
        }

        await options?.onRequest?.(context)
      },
      async onResponseError(context) {
        if (context.response.status === 401) await handleUnauthorized()
        await options?.onResponseError?.(context)
      },
    })
  }

  return { apiBase, backendUrl, apiFetch, useApiFetch }
}
