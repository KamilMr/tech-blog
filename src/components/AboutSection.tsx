import fs from 'fs/promises';
import matter from 'gray-matter';
import Markdown from 'markdown-to-jsx';

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
      <h2 className="text-4xl font-serif italic">{content.data.title}</h2>

      <div className="prose dark:prose-invert max-w-none text-base text-slate-700 dark:text-slate-300 leading-relaxed">
        <Markdown>{content.content}</Markdown>
      </div>
    </section>
  );
};

export default AboutSection;
