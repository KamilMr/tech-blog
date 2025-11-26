import PostCard from '@/components/PostCard';
import AboutSection from '@/components/AboutSection';
import { getPostMetadata } from './utils';
import CTAction from '@/components/CTAction';

const Home = async () => {
  const posts = getPostMetadata();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-24">
      <AboutSection />

      <section>
        <h2 className="text-4xl font-serif italic mb-8">Writing</h2>
        <div>
          {recentPosts.map(post => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>
        <CTAction href="/posts" text="View All Posts" />
      </section>
    </div>
  );
};

export default Home;
