import { getPostMetadata } from '@/app/utils';
import Tag from '@/components/Tag';
import { format } from 'date-fns';
import fs from 'fs/promises';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

const getPostContent = async (slug: string) => {
  const folder = 'src/posts';
  const file = `${folder}/${decodeURI(slug)}.md`;
  const content = await fs.readFile(file, 'utf8');
  const matterResult = matter(content);
  return matterResult
};

export const generateStaticParams = async () => {
  const posts = getPostMetadata();
  return posts.map(p => ({ slug: p.slug }));
};

const PostPage = async (props: any) => {
  const slug = props.params.slug;
  const content = await getPostContent(slug);
  return (
    <div>
      <div className='my-12 text-center'>
        <h1 className='post-title text-3xl font-bold'>{content.data.title}</h1>
        <p className='text-slate-400 dark:text-slate-500 mt-2'>{format(content.data.date, 'dd/MM/yyyy')}</p>
        {Array.isArray(content.data.tags) && content.data.tags.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {content.data.tags.map((tag: string) => <Tag key={tag} tag={tag} />)}
          </div>
        )}
      </div>
      <article className="prose dark:prose-invert">
        <Markdown>{content.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
