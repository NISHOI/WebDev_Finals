document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const sidebar = body.querySelector('nav');
    const toggle = body.querySelector(".toggle");
    const modeSwitch = body.querySelector(".toggle-switch");
    const modeText = body.querySelector(".mode-text");

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("close");
    });

    const forecastCards = document.querySelectorAll('.forecast');
    const newsCards = document.querySelectorAll('.news-card');
    const about = document.querySelectorAll('.about-container')
    const memberCards = document.querySelectorAll('.members')
   
    modeSwitch.addEventListener("click", () => {
        body.classList.toggle("dark");
        
        forecastCards.forEach(card => {
            card.classList.toggle("dark");
        });
    
        newsCards.forEach(card => {
            card.classList.toggle("dark");
        });

        memberCards.forEach(member => {
            member.classList.toggle('dark')
        })
        
        if (about.classList.contains("dark")) {
            modeText.innerText = "Light mode";
        } else {
            modeText.innerText = "Dark mode";
        }

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


        if (pageId === 3) {
            initializeMap(); 
        }
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
        });
    });

    showPage(1);
    // ---------------------------------------------------------------------------------------------------------------//
    let ws;

    function initializeWebSocket() {
        ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            console.log('Connected to WebSocket server');
            ws.send('top news ph');
        };

        ws.onmessage = event => {
            const articles = JSON.parse(event.data);
            displayNews(articles);
        };

        ws.onerror = error => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };
    }

    function displayNews(articles) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        if (articles.error) {
            alert('Error fetching news: ' + articles.error);
            return;
        }

        const validArticles = articles.filter(article => article.urlToImage && article.description);

        if (validArticles.length === 0) {
            alert('No articles found for this search.');
            return;
        }

        const fragment = document.createDocumentFragment();
        validArticles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');

            const newsImage = document.createElement('img');
            newsImage.src = article.urlToImage;
            newsImage.alt = article.title;
            newsCard.appendChild(newsImage);

            const newsTitle = document.createElement('h3');
            newsTitle.textContent = article.title;
            newsCard.appendChild(newsTitle);

            const newsDescription = document.createElement('p');
            newsDescription.textContent = article.description;
            newsCard.appendChild(newsDescription);

            const newsLink = document.createElement('a');
            newsLink.href = article.url;
            newsLink.textContent = 'Read More';
            newsLink.target = '_blank';
            newsCard.appendChild(newsLink);

            fragment.appendChild(newsCard);
        });

        newsContainer.appendChild(fragment);
    }

    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('news_input');

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const searchQuery = searchInput.value.trim();
        if (searchQuery) {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(searchQuery);
            } else {
                alert('WebSocket connection is not open');
            }
        }
    });

    initializeWebSocket();
    // ---------------------------------------------------------------------------------------------------------------//

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
            const temperature = data.main.temp;
            const location = data.name;
            const wind = data.wind.speed;
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    
            const weatherInfo = document.getElementById('weather-info');
            
            weatherInfo.innerHTML = `<img src="img/location-icon.png" alt="Location icon" style="width: 40px; vertical-align: middle; margin-right: 5px;">
                                    <strong>Location:</strong> ${location}<br>
                                     <img src="${weatherIcon}" alt="Weather icon" style="width: 40px; vertical-align: middle; margin-right: 5px;">
                                     <strong>Weather:</strong> ${weatherDescription}<br>
                                     <img src="img/temperature-icon.png" alt="Temperature icon" style="width: 40px; vertical-align: middle; margin-right: 5px;">
                                     <strong>Temperature:</strong> ${temperature}°C<br>
                                     <img src="img/wind-icon.png" alt="Wind icon" style="width: 40px; vertical-align: middle; margin-right: 5px;">
                                     <strong>Wind:</strong> ${wind} m/s`;
            weatherInfo.style.display = 'block';
            // console.log(data);
    
        } catch (error) {
            const weatherInfo = document.getElementById('weather-info');
            weatherInfo.innerHTML = `<div style="padding: 20px; margin-top: 10px; background-color: red; color: white; border-radius: 10px; font-size: 18px; max-width: 300px; text-align: center;">
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
                    forecastEl.innerHTML = `<div style="font-size: 20px; font-family: Arial, sans-serif;">
                        <p style="margin: 0; font-weight: bold;">${day}</p>
                        <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt="Weather icon" style="display: block; margin: 10px auto; filter: drop-shadow(5px 5px 20px rgba(0, 0, 2, 2));">
                        <p style="margin: 5px 0;">Wind: <span style="font-weight: bold;">${windSpeed} m/s</span></p>
                        <p style="margin: 5px 0; text-transform: capitalize;">${weatherDescription}</p>
                        <p style="margin: 5px 0;">Temperature: <span style="font-weight: bold;">${temp} °C</span></p>
                        </div>`;

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




    // ---------------------------------------------------------------------------------------------------------------//


    async function initializeMap() {
        const map = L.map('map').setView([12.8797, 121.774], 6);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const createTileLayer = (layerName) => L.tileLayer(
            `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${apiKey}`, {
                attribution: '&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a>',
                opacity: 0.5,
                errorTileUrl: 'https://via.placeholder.com/256?text=Tile+Not+Available'
            }
        );

        const tempLayer = createTileLayer('temp_new');
        const precipLayer = createTileLayer('precipitation_new');
        const windLayer = createTileLayer('wind_new');
        const cloudsLayer = createTileLayer('clouds_new');

        const baseMaps = {
            "Temperature": tempLayer,
            "Precipitation": precipLayer,
            "Wind": windLayer,
            "Clouds": cloudsLayer
        };

        L.control.layers(baseMaps).addTo(map);

        tempLayer.addTo(map);
    }

    fivedayForecast('manila');
    showWeather('manila');
    initializeMap();
});
