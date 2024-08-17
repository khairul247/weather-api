const API_KEY = "ZJ2DT5UP9XN8KAGHYB4J6ANXM";
const defaultUnit = "metric";
const BASE_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

const inputElement = document.querySelector("input");

async function getWeatherData(location = "Kota Kinabalu") {
  try {
    location = inputElement.value || "Kota Kinabalu";
    const url = `${BASE_URL}${location}?unitGroup=${defaultUnit}&key=${API_KEY}&contentType=json`;
    const response = await fetch(url, { method: "GET", headers: {} });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather data", error);
  }
}

function processWeather(data) {
  const currentConditions = data.currentConditions;
  console.log(currentConditions);
  return {
    location: data.resolvedAddress,
    temperature: currentConditions.temp,
    description: currentConditions.conditions,
    icon: currentConditions.icon,
    humidity: currentConditions.humidity,
    windSpeed: currentConditions.windspeed,
    feelsLike: currentConditions.feelslike,
  };
}

function displayData(data) {
  const placeName = document.querySelector("h2");
  const temp = document.querySelector("h1");
  const description = document.querySelector("p");
  const feelsLike = document.querySelector(".feels-like");
  const wind = document.querySelector(".wind");

  placeName.textContent = data.location;
  temp.textContent = `${data.temperature} °C`;
  description.textContent = data.description;
  feelsLike.textContent = `${data.feelsLike} °C`;
  wind.textContent = `${data.windSpeed} KM/H`;
}

async function updateWeatherData() {
  const data = await getWeatherData();
  const weatherData = processWeather(data);
  displayData(weatherData);
  console.log(weatherData);
}

updateWeatherData();
inputElement.addEventListener("change", updateWeatherData);
