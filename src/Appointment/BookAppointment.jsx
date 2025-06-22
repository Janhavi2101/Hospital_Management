// src/components/AppointmentPage.js

import React, { useState } from 'react';
import './BookAppointment.css';
import Navbar from './Navbar';  // Assuming you're using the same navbar

const BookAppointment = () => {
  const [appointmentDetails, setAppointmentDetails] = useState({
    patientName: '',
    date: '',
    time: '',
    doctor: '',
    symptoms: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({ ...appointmentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle appointment booking, perhaps send data to the backend
    console.log('Appointment Details:', appointmentDetails);
    // Redirect to AppointmentConfirmationPage
    window.location.href = '/appointment-confirmation';
  };

  return (
    <div className="appointment-container">
      <Navbar />
      <h2>Book an Appointment</h2>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <label>
          Patient Name:
          <input 
            type="text" 
            name="patientName" 
            value={appointmentDetails.patientName} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Date:
          <input 
            type="date" 
            name="date" 
            value={appointmentDetails.date} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Time:
          <input 
            type="time" 
            name="time" 
            value={appointmentDetails.time} 
            onChange={handleChange} 
            required 
          />
        </label>
        <label>
          Select Doctor:
          <select 
            name="doctor" 
            value={appointmentDetails.doctor} 
            onChange={handleChange} 
            required
          >
            <option value="">Choose a doctor</option>
            <option value="Dr. Smith">Dr. Smith</option>
            <option value="Dr. Johnson">Dr. Johnson</option>
            <option value="Dr. Emily">Dr. Emily</option>
          </select>
        </label>
        <label>
          Symptoms/Notes:
          <textarea 
            name="symptoms" 
            value={appointmentDetails.symptoms} 
            onChange={handleChange} 
            required 
          />
        </label>
        <button className='buttt' type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default BookAppointment;
