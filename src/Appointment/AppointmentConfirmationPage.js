// src/components/AppointmentConfirmationPage.js

import React from 'react';
import './AppointmentConfirmationPage.css';
import Navbar from './Navbar'; // Assuming you're using the same navbar

const AppointmentConfirmationPage = () => {
  return (
    <div className="confirmation-container">
      <Navbar />
      <h2>Appointment Confirmed</h2>
      <p>Your appointment has been successfully booked. Please arrive 10 minutes earlier.</p>
      <button className='butt' onClick={() => window.location.href = '/'}>Go to Homepage</button>
    </div>
  );
};

export default AppointmentConfirmationPage;
