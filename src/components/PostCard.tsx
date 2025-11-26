import Link from 'next/link';
import { PostMetadata } from './PostMetadata';

const PostCard = (props: PostMetadata) => {
  return (
    <article className="group space-y-3 py-8 border-b border-slate-200 dark:border-slate-800 last:border-b-0">
      <Link href={`/posts/${props.slug}`} className="block">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-normal group-hover:underline flex-1">
            {props.title}
          </h3>
          <span className="hidden md:inline-flex items-center gap-2 text-sm italic opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Read Post
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </Link>
      <p className="text-sm text-slate-500 dark:text-slate-400">{props.date}</p>
      <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        {props.subtitle}
      </p>
    </article>
  );
};

export default PostCard;
