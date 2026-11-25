import { assets, type ImageAsset } from './assets'

/**
 * Product catalogue used across the page.
 *
 * Image pairing rule (hover swap): `modelImage` and `productOnlyImage` must show
 * the SAME SKU — same color, material and details. A pair is only enabled when
 * `pairVerified` is true. The three model cards use ghost-mannequin images that
 * were generated from those exact model photos (assets with status "generated").
 * The concept's separate blazer/trousers cut-outs are NOT paired: they differ in cut.
 */
export interface Product {
  id: string
  sku: string
  name: string
  price: number
  colorName: string
  swatch: string
  href: string
  description: string
  modelImage?: ImageAsset
  modelAlt?: string
  productOnlyImage?: ImageAsset
  productOnlyAlt?: string
  /** Set to true only after confirming both images show the identical SKU. */
  pairVerified: boolean
}

export const formatPrice = (value: number) =>
  `$ ${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

const p = (x: Omit<Product, 'href'>): Product => ({ ...x, href: `#product-${x.id}` })

export const products = {
  oliveBlazer: p({
    id: 'olive-linen-blazer',
    sku: 'VL-BLZ-0142-OLV',
    name: 'Olive Linen Blazer',
    price: 820,
    colorName: 'Olive',
    swatch: '#6c655b',
    description: 'A softly structured single-breasted blazer in a breathable linen blend.',
    modelImage: assets.oliveBlazerModel,
    modelAlt: 'Model wearing an olive linen blazer over an ivory blouse and cream trousers',
    productOnlyImage: assets.oliveBlazerProduct,
    productOnlyAlt: 'The olive linen blazer on its own, single button with peak lapels and flap pockets',
    pairVerified: true,
  }),
  ivoryBlazer: p({
    id: 'ivory-blazer',
    sku: 'VL-BLZ-0118-IVR',
    name: 'Ivory Blazer',
    price: 640,
    colorName: 'Ivory',
    swatch: '#ecdfd1',
    description: 'A fitted two-button blazer with flap pockets in an ivory linen weave.',
    productOnlyImage: assets.ivoryBlazerProduct,
    productOnlyAlt: 'Ivory two-button linen blazer shown on its own',
    pairVerified: false,
  }),
  creamSuit: p({
    id: 'cream-tailored-suit',
    sku: 'VL-SET-0207-CRM',
    name: 'Cream Tailored Suit',
    price: 980,
    colorName: 'Cream',
    swatch: '#f5ede5',
    description: 'High-waisted wide-leg trousers styled with a blush satin bow blouse.',
    modelImage: assets.blushBlouseModel,
    modelAlt: 'Model walking in cream wide-leg trousers and a blush satin bow blouse',
    productOnlyImage: assets.creamSuitProduct,
    productOnlyAlt: 'The blush satin bow blouse and cream wide-leg trousers shown on their own',
    pairVerified: true,
  }),
  ivoryTrousers: p({
    id: 'ivory-wide-leg-trousers',
    sku: 'VL-TRS-0311-IVR',
    name: 'Ivory Wide-Leg Trousers',
    price: 420,
    colorName: 'Ivory',
    swatch: 'rgba(94, 165, 220, 0.37)',
    description: 'Pleated, high-rise trousers with a fluid wide leg and pressed creases.',
    productOnlyImage: assets.ivoryTrousersProduct,
    productOnlyAlt: 'Ivory pleated wide-leg trousers shown on their own',
    pairVerified: false,
  }),
  classicBlazer: p({
    id: 'classic-blazer',
    sku: 'VL-BLZ-0101-CRM',
    name: 'Classic Blazer',
    price: 760,
    colorName: 'Sand',
    swatch: '#f7d4af',
    description: 'A relaxed, longline blazer with peak lapels, worn over a sage cowl top.',
    modelImage: assets.ivorySuitModel,
    modelAlt: 'Model in a longline ivory blazer, sage satin cowl top and matching trousers',
    productOnlyImage: assets.classicBlazerProduct,
    productOnlyAlt: 'The longline ivory blazer on its own, single button with peak lapels',
    pairVerified: true,
  }),

  // Shop the look
  suitBlazer: p({
    id: 'ivory-suit-blazer',
    sku: 'VL-BLZ-0118-IVR',
    name: 'Ivory Suit Blazer',
    price: 640,
    colorName: 'Ivory',
    swatch: '#fffae3',
    description: 'The tailored jacket from the Ivory Suit, cut close to the body.',
    productOnlyImage: assets.ivoryBlazerProduct,
    productOnlyAlt: 'Ivory tailored blazer',
    pairVerified: false,
  }),
  suitTrousers: p({
    id: 'ivory-suit-trousers',
    sku: 'VL-TRS-0311-IVR',
    name: 'Ivory Suit Trousers',
    price: 420,
    colorName: 'Ivory',
    swatch: '#fffae3',
    description: 'The matching pleated wide-leg trousers from the Ivory Suit.',
    productOnlyImage: assets.ivoryTrousersProduct,
    productOnlyAlt: 'Ivory pleated wide-leg trousers',
    pairVerified: false,
  }),
  slingbacks: p({
    id: 'ivory-slingback-heels',
    sku: 'VL-SHO-0520-IVR',
    name: 'Ivory Slingback Heels',
    price: 380,
    colorName: 'Ivory',
    swatch: '#fffae3',
    description: 'Pointed leather slingbacks on a slim kitten heel.',
    modelImage: assets.heelsLifestyle,
    modelAlt: 'Ivory slingback heels on a stone plinth among pink peonies',
    productOnlyImage: assets.heelsProduct,
    productOnlyAlt: 'Pair of ivory pointed slingback kitten heels',
    pairVerified: false,
  }),

  // Accessories
  scarf: p({
    id: 'sage-silk-scarf',
    sku: 'VL-ACC-0601-SGE',
    name: 'Sage Silk Scarf',
    price: 160,
    colorName: 'Sage',
    swatch: '#a9b99a',
    description: 'A lightweight silk square in soft sage.',
    productOnlyImage: assets.scarf,
    productOnlyAlt: 'Sage green silk scarf, loosely knotted',
    pairVerified: false,
  }),
  sunglasses: p({
    id: 'tortoiseshell-cat-eye-sunglasses',
    sku: 'VL-ACC-0702-TRT',
    name: 'Tortoiseshell Cat-Eye Sunglasses',
    price: 240,
    colorName: 'Tortoiseshell',
    swatch: '#7a4a2a',
    description: 'Cat-eye acetate frames with gradient brown lenses.',
    productOnlyImage: assets.sunglasses,
    productOnlyAlt: 'Tortoiseshell cat-eye sunglasses',
    pairVerified: false,
  }),
  hat: p({
    id: 'sage-ribbon-hat',
    sku: 'VL-ACC-0810-NAT',
    name: 'Sage Ribbon Hat',
    price: 190,
    colorName: 'Natural',
    swatch: '#f5efe9',
    description: 'A wide-brim straw hat finished with a sage grosgrain bow.',
    modelImage: assets.hatLifestyle,
    modelAlt: 'Straw hat with a sage ribbon resting on stone among peonies',
    pairVerified: false,
  }),
  handbag: p({
    id: 'structured-ivory-handbag',
    sku: 'VL-BAG-0905-IVR',
    name: 'Structured Ivory Handbag',
    price: 690,
    colorName: 'Ivory',
    swatch: '#efe6d6',
    description: 'A top-handle leather bag with a polished gold clasp.',
    productOnlyImage: assets.handbagIvory,
    productOnlyAlt: 'Structured ivory leather top-handle bag with gold clasp',
    pairVerified: false,
  }),
  belt: p({
    id: 'cognac-leather-belt',
    sku: 'VL-ACC-0412-COG',
    name: 'Cognac Leather Belt',
    price: 140,
    colorName: 'Cognac',
    swatch: '#b0602c',
    description: 'Smooth leather belt with a brushed gold buckle.',
    productOnlyImage: assets.belt,
    productOnlyAlt: 'Coiled cognac leather belt with brushed gold buckle',
    pairVerified: false,
  }),
} satisfies Record<string, Product>

