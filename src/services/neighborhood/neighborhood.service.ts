import { api } from "../api.service";

export async function getNeighborhoods() {
    try {       
      const response = await api.get('/neighborhoods?cityId=00c818c8-c6cf-4d3d-9c13-f65d0a9de03c');
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar neighborhoods:', error);
        throw error;        
    }
}