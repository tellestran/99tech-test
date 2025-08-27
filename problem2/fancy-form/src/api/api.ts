import axios from 'axios';

const api = axios.create({
  baseURL: 'https://interview.switcheo.com/',
  timeout: 8000,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (res) => res,
  (error) => {
    console.error('API error:', error);
    return Promise.reject(error);
  },
);

export default api;
