import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'
import { testimonials } from '../data/products'
import { useSectionReveal } from '../hooks/motion'
import { scallopMask } from '../components/shapes'
import { Img, RoundNav } from '../components/ui'
import './Testimonials.css'

/**
 * Testimonial carousel: active card centred, neighbours peek at the edges.
 * Arrow buttons sit inside the active card (as in the reference), plus ←/→
 * keys and swipe. Inactive cards are hidden from assistive tech.
 */
export function Testimonials() {
  const ref = useSectionReveal<HTMLElement>()
  const N = testimonials.length
  const [active, setActive] = useState(0)
  const drag = useRef<{ x: number; y: number } | null>(null)
  const go = (d: 1 | -1) => setActive((a) => (a + d + N) % N)

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }
  const onDown = (e: PointerEvent) => (drag.current = { x: e.clientX, y: e.clientY })
  const onUp = (e: PointerEvent) => {
    const d = drag.current
    drag.current = null
    if (!d) return
    const dx = e.clientX - d.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - d.y) * 1.2) go(dx < 0 ? 1 : -1)
  }

  const rel = (i: number) => {
    let d = i - active
    if (d > N / 2) d -= N
    if (d < -N / 2) d += N
    return d
  }

  return (
    <section ref={ref} className="testi" aria-labelledby="testi-title">
      <h2 id="testi-title" className="split-heading testi__title" data-reveal="">
        Trusted By
        <br />
        <span className="serif">Famous Celebrities</span>
      </h2>

      <div
        className="testi__viewport"
        role="group"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        onKeyDown={onKey}
        onPointerDown={onDown}
        onPointerUp={onUp}
        data-reveal=""
        style={{ '--d': '120ms' } as CSSProperties}
      >
        {testimonials.map((t, i) => {
          const r = rel(i)
          const isActive = r === 0
          return (
            <figure
              key={t.id}
              className="tcard"
              data-active={isActive}
              style={{ '--rel': r } as CSSProperties}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${N}`}
              aria-hidden={!isActive}
              inert={!isActive}
              onClick={() => !isActive && setActive(i)}
            >
              <div className="tcard__avatar" style={{ '--mask': scallopMask } as CSSProperties}>
                {t.avatar ? (
                  <Img asset={t.avatar} alt="" sizes="172px" />
                ) : (
                  <span className="tcard__initials" aria-hidden="true">{t.initials}</span>
                )}
              </div>
              <blockquote className="tcard__quote">“{t.quote}”</blockquote>
              <figcaption className="tcard__who">
                <span className="tcard__name">{t.name}</span> <span className="tcard__role">{t.role}</span>
              </figcaption>
            </figure>
          )
        })}
        <div className="tcard-nav">
          <RoundNav dir="prev" tone="light" label="Previous testimonial" onClick={() => go(-1)} />
          <RoundNav dir="next" tone="light" label="Next testimonial" onClick={() => go(1)} />
        </div>
        <p className="visually-hidden" aria-live="polite">
          Testimonial {active + 1} of {N}, from {testimonials[active].name}
        </p>
      </div>
    </section>
  )
}
