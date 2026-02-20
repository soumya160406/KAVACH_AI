// This file analyzes the gas levels and returns a safety decision

function analyzeRisk(h2s, methane) {
    // if H2S is > 10ppm or Methane is > 5%, trigger danger
    if (h2s > 10 || methane > 5) {
        return {
            riskScore: 95,
            status: "DANGER - TOXIC GAS DETECTED",
            permit: "REJECTED (NO-GO)"
        };
    } else {
        return {
            riskScore: 12,
            status: "SAFE FOR ENTRY",
            permit: "APPROVED (GO)"
        };
    }
}

module.exports = { analyzeRisk };