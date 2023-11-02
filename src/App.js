import './App.css';
import React from 'react';
import Home from './components/home/Home';
import LoginForm from './components/login/LoginForm';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Inbox from './components/inbox/Inbox';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log(isAuthenticated);
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" /> : <LoginForm />
            }
          />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path='/inbox/:id' element={<Inbox/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
