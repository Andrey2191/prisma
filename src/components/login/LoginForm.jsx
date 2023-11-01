import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUi';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!formData.username || !formData.password) {
        setError('Please fill out all fields.');
        return;
      }

      const response = await axios.post('https://plifal.tech/api/login', formData);

      if (response.status === 200 && response.data.session_token) {
        const sessionToken = response.data.session_token;
        localStorage.setItem('sessionToken', sessionToken);
      
      // Установить токен в заголовок Axios для всех будущих запросов
      axios.defaults.headers.common['Authorization'] = `${sessionToken}`;


        axios.defaults.headers.common['Authorization'] = `${sessionToken}`;
        dispatch(loginSuccess());
        console.log(response);
        navigate('/');
      } else {
        setError('Invalid credentials.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('Invalid credentials. Please check your username and password and try again.');
    }
  };

  return (
    <div className="login-page">
      <LoginUI formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default LoginForm;