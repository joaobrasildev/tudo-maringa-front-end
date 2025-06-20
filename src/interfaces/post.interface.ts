import type { NeighborhoodOption } from "../components/post/CreatePostModal";

export interface ICreatePost {
 text: string;
 image?: File;
 neighborhood?: NeighborhoodOption
}