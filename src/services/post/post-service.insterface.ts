export interface ICreatePostAnswer {
  description: string;
  userId: string
  postId: string;
}

export interface ICreatePost {
  content: string;
  neighborhoodId?: string;
  userId: string
  postImage?: Buffer;
  postImageContentType?: string
}