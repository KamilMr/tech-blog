import fs from 'fs';
import { PostMetadata } from "@/components/PostMetadata";
import matter from 'gray-matter';

export const getPostMetadata = (): PostMetadata[] => {
  const folder = 'src/posts/';
  const files = fs.readdirSync(folder);
  const markdownPosts = files.filter(f => f.endsWith('.md'));
  const posts = markdownPosts.map((f: any) => {
    const fileContents = fs.readFileSync(folder + f, 'utf8');
    const matterResult = matter(fileContents);

    return {
      title: matterResult.data.title,
      date: matterResult.data.date,
      subtitle: matterResult.data.subtitle,
      slug: f.replace('.md', ''),
    };
  });

  return posts;
};