export type ProductKey = keyof typeof products

/** Signature section cards, in reference order, with their staggered offsets (design px). */
export interface MediaLayout {
  /** Image box inside the card frame, CSS inset in percent (top right bottom left). */
  inset: string
  /** Optional crop of the image inside its box (percent), mirroring the Figma image transform. */
  crop?: { w: number; h: number; l: number; t: number }
}

export const signatureCards: {
  product: ProductKey
  offset: number
  width: number
  imageHeight: number
  layout: MediaLayout
}[] = [
  { product: 'oliveBlazer', offset: 37, width: 314, imageHeight: 512, layout: { inset: '13.1% 2.9% 0 5.3%' } },
  {
    product: 'ivoryBlazer', offset: 266, width: 213, imageHeight: 284,
    layout: { inset: '9.3% 7.6% 0 7.1%', crop: { w: 121.18, h: 85.12, l: -10.59, t: 3.56 } },
  },
  {
    product: 'creamSuit', offset: 0, width: 315, imageHeight: 395,
    layout: { inset: '6.8% 8.9% 0 8.9%', crop: { w: 172.38, h: 181.64, l: -36.19, t: 2.14 } },
  },
  { product: 'ivoryTrousers', offset: 165, width: 231, imageHeight: 385, layout: { inset: '14.4% 2.2% 14.4% 0' } },
  { product: 'classicBlazer', offset: 37, width: 332, imageHeight: 395, layout: { inset: '6.7% 13.7% 0 8.4%' } },
]

