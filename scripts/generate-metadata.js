const fs = require('fs');
const matter = require('gray-matter');
const {format} = require('date-fns');

const stripMarkdown = (content) =>
  content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`[^`]+`/g, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, '$1')
    .replace(/#{1,6}\s/g, '')
    .replace(/(\*\*|__)(.*?)\1/g, '$2')
    .replace(/(\*|_)(.*?)\1/g, '$2')
    .replace(/^>\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/^\d+\.\s+/gm, '')
    .replace(/---/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const generateMetadata = () => {
  const folder = 'src/posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter(f => f.endsWith('.md'));

  const posts = [];
  const searchEntries = [];

  markdownPosts.forEach((f) => {
    const fileContents = fs.readFileSync(folder + f, 'utf8');
    const matterResult = matter(fileContents);
    const slug = f.replace('.md', '');

    posts.push({
      title: matterResult.data.title,
      date: format(matterResult.data.date, 'dd/MM/yyyy'),
      subtitle: matterResult.data.subtitle,
      slug,
      language: matterResult.data.language,
      tags: matterResult.data.tags || [],
    });

    searchEntries.push({
      title: matterResult.data.title,
      subtitle: matterResult.data.subtitle || '',
      slug,
      tags: matterResult.data.tags || [],
      content: stripMarkdown(matterResult.content).slice(0, 2000),
    });
  });

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.date.split('/').reverse().join('-')).getTime() -
      new Date(a.date.split('/').reverse().join('-')).getTime(),
  );

  fs.writeFileSync(
    './public/posts-metadata.json',
    JSON.stringify(sortedPosts, null, 2)
  );

  fs.writeFileSync(
    './public/search-index.json',
    JSON.stringify(searchEntries)
  );

  console.log(`Generated metadata for ${sortedPosts.length} posts`);
  console.log(`Generated search index for ${searchEntries.length} posts`);
};

generateMetadata();
