import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import ActiveFilters from '@/components/ActiveFilters';
import { getPostMetadata } from '../utils';

const POSTS_PER_PAGE = 6;

interface SearchParams {
  page?: string;
  tags?: string;
  text?: string;
}

const PostsPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const allPosts = getPostMetadata();

  const activeTags = (searchParams.tags || '')
    .split(',')
    .map(t => t.trim().toLowerCase())
    .filter(Boolean);
  const searchText = (searchParams.text || '').toLowerCase().trim();
  const isFiltering = activeTags.length > 0 || searchText.length > 0;

  const filtered = isFiltering
    ? allPosts.filter(post => {
        const postTags = (post.tags || []).map(t => t.toLowerCase());
        const matchesTags = activeTags.length === 0 || activeTags.some(t => postTags.includes(t));
        const matchesText = !searchText ||
          post.title.toLowerCase().includes(searchText) ||
          post.subtitle.toLowerCase().includes(searchText);
        return matchesTags && matchesText;
      })
    : allPosts;

  const currentPage = Number(searchParams.page) || 1;
  const totalPages = Math.ceil(filtered.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = isFiltering
    ? filtered
    : filtered.slice(startIndex, startIndex + POSTS_PER_PAGE);

  return (
    <div>
      <h1 className="text-4xl font-serif italic mb-8">Writing</h1>

      {isFiltering && (
        <ActiveFilters tags={searchParams.tags || ''} text={searchParams.text || ''} />
      )}

      {currentPosts.length === 0 && (
        <p className="text-slate-500 dark:text-slate-400">No posts found.</p>
      )}

      <div>
        {currentPosts.map(post => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>

      {!isFiltering && <Pagination currentPage={currentPage} totalPages={totalPages} />}
    </div>
  );
};

export default PostsPage;
