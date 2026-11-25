/**
 * Organic mask shapes taken from the Figma vector geometry.
 * Used as CSS mask-image so they scale with their container.
 */
const svgUri = (w: number, h: number, d: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${w} ${h}' preserveAspectRatio='none'><path d='${d}'/></svg>`,
  )}")`

/**
 * "Your Style, Naturally" — rectangle with concave curved sides (node 3129:5127),
 * with the soft ~30px rounded corners seen in the design.
 */
export const pinchedMask = svgUri(
  515.2,
  594.53,
  'M30 0H485.2Q515.2 0 506.18 28.61C486 95 461.38 200 461.38 297.26C461.38 394.5 486 499.5 506.18 565.92Q515.2 594.53 485.2 594.53H30Q0 594.53 10.62 566.46C35 499 64.61 395 64.61 297.26C64.61 199.5 35 95.5 10.62 28.07Q0 0 30 0Z',
)

/** Soft 7-point scalloped star (Star 3, inner radius 0.582, corner radius 50), cropped to its bounds. */
export const scallopMask = svgUri(
  284.39,
  279.23,
  'M 107.91 20.64 C 122.51 -6.85 161.90 -6.85 176.50 20.64 C 184.46 35.64 201.24 43.72 217.94 40.60 C 248.53 34.87 273.09 65.67 260.70 94.22 C 253.94 109.80 258.08 127.96 270.93 139.06 C 294.49 159.41 285.72 197.81 255.67 205.93 C 239.28 210.35 227.66 224.92 226.99 241.88 C 225.77 272.99 190.28 290.08 165.20 271.64 C 151.52 261.59 132.89 261.59 119.21 271.64 C 94.13 290.08 58.64 272.99 57.41 241.88 C 56.75 224.92 45.13 210.35 28.74 205.93 C -1.31 197.81 -10.08 159.41 13.48 139.06 C 26.33 127.96 30.47 109.80 23.71 94.22 C 11.32 65.67 35.88 34.87 66.47 40.60 C 83.16 43.72 99.95 35.64 107.91 20.64 Z',
)
