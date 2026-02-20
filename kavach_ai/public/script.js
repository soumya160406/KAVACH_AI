// This function fetches data from the server and updates the HTML
async function fetchSystemStatus() {
    try {
        const response = await fetch('/api/status');
        const data = await response.json();

        // update sensor readings
        document.getElementById('h2s-val').innerText = data.sensors.h2s + ' ppm';
        document.getElementById('methane-val').innerText = data.sensors.methane + ' %';
        document.getElementById('oxygen-val').innerText = data.sensors.oxygen + ' %';

        // update AI decision box
        document.getElementById('permit-val').innerText = data.ai.permit;
        document.getElementById('status-val').innerText = data.ai.status;
        document.getElementById('score-val').innerText = data.ai.riskScore;

        // change colors based on danger or safe
        const decisionBox = document.getElementById('decision-box');
        if (data.ai.riskScore > 50) {
            decisionBox.className = "status-box danger";
        } else {
            decisionBox.className = "status-box safe";
        }

    } catch (error) {
        console.error("Error connecting to server:", error);
    }
}

fetchSystemStatus();
setInterval(fetchSystemStatus, 2000);