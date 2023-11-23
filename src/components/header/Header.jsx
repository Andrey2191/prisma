import React from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';
import logo from '../../assets/images/logo.svg'
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slice/authSlice';


const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const handleLogout = () => {
        dispatch(logout());
        // Redirect to '/login'
        navigate('/login');
      };


    return (
        <div className="header-container">
            <div className="logo-container">
                <img src={logo} alt="logo" />
            </div>
            <div className="logout-button">
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
}

export default Header;