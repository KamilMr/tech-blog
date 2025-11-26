import Link from 'next/link';
import PostCard from '@/components/PostCard';
import { getPostMetadata } from './utils';

const Home = async () => {
  const posts = getPostMetadata();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-16">
      <section>
        <h2 className="text-4xl font-serif italic mb-8">Writing</h2>
        <div>
          {recentPosts.map(post => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
        <Link
          href="/posts"
          className="inline-block mt-12 px-6 py-3 border border-slate-300 dark:border-slate-700 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          View All Posts
        </Link>
      </section>
    </div>
  );
};

export default Home;
