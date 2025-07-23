const API_KEY = "3892977cd8fae9d8afadedc2db8ede8f"; // Replace with your OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const mapFrame = document.getElementById("mapFrame");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    weatherResult.textContent = "Please enter a city name.";
    return;
  }

  // Set map frame (Google Maps with traffic)
  const mapURL = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIsItcEk7axbq8-naLEnXbKBKYdM45kys&q=${encodeURIComponent(city)}&zoom=12`;
  mapFrame.src = mapURL;

  // Weather API call
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        weatherResult.textContent = "City not found.";
      } else {
        weatherResult.innerHTML = `
          <p><strong>${data.name}, ${data.sys.country}</strong></p>
          <p>🌡️ Temperature: ${data.main.temp} °C</p>
          <p>☁️ Weather: ${data.weather[0].description}</p>
          <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        `;
      }
    })
    .catch(() => {
      weatherResult.textContent = "Could not fetch weather data.";
    });
});

// Autocomplete city list
const cities = ["London", "New York", "Tokyo", "Mumbai", "Coimbatore", "Chennai", "Sydney", "Paris", "Dubai", "Singapore", "Toronto", "San Francisco"];
new Awesomplete(cityInput, {
  list: cities,
  minChars: 1,
  maxItems: 10,
  autoFirst: true
});