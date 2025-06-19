import { api } from "../api.service";
import { getValidToken } from "../firebase/auth";


export async function getUserByUid() {
    try {       
      const token = await getValidToken();
      const response = await api.post('/users/me', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar user by token:', error);
        throw error;        
    }
}

export async function createUser(formData: FormData) {
    try {
      const token = await getValidToken()       
      const response = await api.post('/users', formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data;
    } catch (error) {
        console.error('Erro ao buscar user by token:', error);
        throw error;        
    }
}