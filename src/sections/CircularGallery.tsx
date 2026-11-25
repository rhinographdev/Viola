import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { gallerySlides } from '../data/products'
import { useSectionReveal } from '../hooks/motion'
import { Img, RoundNav } from '../components/ui'
import './CircularGallery.css'

const N = gallerySlides.length
/** Signed distance from the active slide on a ring of N items (-2..2 for N=5). */
const offsetOf = (i: number, active: number) => {
  let d = (i - active) % N
  if (d > N / 2) d -= N
  if (d < -N / 2) d += N
  return d
}

/**
 * Overlapping circular gallery. Manual navigation only: arrow buttons, ←/→ keys
 * on the gallery, and horizontal swipe. Position, scale and opacity transition
 * over ~580ms. The active slide is announced through a polite live region.
 */
export function CircularGallery() {
  const ref = useSectionReveal<HTMLElement>()
  const [active, setActive] = useState(2)
  const drag = useRef<{ x: number; y: number; id: number } | null>(null)

  const go = (dir: 1 | -1) => setActive((a) => (a + dir + N) % N)

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(-1)
    }
  }
  const onPointerDown = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return
    drag.current = { x: e.clientX, y: e.clientY, id: e.pointerId }
  }
  const onPointerUp = (e: PointerEvent) => {
    const d = drag.current
    drag.current = null
    if (!d || d.id !== e.pointerId) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1)
  }

  const current = gallerySlides[active]

  return (
    <section ref={ref} className="gallery" aria-labelledby="gallery-title">
      <h2 id="gallery-title" className="visually-hidden">Editorial gallery</h2>
      <div
        className="gallery__stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Editorial looks"
        tabIndex={0}
        onKeyDown={onKey}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (drag.current = null)}
        data-reveal="fade"
      >
        {gallerySlides.map((s, i) => {
          const off = offsetOf(i, active)
          const isActive = off === 0
          return (
            <div
              key={s.id}
              className="gslide"
              data-offset={off}
              data-active={isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${N}: ${s.title}`}
              aria-hidden={!isActive}
              style={{ '--off': off, '--abs': Math.abs(off) } as CSSProperties}
              onClick={() => !isActive && setActive(i)}
            >
              <div className="gslide__glow" aria-hidden="true" />
              <div className="gslide__disc">
                <Img asset={s.image} alt={s.alt} sizes="422px" />
                <span className="gslide__ring" aria-hidden="true" />
                <span className="gslide__veil" aria-hidden="true" />
                <span className="gslide__title serif">{s.title}</span>
              </div>
            </div>
          )
        })}
      </div>

      <div className="caption-row gallery__controls">
        <RoundNav dir="prev" label="Previous look" onClick={() => go(-1)} />
        <p className="caption-row__text gallery__caption" aria-live="polite" aria-atomic="true">
          <span className="visually-hidden">
            Slide {active + 1} of {N}: {current.title}.{' '}
          </span>
          <span key={current.id} className="gallery__caption-in">{current.caption}</span>
        </p>
        <RoundNav dir="next" label="Next look" onClick={() => go(1)} />
      </div>
      <div className="gallery__dots" aria-hidden="true">
        {gallerySlides.map((s, i) => (
          <span key={s.id} data-on={i === active} />
        ))}
      </div>
    </section>
  )
}
