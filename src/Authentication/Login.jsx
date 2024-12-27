import React, { useState } from 'react';
import './Login.css';  // Import the custom CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner
    // Simulate an asynchronous login process
    setTimeout(() => {
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);
      login({ email, password });
      setLoading(false); // Stop loading spinner
      navigate("/dashboard");
    }, 2000); 
  };


  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#36d7b7" size={50} />
        <p>Logging in...</p>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h3 className="login-title">Login</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
          <div className="signup-link">
            <small>
              Don't have an account? <Link to= "/registration">Signup</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
