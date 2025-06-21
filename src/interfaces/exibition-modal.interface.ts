import type { NeighborhoodOption } from "../components/exibition-modal/ExibitionModal";
import type { User } from "../components/post/post.interface";

export interface IExibitionModal {
 text: string;
 image?: File;
 neighborhood?: NeighborhoodOption
}

export interface IExibitionComent {
  id: string;
  description: string;
  userId: string
  user: User;
}