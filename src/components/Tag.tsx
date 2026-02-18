import Link from 'next/link';

const Tag = ({ tag }: { tag: string }) => (
  <Link
    href={`/posts?tags=${encodeURIComponent(tag)}`}
    className="px-2 py-1 text-xs border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 rounded-full hover:text-violet-600 dark:hover:text-violet-400 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
  >
    {tag}
  </Link>
);

export default Tag;
