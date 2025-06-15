import { api } from "./api.service";

export async function getPosts() {
    try {       
      const response = await api.get('/post/pending');
      console.info(response.data)
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;        
    }
}