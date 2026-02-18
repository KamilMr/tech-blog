import Link from 'next/link';
import {getPostMetadata} from '../utils';

const getTagCounts = () => {
  const posts = getPostMetadata();
  const counts: Record<string, number> = {};
  posts.forEach(post => {
    if (!Array.isArray(post.tags)) return;
    post.tags.forEach(tag => {
      counts[tag] = (counts[tag] || 0) + 1;
    });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
};

const TagsPage = () => {
  const tagCounts = getTagCounts();

  return (
    <div>
      <h1 className="text-4xl font-serif italic mb-8">Tags</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tagCounts.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/posts?tags=${encodeURIComponent(tag)}`}
            className="flex items-center justify-between px-4 py-3 rounded-md border border-slate-200 dark:border-slate-800 hover:border-violet-400 dark:hover:border-violet-600 transition-colors"
          >
            <span className="text-sm">{tag}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
