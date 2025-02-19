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
import {postAuthRefresh, getAuthMe} from '../api/memoring/auth';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface AuthContextProps {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: number | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isLoading: true,
  role: null,
  logout: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({children}: AuthProviderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState<number | null>(null);

  useEffect(() => {
    const verifyAuth = async () => {
      setIsLoading(true);
      const accessToken = await getToken();
      if (!accessToken) {
        const refreshResult = await handleRefresh();
        if (!refreshResult) {
          navigateToLogin(); // 액세스 토큰이 없고 리프레시도 실패한 경우
        }
        return;
      }
      try {
        const userData = await getAuthMe(); // 사용자 정보 가져오기
        setRole(userData.data.role);
        setIsAuthenticated(true);
        redirectBasedOnRole(userData.data.role);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        await removeToken();
        setIsAuthenticated(false);
        navigateToLogin(); // 사용자 정보 조회 실패 시 로그인 페이지로 이동
      }
      setIsLoading(false);
    };

    const handleRefresh = async (): Promise<boolean> => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return false;
      }
      try {
        const response = await postAuthRefresh(refreshToken);
        const newAccessToken = response.data.access_token;
        await saveToken(newAccessToken);
        // 새 토큰으로 사용자 정보 가져오기
        const userData = await getAuthMe();
        setRole(userData.data.role);
        setIsAuthenticated(true);
        redirectBasedOnRole(userData.data.role);
        return true;
      } catch (error) {
        // console.error('Refresh token expired or invalid:', error);
        await removeToken();
        setIsAuthenticated(false);
        navigateToLogin(); // 리프레시 토큰 갱신 실패 시 로그인 페이지로 이동
        return false;
      } finally {
        setIsLoading(false);
      }
    };

    const navigateToLogin = () => {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
    };

    const redirectBasedOnRole = (userRole: number | null) => {
      if (userRole === 0) {
        navigation.reset({index: 0, routes: [{name: 'LoginSelect'}]});
      } else if (userRole === 1) {
        navigation.reset({index: 0, routes: [{name: 'MemberHome'}]});
      } else if (userRole === 2) {
        navigation.reset({index: 0, routes: [{name: 'MainheroSelect'}]});
      }
    };

    verifyAuth();
  }, [navigation]);

  const logout = async () => {
    await removeToken();
    setIsAuthenticated(false);
    setRole(null);
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <AuthContext.Provider value={{isAuthenticated, isLoading, role, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