/** Hotspots on the shop-the-look photo (percent of the visible crop). */
export const lookHotspots: { product: ProductKey; x: number; y: number; label: string }[] = [
  { product: 'suitBlazer', x: 62, y: 30, label: 'Blazer' },
  { product: 'suitTrousers', x: 50, y: 66, label: 'Trousers' },
  { product: 'scarf', x: 38, y: 34, label: 'Scarf' },
]

/**
 * "The Finishing Touch" track. Every card starts as the product on white; hover /
 * focus (or the card reaching the centre on touch screens) crossfades to the same
 * product photographed in the garden scene.
 */
export const accessoryTrack: {
  product: ProductKey
  size: 'tall' | 'short'
  white: ImageAsset
  whiteAlt: string
  scene: ImageAsset
  sceneAlt: string
  featured?: boolean
}[] = [
  { product: 'scarf', size: 'tall', white: assets.scarf, whiteAlt: 'Sage green silk scarf on white', scene: assets.scarfScene, sceneAlt: 'Sage silk scarf on a stone plinth among peonies' },
  { product: 'sunglasses', size: 'short', white: assets.sunglasses, whiteAlt: 'Tortoiseshell cat-eye sunglasses on white', scene: assets.sunglassesScene, sceneAlt: 'Tortoiseshell sunglasses on a stone plinth among peonies' },
  { product: 'hat', size: 'tall', white: assets.hatWhite, whiteAlt: 'Straw hat with sage ribbon on white', scene: assets.hatLifestyle, sceneAlt: 'Straw hat with sage ribbon on a stone plinth among peonies', featured: true },
  { product: 'slingbacks', size: 'short', white: assets.heelsProduct, whiteAlt: 'Ivory slingback heels on white', scene: assets.heelsLifestyle, sceneAlt: 'Ivory slingback heels on a stone plinth among peonies' },
  { product: 'handbag', size: 'tall', white: assets.handbagIvory, whiteAlt: 'Structured ivory handbag on white', scene: assets.handbagScene, sceneAlt: 'Ivory handbag on a stone plinth among peonies' },
  { product: 'belt', size: 'short', white: assets.belt, whiteAlt: 'Cognac leather belt on white', scene: assets.beltScene, sceneAlt: 'Cognac leather belt on a stone plinth among peonies' },
]

export const styleCategories = [
  {
    id: 'everyday-ease',
    title: 'Everyday Ease',
    body: 'Relaxed layers, airy fabrics and easy shapes made for slow mornings and long, unhurried afternoons.',
    image: assets.galleryCardigan,
    alt: 'Model in a cream cardigan and pleated sage skirt among peonies',
  },
  {
    id: 'modern-tailoring',
    title: 'Modern Tailoring',
    body: 'Discover clean lines, soft neutrals, and tailored pieces that make looking polished feel effortless.',
    image: assets.tailoringPortrait,
    alt: 'Model in an ivory suit with a sage silk scarf against a blue sky',
  },
  {
    id: 'soft-silhouettes',
    title: 'Soft Silhouettes',
    body: 'Flowing wrap dresses and fluttering sleeves in sage and cream, cut to move with you.',
    image: assets.editorialSage,
    alt: 'Model in a sage chiffon wrap dress with fluted sleeves',
  },
  {
    id: 'the-finishing-touch',
    title: 'The Finishing Touch',
    body: 'Structured bags, silk scarves and refined leather details that complete every look.',
    image: assets.handbagLifestyle,
    alt: 'Ivory handbag tied with a sage scarf, set among pink peonies',
  },
]

