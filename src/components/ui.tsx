import type { CSSProperties, ReactNode } from 'react'
import { ArrowUpRight, Chevron } from './Icons'
import type { ImageAsset } from '../data/assets'
import './ui.css'

/** Sans + italic serif heading used throughout the reference ("Find Your *Signature Style*"). */
export function SplitHeading({
  as: Tag = 'h2',
  plain,
  serif,
  className = '',
  breakBefore = false,
  style,
  reveal = true,
  id,
}: {
  as?: 'h1' | 'h2' | 'h3'
  plain: string
  serif: string
  className?: string
  breakBefore?: boolean
  style?: CSSProperties
  reveal?: boolean | 'rise'
  id?: string
}) {
  return (
    <Tag id={id} className={`split-heading ${className}`} data-reveal={reveal === 'rise' ? 'rise' : reveal ? '' : undefined} style={style}>
      {plain}
      {breakBefore ? <br /> : ' '}
      <span className="serif">{serif}</span>
    </Tag>
  )
}

export function PillLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={`pill ${className}`} href={href}>
      <span>{children}</span>
      <span className="pill__chip">
        <ArrowUpRight />
      </span>
    </a>
  )
}

export function RoundNav({
  dir,
  onClick,
  disabled,
  label,
  tone = 'auto',
  controls,
}: {
  dir: 'prev' | 'next'
  onClick: () => void
  disabled?: boolean
  label: string
  tone?: 'auto' | 'light'
  controls?: string
}) {
  return (
    <button
      type="button"
      className={`round-nav round-nav--${dir} round-nav--${tone}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      aria-controls={controls}
    >
      <Chevron dir={dir === 'prev' ? 'left' : 'right'} />
    </button>
  )
}

/** <img> with intrinsic size reserved; lazy by default. */
export function Img({
  asset,
  alt,
  className,
  eager,
  sizes,
  style,
}: {
  asset: ImageAsset
  alt: string
  className?: string
  eager?: boolean
  sizes?: string
  style?: CSSProperties
}) {
  return (
    <img
      src={asset.src}
      width={asset.width}
      height={asset.height}
      alt={alt}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      sizes={sizes}
      style={style}
      draggable={false}
    />
  )
}

export function Swatch({ color, name }: { color: string; name: string }) {
  return <span className="swatch" style={{ background: color }} role="img" aria-label={`Colour: ${name}`} />
}
