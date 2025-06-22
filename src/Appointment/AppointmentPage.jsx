import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import "./AppointmentPage.css";

// HospitalCard component defined here
const HospitalCard = ({
    name,
    distance,
    type,
    cost,
    address,
    hours,
    benefits,
    fee,
    appointmentLink,
    contact
}) => (
    <div className="hospital-card">
        <h3>{name}</h3>
        <p>Distance: {distance} km</p>
        <p>Type: {type}</p>
        <p>Cost: ₹{cost}</p>
        <p>Address: {address}</p>
        <p>Hours: {hours}</p>
        <p>Benefits: {benefits.join(', ')}</p>
        <p>Fee: ₹{fee}</p>
        <p>Contact: {contact}</p>
        <a href={appointmentLink} className="appointment-link">Book Appointment</a>
    </div>
);

const AppointmentPage = () => {
    const [filters, setFilters] = useState({
        distance: 50, // Set default distance to maximum
        type: '',
        cost: '',
        specification: '', // Add specification filter
    });
    const [hospitals, setHospitals] = useState([]);
    const [userCoordinates, setUserCoordinates] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // To track if there's any error in getting location

    // Fetch user's location when the component mounts
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setUserCoordinates({ latitude, longitude });
                },
                (err) => {
                    setError("Error fetching location. Please allow location access.");
                    setLoading(false);
                    console.error("Geolocation error:", err);
                }
            );
        } else {
            setError("Geolocation is not supported by your browser.");
            setLoading(false);
        }
    }, []);

    // Fetch hospitals from the backend once the user's location is available
    useEffect(() => {
        if (userCoordinates) {
            fetch(`http://localhost:5000/hospitals?latitude=${userCoordinates.latitude}&longitude=${userCoordinates.longitude}`)
                .then(response => response.json())
                .then(data => {
                    setHospitals(data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error("Error fetching hospitals:", error);
                    setLoading(false);
                });
        }
    }, [userCoordinates]);

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (name === 'type') {
            setFilters(prevFilters => ({
                ...prevFilters,
                type: checked ? value : ''
            }));
        } else {
            setFilters(prevFilters => ({
                ...prevFilters,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
    };

    const handleFilterSubmit = (e) => {
        e.preventDefault();
    };

    const filteredHospitals = hospitals.filter(hospital => {
        return (
            (filters.distance ? hospital.distance <= filters.distance : true) &&
            (filters.type ? hospital.type === filters.type : true) &&
            (filters.cost ? hospital.cost <= filters.cost : true) &&
            (filters.specification ? hospital.specification === filters.specification : true)
        );
    });

    return (
        <>
            <Navbar />
            <div className="appointment-page">
                <form className="filter-list" onSubmit={handleFilterSubmit}>
                    <h2>Filter by:</h2>

                    {/* Distance Filter */}
                    <div className="filter-section">
                        <h3>Distance</h3>
                        <input
                            type="range"
                            name="distance"
                            min="0"
                            max="50"
                            value={filters.distance}
                            onChange={handleFilterChange}
                        />
                        <div>0 - {filters.distance} km</div>
                    </div>

                    {/* Type Filter */}
                    <div className="filter-section">
                        <h3>Type</h3>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="public"
                                checked={filters.type === 'public'}
                                onChange={handleFilterChange}
                            />
                            Public
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="private"
                                checked={filters.type === 'private'}
                                onChange={handleFilterChange}
                            />
                            Private
                        </label>
                    </div>

                    {/* Cost Filter */}
                    <div className="filter-section">
                        <h3>Cost</h3>
                        <input
                            type="range"
                            name="cost"
                            min="0"
                            max="10000"
                            step="500"
                            value={filters.cost}
                            onChange={handleFilterChange}
                        />
                        <div>₹0 - ₹{filters.cost}</div>
                    </div>

                    {/* Specification Filter */}
                    <div className="filter-section">
                        <h3>Any Specification</h3>
                        <select
                            name="specification"
                            value={filters.specification}
                            onChange={handleFilterChange}
                        >
                            <option value="">Any</option>
                            <option value="General">General</option>
                            <option value="ENT">ENT</option>
                            <option value="Orthopedic">Orthopedic</option>
                            <option value="Dermatology">Dermatology</option>
                            <option value="Dental">Dental</option>
                            <option value="Gynaec">Gynaec</option>
                            <option value="Psychiatric">Psychiatric</option>
                        </select>
                    </div>

                    <button type="submit" className="filter-button">Apply Filters</button>
                </form>

                <div className="hospital-cards">
                    {loading ? (
                        <p>Loading hospitals...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : filteredHospitals.length > 0 ? (
                        filteredHospitals.map((hospital) => (
                            <HospitalCard
                                key={hospital.id}
                                name={hospital.name}
                                distance={hospital.distance}
                                type={hospital.type}
                                cost={hospital.cost}
                                address={hospital.address}
                                hours={hospital.hours}
                                benefits={hospital.benefits}
                                fee={hospital.fee}
                                appointmentLink={hospital.appointmentLink}
                                contact={hospital.contact}
                            />
                        ))
                    ) : (
                        <p>No hospitals match the selected filters.</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default AppointmentPage;
