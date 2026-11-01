// Farbrichtung zum Vergleich: A "Signalorange" (Standard) oder C "Kobalt flach" über ?look=c
export function useLook() {
  const route = useRoute()
  return computed(() => (route.query.look === 'c' ? 'c' : 'a'))
}
