
import React from 'react';
import Link from 'next/link';
import WorkCard from '@/components/WorkCard';
import worksData from '../../data/works.json';
import { optimizedImage } from '@/lib/optimizedImage';

interface WorksPageProps {
  searchParams: { tag?: string };
}

export default async function WorksPage({ searchParams }: WorksPageProps) {
  const tag = searchParams?.tag;
  const filteredWorks = tag
    ? worksData.filter((work) => work.tags?.includes(tag))
    : worksData;
  const extraTags = [
    'food',
    'bonsai',
    'travel',
    'calligraphy',
    'living',
    'architecture',
  ];

  const TAG_ORDER = [
    'real-estate',
    'architecture',
    'living',
    'crafting',
    'photography',
    'food',
    'bonsai',
    'calligraphy',
    'travel',
    'data-analysis',
    'design-programming',
    'artificial-intelligence',
  ];

  const allTags = Array.from(
    new Set([
      ...worksData.flatMap((work) => work.tags || []),
      ...extraTags,
    ])
  ).sort((a, b) => TAG_ORDER.indexOf(a) - TAG_ORDER.indexOf(b));
  return (
    <div className="min-h-screen bg-white text-gray-900 px-5 py-8 sm:px-8">
      <h1 className="text-5xl font-extrabold mb-12 mt-24 text-center">
        works?
      </h1>
      <div className="flex justify-center flex-wrap gap-2 mb-12 text-sm" style={{ display: 'none' }}>
        <Link
          href="/works"
          className={`px-2 py-1 rounded border transition-colors ${
            !tag
              ? 'bg-[#008877] text-white border-[#008877]'
              : 'text-[#008877] border-[#008877] hover:bg-[#008877] hover:text-white'
          }`}
        >
          All
        </Link>
        {allTags.map((t) => (
          <Link
            key={t}
            href={`/works?tag=${t}`}
            className={`px-2 py-1 rounded border transition-colors ${
              tag === t
                ? 'bg-[#008877] text-white border-[#008877]'
                : 'text-[#008877] border-[#008877] hover:bg-[#008877] hover:text-white'
            }`}
          >
            {t}
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWorks.map((work) => (
          <WorkCard
            key={work.id}
            id={work.id}
            title={work.title}
            
            image={optimizedImage(work.images?.[0])}
            tags={work.tags}
            bgColor={work.bgColor}
          />
        ))}
      </div>
    </div>
  );
}
