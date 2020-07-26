//Location search
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", callApi);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-sm day">
              ${formatHours(forecast.dt * 1000)} <br />
              <img
                src="https://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                class="cloudsunny"
              />
              <b>${Math.round(forecast.main.temp_max)}°C</b><br />${Math.round(
      forecast.main.temp_min
    )}°C
            </div>`;
  }
}

function searchLocation(cityName) {
  let units = `metric`;
  let apiKey = `c03834cf1345f1efcc7cef1a8984136b`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showResponse);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayForecast);
}

function callApi(event) {
  event.preventDefault();
  let cityName = document.querySelector("#location").value;
  searchLocation(cityName);
  searchForm.reset();
}

//Temperature in given location
function showResponse(response) {
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let cityElement = document.querySelector("#city");
  let city = response.data.name;
  cityElement.innerHTML = city;

  cTemp = response.data.main.temp;
  let tempElement = document.querySelector("#current-temperature");
  let temperature = Math.round(cTemp);
  tempElement.innerHTML = `${temperature}`;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;
  weatherDescription.innerHTML = description;

  maxCTemp = response.data.main.temp_max;
  let maxTempElement = document.querySelector("#max");
  let maxTemp = `${Math.round(maxCTemp)}°`;
  maxTempElement.innerHTML = `${maxTemp}`;

  minCTemp = response.data.main.temp_min;
  let minTempElement = document.querySelector("#min");
  let minTemp = `${Math.round(minCTemp)}°`;
  minTempElement.innerHTML = `${minTemp}`;

  buttonF.classList.remove("active");
  buttonC.classList.add("active");
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
  let date = `${currentHours}:${currentMinutes} ${day} ${currentDate} ${month}`;
  return date;
}

let dateLive = document.querySelector("#date");
dateLive.innerHTML = formatDate();

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let currentHours = now.getHours();
  currentHours = ("0" + currentHours).slice(-2);
  let currentMinutes = now.getMinutes();
  currentMinutes = ("0" + currentMinutes).slice(-2);
  return `${currentHours}:${currentMinutes}`;
}

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

  console.log(`${apiUrl}&appid=${apiKey}`);

  buttonF.classList.remove("active");
  buttonC.classList.add("active");
}
//Display temperature
function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  yourTemperature.innerHTML = temperature;

  let weatherDescription = document.querySelector("#weather-description");
  let description = response.data.weather[0].description;

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

let buttonF = document.querySelector("#f");
buttonF.addEventListener("click", displayFTemp);

let buttonC = document.querySelector("#c");
buttonC.addEventListener("click", displayCTemp);

function displayFTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  let maxTempElement = document.querySelector("#max");
  let minTempElement = document.querySelector("#min");

  buttonF.classList.add("active");
  buttonC.classList.remove("active");

  let fTemp = (cTemp * 9) / 5 + 32;
  let maxFTemp = (maxCTemp * 9) / 5 + 32;
  let minFTemp = (minCTemp * 9) / 5 + 32;

  tempElement.innerHTML = Math.round(fTemp);
  maxTempElement.innerHTML = `${Math.round(maxFTemp)}°`;
  minTempElement.innerHTML = `${Math.round(minFTemp)}°`;
}

function displayCTemp(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temperature");
  let maxTempElement = document.querySelector("#max");
  let minTempElement = document.querySelector("#min");

  buttonF.classList.remove("active");
  buttonC.classList.add("active");

  tempElement.innerHTML = Math.round(cTemp);
  maxTempElement.innerHTML = `${Math.round(maxCTemp)}°`;
  minTempElement.innerHTML = `${Math.round(minCTemp)}°`;
}

//On load
let cTemp = null;
let maxCTemp = null;
let minCTemp = null;
searchLocation("New York");
