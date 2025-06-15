interface User {
  id: string;
  name: string;
  avatarUrl: string;
  neighborhood: neighborhood;
}

interface neighborhood {
  id: string;
  name: string;
  description: string;
  grade: number;
}

interface PostAnswers {
  id: string;
  description: string;
  userId: string
  user: User;
}

export interface Post {
  id: string;
  text: string;
  image?: string;
  createdAt: string;
  user: User;
  postAnswers: PostAnswers[];
}

export interface PostCardProps {
  post: Post;
  allowImages?: boolean;
  onAddComment: (postId: string, text: string) => void;
}

export interface PostListProps {
  posts: Post[];
  allowImages?: boolean;
  onAddComment: (postId: string, text: string) => void;
}