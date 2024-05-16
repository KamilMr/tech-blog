import { getPostMetadata } from './utils';
import PostPreview from '@/components/PostPreview';

const Home = async () => {
  const posts = getPostMetadata();

console.log(posts);
  const postPreview = posts.sort().map((post: any) => (
    <PostPreview key={post.slug} {...post} />
  ));
  return <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>{postPreview}</div>;
};

export default Home;
