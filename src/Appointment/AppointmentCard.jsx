import React from 'react';
import './AppointmentCard.css'; // Assuming you will write corresponding CSS

const HospitalCard = ({ name, distance, type, cost, address, hours, benefits, fee, appointmentLink, contact }) => {
    return (
        <div className="card-container">
            <div className="content-section">
                <h2 className="hospital-name">{name}</h2>
                <div className="location-info">
                    <span>{address}</span>
                </div>
                <div className="timing-info">
                    <p>Opening Hours: {hours}</p>
                </div>
                <ul className="benefits">
                    {benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            </div>
            <div className="contact-section">
                <div className="cost-info">
                    <span>Consultation Fee: ₹{fee}</span>
                </div>
                <a href={appointmentLink} className="appointment-link">Book an Appointment</a>
                <div className="contact-info">
                    Call: {contact}
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;
