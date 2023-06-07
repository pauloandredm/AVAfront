import axios from 'axios';
import API_BASE_URL from './components/ApiConfig';


// Crie uma instância do Axios com os interceptores configurados
const instance = axios.create();

instance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refresh_token = localStorage.getItem('refresh_token');
      console.log('pegando refresh token');

      if (refresh_token) {
        try {
          const response = await axios.post(`${API_BASE_URL}/token/refresh/`, {
            refresh: refresh_token,
          });

          const access_token = response.data.access;

          localStorage.setItem('access_token', access_token);

          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          console.log('mudando os tokens e tralalala');

          return instance(originalRequest); // Use a instância configurada para fazer a requisição
        } catch (refreshError) {
          // Lidar com erro de renovação do token
        }
      } else {
        // Lidar com a ausência do refresh token
      }
    }

    return Promise.reject(error);
  }
);

// Exporte a instância configurada
export default instance;
