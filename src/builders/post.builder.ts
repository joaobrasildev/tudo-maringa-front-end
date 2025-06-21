import type { IPost } from "../components/post/post.interface";
import type { IExibitionCard } from "../interfaces/exibition-card.interface";

export function postBuilder(data: IPost[]): IExibitionCard[] {
  return data.map((post) => {
    return {
      id: post.id,
      content: post.content,
      neighborhood: post. neighborhood,
      user: post.user,
      comments: post.postAnswers,
      createdAt: post.createdAt,
      image: post.image
    }
  })
}