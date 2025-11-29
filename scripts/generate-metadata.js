const fs = require('fs');
const matter = require('gray-matter');
const {format} = require('date-fns');

const generateMetadata = () => {
  const folder = 'src/posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter(f => f.endsWith('.md'));

  const posts = markdownPosts.map((f) => {
    const fileContents = fs.readFileSync(folder + f, 'utf8');
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      date: format(matterResult.data.date, 'dd/MM/yyyy'),
      subtitle: matterResult.data.subtitle,
      slug: f.replace('.md', ''),
      language: matterResult.data.language,
      tags: matterResult.data.tags || [],
    };
  });

  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.date.split('/').reverse().join('-')).getTime() -
      new Date(a.date.split('/').reverse().join('-')).getTime(),
  );

  // Write to public directory so it's accessible at runtime
  fs.writeFileSync(
    './public/posts-metadata.json',
    JSON.stringify(sortedPosts, null, 2)
  );

  console.log(`Generated metadata for ${sortedPosts.length} posts`);
};

generateMetadata();
