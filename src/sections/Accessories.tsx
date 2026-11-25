import { useEffect, useRef, type CSSProperties } from 'react'
import { accessoryTrack, products } from '../data/products'
import { preloadImage, stagger, useSectionReveal } from '../hooks/motion'
import { ProductLabel } from '../components/ProductCard'
import { Img, SplitHeading } from '../components/ui'
import './Accessories.css'

/**
 * "The Finishing Touch": every accessory starts as a clean packshot on white.
 * Hover / keyboard focus crossfades to the same product in the garden scene
 * (stone plinth, sky, peonies). On touch screens the card nearest the centre of
 * the track shows its scene. Native scrolling with snap points.
 */
export function Accessories() {
  const ref = useSectionReveal<HTMLElement>()
  const track = useRef<HTMLUListElement>(null)

  // Start centred on the featured card; preload scene images once the section is near.
  useEffect(() => {
    const t = track.current
    if (!t) return
    const center = () => {
      const featured = t.querySelector<HTMLElement>('[data-featured="true"]')
      if (!featured || t.scrollWidth <= t.clientWidth) return
      t.scrollLeft = featured.offsetLeft + featured.offsetWidth / 2 - t.clientWidth / 2
    }
    center()
    const ro = new ResizeObserver(center)
    ro.observe(t)
    const stop = () => ro.disconnect()
    t.addEventListener('pointerdown', stop, { once: true })
    t.addEventListener('wheel', stop, { once: true, passive: true })
    t.addEventListener('focusin', stop, { once: true })

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          accessoryTrack.forEach((a) => preloadImage(a.scene.src))
          io.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    io.observe(t)
    return () => {
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  // Touch: reveal the scene on the card closest to the middle of the track.
  useEffect(() => {
    const t = track.current
    if (!t || !matchMedia('(hover: none)').matches) return
    let raf = 0
    const pick = () => {
      raf = 0
      const mid = t.getBoundingClientRect().left + t.clientWidth / 2
      let best: HTMLElement | null = null
      let bestD = Infinity
      t.querySelectorAll<HTMLElement>('.acc-card').forEach((c) => {
        const r = c.getBoundingClientRect()
        const d = Math.abs(r.left + r.width / 2 - mid)
        if (d < bestD) {
          bestD = d
          best = c
        }
      })
      t.querySelectorAll('.acc-card').forEach((c) => c.toggleAttribute('data-centered', c === best))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(pick)
    }
    pick()
    t.addEventListener('scroll', onScroll, { passive: true })
    return () => t.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section ref={ref} id="accessories" className="acc-sec" aria-labelledby="acc-title">
      <div className="dots acc-sec__dots" aria-hidden="true" />
      <div className="acc-sec__head">
        <SplitHeading id="acc-title" plain="The Finishing" serif="Touch" breakBefore />
        <p className="lead" data-reveal="" style={stagger(1)}>
          Discover bags and accessories that bring your look together, from everyday essentials to standout details.
        </p>
      </div>

      <ul ref={track} className="acc-track" aria-label="Accessories">
        {accessoryTrack.map((a, i) => {
          const p = products[a.product]
          return (
            <li
              key={a.product}
              className={`acc-card acc-card--${a.size}`}
              data-featured={a.featured ? 'true' : undefined}
              data-reveal=""
              style={stagger(i, 100) as CSSProperties}
            >
              <a href={p.href} className="acc-card__link">
                <span className="acc-card__media">
                  <Img asset={a.white} alt={a.whiteAlt} sizes="300px" className="acc-card__white" />
                  <span className="acc-card__scene" aria-hidden="true">
                    <Img asset={a.scene} alt="" sizes="300px" />
                  </span>
                </span>
                <span className="acc-card__label">
                  <ProductLabel product={p} nameAs="span" />
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
