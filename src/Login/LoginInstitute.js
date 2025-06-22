import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginInstitute.css';
import Navbar from '../Navbar/Navbar';

function LoginInstitute() {
  const [instituteId, setInstituteId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login/institute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ instituteId, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Save the token and redirect or do other necessary actions
        console.log('Login successful:', data);
        navigate('/inventory'); // Replace with the correct route after login
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Login failed. Please check your Institute ID and Password.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h2>Login as Institute</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Institute ID"
              value={instituteId}
              onChange={(e) => setInstituteId(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginInstitute;
