import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUi';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slice/authSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData));
      if (loginUser.fulfilled.match(result)) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <div className="login-page">
      <LoginUI formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default LoginForm;