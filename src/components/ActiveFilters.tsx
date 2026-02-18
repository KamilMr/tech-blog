'use client';

import { useRouter } from 'next/navigation';

const ActiveFilters = ({ tags, text }: { tags: string; text: string }) => {
  const router = useRouter();
  const activeTags = tags.split(',').map(t => t.trim()).filter(Boolean);

  const removeTag = (tagToRemove: string) => {
    const remaining = activeTags.filter(t => t.toLowerCase() !== tagToRemove.toLowerCase());
    const params = new URLSearchParams();
    if (remaining.length > 0) params.set('tags', remaining.join(','));
    if (text) params.set('text', text);
    const qs = params.toString();
    router.push(`/posts${qs ? `?${qs}` : ''}`);
  };

  const clearAll = () => router.push('/posts');

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {activeTags.map(tag => (
        <button
          key={tag}
          onClick={() => removeTag(tag)}
          className="flex items-center gap-1 px-2 py-1 text-xs border border-violet-400 dark:border-violet-600 text-violet-600 dark:text-violet-400 rounded-full hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
        >
          {tag}
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      ))}
      {text && (
        <span className="text-sm text-slate-500 dark:text-slate-400">
          &quot;{text}&quot;
        </span>
      )}
      <button
        onClick={clearAll}
        className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline"
      >
        Clear all
      </button>
    </div>
  );
};

export default ActiveFilters;
