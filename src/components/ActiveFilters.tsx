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
            className="flex items-center gap-1 rounded-full border border-terminal-accent px-2 py-1 text-xs text-terminal-accent transition-colors hover:bg-terminal-accent hover:text-terminal-bg"
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
        className="w-24 rounded-full border border-terminal-line bg-transparent px-2 py-1 text-xs text-terminal-ink outline-none transition-colors placeholder:text-terminal-muted focus:border-terminal-accent"
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
