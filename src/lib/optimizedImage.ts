const privacyEdits: Record<string, string> = {
  '/images/portfolio/culture-wine-05.jpg': '/images/portfolio/culture-wine-05-private.webp',
  '/images/portfolio/culture-beer-01.jpg': '/images/portfolio/culture-beer-01-private.webp',
};
const editedImages = new Set(Object.values(privacyEdits));

export type OptimizedOptions = {
  type?: 'display' | 'thumbs';
  width?: number;
  format?: 'avif' | 'webp';
};

export function optimizedImage(
  src: string,
  { type = 'display', width = 1600, format = 'webp' }: OptimizedOptions = {}
): string {
  // Versioned edited originals avoid serving stale, unblurred derivatives.
  if (privacyEdits[src]) return privacyEdits[src];
  if (editedImages.has(src) || src.toLowerCase().endsWith('.svg')) {
    return src;
  }
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '');
  return `/optimized/${type}/${base}-${width}.${format}`;
}
