import { useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { loginUser, signupUser } from '../api/authApi';
import AuthContext from './authContextValue';

const defaultAuth = {
  user: null,
  token: null,
};

export function AuthProvider({ children }) {
  const [storedAuth, setStoredAuth] = useLocalStorage('wanderlog-auth', defaultAuth);
  const [theme, setTheme] = useLocalStorage('wanderlog-theme', 'light');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  const login = async (credentials) => {
    setAuthLoading(true);
    setAuthError('');

    try {
      const authData = await loginUser(credentials);
      const nextAuth = {
        user: authData.user,
        token: authData.token,
      };
      setStoredAuth(nextAuth);
      return authData;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to log in right now.';
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (credentials) => {
    setAuthLoading(true);
    setAuthError('');

    try {
      const authData = await signupUser(credentials);
      const nextAuth = {
        user: authData.user,
        token: authData.token,
      };
      setStoredAuth(nextAuth);
      return authData;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to sign up right now.';
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = () => {
    setStoredAuth(defaultAuth);
    setAuthError('');
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(
    () => ({
      login,
      logout,
      signup,
      isAuthenticated: Boolean(storedAuth?.token),
      user: storedAuth?.user,
      token: storedAuth?.token,
      theme,
      toggleTheme,
      authLoading,
      authError,
    }),
    [authLoading, authError, logout, signup, storedAuth, theme],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
