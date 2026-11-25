import { assetUrl } from '../lib/assetUrl'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { heroMedia } from '../data/assets'
import { navLinks } from '../data/products'
import { useInView, usePageVisible, useReducedMotion } from '../hooks/motion'
import { BagIcon, ChevronSmall } from '../components/Icons'
import { PillLink } from '../components/ui'
import './Hero.css'

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <a href="#top" className="site-header__logo" aria-label="Viola home">
        <img src={assetUrl('./icons/logo.svg')} width={96} height={24} alt="" />
      </a>
      <nav aria-label="Primary" className="site-header__nav" data-open={open}>
        <ul>
          {navLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setOpen(false)}>
                {l.label}
                {l.hasMenu && <ChevronSmall />}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="site-header__end">
        <a href="#bag" className="site-header__bag" aria-label="Shopping bag, 0 items">
          <BagIcon />
          <span aria-hidden="true">Bag(0)</span>
        </a>
        <button
          type="button"
          className="site-header__menu"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}

/**
 * Hero media. Chooses the richest available source:
 *  video (cinemagraph) → layered artwork with an anchored breeze → still poster.
 * The image animates on its own (cinemagraph: flowers and dress move in the breeze);
 * it does not follow the mouse. Reduced-motion users get the poster. Playback
 * pauses when the hero is offscreen or the tab is hidden.
 */
function HeroMedia() {
  const wrap = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduced = useReducedMotion()
  const inView = useInView(wrap)
  const visible = usePageVisible()
  const active = inView && visible && !reduced
  const { poster, video: vid, layers } = heroMedia
  const [videoFailed, setVideoFailed] = useState(false)
  const [videoReady, setVideoReady] = useState(false)
  const mode = reduced ? 'poster' : vid && !videoFailed ? 'video' : layers?.length ? 'layers' : 'poster'

  // Play / pause cinemagraph.
  useEffect(() => {
    const v = video.current
    if (!v) return
    if (active) v.play().catch(() => {})
    else v.pause()
  }, [active, mode])

  return (
    <div ref={wrap} className="hero__media" data-mode={mode} data-paused={!active}>
      {mode === 'video' && vid ? (
        <>
          {/* Poster stays underneath; the cinemagraph fades in once it is actually playing. */}
          <img
            className="hero__layer hero__layer--depth"
            src={poster.src}
            width={poster.width}
            height={poster.height}
            alt=""
            fetchPriority="high"
            decoding="async"
          />
          <video
            ref={video}
            className="hero__layer hero__layer--depth hero__video"
            data-ready={videoReady}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            poster={poster.src}
            width={poster.width}
            height={poster.height}
            aria-hidden="true"
            onPlaying={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
          >
            {vid.webm && <source src={vid.webm} type="video/webm" />}
            {vid.mp4 && <source src={vid.mp4} type="video/mp4" onError={() => setVideoFailed(true)} />}
          </video>
        </>
      ) : mode === 'layers' && layers ? (
        layers.map((l, i) => (
          <img
            key={i}
            src={l.src}
            width={l.width}
            height={l.height}
            alt=""
            aria-hidden="true"
            className={`hero__layer hero__layer--${l.role}`}
            style={
              {
                '--depth': l.depth ?? 0,
                '--sway': `${l.sway ?? 0}deg`,
                '--period': `${l.period ?? 7}s`,
                '--delay': `${l.delay ?? 0}s`,
                transformOrigin: l.anchor ?? '50% 100%',
              } as CSSProperties
            }
          />
        ))
      ) : (
        <img
          className="hero__layer hero__layer--depth"
          src={poster.src}
          width={poster.width}
          height={poster.height}
          alt=""
          fetchPriority="high"
          decoding="async"
        />
      )}
      <div className="hero__tint" />
    </div>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <HeroMedia />
      <Header />
      <div className="hero__content">
        <h1 id="hero-title" className="hero__title hero-in" style={{ '--d': '0ms' } as CSSProperties}>
          Effortless Elegance
          <br />
          <span className="serif">In Full Bloom</span>
        </h1>
        <div className="hero-in" style={{ '--d': '120ms' } as CSSProperties}>
          <PillLink href="#signature">Shop the Collection</PillLink>
        </div>
        <p className="hero__text hero-in" style={{ '--d': '220ms' } as CSSProperties}>
          Discover flowing silhouettes, soft hues, and timeless pieces made for your everyday moments.
        </p>
      </div>
      <div className="hero__fade" aria-hidden="true" />
      <p className="visually-hidden">
        A model in a sage chiffon dress and cream jacket stands among pink peonies under a bright blue sky.
      </p>
    </section>
  )
}
