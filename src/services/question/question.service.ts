import api from "../api.service";
import type { ICreateQuestion, ICreateQuestionAnswer } from "./question-service.interface";

export async function getQuestions() {
  try {       
    const response = await api.get('/questions');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar questions:', error);
    throw error;        
  }
}

export async function createQuestion(data: ICreateQuestion) {
  try {       
    const response = await api.post('/questions', data);
    return response.data;
  } catch (error) {
      console.error('Erro ao criar question:', error);
      throw error;        
  }
}

export async function createQuestionAnswer(questionAnswer: ICreateQuestionAnswer) {
    try {       
      const response = await api.post('/answer', questionAnswer);
      return response.data;
    } catch (error) {
        console.error('Erro ao criar question-answer:', error);
        throw error;        
    }
}