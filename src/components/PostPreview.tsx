import Link from 'next/link';

import {PostMetadata} from './PostMetadata';
import Tag from './Tag';

const PostPreview = (props: PostMetadata) => {
  const tags = !Array.isArray(props.tags) ? [] : props.tags;
  return (
    <div className="border border-slate-300 dark:border-slate-700 p-4 rounded-md shadow-sm bg-white dark:bg-[#1f1f1f] relative">
      <p className="text-sm text-slate-400 dark:text-slate-500">{props.date}</p>
      <Link href={`/posts/${props.slug}`}>
        <h1 className="text-violet-600 dark:text-violet-400 hover:underline mb-4">{props.title}</h1>
      </Link>
      <p className="text-slate-700 dark:text-slate-300 mb-4">{props.subtitle}</p>
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => <Tag key={tag} tag={tag} />)}
        </div>
      )}
    </div>
  );
};
export default PostPreview;
