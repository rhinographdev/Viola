import { type CSSProperties } from 'react'
import { products, signatureCards } from '../data/products'
import { stagger, useSectionReveal } from '../hooks/motion'
import { ProductCard } from '../components/ProductCard'
import { SplitHeading } from '../components/ui'
import './SignatureStyle.css'

/**
 * "Find Your Signature Style": staggered product row. Heading, text and each card
 * fade up as they come into view. Hover / focus (or the touch toggle) swaps each
 * model photo for the same garment on its own. On narrow screens the row becomes
 * a native, snapping scroll track.
 */
export function SignatureStyle() {
  const ref = useSectionReveal<HTMLElement>()

  return (
    <section ref={ref} id="signature" className="signature" aria-labelledby="signature-title">
      <div className="signature__head">
        <SplitHeading id="signature-title" plain="Find Your" serif="Signature Style" className="signature__title" reveal="rise" />
        <p className="lead signature__lead" data-reveal="rise" style={stagger(1)}>
          From relaxed everyday layers to timeless tailoring, discover pieces that make every look your own.
        </p>
      </div>

      <div className="signature__track" role="list" aria-label="Featured pieces">
        {signatureCards.map((c, i) => (
          <div
            role="listitem"
            key={c.product}
            className="signature__item"
            style={{ '--w': c.width, '--o': c.offset } as CSSProperties}
          >
            <ProductCard
              product={products[c.product]}
              imageHeight={c.imageHeight}
              layout={c.layout}
              style={stagger(i, 60)}
              reveal="rise"
            />
          </div>
        ))}
      </div>
      <div className="dots signature__dots" aria-hidden="true" />
    </section>
  )
}
