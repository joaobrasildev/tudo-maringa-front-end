import { cityIdMock } from "../../mocks/city.mock";
import api from "../api.service";

export async function getNeighborhoods() {
    try {       
      const response = await api.get(`/neighborhoods?cityId=${cityIdMock}`);
      return response.data;
    } catch (error) {
        console.error('Erro ao buscar neighborhoods:', error);
        throw error;        
    }
}