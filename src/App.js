import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext'; // Assuming you have this context
import Home from './Navigation/Home';
import Prediction from './Prediction/Prediction';
import Login from './Authentication/Login';
import Suggestion from './Suggetion/Suggetion';
import RegistrationPage from './Authentication/RegistrationPage';

function App() {
  return (
    <AuthProvider>  
      <Router>
        <Routes>
        <Route path="/" element={<Login />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/login" element={<Login />} />
          <Route path="/suggestion" element={<Suggestion />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
