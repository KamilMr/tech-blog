import Link from 'next/link';

const Tag = ({ tag }: { tag: string }) => (
  <Link
    href={`/posts?tags=${encodeURIComponent(tag)}`}
    className="rounded-full border border-terminal-line bg-terminal-surface px-2 py-1 text-xs text-terminal-muted transition-colors hover:border-terminal-accent hover:text-terminal-accent"
  >
    {tag}
  </Link>
);

export default Tag;
