import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../Components/NotificationContext';
import "../styles/profile.css";
import Header from "../Components/Header";
import Form from "../Components/Form";
import Footer from "../Components/Footer/Footer";

const Authorization = () => {
  const [error, setError] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post('/api/admin/login', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('isAuthenticated', 'true');
      showNotification('Успешный вход!', 'success');
      navigate('/admin-dashboard');
    } catch (error) {
      setError(error.response?.data?.error || '');
      showNotification('Ошибка авторизации', 'error');
    }
  };

  return (
    <div id="inner" className="authorization-page">
      <Header title='Авторизация аккаунта' />
      <main className="form-authorization">
        <Form
          showFields={{ login: true, password: true }}
          formTitle='Авторизация'
          title_button='Войти'
          onSubmit={handleSubmit}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </main>
      <Footer />
    </div>
  );
};

export default Authorization;
