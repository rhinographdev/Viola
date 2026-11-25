import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'

/**
 * DEV ONLY (excluded from production by the import.meta.env.DEV guard in App).
 * Exercises the hover / focus / touch-toggle swap using two shots of the same
 * slingback heels, flagged as a test pair. Never shown to shoppers.
 */
export function SwapTestBench() {
  const testPair = { ...products.slingbacks, pairVerified: true }
  return (
    <main style={{ padding: 40, display: 'flex', gap: 24 }}>
      <div style={{ width: 320 }}>
        <p style={{ marginBottom: 12, fontSize: 13 }}>Swap test bench — test pair, not shipped</p>
        <ProductCard product={testPair} imageHeight={420} />
      </div>
    </main>
  )
}
