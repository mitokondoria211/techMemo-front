import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = axios.create({
  baseURL: BASE_URL, // SpringBoot API
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: BASE_URL, // SpringBoot API
  headers: {
    "Content-Type": "application/json",
  },
});

export const privateApi = axios.create({
  baseURL: BASE_URL, // SpringBoot API
  headers: {
    "Content-Type": "application/json",
  },
});

// リクエストインターセプターでトークンを自動付与
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// レスポンスインターセプター (401の場合にリフレッシュやlogin処理)
privateApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // 401かつ未リトライ
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        //refreshはapi使う
        const res = await api.post(
          "/auth/refresh-token",
          {},
          { withCredentials: true },
        );

        const newToken = res.data.accessToken;

        localStorage.setItem("accessToken", newToken);

        //ヘッダー更新
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        //再リクエスト（これが超重要）
        return privateApi(originalRequest);
      } catch {
        localStorage.removeItem("accessToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);
