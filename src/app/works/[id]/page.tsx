// src/app/works/[id]/page.tsx
import sharp from 'sharp';
import path from 'node:path';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import works from '../../../data/works.json';
import WorkContent from './WorkContent';
import type { Work } from './WorkContent';

type PageProps = { params: { id: string } };

// Helper function to get work data asynchronously
async function getWork(id: string): Promise<Work | undefined> {
  return (works as Work[]).find((w) => w.id === id);
}

export function generateStaticParams() {
  return (works as Work[]).map((work) => ({ id: work.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const id = decodeURIComponent(params.id);
  const work = await getWork(id);

  if (!work) {
    return { title: 'Work not found' };
  }
  return {
    title: work.title,
    description: work.description,
  };
}

export default async function WorkPage({ params }: PageProps) {
  const id = decodeURIComponent(params.id);
  const work = await getWork(id);

  if (!work) {
    notFound();
  }

  const images = work.images || [];

  const dimensions = await Promise.all(images.map(async src => {
    try {
      if (!src.startsWith('/images/')) return null;
      const metadata = await sharp(path.join(process.cwd(), 'public', src)).metadata();
      return metadata.width && metadata.height ? { width:metadata.width, height:metadata.height } : null;
    } catch { return null; }
  }));
  return <WorkContent work={work} images={images} dimensions={dimensions} />;
}
