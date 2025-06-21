import type { NeighborhoodOption } from "../components/exibition-modal/ExibitionModal";
import type { User } from "../components/post/post.interface";
import type { IExibitionComent } from "./exibition-modal.interface";

export interface IExibitionCard {
  id: string;
  content: string;  
  neighborhood?: NeighborhoodOption
  user: User;
  comments: IExibitionComent[];
  createdAt: string;
  image?: string;
}