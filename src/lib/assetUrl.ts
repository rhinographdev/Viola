/**
 * Resolves a public asset path. In the single-file build the HTML defines
 * window.__VIOLA_ASSETS with inlined data URLs; otherwise the path is returned as-is.
 */
declare global {
  interface Window {
    __VIOLA_ASSETS?: Record<string, string>
  }
}
export const assetUrl = (path: string) =>
  (typeof window !== 'undefined' && window.__VIOLA_ASSETS?.[path]) || path
