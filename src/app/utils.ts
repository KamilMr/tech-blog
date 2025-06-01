import RSS from 'rss';
import fs from 'fs';

import matter from 'gray-matter';
import {PostMetadata} from '@/components/PostMetadata';
import {format} from 'date-fns';

export const getPostMetadata = (): PostMetadata[] => {
  const folder = 'src/posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter(f => f.endsWith('.md'));
  const posts = markdownPosts.map((f: any) => {
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

/* lets create an rss feed */
const feed = new RSS({
  title: 'Kamil Mrówka - tech blog',
  description: 'This is short tech blog description',
  feed_url: 'https://kamilmrowka.com/rss.xml',
  site_url: 'https://kamilmrowka.com',
  language: 'en',
});

/** Add each item from the array to the feed. */
export const addToFeed = (
  arr: {title: string; slug: string; date: string; subtitle: string}[],
) => {
  arr.forEach(({title, slug, date, subtitle}) =>
    feed.item({
      title,
      guid: slug,
      url: `https://kamilmrowka.com/posts/${slug}`,
      description: title || subtitle,
      date,
    }),
  );
  fs.writeFileSync('./public/rss.xml', feed.xml());
};
