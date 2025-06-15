import { api } from "../api.service";
import type { ICreatePostAnswer } from "./post-service.insterface";

export async function getPosts() {
    try {       
      const response = await api.get('/post/pending');
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;        
    }
}

export async function createPostAnswer(postAnswer: ICreatePostAnswer) {
    try {       
      const response = await api.post('/post-answer', postAnswer);
      return response.data;
    } catch (error) {
        console.error('Erro ao criar post-answer:', error);
        throw error;        
    }
}