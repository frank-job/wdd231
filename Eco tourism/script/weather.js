
  async function fetchWeather() {
    const apiKey = "4e697b108c18e769b5c8deb14e8a8d8b"; // replace with your OpenWeatherMap key
    const city = "Jinja,UG";       // Jinja, Uganda
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const temp = data.main.temp;
      const desc = data.weather[0].description;
      const humidity = data.main.humidity;

      document.getElementById("weather-info").innerHTML =
        `🌤️ ${desc}, ${temp}°C, Humidity: ${humidity}%`;
    } catch (error) {
      document.getElementById("weather-info").innerHTML =
        "Unable to load weather data.";
    }
  }

  fetchWeather();

