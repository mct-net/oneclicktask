// Ruhige Einblendung beim Hinscrollen für alle Elemente mit [data-reveal] innerhalb von root.
// Funktioniert in jedem Browser (IntersectionObserver). Ohne JavaScript oder mit
// "Bewegung reduzieren" bleibt alles sofort sichtbar.
// Optional: data-reveal="2" verzögert um 2 × 70 ms (für Gruppen).
import type { Ref } from 'vue'

export function useReveal(root: Ref<HTMLElement | null>) {
  let observer: IntersectionObserver | null = null

  onMounted(() => {
    const el = root.value
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const targets = [...el.querySelectorAll<HTMLElement>('[data-reveal]')]
    for (const t of targets) {
      const step = Number(t.dataset.reveal) || 0
      if (step) t.style.setProperty('--reveal-delay', `${step * 70}ms`)
      // Was beim Laden schon sichtbar ist, nicht erst verstecken
      if (t.getBoundingClientRect().top < window.innerHeight * 0.92) t.classList.add('is-in')
    }
    el.classList.add('reveal-ready')

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer?.unobserve(entry.target)
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    for (const t of targets) if (!t.classList.contains('is-in')) observer.observe(t)
  })

  onBeforeUnmount(() => observer?.disconnect())
}
