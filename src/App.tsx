import { ProductPreviewProvider } from './components/ProductPreview'
import { Hero } from './sections/Hero'
import { SignatureStyle } from './sections/SignatureStyle'
import { Editorial } from './sections/Editorial'
import { ShopTheLook } from './sections/ShopTheLook'
import { StyleAccordion } from './sections/StyleAccordion'
import { FeatureCards } from './sections/FeatureCards'
import { CircularGallery } from './sections/CircularGallery'
import { Accessories } from './sections/Accessories'
import { Testimonials } from './sections/Testimonials'
import { Footer } from './sections/Footer'
import { SwapTestBench } from './dev/SwapTestBench'

export default function App() {
  // Dev-only harness to exercise the model ↔ product-only swap without shipping a fake pair.
  if (import.meta.env.DEV && location.hash === '#__swap-test') return <SwapTestBench />

  return (
    <ProductPreviewProvider>
      <a href="#main" className="skip-link">Skip to content</a>
      <Hero />
      <main id="main">
        <SignatureStyle />
        <Editorial />
        <ShopTheLook />
        <StyleAccordion />
        <FeatureCards />
        <CircularGallery />
        <Accessories />
        <Testimonials />
      </main>
      <Footer />
    </ProductPreviewProvider>
  )
}
