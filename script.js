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
async function showWeather(){

    try{

        const searchLocation = document.getElementById('search-box').value
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${apiKey}&units=metric`)
        if (!response.ok){
            throw new Error('Could not fetch resource');
        }
        const data = await response.json();
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const location = data.name;
        const wind = data.wind.speed

        const weatherInfo = document.getElementById('weather-info');
        weatherInfo.innerHTML = `Location: ${location}<br>
                                 Weather: ${weatherDescription}<br>
                                 Temperature: ${temperature}°C<br>
                                 Wind: ${wind} mph`;
        console.log(data);

    }
    catch(error){
        console.error(error)
    }
}    
