import './App.css';
import React from 'react';
import Home from './components/home/Home';
import LoginForm from './components/login/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Inbox from './components/inbox/Inbox';
import axios from 'axios';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const sessionToken = sessionStorage.getItem('sessionToken');
  axios.defaults.headers.common['Authorization'] = `${sessionToken}`;
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <LoginForm />}
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Home />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path='/inbox/:id' element={<Inbox />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
