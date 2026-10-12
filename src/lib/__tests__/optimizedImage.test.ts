import { optimizedImage } from '../optimizedImage';
import privacyImages from '@/data/privacy-images.json';

it('never selects unblurred derivatives for any reviewed privacy photo', () => {
  for (const { original, edited } of privacyImages) {
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
  expect(optimizedImage('/images/trip_usa_3.jpg')).toBe('/optimized/display/trip_usa_3-1600.webp');
});
