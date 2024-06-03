document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const sidebar = body.querySelector('nav');
    const toggle = body.querySelector(".toggle");
    const searchBtn = body.querySelector(".search-box");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";
        }
    });

    const menuLinks = document.querySelectorAll('.menu-links a');
    const sections = document.querySelectorAll('section.home');

    function showPage(pageId) {
        sections.forEach(section => {
            section.style.display = 'none';
        });
        document.getElementById(`page${pageId}`).style.display = 'block';
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    showPage(1);

    const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

    async function showWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Location not found. Please try another location.');
                } else if (response.status === 401) {
                    throw new Error('Invalid API key. Please check your API key.');
                } else {
                    throw new Error('Could not fetch resource. Please try again later.');
                }
            }

            const data = await response.json();
            const weatherDescription = data.weather[0].description;
            const temperature = data.main.temp;Manila
            const location = data.name;
            const wind = data.wind.speed;

            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<strong>Location:</strong> ${location}<br>
                                    <strong>Weather:</strong> ${weatherDescription}<br>
                                    <strong>Temperature:</strong> ${temperature}°C<br>
                                    <strong>Wind:</strong> ${wind} mph`;
            weatherInfo.style.display = 'block';
            console.log(data);

        } catch (error) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<div style="padding: 20px; margin-top: 10px; background-color: red; color: white; border-radius: 10px; font-size: 18px; max-width: 300px; justify-content='center' ">
                                        <strong>Error:</strong> ${error.message}
                                     </div>`;
            weatherInfo.style.display = 'block';
            console.error(error);
        }
    }

    async function fivedayForecast(city) {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                const forecastContainer = document.querySelector('.forecast-container');
                forecastContainer.innerHTML = '';

                for (let i = 0; i < data.list.length; i += 8) {
                    const forecast = data.list[i];
                    const date = new Date(forecast.dt_txt);
                    const day = date.toLocaleDateString('en-US', { weekday: 'long' });
                    const temp = forecast.main.temp;
                    const windSpeed = forecast.wind.speed;
                    const weatherDescription = forecast.weather[0].description;

                    const forecastEl = document.createElement('div');
                    forecastEl.classList.add('forecast');
                    forecastEl.innerHTML = `
                        <p>${day}</p>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon">
                        <p>Wind: ${windSpeed} m/s</p>
                        <p>${weatherDescription}</p>
                        <p>Temperature: ${temp} °C</p>
                    `;

                    forecastContainer.appendChild(forecastEl);
                }
            } else {
                alert('City not found');
            }
        } catch (error) {
            console.error('Error fetching the weather data', error);
        }
    }

    document.getElementById('search').addEventListener('click', () => {
        const city = document.getElementById('search-box').value;
        fivedayForecast(city);
        showWeather(city);
    });

    // Initialize with Mabalacat weather and forecast
    fivedayForecast('Manila');
    showWeather('Manila');
});
