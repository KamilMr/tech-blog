import Link from 'next/link';

import {PostMetadata} from './PostMetadata';

const PostPreview = (props: PostMetadata) => {
  const tags = !Array.isArray(props.tags) ? [] : props.tags;
  return (
    <div className="border border-slate-300 p-4 rounded-md shadow-sm bg-white relative">
      <p className="text-sm text-slate-400">{props.date}</p>
      <Link href={`/posts/${props.slug}`}>
        <h1 className="text-violet-600 hover:underline mb-4">{props.title}</h1>
      </Link>
      <p className="text-slate-700 mb-4">{props.subtitle}</p>
      {props.tags && props.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-violet-100 text-violet-700 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
export default PostPreview;
