//Location search
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", callApi);

//Call API
function searchLocation(cityName) {
  let units = `metric`;
  let apiKey = `c03834cf1345f1efcc7cef1a8984136b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showResponse);
}

function callApi(event) {
  event.preventDefault();
  let cityName = document.querySelector("#location").value;
  searchLocation(cityName);
}

//Descripyion
const capitalize = (s) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

//Temperature in given location
function showResponse(response) {
  console.log(response.data);
  let cityElement = document.querySelector("#city");
  let city = response.data.name;
  cityElement.innerHTML = city;

  let tempElement = document.querySelector("#current-temperature");
  let temperature = Math.round(response.data.main.temp);
  tempElement.innerHTML = `${temperature}`;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = description;

  let tempMax = document.querySelector("#max");
  let maximum = `${Math.round(response.data.main.temp_max)}°`;
  tempMax.innerHTML = maximum;

  let tempMin = document.querySelector("#min");
  let minimum = `${Math.round(response.data.main.temp_min)}°`;
  tempMin.innerHTML = minimum;
}

//Time and Date
function formatDate() {
  let now = new Date();
  let currentHours = now.getHours();
  currentHours = ("0" + currentHours).slice(-2);
  let currentMinutes = now.getMinutes();
  currentMinutes = ("0" + currentMinutes).slice(-2);

  let currentDate = now.getDate();

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let date = `Last updated: ${currentHours}:${currentMinutes} ${day} ${currentDate} ${month}`;
  return date;
}

let dateLive = document.querySelector("#date");
dateLive.innerHTML = formatDate();

//Current location
let useCurrentLocationButton = document.querySelector("#use-current-location");
useCurrentLocationButton.addEventListener("click", useCurrentLocation);

function useCurrentLocation() {
  //event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  let apiKey = `c03834cf1345f1efcc7cef1a8984136b`;
  axios
    .get(`${apiUrl}&appid=${apiKey}`)
    .then(showTemperature)
    .then(showCurrentLocation);
}
//On load
//navigator.geolocation.getCurrentPosition(handlePosition);
useCurrentLocation();

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  yourTemperature.innerHTML = temperature;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = capitalize(description);

  let tempMax = document.querySelector("#max");
  let maximum = `${Math.round(response.data.main.temp_max)}°`;
  tempMax.innerHTML = maximum;

  let tempMin = document.querySelector("#min");
  let minimum = `${Math.round(response.data.main.temp_min)}°`;
  tempMin.innerHTML = minimum;

  return response;
}

let yourTemperature = document.querySelector("#current-temperature");

function showCurrentLocation(response) {
  let loc = response.data.name;
  yourLocation.innerHTML = loc;
}
let yourLocation = document.querySelector("#city");

//Units converting
function convert(event) {
  event.preventDefault();
  let tempF = document.querySelector("#current-temperature");
  let cityInput = document.querySelector("#location");
  let cityName = cityInput.value;
  let units = `imperial`;
  let apiKey = `c03834cf1345f1efcc7cef1a8984136b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showResponse);
  let searchForm = document.querySelector("#search-form");
  tempF.addEventListener("click", convertBack);

  buttonF.innerHTML = "<b>°F</b>";
  buttonC.innerHTML = "°C";
}

let buttonF = document.querySelector("#f");
buttonF.addEventListener("click", convert);

function convertBack(event) {
  event.preventDefault();
  let tempC = document.querySelector("#current-temperature");
  let cityInput = document.querySelector("#location");
  let cityName = cityInput.value;
  let units = `metric`;
  let apiKey = `c03834cf1345f1efcc7cef1a8984136b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showResponse);
  let searchForm = document.querySelector("#search-form");
  tempC.addEventListener("click", convert);
  buttonC.innerHTML = "<b>°C</b>";
  buttonF.innerHTML = "°F";
}
let buttonC = document.querySelector("#c");
buttonC.addEventListener("click", convertBack);

//if F pressed - call API with units = imperial,
//else - call API with units = metric
function getUnits(event) {
  event.preventDefault();
  let units = `imperial`;
}
