import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from 'react';

import {
  getToken,
  getRefreshToken,
  saveToken,
  removeToken,
} from '../utils/storage';

import {postAuthRefresh} from '../api/memoring/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);

      const accessToken = await getToken();
      if (!accessToken) {
        await handleRefresh();
        return;
      }

      setIsAuthenticated(true);
      setIsLoading(false);
    };

    const handleRefresh = async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      try {
        const response = await postAuthRefresh(refreshToken);
        const newAccessToken = response.data.access_token;
        await saveToken(newAccessToken);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Refresh token expired or invalid:', error);
        await removeToken();
        setIsAuthenticated(false);
      }

      setIsLoading(false);
    };

    verifyAuth();
  }, []);

  const logout = async () => {
    await removeToken();
    setIsAuthenticated(false);
    // 네비게이션 호출 제거
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, isLoading, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
