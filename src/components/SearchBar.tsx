'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SearchEntry } from '@/components/PostMetadata';

let cachedIndex: SearchEntry[] | null = null;

const loadIndex = async (): Promise<SearchEntry[]> => {
  if (cachedIndex) return cachedIndex;
  const res = await fetch('/search-index.json');
  cachedIndex = await res.json();
  return cachedIndex!;
};

const search = (index: SearchEntry[], q: string): SearchEntry[] => {
  const query = q.toLowerCase();
  return index
    .map(entry => {
      let score = 0;
      if (entry.title.toLowerCase().includes(query)) score += 10;
      if (entry.tags.some(t => t.toLowerCase().includes(query))) score += 8;
      if (entry.subtitle?.toLowerCase().includes(query)) score += 6;
      if (entry.content.toLowerCase().includes(query)) score += 1;
      return { entry, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ entry }) => entry);
};

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchEntry[]>([]);
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    loadIndex().then(setIndex);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) inputRef.current.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!index || query.length < 2) {
      setResults([]);
      return;
    }
    setResults(search(index, query));
  }, [query, index]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setQuery('');
    setResults([]);
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={handleToggle}
        className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-label="Search posts"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {isOpen && (
        <div style={panelStyles}>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search posts..."
            className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-[#1f1f1f] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-slate-400"
          />

          {results.length > 0 && (
            <ul className="mt-1 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-slate-700 rounded-lg shadow-lg overflow-hidden">
              {results.map(r => (
                <li key={r.slug}>
                  <Link
                    href={`/posts/${r.slug}`}
                    onClick={handleResultClick}
                    className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <p className="text-sm font-medium">{r.title}</p>
                    {r.subtitle && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{r.subtitle}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {query.length >= 2 && results.length === 0 && (
            <p className="mt-1 px-4 py-3 text-sm text-slate-500 bg-white dark:bg-[#1f1f1f] border border-slate-200 dark:border-slate-700 rounded-lg">
              No results for &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const panelStyles: React.CSSProperties = {
  position: 'absolute',
  right: 0,
  top: '100%',
  marginTop: '0.5rem',
  width: '18rem',
  maxWidth: 'calc(100vw - 3rem)',
  zIndex: 50,
};

export default SearchBar;
