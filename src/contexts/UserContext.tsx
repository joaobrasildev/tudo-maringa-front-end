import { createContext, useState, useContext, type ReactNode,  } from 'react';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  neighborhood: string;
  neighborhoodId: string;
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser precisa estar dentro de UserProvider');
  }
  return context;
};
