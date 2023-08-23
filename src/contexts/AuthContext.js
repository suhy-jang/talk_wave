import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from 'react';
import { getToken, removeToken } from '../utils/auth';
import apiRequest from '../utils/apiRequest';
import { useVisibilityChange } from '../hooks/useVisibilityChange';

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

  const handleTokenVerification = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setIsLoading(false);
      removeUser();
      return;
    }
    try {
      const data = await apiRequest('post', '/auth/verify', { token });

      if (data.isValid) {
        setUser(data.user);
      } else {
        throw new Error('not valid');
      }
    } catch (error) {
      removeUser();
    } finally {
      setIsLoading(false);
    }
  }, []);

  useVisibilityChange(handleTokenVerification);

  useEffect(() => {
    handleTokenVerification();
    return;
  }, [handleTokenVerification]);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
