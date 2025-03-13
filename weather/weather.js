document.addEventListener("DOMContentLoaded", function () {
    const weatherBox = document.getElementById("weather-box");
    const weatherData = document.getElementById("weather-data");

    const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=Phnom Penh&appid=386a3ffc8f880db6484edf7529155cb6&units=metric";

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const city = data.city.name;
            const todayWeather = data.list[0];

            // Show today's weather
            weatherBox.innerHTML = `
                <h2>${city} - Today</h2>
                <img src="https://openweathermap.org/img/wn/${todayWeather.weather[0].icon}.png" alt="Weather Icon">
                <p class="temp">${todayWeather.main.temp}°C</p>
                <p>${todayWeather.weather[0].description}</p>
                <p>Feels Like: ${todayWeather.main.feels_like}°C</p>
                <p>Humidity: ${todayWeather.main.humidity}%</p>
                <p>Wind Speed: ${todayWeather.wind.speed} m/s</p>
            `;

            let forecastData = {};
            
            // Get one forecast per day
            data.list.forEach(item => {
                const date = item.dt_txt.split(" ")[0]; // Get date only
                if (!forecastData[date]) {
                    forecastData[date] = item; // Store the first forecast of each day
                }
            });

            let forecastHTML = "";

            Object.values(forecastData).slice(1, 5).forEach(day => {
                forecastHTML += `
                    <div class="weather-card">
                        <h3>${day.dt_txt.split(" ")[0]}</h3>
                        <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="Weather Icon">
                        <p>${day.weather[0].description}</p>
                        <p>Temp: ${day.main.temp}°C</p>
                        <p>Humidity: ${day.main.humidity}%</p>
                    </div>
                `;
            });

            weatherData.innerHTML = forecastHTML;
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            weatherBox.innerHTML = "<p>Failed to load weather data.</p>";
            weatherData.innerHTML = "<p>Failed to load forecast.</p>";
        });
});
