const body = document.querySelector('body'),
sidebar = body.querySelector('nav'),
toggle = body.querySelector(".toggle"),
searchBtn = body.querySelector(".search-box"),
modeSwitch = body.querySelector(".toggle-switch"),
modeText = body.querySelector(".mode-text");


toggle.addEventListener("click" , () =>{
sidebar.classList.toggle("close");
})

// searchBtn.addEventListener("click" , () =>{
// sidebar.classList.remove("close");
// })

modeSwitch.addEventListener("click" , () =>{
body.classList.toggle("dark");

if(body.classList.contains("dark")){
modeText.innerText = "Light mode";
}else{
modeText.innerText = "Dark mode";

}
});

document.addEventListener('DOMContentLoaded', () => {
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
});
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';
async function showWeather() {
    try {
        const searchLocation = document.getElementById('search-box').value.trim();
        if (!searchLocation) {
            throw new Error('Please enter a location.');
        }

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=metric`);

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

