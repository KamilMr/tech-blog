import fs from 'fs/promises';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import CTAction from './CTAction';

async function getAboutContent() {
  const file = 'src/content/about.md';
  const content = await fs.readFile(file, 'utf8');
  const matterResult = matter(content);
  return matterResult;
}

const AboutSection = async () => {
  const content = await getAboutContent();

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-6">
        <Image
          src="/me.jpg"
          alt="Kamil Mrówka"
          width={80}
          height={80}
          className="rounded-full"
        />
        <div>
          <h1 className="text-2xl font-bold">Kamil Mrówka</h1>
          <p className="text-slate-600 dark:text-slate-400">Full stack developer</p>
        </div>
      </div>

      <h2 className="text-4xl font-serif italic">{content.data.title}</h2>

      <div className="prose dark:prose-invert max-w-none text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <Markdown>{content.content}</Markdown>
      </div>
      <CTAction href="/posts" text="View All Posts" />
    </section>
  );
};

export default AboutSection;
