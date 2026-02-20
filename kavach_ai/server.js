const express = require('express');
const { analyzeRisk } = require('./threatEngine');

const app = express();
app.use(express.json());

app.use(express.static('public'));

let sensorData = {
    h2s: 2,       // current H2S level
    methane: 1,   // current Methane level
    oxygen: 20.9  // current Oxygen level
};

// api endpoint for the frontend to get data
app.get('/api/status', (req, res) => {
    // calculate the risk using your threatEngine
    const riskAnalysis = analyzeRisk(sensorData.h2s, sensorData.methane);
    
    // Send data back to the website
    res.json({
        sensors: sensorData,
        ai: riskAnalysis
    });
});

// api endpoint for iot hardware (ESP32) to send data
app.post('/api/update-sensors', (req, res) => {
    sensorData.h2s = req.body.h2s || sensorData.h2s;
    sensorData.methane = req.body.methane || sensorData.methane;
    sensorData.oxygen = req.body.oxygen || sensorData.oxygen;
    
    console.log("Hardware Update Received:", sensorData);
    res.json({ message: "Data received successfully!" });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Kavach AI Server running at: http://localhost:${PORT}`);
});