import type { IExibitionCard } from "../interfaces/exibition-card.interface";
import type { IQuestion } from "../interfaces/question.interface";

export function questionBuilder(data: IQuestion[]): IExibitionCard[] {
  return data.map((question) => {
    return {
      id: question.id,
      content: question.description,
      neighborhood: question. neighborhood,
      user: question.user,
      comments: question.answer,
      createdAt: question.createdAt
    }
  })
}