import privacyImages from '@/data/privacy-images.json';

const privacyEdits = new Map(privacyImages.map(({ original, edited }) => [original, edited]));
const editedImages = new Set(privacyImages.map(({ edited }) => edited));

export type OptimizedOptions = {
  type?: 'display' | 'thumbs';
  width?: number;
  format?: 'avif' | 'webp';
};

export function optimizedImage(
  src: string,
  { type = 'display', width = 1600, format = 'webp' }: OptimizedOptions = {}
): string {
  // Edited originals are served through Next/Image using a versioned URL.
  // Never select retired, unblurred derivatives for any requested size/format.
  const edited = privacyEdits.get(src);
  if (edited) return edited;
  if (editedImages.has(src) || src.toLowerCase().endsWith('.svg')) return src;
  const base = src.replace(/^\/images\//, '').replace(/\.[^.]+$/, '');
  return `/optimized/${type}/${base}-${width}.${format}`;
}
