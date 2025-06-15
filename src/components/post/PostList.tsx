import { Stack } from '@mui/material';
import PostCard from './PostCard';
import type { PostListProps } from './post.interface';


const PostList = ({ posts, allowImages = true, onAddComment }: PostListProps) => {
  return (
    <Stack spacing={2}>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} allowImages={allowImages} onAddComment={onAddComment} />
      ))}
    </Stack>
  );
};

export default PostList;
