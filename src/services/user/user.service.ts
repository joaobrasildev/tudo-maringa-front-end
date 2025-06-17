import { api } from "../api.service";


export async function getPosts() {
    try {       
      const response = await api.get('/user');
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;        
    }
}