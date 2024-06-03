import axios from "axios";
import { getContentType, saveToStorage } from "./api.helper";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: getContentType(),
  withCredentials: true,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "access_token"
  )}`;
  return config;
});

instance.interceptors.response.use(
  // в случае валидного access_token ничего не делаем:
  (config) => {
    return config;
  },
  // в случае просроченного access_token пытаемся его обновить:
  async (error) => {
    // предотвращаем зацикленный запрос, добавляя свойство _isRetry
    const originalRequest = { ...error.config };
    originalRequest._isRetry = true;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (refreshToken) {
          const response = await instance.post(
            "/auth/refresh",
            {},
            {
              headers: { Authorization: `Bearer ${refreshToken}` },
            }
          );

          saveToStorage(response.data);
          originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
          return instance.request(originalRequest);
        }
      } catch (error) {
        console.log("AUTH ERROR", error);
      }
    }
    // на случай, если возникла другая ошибка (не связанная с авторизацией)
    // пробросим эту ошибку
    throw error;
  }
);
