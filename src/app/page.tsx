import PostPreview from '@/components/PostPreview';

import { addToFeed, getPostMetadata } from './utils';

const Home = async () => {
  const posts = getPostMetadata();

  addToFeed(posts.slice(0, 10));

  const postPreview = posts.map((post: any) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{postPreview}</div>;
};

export default Home;
