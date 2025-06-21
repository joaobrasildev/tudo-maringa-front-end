export interface ICreateQuestion {
  description: string;
  neighborhoodId: string;
}

export interface ICreateQuestionAnswer {
  description: string;
  userId: string
  questionId: string;
}
