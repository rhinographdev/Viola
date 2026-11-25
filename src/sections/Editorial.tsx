import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { editorialSlides } from '../data/products'
import { preloadImage, useInView, useSectionReveal } from '../hooks/motion'
import { scrollToY } from '../hooks/smoothScroll'
import { pinchedMask } from '../components/shapes'
import { Img, RoundNav } from '../components/ui'
import './Editorial.css'

const N = editorialSlides.length

/**
 * "Your Style, Naturally" — scroll-driven slider.
 * The section is taller than the viewport and its stage is sticky; scrolling
 * through it moves through the slides (soft 1.6s crossfade + slow zoom settle).
 * Arrows, dots and ←/→ keys scroll the page to the matching slide, so the
 * scroll position and the slide always agree.
 */
export function Editorial() {
  const ref = useSectionReveal<HTMLElement>()
  const frame = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, '200px')
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (inView) editorialSlides.forEach((s) => preloadImage(s.image.src))
  }, [inView])

  // Map scroll progress through the section to the active slide.
  useEffect(() => {
    const sec = ref.current
    if (!sec || !inView) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = sec.getBoundingClientRect()
      const span = sec.offsetHeight - window.innerHeight
      const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0
      const pos = p * N
      const idx = Math.min(N - 1, Math.floor(pos))
      setActive(idx)
      // Gentle drift of the photo inside its mask within each slide's segment.
      frame.current?.style.setProperty('--drift', ((0.5 - (pos - idx)) * 24).toFixed(2))
      sec.style.setProperty('--progress', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [ref, inView])

  const goTo = (i: number) => {
    const sec = ref.current
    if (!sec) return
    const to = Math.max(0, Math.min(N - 1, i))
    const top = sec.getBoundingClientRect().top + window.scrollY
    const span = sec.offsetHeight - window.innerHeight
    scrollToY(top + ((to + 0.5) / N) * span)
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(active + 1)
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      goTo(active - 1)
    }
  }

  return (
    <section ref={ref} className="editorial" aria-labelledby="editorial-title" style={{ '--slides': N } as CSSProperties}>
      <div className="editorial__sticky">
        <div className="dots editorial__dots" aria-hidden="true" />

        <div className="caption-row editorial__controls" data-reveal="">
          <RoundNav dir="prev" label="Previous image" onClick={() => goTo(active - 1)} disabled={active === 0} controls="editorial-slides" />
          <p className="caption-row__text" aria-live="polite">
            <span key={editorialSlides[active].id} className="editorial__caption">
              {editorialSlides[active].caption}
            </span>
          </p>
          <RoundNav dir="next" label="Next image" onClick={() => goTo(active + 1)} disabled={active === N - 1} controls="editorial-slides" />
        </div>

        <div className="editorial__stage">
          <div
            id="editorial-slides"
            ref={frame}
            className="editorial__frame"
            data-reveal="scale"
            role="group"
            aria-roledescription="carousel"
            aria-label="Your style, naturally — looks. Scroll or use the arrow keys."
            tabIndex={0}
            onKeyDown={onKey}
            style={{ '--mask': pinchedMask } as CSSProperties}
          >
            {editorialSlides.map((s, i) => (
              <div
                key={s.id}
                className="eslide"
                data-active={i === active}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${N}`}
                aria-hidden={i !== active}
              >
                <Img
                  asset={s.image}
                  alt={s.alt}
                  eager={i === 0}
                  className={`eslide__img ${s.crop ? 'eslide__img--crop' : ''}`}
                  sizes="(max-width: 700px) 80vw, 515px"
                  style={
                    s.crop
                      ? { width: `${s.crop.w}%`, height: `${s.crop.h}%`, left: `${s.crop.l}%`, top: `${s.crop.t}%` }
                      : { objectPosition: s.position }
                  }
                />
              </div>
            ))}
          </div>
          <h2 id="editorial-title" className="editorial__type" data-reveal="fade" style={{ '--d': '150ms' } as CSSProperties}>
            <span className="editorial__word editorial__word--left">Your Style,</span>{' '}
            <span className="editorial__word editorial__word--right">Naturally</span>
          </h2>
        </div>

        <div className="editorial__pager" data-reveal="">
          {editorialSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className="editorial__dot"
              aria-label={`Show image ${i + 1} of ${N}`}
              aria-current={i === active}
              onClick={() => goTo(i)}
            >
              <span />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
