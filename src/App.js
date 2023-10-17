import './App.css';
import React, { useEffect, useState } from 'react';
import Home from './components/home/Home';
import LoginForm from './components/login/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return (
    <Router>
    <div className="App">
    <Routes>
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/" /> : <LoginForm setIsAuthenticated={setIsAuthenticated} />
          }
        />
        <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
