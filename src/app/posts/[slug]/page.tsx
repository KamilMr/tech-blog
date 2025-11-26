import { getPostMetadata } from '@/app/utils';
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
        <h1 className='text-2xl text-slate-600 dark:text-slate-300'>{content.data.title}</h1>
        <p className='text-slate-400 dark:text-slate-500 mt-2'>{format(content.data.date, 'dd/MM/yyyy')}</p>
      </div>
      <article className="prose dark:prose-invert">
        <Markdown>{content.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
