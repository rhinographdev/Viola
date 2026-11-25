import { assets } from '../data/assets'
import { stagger, useSectionReveal } from '../hooks/motion'
import { ArrowUpRight } from '../components/Icons'
import { Img, PillLink, SplitHeading } from '../components/ui'
import './FeatureCards.css'

/** Two adjacent promo cards: "It's All in the Details" and "Carry a Little Elegance". */
export function FeatureCards() {
  const ref = useSectionReveal<HTMLElement>()
  return (
    <section ref={ref} className="features" aria-label="Featured collections">
      <article className="feature feature--details" data-reveal="" style={stagger(0)}>
        <div className="dots feature__dots feature__dots--a" aria-hidden="true" />
        <div className="dots feature__dots feature__dots--b" aria-hidden="true" />
        <div className="feature__copy">
          <SplitHeading as="h2" plain="It’s All in" serif="The Details" reveal={false} />
          <p className="lead">
            Complete your look with elegant bags and delicate accents, made to go wherever your day takes you.
          </p>
          <PillLink href="#accessories">Shop the Collection</PillLink>
        </div>
        <div className="feature__product feature__zoom">
          <Img asset={assets.handbagProduct} alt="Structured ivory top-handle handbag with gold clasp" sizes="332px" />
        </div>
      </article>

      <article className="feature feature--carry" data-reveal="" style={stagger(1)}>
        <a href="#accessories" className="feature__link">
          <span className="feature__zoom feature__bg">
            <Img
              asset={assets.handbagLifestyle}
              alt="Ivory handbag tied with a sage silk scarf on a stone plinth among peonies"
              sizes="(max-width: 900px) 95vw, 718px"
            />
          </span>
          <span className="feature__veil" aria-hidden="true" />
          <span className="feature__caption">
            <span className="feature__caption-text serif">Carry a Little Elegance</span>
            <span className="feature__arrow" aria-hidden="true">
              <ArrowUpRight />
            </span>
          </span>
        </a>
      </article>
    </section>
  )
}
