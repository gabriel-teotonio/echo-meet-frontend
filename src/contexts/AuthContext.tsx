import { createContext, useContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

interface User {
  user_id: string;
  access_token: string;
  user_type: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface IChildren {
  children: ReactNode;
}

// const getUserLocalStorage = () => {
//   const user_id = localStorage.getItem('user_id');
//   const token = localStorage.getItem('token');
//   const user_type = localStorage.getItem('user_type');
//   if (user_id && token && user_type) {
//     return { id: user_id, token, user_type };
//   }
//   return null;
// }


export const AuthProvider= ({ children }: IChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);


  const login = async (username: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post<User>('http://45.169.29.120:8000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Armazena no estado
      const { user_id, access_token, user_type } = response.data;
      setUser({ user_id, access_token, user_type });

      // Armazena no localStorage
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('token', access_token);
      localStorage.setItem('user_type', user_type);

    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove os dados do usuário do estado e localStorage
    setUser(null);
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
