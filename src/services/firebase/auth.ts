import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, FacebookAuthProvider, type User } from 'firebase/auth';
import { auth } from './firebase';

export async function loginWithEmail(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}

export async function getIdToken(forceRefresh = false): Promise<string> {
  const currentUser: User | null = auth.currentUser;

  if (!currentUser) {
    await waitForUserAuth(2000);
  }

  const user = auth.currentUser;
  if (!user) throw new Error('Usuário não autenticado no Firebase Client');

  return await user.getIdToken(forceRefresh);
}

export async function getValidToken(): Promise<string> {
  const token = localStorage.getItem('token');

  if (token) {
    return token;
  }

  const user = auth.currentUser;
  if (user) {
    const newToken = await user.getIdToken();
    localStorage.setItem('token', newToken);
    return newToken;
  }

  throw new Error('Usuário não autenticado');
}

async function waitForUserAuth(timeoutMs: number): Promise<void> {
  const intervalMs = 100;
  let waited = 0;

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (auth.currentUser) {
        clearInterval(interval);
        resolve();
      } else if (waited >= timeoutMs) {
        clearInterval(interval);
        reject(new Error('Timeout: Firebase Auth não inicializou o currentUser'));
      }
      waited += intervalMs;
    }, intervalMs);
  });
}

export async function loginWithFacebook() {
  const provider = new FacebookAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result.user;
}