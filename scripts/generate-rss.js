const RSS = require('rss');
const fs = require('fs');
const matter = require('gray-matter');
const {format} = require('date-fns');

const getPostMetadata = () => {
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

  return posts.sort(
    (a, b) =>
      new Date(b.date.split('/').reverse().join('-')).getTime() -
      new Date(a.date.split('/').reverse().join('-')).getTime(),
  );
};

const generateRSS = () => {
  const feed = new RSS({
    title: 'Kamil Mrówka - tech blog',
    description: 'This is short tech blog description',
    feed_url: 'https://kamilmrowka.com/rss.xml',
    site_url: 'https://kamilmrowka.com',
    language: 'en',
  });

  const posts = getPostMetadata();

  posts.slice(0, 20).forEach(({title, slug, date, subtitle}) => {
    feed.item({
      title,
      guid: slug,
      url: `https://kamilmrowka.com/posts/${slug}`,
      description: title || subtitle,
      date,
    });
  });

  fs.writeFileSync('./public/rss.xml', feed.xml());
  console.log('RSS feed generated successfully!');
};

generateRSS();
