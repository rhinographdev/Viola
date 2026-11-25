import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react'
import { formatPrice, products, type ProductKey } from '../data/products'
import { CloseIcon } from './Icons'
import { pauseSmoothScroll, resumeSmoothScroll } from '../hooks/smoothScroll'
import { Img, PillLink, Swatch } from './ui'
import './ProductPreview.css'

const Ctx = createContext<(key: ProductKey) => void>(() => {})
export const useProductPreview = () => useContext(Ctx)

/** Accessible product preview built on the native modal <dialog> (focus trap, Esc, focus return). */
export function ProductPreviewProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const [key, setKey] = useState<ProductKey | null>(null)

  const open = useCallback((k: ProductKey) => setKey(k), [])

  useEffect(() => {
    const d = ref.current
    if (key && d && !d.open) {
      d.showModal()
      pauseSmoothScroll()
      d.querySelector<HTMLButtonElement>('.ppreview__close')?.focus()
    }
  }, [key])

  const close = () => ref.current?.close()
  const product = key ? products[key] : null
  const image = product ? product.productOnlyImage ?? product.modelImage : null
  const alt = product ? (product.productOnlyImage ? product.productOnlyAlt : product.modelAlt) ?? '' : ''

  return (
    <Ctx.Provider value={open}>
      {children}
      <dialog
        ref={ref}
        className="ppreview"
        aria-labelledby="ppreview-title"
        onClose={() => {
          setKey(null)
          resumeSmoothScroll()
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close() // backdrop click
        }}
      >
        {product && image && (
          <div className="ppreview__body">
            <div className="ppreview__media">
              <Img asset={image} alt={alt} eager />
            </div>
            <div className="ppreview__info">
              <p className="ppreview__eyebrow">Shop the look</p>
              <h2 id="ppreview-title" className="ppreview__title">{product.name}</h2>
              <p className="ppreview__price">{formatPrice(product.price)}</p>
              <p className="ppreview__desc">{product.description}</p>
              <p className="ppreview__color">
                <Swatch color={product.swatch} name={product.colorName} /> {product.colorName}
              </p>
              <PillLink href={product.href}>View product</PillLink>
            </div>
            <button type="button" className="ppreview__close" onClick={close} aria-label="Close preview">
              <CloseIcon />
            </button>
          </div>
        )}
      </dialog>
    </Ctx.Provider>
  )
}
