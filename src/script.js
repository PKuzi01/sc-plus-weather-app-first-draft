//Dark theme button
function changeTheme () {
    let body = document.querySelector("body");
    body.classList.toggle("darkTheme");
}

let themeButton = document.querySelector(".themeButton");
themeButton.addEventListener('click', changeTheme);

//search engine
function showWeather(response) {
    console.log(response.data);
    let place = document.querySelector("#place");
    place.innerHTML = `${response.data.name}`;

    let temp = document.querySelector("#temp");
    temp.innerHTML = `${Math.round(response.data.main.temp_max)}° / ${Math.round(response.data.main.temp_min)}°`;

    let description = document.querySelector("#description");
    description.innerHTML = `${response.data.weather[0].main}`;

    let feelsLike = document.querySelector("#feels-like");
    feelsLike.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°`;

    let wind = document.querySelector("#wind-speed");
    wind.innerHTML = `Wind speed: ${response.data.wind.speed} m/s`;

    let humid = document.querySelector("#humidity");
    humid.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
}

function showFiveDay(response) {
    console.log(response.data);
    
    let fiveDay1 = document.querySelector("#five-day-1");
    fiveDay1.innerHTML = `${Math.round(response.data.list[1].main.temp_max)}° / ${Math.round(response.data.list[1].main.temp_min)}°`;

    let fiveDay2 = document.querySelector("#five-day-2");
    fiveDay2.innerHTML = `${Math.round(response.data.list[2].main.temp_max)}° / ${Math.round(response.data.list[2].main.temp_min)}°`;

    let fiveDay3 = document.querySelector("#five-day-3");
    fiveDay3.innerHTML = `${Math.round(response.data.list[3].main.temp_max)}° / ${Math.round(response.data.list[3].main.temp_min)}°`; 

    let fiveDay4 = document.querySelector("#five-day-4");
    fiveDay4.innerHTML = `${Math.round(response.data.list[4].main.temp_max)}° / ${Math.round(response.data.list[4].main.temp_min)}°`;

    let fiveDay5 = document.querySelector("#five-day-5");
    fiveDay5.innerHTML = `${Math.round(response.data.list[5].main.temp_max)}° / ${Math.round(response.data.list[5].main.temp_min)}°`;
}

function searchCity(city) {
    let apiKey = `c1c9974635fb415694941c1404080104`;
    
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
    
    let apiUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlTwo).then(showFiveDay);
}

function searchSubmit (event) {
    event.preventDefault();
    let city = document.querySelector("#search-place").value;
    searchCity(city);
}
let search = document.querySelector("#search-input");
search.addEventListener("submit", searchSubmit);

function searchLocation(position) {
    let apiKey = `c1c9974635fb415694941c1404080104`;

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);

    let apiUrlTwo = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrlTwo).then(showFiveDay);
}

function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Johannesburg");

//Day and time
function currentDateTime() {
    let now = new Date();
    
    let p = document.querySelector("#date");

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let day = days[now.getDay()];

    let hour = now.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }

    let minute = now.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    p.innerHTML = `${day}, ${hour}:${minute}`;
}
currentDateTime();

//Temp converter
