const inputBox = document.querySelector('.inputbox');
const searchBt = document.getElementById('searchBt');
const weatherImg = document.querySelector('.weatherImg');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const location_notfound = document.querySelector('.location_notfound');
const weatherBody = document.querySelector('.weatherBody');

async function checkWeather(city) {
    const apiKey = "6ee6580e2b29efb1d4f389459b1da823";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weatherData = await fetch(`${apiUrl}`).then(response => response.json());

    if (weatherData.cod === `404`) {
        location_notfound.style.display = "flex";
        weatherBody.style.display = "none";
        return;
    }
    location_notfound.style.display = "none";
    weatherBody.style.display = "flex";
    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}°C`;
    description.innerHTML = `${weatherData.weather[0].description}`;
    humidity.innerHTML = `${weatherData.main.humidity}%`;
    windSpeed.innerHTML = `${weatherData.wind.speed}km/hr`;
    console.log(weatherData);

    switch (weatherData.weather[0].main) {
        case 'Clouds':
            weatherImg.src = "image/cloud.png";
            break;
        case 'Clear':
            weatherImg.src = "image/clear.png";
            break;
        case 'Rain':
            weatherImg.src = "image/rain.png";
            break;
        case 'Mist':
            weatherImg.src = "image/mist.png";
            break;
        case 'Storm':
            weatherImg.src = "image/storm.png";
            break;
    }
}
searchBt.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
