import { assetUrl } from '../lib/assetUrl'
import { assets } from '../data/assets'
import { useSectionReveal, stagger } from '../hooks/motion'
import { ArrowUp } from '../components/Icons'
import { Img } from '../components/ui'
import './Footer.css'

const columns = [
  { title: 'New Arrivals', links: ['Clothing', 'Bags & Accessories'] },
  { title: 'Contact Us', links: ['Shipping & Returns', 'Size Guide'] },
  { title: 'Social', links: ['Instagram', 'Pinterest', 'TikTok'] },
]

export function Footer() {
  const ref = useSectionReveal<HTMLElement>()
  return (
    <footer ref={ref} id="footer" className="footer">
      <div className="footer__bg" aria-hidden="true">
        <Img asset={assets.footerBackdrop} alt="" sizes="100vw" />
      </div>
      <img className="footer__wordmark" src={assetUrl('./icons/wordmark-large.svg')} width={1432} height={353} alt="" aria-hidden="true" data-reveal="" style={stagger(3)} loading="lazy" />

      <div className="footer__inner">
        <div className="footer__top" data-reveal="">
          <a href="#top" className="footer__logo" aria-label="Viola home">
            <img src={assetUrl('./icons/logomark.svg')} width={20} height={20} alt="" />
            <span>Viola</span>
          </a>
          <a href="#top" className="footer__totop">
            <ArrowUp /> Back to Top
          </a>
        </div>
        <hr className="footer__rule" />
        <div className="footer__mid">
          <div className="footer__about" data-reveal="" style={stagger(1)}>
            <p className="footer__tagline">
              Timeless pieces, effortless style.
              <br />
              Discover clothing and accessories made to feel like you.
            </p>
            <address>
              <strong>Address:</strong>
              <span>24 Bloom Street, Marylebone, London, UK</span>
            </address>
          </div>
          <nav className="footer__cols" aria-label="Footer" data-reveal="" style={stagger(2)}>
            {columns.map((c) => (
              <div key={c.title}>
                <h2>{c.title}</h2>
                <ul>
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#footer">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <p>©2026 Viola Shop. All rights reserved.</p>
          <ul>
            <li><a href="#footer">Terms of Services</a></li>
            <li><a href="#footer">Privacy Policy</a></li>
            <li><a href="#footer">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
