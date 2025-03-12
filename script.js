const API_URL = "https://api.openweathermap.org/data/2.5/weather?q=Phnom%20Penh&appid=386a3ffc8f880db6484edf7529155cb6&units=metric";

// Function to fetch and display weather data
function fetchWeather() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Debugging: Check API response

            // Extract weather details
            const dateTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Phnom_Penh" }); // Real-time Phnom Penh time
            const temp = data.main.temp;
            const desc = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;
            const iconCode = data.weather[0].icon;
            const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

            document.getElementById("date-time").innerText = `Date & Time: ${dateTime}`;
            document.getElementById("temperature").innerText = `${temp}°C`;
            document.getElementById("description").innerText = `Condition: ${desc}`;
            document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
            document.getElementById("wind").innerText = `Wind Speed: ${windSpeed} m/s`;
            document.getElementById("weather-icon").src = iconURL;
        })
        .catch(error => console.error("Error fetching weather data:", error));
}

// Update weather every 10 seconds
fetchWeather(); // Initial fetch
setInterval(fetchWeather, 10000);
