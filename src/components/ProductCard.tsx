import { useEffect, useId, useState, type CSSProperties } from 'react'
import { formatPrice, type MediaLayout, type Product } from '../data/products'
import { preloadImage } from '../hooks/motion'
import { SwapIcon } from './Icons'
import { Img, Swatch } from './ui'
import './ProductCard.css'

/** Whether this product has a verified model ↔ product-only pair. */
export const canSwap = (p: Product) => Boolean(p.pairVerified && p.modelImage && p.productOnlyImage)

/**
 * Product image with the "worn → product only" preview.
 *
 *  - Default: garment on the model.
 *  - Hover / keyboard focus on the card (CSS): crossfade to the product-only shot.
 *  - Touch: a labelled toggle button flips the view without following the link.
 *  - The alternate image is preloaded and decoded before the swap is enabled.
 *  - Only enabled for verified SKU pairs; otherwise a single image is shown.
 */
export function ProductMedia({
  product,
  eager,
  forceProductOnly,
  fit = 'model',
  layout,
}: {
  product: Product
  eager?: boolean
  forceProductOnly?: boolean
  fit?: 'model' | 'product'
  layout?: MediaLayout
}) {
  const swap = canSwap(product)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!swap || !product.productOnlyImage) return
    let alive = true
    preloadImage(product.productOnlyImage.src).then((ok) => alive && setReady(ok))
    return () => {
      alive = false
    }
  }, [swap, product.productOnlyImage])

  const primary = product.modelImage ?? product.productOnlyImage!
  const primaryAlt = product.modelImage ? product.modelAlt! : product.productOnlyAlt!
  const primaryIsProduct = !product.modelImage

  return (
    <div
      className="pmedia"
      data-swap={swap && ready ? 'ready' : undefined}
      data-show-product={forceProductOnly ? 'true' : undefined}
    >
      {layout ? (
        <div className="pmedia__box" style={{ inset: layout.inset }}>
          <Img
            asset={primary}
            alt={primaryAlt}
            eager={eager}
            className={`pmedia__img pmedia__img--primary ${layout.crop ? 'pmedia__img--crop' : 'pmedia__img--cover'}`}
            style={
              layout.crop
                ? { width: `${layout.crop.w}%`, height: `${layout.crop.h}%`, left: `${layout.crop.l}%`, top: `${layout.crop.t}%` }
                : undefined
            }
          />
        </div>
      ) : (
        <Img
          asset={primary}
          alt={primaryAlt}
          eager={eager}
          className={`pmedia__img pmedia__img--primary ${primaryIsProduct ? 'pmedia__img--product' : `pmedia__img--${fit}`}`}
        />
      )}
      {swap && ready && (
        <div className="pmedia__alt" aria-hidden={!forceProductOnly}>
          <Img
            asset={product.productOnlyImage!}
            alt={forceProductOnly ? product.productOnlyAlt! : ''}
            eager
            className="pmedia__img pmedia__img--product"
          />
        </div>
      )}
    </div>
  )
}

export function ProductLabel({ product, nameAs = 'h3' }: { product: Product; nameAs?: 'h3' | 'span' }) {
  const Box = nameAs === 'h3' ? 'div' : 'span'
  const Name = nameAs
  return (
    <Box className="p-label">
      <Box>
        <Name className="p-label__name">{product.name}</Name>
        <span className="p-label__price">{formatPrice(product.price)}</span>
      </Box>
      <Swatch color={product.swatch} name={product.colorName} />
    </Box>
  )
}

/**
 * Product card: fixed media box + quiet label. The whole card is one link;
 * the touch-only view toggle is a sibling button so it never triggers navigation.
 */
export function ProductCard({
  product,
  imageHeight,
  style,
  className = '',
  eager,
  layout,
  reveal = '',
}: {
  product: Product
  imageHeight?: number
  style?: CSSProperties
  className?: string
  eager?: boolean
  layout?: MediaLayout
  reveal?: '' | 'rise'
}) {
  const swap = canSwap(product)
  const [productOnly, setProductOnly] = useState(false)
  const toggleId = useId()

  return (
    <article className={`pcard ${className}`} style={style} data-reveal={reveal}>
      <a
        className="pcard__link"
        href={product.href}
        aria-describedby={swap ? toggleId : undefined}
      >
        <div
          className="pcard__frame"
          style={imageHeight ? ({ '--ih': imageHeight } as CSSProperties) : undefined}
        >
          <ProductMedia product={product} eager={eager} forceProductOnly={productOnly} layout={layout} />
        </div>
        <ProductLabel product={product} />
      </a>
      {swap && (
        <button
          id={toggleId}
          type="button"
          className="pcard__toggle"
          aria-pressed={productOnly}
          onClick={() => setProductOnly((v) => !v)}
        >
          <SwapIcon />
          <span>{productOnly ? 'Show on model' : 'Show product only'}</span>
        </button>
      )}
    </article>
  )
}
