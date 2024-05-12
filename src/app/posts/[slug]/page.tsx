import { getPostMetadata } from '@/app/utils';
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
        <h1 className='text-2xl text-slate-600'>{content.data.title}</h1>
        <p className='text-slate-400 mt-2'>{content.data.date}</p>
      </div>
      <article className="prose">
        <Markdown>{content.content}</Markdown>
      </article>
    </div>
  );
};

export default PostPage;
