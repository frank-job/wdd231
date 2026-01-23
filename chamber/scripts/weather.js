
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');




const apiKey = '4e697b108c18e769b5c8deb14e8a8d8b';
const lat = '0.43902';
const lon = '0.43902'; 

const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
    if (!currentTemp || !weatherIcon || !captionDesc) return; 

    try {
        const response = await fetch(apiurl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
            document.getElementById('city-name').textContent = data.name;
          
            const descElement = document.getElementById('description');
            if (descElement) {
                descElement.textContent = data.weather[0].description;
            }

        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}


function displayResults(data) {
    currentTemp.innerHTML = Math.round(data.main.temp);
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let desc = data.weather[0].description;

    weatherIcon.setAttribute('src', iconsrc);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.textContent = desc.toUpperCase();
}

apiFetch();