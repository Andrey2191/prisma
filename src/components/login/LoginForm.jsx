import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUi';
import axios from 'axios';

const LoginForm = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://plifal.tech/api/login', formData);

      if (response.status === 200) {
        console.log('Вход выполнен успешно');
        const { session_token } = response.data;

        localStorage.setItem('sessionToken', session_token);

        setIsAuthenticated(true);

        navigate('/');
      } else {
        console.error('Ошибка входа');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return <LoginUI formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} />;
};

export default LoginForm;