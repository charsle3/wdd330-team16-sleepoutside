async function loadAlerts() {
  try {
    // Fetch the JSON file (adjust path according to your folder structure)
    const response = await fetch("../json/alerts.json");
    if (!response.ok) throw new Error("Failed to fetch alerts.");
    
    const alerts = await response.json();
    const alertListContainer = document.getElementById("alert-list");

    if (alerts && alerts.length > 0) {
      alerts.forEach(alertData => {
        // Create the alert element
        const alertElement = document.createElement("p");
        alertElement.className = "custom-alert";
        alertElement.innerText = alertData.message;
        
        // Inline styles using JSON parameters
        alertElement.style.backgroundColor = alertData.background;
        alertElement.style.color = alertData.color || "#ffffff"; // Default text to white if not specified
        alertElement.style.padding = "10px";
        alertElement.style.margin = "0 0 10px 0";
        alertElement.style.textAlign = "center";
        alertElement.style.fontWeight = "bold";

        // Append to the container
        alertListContainer.appendChild(alertElement);
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Could not load alerts:", error);
  }
}

// Initialize the alert loader when the script executes
loadAlerts();