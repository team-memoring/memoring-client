import axios from 'axios';
import Config from 'react-native-config';
import {
  getToken,
  getRefreshToken,
  saveToken,
  removeToken,
} from '../../utils/storage';
import {postAuthRefresh} from './auth';

const apiClient = axios.create({
  baseURL: Config.API_BASE_URL, // FastAPI 서버 주소
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터: Access Token 자동 추가
apiClient.interceptors.request.use(
  async config => {
    const token = await getToken(); // 저장된 access token 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// 응답 인터셉터: Access Token 만료 시 자동 갱신
apiClient.interceptors.response.use(
  response => response, // 정상 응답 시 그대로 반환
  async error => {
    const originalRequest = error.config;

    // 401 Unauthorized → Access Token 만료
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 루프 방지

      try {
        const refreshToken = await getRefreshToken();
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await postAuthRefresh(refreshToken);
        const newAccessToken = response.data.access_token;

        await saveToken(newAccessToken); // 새 access token 저장
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest); // 기존 요청 다시 실행
      } catch (refreshError) {
        console.error('Refresh token expired:', refreshError);
        await removeToken(); // 저장된 모든 토큰 삭제
      }
    }

    return Promise.reject(error);
  },
);

export default apiClient;
