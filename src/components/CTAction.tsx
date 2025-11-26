import Link from 'next/link';

const CTAction = ({ href, text }: { href: string, text: string }) => {
  return (
        <Link
          href={href}
          className="inline-block mt-12 px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors italic"
        >
          {text}
        </Link>
  );
};

export default CTAction;