const weatherElement = document.getElementById("weather");
const temperatureMainElement = document.getElementById("temperature-main");
const weatherDescriptionElement = document.getElementById("weather-description");
const weatherIconElement = document.getElementById("icon");
const temperatureElement = document.getElementById("temperature");
const humidityElement = document.getElementById("humidity");
const windSpeedElement = document.getElementById("wind-speed");
const countryElement = document.getElementById("country");
const form = document.getElementById("form");

const apikey = "772bceb2fe3b46d3d8ff3a3c96510ef3"; // Replace with your actual API key

form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission
    const city = document.getElementById("city").value; // Get city from input
    getWeather(city); // Fetch weather data for the city
});

function getWeather(city) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                alert("City not found. Please try again.");
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            const weather = data.weather[0].main;
            const description = data.weather[0].description;
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const country = data.sys.country;
            const town = data.name;

            // Update the UI with the fetched data
            weatherElement.innerText = weather;
            countryElement.innerText = `${town}, ${country}`;
            temperatureMainElement.innerText = `${temperature} °C`;
            weatherDescriptionElement.innerText = description;
            humidityElement.innerText = `${humidity}%`;
            windSpeedElement.innerText = `${windSpeed} m/s`;
            weatherIconElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`; // Set the weather icon

            // Show the weather details section if it's hidden
            document.getElementById("weather-result").classList.remove("hidden");
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}