import FadeInImage from './FadeInImage';
import Link from 'next/link';

interface WorkCardProps {
  id:string;
  title:string;
  image:string;
  tags?:string[];
  bgColor?:string;
}

export default function WorkCard({ id, title, image, tags = [], bgColor }: WorkCardProps) {
  return <article className="min-w-0">
    <Link href={`/works/${id}`} className="block rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#008877]">
      <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden" data-project-image style={{ backgroundColor:bgColor || '#eef0ec' }}>
        <FadeInImage src={image} alt="" fill sizes="(max-width:639px) calc(100vw - 40px), (max-width:1023px) calc(50vw - 48px), 31vw" className="object-contain" />
      </div>
      <h2 className="text-xl md:text-2xl leading-relaxed font-bold mt-4 mb-2 text-gray-900 break-words" style={{ fontFamily:'"Shippori Mincho", serif' }}>{title}<span className="text-[#008877] ml-2" aria-hidden="true">↗</span></h2>
    </Link>
    {tags.length > 0 && <div className="flex flex-wrap gap-x-3 gap-y-1">{tags.map(tag => <Link key={tag} href={`/works?tag=${encodeURIComponent(tag)}`} className="inline-flex items-center min-h-11 text-sm text-[#008877] hover:underline">#{tag}</Link>)}</div>}
  </article>;
}
