import { useState, type CSSProperties } from 'react'
import { assets } from '../data/assets'
import { lookHotspots, products, type ProductKey } from '../data/products'
import { stagger, useSectionReveal } from '../hooks/motion'
import { ProductLabel, ProductMedia } from '../components/ProductCard'
import { useProductPreview } from '../components/ProductPreview'
import { Img, SplitHeading } from '../components/ui'
import './ShopTheLook.css'

/**
 * "The Art of Dressing Well": collage of the look photo, individual garments and
 * shoes. Hotspots on the photo and the product tiles highlight each other and
 * open the shared product preview dialog.
 */
export function ShopTheLook() {
  const ref = useSectionReveal<HTMLElement>()
  const open = useProductPreview()
  const [active, setActive] = useState<ProductKey | null>(null)

  const bind = (key: ProductKey) => ({
    onMouseEnter: () => setActive(key),
    onMouseLeave: () => setActive(null),
    onFocus: () => setActive(key),
    onBlur: () => setActive(null),
    onClick: () => open(key),
    'data-active': active === key || undefined,
  })

  const tile = (k: ProductKey, i: number, variant: 'row' | 'small') => (
    <button
      key={k + variant}
      type="button"
      className={`look-tile look-tile--${variant}`}
      {...bind(k)}
      data-reveal=""
      style={stagger(i, 100)}
      aria-haspopup="dialog"
    >
      <span className="look-tile__media">
        <ProductMedia product={{ ...products[k], modelImage: undefined }} />
      </span>
      {variant !== 'small' && <ProductLabel product={products[k]} nameAs="span" />}
      {variant === 'small' && <span className="visually-hidden">{products[k].name}</span>}
    </button>
  )

  return (
    <section ref={ref} className="look" aria-labelledby="look-title">
      <header className="look__head">
        <SplitHeading id="look-title" plain="The Art of" serif="Dressing Well" />
        <p className="lead" data-reveal="" style={stagger(1)}>
          Pair timeless tailoring with thoughtfully chosen accessories.
        </p>
      </header>

      <div className="look__grid">
        <figure className="look__model" data-reveal="" style={stagger(0, 100)}>
          <div className="look__photo">
            <Img
              asset={assets.lookModel}
              alt="Model in the Ivory Suit — tailored blazer, wide-leg trousers and a sage silk scarf — among peonies"
              sizes="(max-width: 800px) 90vw, 472px"
            />
            {lookHotspots.map((h) => (
              <button
                key={h.product}
                type="button"
                className="hotspot"
                style={{ left: `${h.x}%`, top: `${h.y}%` } as CSSProperties}
                aria-label={`${h.label}: preview ${products[h.product].name}`}
                aria-haspopup="dialog"
                {...bind(h.product)}
              >
                <span className="hotspot__dot" aria-hidden="true" />
                <span className="hotspot__tag" aria-hidden="true">{h.label}</span>
              </button>
            ))}
          </div>
          <figcaption className="p-label">
            <div>
              <h3 className="p-label__name">The Ivory Suit</h3>
              <span className="p-label__price">$ 1,060.00</span>
            </div>
            <span className="swatch" style={{ background: '#fffae3' }} role="img" aria-label="Colour: Ivory" />
          </figcaption>
        </figure>

        {tile('suitBlazer', 1, 'row')}
        {tile('suitTrousers', 2, 'row')}
        {tile('slingbacks', 3, 'small')}

        <button
          type="button"
          className="look__heels look-tile"
          {...bind('slingbacks')}
          data-reveal=""
          style={stagger(4, 100)}
          aria-haspopup="dialog"
        >
          <span className="look__heels-media">
            <Img asset={assets.heelsLifestyle} alt={products.slingbacks.modelAlt!} sizes="348px" />
          </span>
          <ProductLabel product={products.slingbacks} nameAs="span" />
        </button>
      </div>
    </section>
  )
}
