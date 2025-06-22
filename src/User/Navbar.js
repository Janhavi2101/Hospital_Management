import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logo from './logo.png';
import axios from 'axios';

const Navbar = ({ userName }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (userName) {
      const fetchProfilePic = async () => {
        try {
          // Fetch user profile data from the backend, which includes profile photo path
          const response = await axios.get(`http://localhost:5000/profile?userName=${encodeURIComponent(userName)}`);
          
          // Assume that the profile photo path is stored in response.data.profilePhoto
          const profilePhotoPath = response.data.profilePhoto;

          if (profilePhotoPath) {
            // Full URL for the profile photo
            const imageUrl = `http://localhost:5000/${profilePhotoPath}`;
            setProfilePic(imageUrl);
          }
        } catch (error) {
          console.error('Error fetching the profile picture:', error);
        }
      };

      fetchProfilePic();
    }
  }, [userName]);

  const toggleProfileMenu = () => {
    if (window.innerWidth < 769) {
      setMobileMenuOpen(true);
    } else {
      setProfileMenuOpen(!profileMenuOpen);
    }
  };

  const closeMenu = () => {
    setProfileMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="user-navbar">
      <a className="user-navbar-brand" href="#">
        <img src={logo} alt="Logo" className="user-navbar-logo" />
        <span className="user-navbar-title">HOSPITAL MANAGEMENT SYSTEM</span>
      </a>
      <ul className="user-nav-links">
        <li>
          <NavLink className="nav-link" to="/user">Home</NavLink>
        </li>
        <li>
          <NavLink className="nav-link" to="/book-appointment">Book an Appointment</NavLink>
        </li>
      </ul>
      <div className={`user-profile-toggle ${window.innerWidth < 769 ? 'mobile' : ''}`}>
        <img
          src={profilePic || logo}  // Use profilePic if available, otherwise fallback to logo
          alt="Profile Picture"
          className="user-profile-pic"
          onClick={toggleProfileMenu}
        />
        {window.innerWidth >= 769 && (
          <div
            className={`user-profile-dropdown ${profileMenuOpen ? 'show' : ''}`}
            onMouseLeave={() => setProfileMenuOpen(false)}
          >
            <NavLink to="/account" className="user-dropdown-item" onClick={closeMenu}>Profile</NavLink>
            <NavLink to="/" className="user-dropdown-item" onClick={closeMenu}>Log Out</NavLink>
          </div>
        )}
      </div>
      <div className={`user-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <button className="user-close-btn" onClick={closeMenu}>×</button>
        <ul className="user-mobile-nav-links">
          <li><NavLink to="/" onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="/book-appointment" onClick={closeMenu}>Book an Appointment</NavLink></li>
          <li><NavLink to="/account" onClick={closeMenu}>Profile</NavLink></li>
          <li><NavLink to="/" onClick={closeMenu}>Log Out</NavLink></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
