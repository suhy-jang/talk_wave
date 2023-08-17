import jwtDecode from 'jwt-decode';
import { TOKEN_KEY } from './constants';
import { devError } from '../utils/devLog';

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) return null;

  try {
    const { exp } = jwtDecode(token);
    if (Date.now() >= exp * 1000) {
      removeToken();
      return null;
    }
    return token;
  } catch (error) {
    devError('Error decoding token: ', error);
    removeToken();
    return null;
  }
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
