import Lenis from 'lenis'

/**
 * Site-wide smooth (inertial) scrolling with Lenis. Native scrolling is kept for
 * reduced-motion users and as the fallback; anchors still work, and the page
 * remains fully usable if this never runs.
 */
let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (typeof window === 'undefined' || lenis) return lenis
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return null
  document.documentElement.style.scrollBehavior = 'auto'
  lenis = new Lenis({
    lerp: 0.085,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    anchors: { offset: 0 },
  })
  const raf = (t: number) => {
    lenis?.raf(t)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)
  return lenis
}

export const getLenis = () => lenis

/** Scroll to an absolute Y, smoothly when Lenis is active. */
export function scrollToY(y: number, opts: { duration?: number } = {}) {
  if (lenis) lenis.scrollTo(y, { duration: opts.duration ?? 1.1 })
  else window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
}

export const pauseSmoothScroll = () => lenis?.stop()
export const resumeSmoothScroll = () => lenis?.start()
