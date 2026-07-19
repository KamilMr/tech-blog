import {getPostMetadata} from '@/app/utils';
import type {PostMetadata} from '@/components/PostMetadata';
import {format} from 'date-fns';
import fs from 'fs/promises';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import Link from 'next/link';
import type {ReactNode} from 'react';

const getPostContent = async (slug: string) => {
  const folder = 'src/posts';
  const file = `${folder}/${decodeURI(slug)}.md`;
  const content = await fs.readFile(file, 'utf8');
  return matter(content);
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map(p => ({slug: p.slug}));
};

const getText = (children: ReactNode): string => {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }

  if (Array.isArray(children)) {
    return children.map(getText).join('');
  }

  return '';
};

const cleanHeading = (heading: string) =>
  heading
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_#]/g, '')
    .trim();

const slugify = (value: string) =>
  cleanHeading(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const extractHeadings = (markdown: string) => {
  return Array.from(markdown.matchAll(/^(#{2,3})\s+(.+)$/gm)).map(match => {
    const text = cleanHeading(match[2]);
    return {
      id: slugify(text),
      text,
      level: match[1].length,
    };
  });
};

const getReadingTime = (markdown: string) => {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
};

const formatPostDate = (date: unknown, fallback: string) => {
  try {
    return format(date as Date, 'yyyy-MM-dd');
  } catch {
    return fallback;
  }
};

const Heading2 = ({children}: {children: ReactNode}) => {
  const id = slugify(getText(children));
  return (
    <h2 id={id}>
      <a href={`#${id}`}>{children}</a>
    </h2>
  );
};

const Heading3 = ({children}: {children: ReactNode}) => {
  const id = slugify(getText(children));
  return (
    <h3 id={id}>
      <a href={`#${id}`}>{children}</a>
    </h3>
  );
};

const MorePost = ({post}: {post: PostMetadata}) => {
  const primaryTag = post.tags?.[0] || post.language || 'writing';

  return (
    <Link
      href={`/posts/${post.slug}`}
      className="group space-y-1.5 border-t border-terminal-line bg-terminal-surface p-5 first:border-t-0 transition-colors hover:bg-[#1c2128]"
    >
      <span className="text-[10px] uppercase tracking-widest text-terminal-muted">
        {primaryTag}
      </span>
      <p className="text-sm font-bold leading-snug transition-colors group-hover:text-terminal-accent">
        {post.title}
      </p>
      <span className="text-xs text-terminal-muted">{post.date}</span>
    </Link>
  );
};

const PostPage = async (props: any) => {
  const slug = props.params.slug;
  const posts = getPostMetadata();
  const postMetadata = posts.find(post => post.slug === slug);
  const content = await getPostContent(slug);
  const tags = Array.isArray(content.data.tags) ? content.data.tags : [];
  const primaryTag = tags[0] || content.data.language || 'writing';
  const postDate = formatPostDate(content.data.date, postMetadata?.date || '');
  const readingTime = getReadingTime(content.content);
  const headings = extractHeadings(content.content);
  const morePosts = posts.filter(post => post.slug !== slug).slice(0, 2);

  return (
    <main className="mx-auto w-full max-w-7xl px-8 py-16">
      <div className="flex flex-col gap-16 lg:flex-row">
        <article className="min-w-0 flex-1">
          <nav className="mb-10 flex items-center gap-2 text-xs text-terminal-muted">
            <Link href="/" className="transition-colors hover:text-terminal-accent">
              ~
            </Link>
            <span>/</span>
            <Link href="/posts" className="transition-colors hover:text-terminal-accent">
              writing
            </Link>
            <span>/</span>
            <span className="text-terminal-ink">{slug}</span>
          </nav>

          <header className="mb-12 space-y-6 border-b border-terminal-line pb-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="border border-terminal-accent px-2 py-0.5 text-[10px] uppercase tracking-widest text-terminal-accent">
                post
              </span>
              <span className="text-[10px] uppercase tracking-widest text-terminal-muted">
                {primaryTag}
              </span>
            </div>

            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {content.data.title}
            </h1>

            {content.data.subtitle && (
              <p className="max-w-3xl text-sm leading-relaxed text-terminal-muted md:text-base">
                {content.data.subtitle}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-xs text-terminal-muted">
              <div className="flex items-center gap-2">
                <Image
                  src="/me.jpg"
                  alt="Kamil Mrowka"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span>Kamil Mrowka</span>
              </div>
              <span>{postDate}</span>
              <span>{readingTime} min read</span>
            </div>
          </header>

          <div className="prose-terminal">
            <Markdown
              options={{
                overrides: {
                  h2: {component: Heading2},
                  h3: {component: Heading3},
                },
              }}
            >
              {content.content}
            </Markdown>
          </div>

          {tags.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-2 border-t border-terminal-line pt-8">
              {tags.map((tag: string) => (
                <Link
                  key={tag}
                  href={`/posts?tags=${encodeURIComponent(tag)}`}
                  className="border border-terminal-line bg-terminal-surface px-3 py-1.5 text-xs transition-colors hover:border-terminal-accent hover:text-terminal-accent"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </article>

        <aside className="w-full shrink-0 space-y-10 lg:w-72">
          <div className="space-y-4 border border-terminal-line bg-terminal-surface p-6">
            <h2 className="text-[10px] uppercase tracking-widest text-terminal-accent">
              // author
            </h2>
            <div className="flex items-center gap-4">
              <Image
                src="/me.jpg"
                alt="Kamil Mrowka"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full border border-terminal-line object-cover"
              />
              <div>
                <p className="text-sm font-bold">Kamil Mrowka</p>
                <p className="text-xs text-terminal-muted">software craftsman</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-terminal-muted">
              I write about what I do and what I learn.
            </p>
            <a
              href="https://github.com/KamilMr"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-terminal-accent underline-offset-2 hover:underline"
            >
              @KamilMr
            </a>
          </div>

          {morePosts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-[10px] uppercase tracking-widest text-terminal-accent">
                // more posts
              </h2>
              <div className="flex flex-col border border-terminal-line">
                {morePosts.map(post => (
                  <MorePost key={post.slug} post={post} />
                ))}
              </div>
            </div>
          )}

          {headings.length > 0 && (
            <div className="sticky top-6 space-y-3 border border-terminal-line bg-terminal-surface p-6">
              <h2 className="text-[10px] uppercase tracking-widest text-terminal-accent">
                // contents
              </h2>
              <ul className="space-y-2 text-xs text-terminal-muted">
                {headings.map(heading => (
                  <li key={heading.id} className={heading.level === 3 ? 'pl-4' : ''}>
                    <a
                      href={`#${heading.id}`}
                      className="flex items-start gap-2 transition-colors hover:text-terminal-accent"
                    >
                      <span className="mt-0.5 text-terminal-accent">›</span>
                      {heading.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <div className="mt-16 border-t border-terminal-line pt-8">
        <Link
          href="/posts"
          className="group flex w-fit items-center gap-3 text-sm text-terminal-muted transition-colors hover:text-terminal-accent"
        >
          <span className="transition-transform group-hover:-translate-x-1">←</span>
          back to writing
        </Link>
      </div>
    </main>
  );
};

export default PostPage;
