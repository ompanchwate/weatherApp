const API_KEY = `3265874a2c77ae4a04bb96236a642d2f`;
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");


navigator.geolocation.getCurrentPosition(function (position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat, lon);

    getWeatherByLocation(lat, lon);
});

// We are fetching the URL that's why we use async (asynchronous)
const getWeatherByLocation = async (lat, lon) => {
    weather.innerHTML = `<h1 class="text-2xl font-bold text-white">Loading...<h1>`
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url); //JavaScript should wait for the response to be fetch that's why we use await
    const data = await response.json();  // Fetch the data in JSON format
    console.log(data);
    return showWeather(data);  
}


// Submitting the form
form.addEventListener('submit', function (event) {
    getWeather(search.value); //Call getWeather()
    event.preventDefault(); //Do not reload the page after submiting the form
});

// We are fetching the URL that's why we use async (asynchronous)
const getWeather = async (city) => {
    weather.innerHTML = `<h1 class="text-2xl font-bold text-white">Loading...<h1>`
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url); //JavaScript should wait for the response to be fetch that's why we use await

    const data = await response.json();  // Fetch the data in JSON format
    console.log(data);
    return showWeather(data, city);
}

const showWeather = (data, city) => {
    if (data.cod == "404") {
        weather.innerHTML = `<h1 class="text-4xl font-bold text-white">City not found<h1>`;
    }
    else {
        weather.innerHTML = ` <h1 class="text-4xl font-bold text-white">${data.name}<h1>
        <div class="flex items-center justify-center">
            <div>
                <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
            </div>

            <div>
                <h1 class="text-white font-medium text-3xl">${data.main.temp} °C</h1>
                <h2 class="text-white font-medium text-xl">${data.weather[0].main}</h2>
            </div>
        </div>`;
    }
};




// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

// const IMG_URL = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;