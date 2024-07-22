import PostPreview from '@/components/PostPreview';

import { getPostMetadata } from './utils';

const Home = async () => {
  const posts = getPostMetadata();

  const postPreview = posts.sort().map((post: any) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{postPreview}</div>;
};

export default Home;
