import type { NeighborhoodOption } from "../components/exibition-modal/ExibitionModal";
import type { User } from "../components/post/post.interface";
import type { IExibitionComent } from "./exibition-modal.interface";

export interface IQuestion {
  id: string;
  description: string;
  neighborhood: NeighborhoodOption
  createdAt: string;
  user: User;
  answer: IExibitionComent[];
}