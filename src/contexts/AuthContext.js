import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { getToken, removeToken } from '../utils/auth';
import axiosInstance from '../utils/axiosInstance';

const AuthContext = createContext({
  user: null,
  isLoading: true,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const removeUser = () => {
    removeToken();
    setUser(null);
  };

  const verifyToken = useCallback(async (token) => {
    try {
      const res = await axiosInstance.post('/auth/verify', { token });

      if (res.data.isValid) {
        setUser(res.data.user);
      } else {
        removeUser();
      }
    } catch (error) {
      removeUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      verifyToken(token);
    } else {
      setIsLoading(false);
    }
  }, [verifyToken]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
