import type { User } from "firebase/auth";

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  getFreshToken: () => Promise<string | null>;
  logout: () => Promise<void>;
}