'use client';

import {useState} from 'react';

const buildHref = (tags: string[], text: string) => {
  const params = new URLSearchParams();
  if (tags.length > 0) params.set('tags', tags.join(','));
  if (text) params.set('text', text);
  const qs = params.toString();
  return `/posts${qs ? `?${qs}` : ''}`;
};

const ActiveFilters = ({tags, text}: {tags: string; text: string}) => {
  const activeTags = tags
    .split(',')
    .map(t => t.trim())
    .filter(Boolean);
  const [inputValue, setInputValue] = useState('');

  const addTagHref = (newTag: string) => {
    const merged = [...activeTags, newTag.trim()];
    return buildHref(merged, text);
  };

  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {activeTags.map(tag => {
        const remaining = activeTags.filter(
          t => t.toLowerCase() !== tag.toLowerCase(),
        );
        return (
          <a
            key={tag}
            href={buildHref(remaining, text)}
            className="flex items-center gap-1 px-2 py-1 text-xs border border-violet-400 dark:border-violet-600 text-violet-600 dark:text-violet-400 rounded-full hover:text-violet-700 dark:hover:text-violet-300 transition-colors"
          >
            {tag}
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </a>
        );
      })}
      {text && (
        <span className="text-sm text-slate-500 dark:text-slate-400">
          &quot;{text}&quot;
        </span>
      )}
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        onKeyDown={e => {
          if (e.key !== 'Enter' || !inputValue.trim()) return;
          window.location.href = addTagHref(inputValue);
        }}
        placeholder="Add tag..."
        className="px-2 py-1 text-xs border border-slate-200 dark:border-slate-700 rounded-full bg-transparent text-slate-600 dark:text-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none focus:border-violet-400 dark:focus:border-violet-600 w-24 transition-colors"
      />
      <a
        href="/posts"
        className="text-xs text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 underline"
      >
        Clear all
      </a>
    </div>
  );
};

export default ActiveFilters;
