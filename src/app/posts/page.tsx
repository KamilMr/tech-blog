import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { getPostMetadata } from '../utils';

const POSTS_PER_PAGE = 6;

const PostsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const posts = getPostMetadata();
  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIndex, endIndex);

  return (
    <div>
      <h1 className="text-4xl font-serif italic mb-8">Writing</h1>
      <div>
        {currentPosts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default PostsPage;
