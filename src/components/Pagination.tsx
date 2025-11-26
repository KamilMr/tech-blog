'use client';

import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

const Pagination = ({ currentPage, totalPages, basePath = '/posts' }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4 mt-12">
      <Link
        href={currentPage > 1 ? `${basePath}?page=${currentPage - 1}` : '#'}
        className={`p-2 ${
          currentPage === 1
            ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
        }`}
        aria-disabled={currentPage === 1}
        onClick={(e) => currentPage === 1 && e.preventDefault()}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </Link>

      <div className="flex gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              currentPage === page
                ? 'bg-black dark:bg-white text-white dark:text-black'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>

      <Link
        href={currentPage < totalPages ? `${basePath}?page=${currentPage + 1}` : '#'}
        className={`p-2 ${
          currentPage === totalPages
            ? 'text-slate-300 dark:text-slate-700 cursor-not-allowed'
            : 'text-slate-700 dark:text-slate-300 hover:text-black dark:hover:text-white'
        }`}
        aria-disabled={currentPage === totalPages}
        onClick={(e) => currentPage === totalPages && e.preventDefault()}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  );
};

export default Pagination;
