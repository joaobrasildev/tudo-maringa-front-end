import type { NeighborhoodOption } from "../components/exibition-modal/ExibitionModal";

export interface ICreatePost {
 text: string;
 image?: File;
 neighborhood?: NeighborhoodOption
}