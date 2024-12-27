import React, { useState } from 'react';
import './RegistraionPage.css';  // Import the custom CSS file
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const RegistrationPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    gender: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner
    // Simulate an asynchronous login process
    setTimeout(() => {
      // Handle login logic here
      setLoading(false); // Stop loading spinner
      navigate("/login");
    }, 2000); 
  };

  if (loading) {
    return (
      <div className="loading-container">
        <ClipLoader color="#36d7b7" size={50} />
        <p>Loading...</p>
      </div>
    );
  }


  return (
    <div className="registration-container">
      <div className="registration-box">
        <h3 className="registration-title">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className="btn-register">Register</button>
          <div className="login-link">
            <small>
              Already have an account? <Link to= "/login">Signin</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
