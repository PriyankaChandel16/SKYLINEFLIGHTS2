// Logout function
function logout() {
  localStorage.removeItem("authToken");
  window.location.href = "login.html"; // Redirect to login page
}

// Function to simulate searching for flights
document.getElementById("create-flight").addEventListener("click", async () => {
  let countryFrom = document.getElementById("country-from").value;
  let countryTo = document.getElementById("country-to").value;
  let departureDate = document.getElementById("departure-date").value;
  let arrivalDate = document.getElementById("arrival-date").value;
  let price = document.getElementById("price").value;

  // Validate input
  if (!countryFrom || !countryTo || !departureDate || !arrivalDate || !price) {
    alert("Please fill all required fields!");
    return;
  }

  const response = await fetch("http://localhost:8001/flights", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },

    body: JSON.stringify({
      origin: countryFrom,
      destination: countryTo,
      arrival_date: arrivalDate,
      departure_date: departureDate,
      price,
    }),
  });

  const data = await response.json();
});
