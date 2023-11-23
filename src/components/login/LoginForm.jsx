import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginUI from './LoginUi';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess } from '../../redux/actions/authActions';
import { loginUser, logout } from '../../redux/slice/authSlice';

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

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(loginUser(formData))
  //   localStorage.setItem('isAuthenticated', 'true');
  //   console.log(isAuthenticated);
  // };

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate('/');
  //   }
  // }, [isAuthenticated, navigate]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData)).then((result) => {
      if (loginUser.fulfilled.match(result)) {
        // Redirect to '/'
        navigate('/');
      }
    });
  };


  return (
    <div className="login-page">
      <LoginUI formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
      {/* {isAuthenticated ? (
        navigate('/')
      ) : (
        <LoginUI formData={formData} handleInputChange={handleInputChange} handleSubmit={handleSubmit} error={error} />
      )} */}
    </div>
  );
};

export default LoginForm;