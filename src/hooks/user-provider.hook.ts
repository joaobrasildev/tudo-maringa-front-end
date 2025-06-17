// import { createContext, useContext, useEffect, useState } from 'react';
// import { getIdToken } from '../services/firebase/auth';
// import { getUserProfile } from '../services/firebase/userApi';  // Função que chama seu back-end

// const UserContext = createContext(null);

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const token = await getIdToken();
//         const profile = await getUserProfile(token);  // Aqui você bate no seu back-end
//         setUser(profile);
//       } catch (error) {
//         console.error('Erro ao carregar perfil do usuário:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUser();
//   }, []);

//   return (
//     <UserContext.Provider value={{ user, loading }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => useContext(UserContext);
