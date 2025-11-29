import {PostMetadata} from '@/components/PostMetadata';
import postsMetadata from '@/../../public/posts-metadata.json';

export const getPostMetadata = (): PostMetadata[] => {
  return postsMetadata as PostMetadata[];
};
