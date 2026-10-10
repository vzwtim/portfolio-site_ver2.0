import { optimizedImage } from '../optimizedImage';

it('routes privacy-edited photos to versioned assets for every size and format', () => {
  for (const name of ['culture-beer-01', 'culture-wine-05']) {
    const original = '/images/portfolio/' + name + '.jpg';
    const edited = '/images/portfolio/' + name + '-private.webp';
    for (const type of ['display', 'thumbs'] as const) {
      for (const width of [320, 480, 1200, 1600, 2400]) {
        for (const format of ['avif', 'webp'] as const) {
          expect(optimizedImage(original, { type, width, format })).toBe(edited);
        }
      }
    }
    expect(optimizedImage(edited)).toBe(edited);
  }
  expect(optimizedImage('/images/test.jpg')).toBe('/optimized/display/test-1600.webp');
  expect(optimizedImage('/images/test.svg')).toBe('/images/test.svg');
});
