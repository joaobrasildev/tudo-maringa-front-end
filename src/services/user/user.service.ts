import api from "../api.service";


export async function getUserByUid() {
  try {    
    const response = await api.post('/users/me');
    return response.data;
  } catch (error) {
      console.error('Erro ao buscar user by token:', error);
      throw error;        
  }
}

export async function createUser(formData: FormData) {
  try {
    const response = await api.post('/users', formData);

    return response.data;
  } catch (error) {
      console.error('Erro ao buscar user by token:', error);
      throw error;        
  }
}