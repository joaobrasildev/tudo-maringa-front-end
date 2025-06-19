import axios from 'axios';
import { auth } from './firebase/firebase.service';
import { getIdToken, type User } from 'firebase/auth';

const api = axios.create({
  baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:3001'
});

api.interceptors.request.use(async (config) => {
  return new Promise(async (resolve) => {
    const waitForAuth = () =>
      new Promise<User | null>((resolveUser) => {
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
          unsubscribe();
          resolveUser(firebaseUser);
        });
      });

    const user = auth.currentUser || (await waitForAuth());

    if (user) {
      const token = await getIdToken(user);
      config.headers.Authorization = `Bearer ${token}`;
    }

    resolve(config);
  });
});

export default api;