export const gallerySlides = [
  { id: 'pleats', image: assets.galleryPleats, title: 'Garden Pleats', alt: 'Model in a flowing sage dress among flowers', caption: 'Light pleats and quiet colour for long garden afternoons.' },
  { id: 'cardigan', image: assets.galleryCardigan, title: 'Sage & Cream', alt: 'Model in a cream cardigan and pleated sage midi skirt', caption: 'Soft knits over fluid pleats — an easy pairing for every day.' },
  { id: 'white', image: assets.galleryWhite, title: 'A Moment Of Elegance', alt: 'Model in a white belted dress with a sage scarf, holding a small handbag', caption: 'Explore a softer side of style, with flowing shapes and timeless layers for every day.' },
  { id: 'blush', image: assets.galleryBlush, title: 'Blush Hour', alt: 'Model in a blush satin bow blouse and cream trousers', caption: 'Satin in blush, tailored ivory, and a little romance.' },
  { id: 'sage', image: assets.editorialSage, title: 'Flowing Sage', alt: 'Model in a sage chiffon wrap dress with fluted sleeves', caption: 'Chiffon that catches the breeze, cut for movement.' },
]

/** Sample testimonials from the concept file. Replace with real, consented customer quotes. */
export const testimonials = [
  {
    id: 't1',
    quote: 'The cream blazer brings my whole wardrobe together. It’s just as easy to wear with jeans as it is with tailored trousers.',
    name: 'Emma Wilson',
    role: 'Fashion Enthusiast',
    avatar: assets.testimonialPortrait,
    initials: 'EW',
  },
  {
    id: 't2',
    quote: 'Every piece feels considered. The wide-leg trousers drape beautifully and still look sharp at the end of a long day.',
    name: 'Clara Moreau',
    role: 'Stylist',
    initials: 'CM',
  },
  {
    id: 't3',
    quote: 'I bought the slingbacks for a wedding and have worn them every week since. Elegant, and genuinely comfortable.',
    name: 'Sofia Lindqvist',
    role: 'Creative Director',
    initials: 'SL',
  },
]

export const navLinks = [
  { label: 'Shop', href: '#signature' },
  { label: 'Collections', href: '#style-moments' },
  { label: 'Products', href: '#accessories', hasMenu: true },
  { label: 'About us', href: '#footer' },
]

/**
 * "Your Style, Naturally" slider. `crop` mirrors a Figma image transform (percent
 * of the frame); without it the photo is cover-fitted at `position`.
 */
export const editorialSlides = [
  {
    id: 'sage-wrap',
    image: assets.editorialSage,
    alt: 'Model in a sage chiffon wrap dress with fluted sleeves against a blue sky',
    caption: 'Soft silhouettes, timeless charm. Find the pieces that feel like you.',
    crop: { w: 193.2, h: 251.1, l: -46.6, t: -18.1 },
  },
  {
    id: 'white-dress',
    image: assets.galleryWhite,
    alt: 'Model in a white belted dress with a sage scarf among peonies',
    caption: 'Clean whites and a touch of sage, made for long summer days.',
    position: '50% 0%',
  },
  {
    id: 'cardigan',
    image: assets.galleryCardigan,
    alt: 'Model in a cream cardigan and pleated sage midi skirt',
    caption: 'Easy knits over fluid pleats — softness you can live in.',
    position: '50% 0%',
  },
  {
    id: 'blush',
    image: assets.galleryBlush,
    alt: 'Model in a blush satin bow blouse and cream trousers',
    caption: 'Satin in blush and tailored ivory, with a little romance.',
    position: '50% 0%',
  },
  {
    id: 'tailoring',
    image: assets.tailoringPortrait,
    alt: 'Model in an ivory suit with a sage silk scarf against a blue sky',
    caption: 'Modern tailoring with a gentle, flowing finish.',
    position: '50% 0%',
  },
]
