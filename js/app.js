const KEY = "e0fe38075f29f6a779c361a81a45b1fa";

const getData = async (city) => {
  const base = "https://api.openweathermap.org/data/2.5/weather";
  const query = `?q=${city}&units=metric&appid=${KEY}`;

  try {
    const req = await fetch(base + query);
    
    if (!req.ok) {
      throw new Error("City not found");
    }

    const data = await req.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return null;
  }
};

const displayWeather = async (city) => {
  const weatherData = await getData(city);

  if (weatherData && weatherData.cod === 200) {
    document.getElementById("card").classList.remove("d-none");
    document.getElementById("overlay").classList.add("d-none");

    document.querySelector("#details h5").textContent = weatherData.name;

    document.querySelector("#details p").textContent = weatherData.weather[0].main;

    document.querySelector("#details .display-4 span").textContent = weatherData.main.temp;

    const icon = weatherData.weather[0].icon;
    const description = weatherData.weather[0].description;
    document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${icon}.png`;
    document.getElementById("weather-icon").alt = description;

  } else {
    alert("Unable to fetch weather data. Please try a valid city.");
    document.getElementById("card").classList.add("d-none");
  }
};

document.getElementById("change-location").addEventListener("submit", (e) => {
  e.preventDefault();
  
  const city = e.target.city.value.trim();
  document.getElementById("overlay").classList.remove("d-none");

  displayWeather(city);
  e.target.reset();
});

window.addEventListener("load", () => {
  document.getElementById("overlay").classList.add("d-none");
});
