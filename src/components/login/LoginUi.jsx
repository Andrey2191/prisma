import React from 'react';
import './login.css'
import logo from '../../assets/images/logo.svg'

const LoginUI = ({ formData, handleInputChange, handleSubmit, error }) => {
  return (
    <div className="login-form">
      <img src={logo} alt="Logo" className="logo" />
      {error && <div className="error-message">{error.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="username"
            name="username"
            placeholder='Username'
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className='login-btn' type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default LoginUI;