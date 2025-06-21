import type { IExibitionComent } from "../../interfaces/exibition-modal.interface";
import type { NeighborhoodOption } from "../exibition-modal/ExibitionModal";

export interface User {
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

export interface PostAnswers {
  id: string;
  description: string;
  userId: string
  user: User;
}

export interface IPost {
  id: string;
  content: string;
  image?: string;
  neighborhood: NeighborhoodOption
  createdAt: string;
  user: User;
  postAnswers: IExibitionComent[];
}

export interface PostCardProps {
  post: IPost;
  allowImages?: boolean;
  onAddComment: (postId: string, commentText: string) => void;
}

export interface PostListProps {
  posts: IPost[];
  allowImages?: boolean;
  onAddComment: (postId: string, commentText: string) => void;
}