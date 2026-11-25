import { assetUrl } from '../lib/assetUrl'

/**
 * Central asset registry.
 *
 * Every image used on the page is declared here once, with its intrinsic size
 * (used to reserve space and avoid layout shift) and its provenance:
 *  - "figma"     : original source image exported from the Figma file.
 *  - "generated" : AI-generated (Higgsfield) from a Figma source image — review before launch.
 *  - "temporary" : stand-in used until the real asset is supplied.
 *  - "missing"   : slot exists in code, no asset yet (feature degrades gracefully).
 *
 * Paths are relative so the build works from any sub-path.
 */
export type AssetStatus = 'figma' | 'generated' | 'temporary' | 'missing'

export interface ImageAsset {
  src: string
  width: number
  height: number
  status: AssetStatus
  /** Figma node the image was taken from, for traceability. */
  figmaNode?: string
  note?: string
}

const img = (
  file: string,
  width: number,
  height: number,
  figmaNode: string,
  status: AssetStatus = 'figma',
  note?: string,
): ImageAsset => ({ src: assetUrl(`./img/${file}`), width, height, status, figmaNode, note })

export const assets = {
  // Hero — only a flattened still exists in the file. It doubles as the poster.
  heroPoster: img('hero.webp', 1672, 941, '3129:5053', 'figma',
    'Flattened still. A seamless cinemagraph or layered artwork is needed for the breeze effect.'),
  footerBackdrop: img('footer.webp', 1672, 941, '3129:5282'),

  // Find your signature style
  oliveBlazerModel: img('card1.webp', 900, 1200, '3129:5131'),
  ivoryBlazerProduct: img('card2.webp', 900, 900, '3129:5160'),
  blushBlouseModel: img('card3.webp', 900, 1350, '3129:5174'),
  ivoryTrousersProduct: img('card4.webp', 900, 900, '3129:5183'),
  ivorySuitModel: img('card5.webp', 900, 1200, '3129:5192'),
  // Ghost-mannequin shots generated from the model photos above (same garment, no model).
  oliveBlazerProduct: img('card1-product.webp', 896, 1200, '3129:5131', 'generated',
    'Generated from the model photo with GPT Image 2.6; replace with studio photography of the SKU.'),
  creamSuitProduct: img('card3-product.webp', 896, 1200, '3129:5174', 'generated',
    'Generated from the model photo with GPT Image 2.6; replace with studio photography of the SKU.'),
  classicBlazerProduct: img('card5-product.webp', 896, 1200, '3129:5192', 'generated',
    'Generated from the model photo with GPT Image 2.6; replace with studio photography of the SKU.'),

  // Editorial + shop the look
  editorialSage: img('editorial.webp', 1024, 1536, '3129:5127'),
  lookModel: img('lookModel.webp', 1672, 941, '3129:5211'),
  heelsLifestyle: img('heels.webp', 900, 1200, '3129:5096'),
  heelsProduct: img('heelsProduct.webp', 700, 700, '3129:5218'),

  // Accordion, feature cards, gallery
  tailoringPortrait: img('accStar.webp', 900, 900, '3129:5358'),
  handbagProduct: img('bagScarf.webp', 800, 800, '3129:5227'),
  handbagLifestyle: img('carry.webp', 1254, 1254, '3129:5242'),
  galleryPleats: img('galFarLeft.webp', 700, 700, '3129:5049'),
  galleryCardigan: img('galLeft.webp', 900, 900, '3129:5256'),
  galleryWhite: img('galCenter.webp', 1000, 1000, '3129:5275'),
  galleryBlush: img('galRight.webp', 900, 900, '3129:5260'),

  // Accessories
  scarf: img('scarf.webp', 700, 700, '3129:5100'),
  sunglasses: img('sunglasses.webp', 700, 700, '3129:5103'),
  hatLifestyle: img('hatModel.webp', 900, 1107, '3129:5104'),
  handbagIvory: img('handbag.webp', 700, 700, '3129:5110'),
  belt: img('belt.webp', 700, 700, '3129:5113'),
  // Accessory hover scenes (same product on the stone plinth among peonies, like the hat photo)
  // and a white packshot of the hat. Generated from the Figma product images.
  scarfScene: img('scarf-scene.webp', 600, 800, '3129:5100', 'generated'),
  sunglassesScene: img('sunglasses-scene.webp', 600, 800, '3129:5103', 'generated'),
  handbagScene: img('handbag-scene.webp', 600, 800, '3129:5110', 'generated'),
  beltScene: img('belt-scene.webp', 600, 800, '3129:5113', 'generated'),
  hatWhite: img('hat-white.webp', 700, 700, '3129:5104', 'generated'),

  // Testimonials
  testimonialPortrait: img('testimonial.webp', 800, 450, '3129:5393', 'temporary',
    'Stock-style portrait from the concept file; replace with a consented customer photo.'),
} satisfies Record<string, ImageAsset>

/**
 * Hero motion sources. Leave a field undefined until the asset exists; the hero
 * picks the richest available mode automatically:
 *   video  -> muted, looping cinemagraph (locked camera; only hair, fabric, flowers move)
 *   layers -> separately cut layers animated with an anchored, shared "breeze"
 *   poster -> still image with restrained pointer parallax (current state)
 */
export interface HeroLayer {
  src: string
  width: number
  height: number
  /** Which part of the composition this is; controls the motion applied. */
  role: 'background' | 'flowers-back' | 'model' | 'flowers-front'
  /** transform-origin for sway, e.g. "30% 100%" = near the stem base. */
  anchor?: string
  /** Peak rotation in degrees (1–3). */
  sway?: number
  /** Cycle length in seconds (5–9). */
  period?: number
  /** Phase delay in seconds so layers read as one passing gust. */
  delay?: number
  /** Parallax depth multiplier (0 = locked, 1 = full 10px). */
  depth?: number
}

export interface HeroMedia {
  poster: ImageAsset
  video?: { webm?: string; mp4?: string }
  layers?: HeroLayer[]
}

export const heroMedia: HeroMedia = {
  poster: assets.heroPoster,
  // 8s seamless cinemagraph generated from the hero still (Kling 4.0, first frame = last frame).
  // If the file is absent the hero falls back to the poster automatically.
  video: { mp4: assetUrl('./video/hero-loop.mp4') },
  layers: undefined,
}
