import './App.css';
import React from 'react';
import Home from './components/home/Home';
import LoginForm from './components/login/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { useSelector } from 'react-redux';


function App() {


  const issAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(issAuthenticated);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              issAuthenticated ? <Navigate to="/" /> : <LoginForm />
            }
          />
          <Route path="/" element={issAuthenticated ? <Home /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
