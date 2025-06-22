// User.jsx
import React from 'react';
import { useLocation } from 'react-router-dom';
import './User.css';
import Navbar from './Navbar';  // Import the Navbar component

function User() {
  const location = useLocation();
  const { name } = location.state || { name: 'User' };

  return (
    <>
      <Navbar userName={name} />  {/* Include the Navbar component */}
      
      <div className="user-container">
        <h1>Welcome, {name}</h1>
        <div className="user-profile-info">
          {/* Profile info */}
        </div>
      </div>
    </>
  );
}

export default User;
