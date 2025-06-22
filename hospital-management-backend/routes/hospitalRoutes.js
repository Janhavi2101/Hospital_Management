const express = require('express');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const router = express.Router();
const haversine = require('haversine-distance');

// Haversine formula to calculate the distance between two points
function calculateDistance(userCoords, hospitalCoords) {
    const userLatLng = { latitude: userCoords.latitude, longitude: userCoords.longitude };
    const hospitalLatLng = { latitude: hospitalCoords.latitude, longitude: hospitalCoords.longitude };
    return haversine(userLatLng, hospitalLatLng) / 1000; // Distance in kilometers
}

// Define the route to fetch hospital data
router.get('/hospitals', (req, res) => {
    console.log("Hospital route hit");

    // Extract user coordinates
    const userLatitude = parseFloat(req.query.latitude);
    const userLongitude = parseFloat(req.query.longitude);

    if (isNaN(userLatitude) || isNaN(userLongitude)) {
        console.error("Invalid latitude or longitude parameters.");
        return res.status(400).json({ message: 'Invalid latitude or longitude parameters.' });
    }

    const userCoords = { latitude: userLatitude, longitude: userLongitude };
    const hospitalData = [];
    const filePath = path.join(__dirname, '../hospital.csv');

    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
            try {
                // Handle missing or malformed 'Location_Coordinates' data
                const locationCoords = row.Location_Coordinates;
                if (!locationCoords) return;

                const [lat, lon] = locationCoords.split(',').map(coord => parseFloat(coord));
                if (isNaN(lat) || isNaN(lon)) return;

                const hospitalCoords = { latitude: lat, longitude: lon };
                const distance = calculateDistance(userCoords, hospitalCoords);

                // Add hospital data
                hospitalData.push({
                    name: row.Hospital_Name,
                    distance: distance.toFixed(2),
                    type: row.Hospital_Category,
                    cost: row.Tariff_Range || 'N/A',
                    address: row.Address_Original_First_Line,
                    hours: "9 AM - 5 PM", // Static for now, update based on real data
                    benefits: ['24/7 Emergency', 'Pharmacy'], // Dummy data, adjust as needed
                    fee: row.Tariff_Range || '500', // Update with actual cost if available
                    appointmentLink: './appointment-reg',
                    contact: row.Mobile_Number || row.Telephone || 'N/A'
                });
            } catch (err) {
                console.error("Error processing row:", err);
            }
        })
        .on('end', () => {
            // Sort hospitals by distance
            const sortedHospitals = hospitalData.sort((a, b) => a.distance - b.distance);
            console.log("Sending response:", sortedHospitals);
            res.json(sortedHospitals);
        })
        .on('error', (err) => {
            console.error("Error reading the CSV file:", err);
            res.status(500).json({ message: 'Error fetching hospital data' });
        });
});

module.exports = router;
