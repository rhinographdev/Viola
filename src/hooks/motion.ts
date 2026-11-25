import { useEffect, useRef, useState, useSyncExternalStore, type RefObject } from 'react'

const RM_QUERY = '(prefers-reduced-motion: reduce)'

const subscribeMQ = (query: string) => (cb: () => void) => {
  const mq = window.matchMedia(query)
  mq.addEventListener('change', cb)
  return () => mq.removeEventListener('change', cb)
}

export function useMediaQuery(query: string, serverValue = false) {
  return useSyncExternalStore(
    subscribeMQ(query),
    () => window.matchMedia(query).matches,
    () => serverValue,
  )
}

export const useReducedMotion = () => useMediaQuery(RM_QUERY)

/** True while the document tab is visible. */
export function usePageVisible() {
  return useSyncExternalStore(
    (cb) => {
      document.addEventListener('visibilitychange', cb)
      return () => document.removeEventListener('visibilitychange', cb)
    },
    () => document.visibilityState === 'visible',
    () => true,
  )
}

/** Continuous visibility tracking (used to pause loops/parallax offscreen). */
export function useInView<T extends Element>(ref: RefObject<T | null>, rootMargin = '0px') {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [ref, rootMargin])
  return inView
}

/**
 * One-shot reveal. Every [data-reveal] element inside the section is observed on
 * its own and gets `.is-in` the first time ~15% of it is on screen, so items
 * further down (e.g. product cards) fade up as the visitor actually reaches them.
 * Children may set `--d` for a stagger within a row.
 */
export function useSectionReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = Array.from(el.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!('IntersectionObserver' in window)) {
      items.forEach((n) => n.classList.add('is-in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            io.unobserve(e.target)
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' },
    )
    items.forEach((n) => io.observe(n))
    return () => io.disconnect()
  }, [])
  return ref
}

/** Stagger helper: `style={stagger(i)}` → sets --d to i * 80ms (+ base). */
export const stagger = (i: number, base = 0) => ({ '--d': `${base + i * 80}ms` }) as React.CSSProperties

/** Preload + decode an image; resolves true when ready. */
export function preloadImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const im = new Image()
    im.src = src
    const done = () => resolve(true)
    if (im.decode) im.decode().then(done, () => resolve(false))
    else {
      im.onload = done
      im.onerror = () => resolve(false)
    }
  })
}
