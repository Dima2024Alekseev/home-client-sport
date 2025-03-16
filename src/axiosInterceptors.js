import axios from 'axios';

const setupAxiosInterceptors = (navigate) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        // Удаляем токены из локального хранилища
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isAuthenticated');

        // Перенаправляем на страницу авторизации
        navigate('/authorization-account');
      }
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptors;