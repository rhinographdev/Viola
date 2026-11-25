import { useRef, useState, type CSSProperties, type KeyboardEvent } from 'react'
import { styleCategories } from '../data/products'
import { stagger, useSectionReveal } from '../hooks/motion'
import { scallopMask } from '../components/shapes'
import { Img, SplitHeading } from '../components/ui'
import './StyleAccordion.css'

/**
 * "A Style for Every Moment": single-open accordion.
 * Height animates via grid-template-rows (0fr → 1fr); content fades; the image
 * inside the expanded item scales in. Keyboard: Enter/Space toggle (native
 * button), ↑/↓ move between headers, Home/End jump.
 */
export function StyleAccordion() {
  const ref = useSectionReveal<HTMLElement>()
  const [open, setOpen] = useState<string | null>('modern-tailoring')
  const headers = useRef<(HTMLButtonElement | null)[]>([])

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = styleCategories.length
    const go = (j: number) => {
      e.preventDefault()
      headers.current[(j + n) % n]?.focus()
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(n - 1)
  }

  return (
    <section ref={ref} id="style-moments" className="moments" aria-labelledby="moments-title">
      <div className="moments__head">
        <SplitHeading id="moments-title" plain="A Style for" serif="Every Moment" />
        <p className="lead" data-reveal="" style={stagger(1)}>
          From everyday ease to polished occasions, explore four ways to make every look your own.
        </p>
      </div>

      <div className="acc">
        {styleCategories.map((c, i) => {
          const isOpen = open === c.id
          const num = String(i + 1).padStart(2, '0')
          return (
            <div className="acc__item" key={c.id} data-open={isOpen} data-reveal="" style={stagger(i, 120)}>
              <h3 className="acc__heading">
                <button
                  ref={(el) => {
                    headers.current[i] = el
                  }}
                  id={`acc-h-${c.id}`}
                  type="button"
                  className="acc__trigger"
                  aria-expanded={isOpen}
                  aria-controls={`acc-p-${c.id}`}
                  onClick={() => setOpen(isOpen ? null : c.id)}
                  onKeyDown={(e) => onKey(e, i)}
                >
                  <span className="acc__num serif" aria-hidden="true">{num}</span>
                  <span className="acc__title serif">{c.title}</span>
                  <span className="acc__icon" aria-hidden="true">
                    <svg width="16" height="8" viewBox="0 0 16 8" fill="none">
                      <path d="M1 1l7 6 7-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div
                id={`acc-p-${c.id}`}
                role="region"
                aria-labelledby={`acc-h-${c.id}`}
                className="acc__panel"
                inert={!isOpen}
              >
                <div className="acc__panel-inner">
                  <div className="acc__content">
                    <p className="acc__body">{c.body}</p>
                  </div>
                </div>
              </div>
              <div
                className="acc__media"
                style={{ '--mask': scallopMask } as CSSProperties}
                aria-hidden={!isOpen}
              >
                <Img asset={c.image} alt={c.alt} sizes="300px" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
