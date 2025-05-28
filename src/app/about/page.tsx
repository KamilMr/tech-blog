import Image from 'next/image';
import fs from 'fs/promises';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

async function getAboutContent() {
  const file = 'src/content/about.md';
  const content = await fs.readFile(file, 'utf8');
  const matterResult = matter(content);
  return matterResult;
}

export default async function AboutPage() {
  const content = await getAboutContent();

  return (
    <div className="prose max-w-none">
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/me.jpg"
          alt="Kamil Mrówka"
          width={300}
          height={300}
          className="rounded-full"
        />
      </div>
      <h1>{content.data.title}</h1>
      <article>
        <Markdown>{content.content}</Markdown>
      </article>
    </div>
  );
}