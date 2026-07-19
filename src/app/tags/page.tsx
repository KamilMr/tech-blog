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
    <div className="mx-auto max-w-3xl px-8 py-16">
      <h1 className="mb-8 text-xs uppercase tracking-widest text-terminal-accent">// tags</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {tagCounts.map(([tag, count]) => (
          <Link
            key={tag}
            href={`/posts?tags=${encodeURIComponent(tag)}`}
            className="flex items-center justify-between rounded-md border border-terminal-line bg-terminal-surface px-4 py-3 transition-colors hover:border-terminal-accent hover:text-terminal-accent"
          >
            <span className="text-sm">{tag}</span>
            <span className="text-xs text-terminal-muted">
              {count}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;
