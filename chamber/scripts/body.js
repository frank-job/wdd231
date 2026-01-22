const hamButton = document.querySelector('#hamburgerBtn');
const navList = document.querySelector('#primaryNav');


hamButton.addEventListener('click', () => {
    

    navList.classList.toggle('open');
    

    hamButton.classList.toggle('open');

   
    const icon = hamButton.querySelector('span');
    
    if (navList.classList.contains('open')) {
       
        icon.textContent = 'X';
    } else {

        icon.innerHTML = '&#9776;';
    }
});


const membersContainer = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const spotlightContainer = document.querySelector('#spotlight-container');
const url = 'data/members.json';


async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (membersContainer) {
            displayMembers(data.companies);
        }

        if (spotlightContainer) {
            const specialMembers = data.companies.filter(member => member.membershipLevel >= 2);
            const shuffled = specialMembers.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            displaySpotlights(selected);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


const displayMembers = (members) => {
    members.forEach((member) => {
       
        let card = document.createElement('section');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let image = document.createElement('img');
        let level = document.createElement('div');

       
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        website.textContent = member.website;
        website.setAttribute('href', member.website);
        
 




        image.setAttribute('src', member.image);
        image.setAttribute('alt', `Logo of ${member.name}`);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('width', '150');
        image.setAttribute('height', 'auto');

    
        card.setAttribute('class', `member-card level-${member.membershipLevel}`);

       
        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

      
        membersContainer.appendChild(card);
    });
}


gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
});


getMembers();


const yearSpan = document.querySelector('#year');
const lastModifiedSpan = document.querySelector('#lastModified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}




















// --- 1. WEATHER API ---
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');

// Replace with your actual OpenWeatherMap API Key 0.4684747548082247, 33.217841734946624
const apiKey = '4e697b108c18e769b5c8deb14e8a8d8b';
const lat = '0.43902'; // Latitude for Timbuktu    0.4684467860551936, 33.21791869628013
const lon = '0.43902'; // Longitude for Timbuktu

const apiurl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

async function apiFetch() {
  try {
    const response = await fetch(apiurl);
    if (response.ok) {
      const data = await response.json();
      displayResults(data);
      document.getElementById('city-name').textContent = data.name;
    //   document.getElementById('city').textContent = data.name;

      document.getElementById('description').textContent = data.weather[0].description;
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











// --- 2. SPOTLIGHT MEMBERS ---

const displaySpotlights = (members) => {
    spotlightContainer.innerHTML = ""; // Clear existing

    members.forEach((member) => {
        // Create Elements
        let card = document.createElement('div');
        card.classList.add('spotlight-card');

        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let level = document.createElement('p');

        // Add Content
        name.textContent = member.name;
        
        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('width', '100');
        logo.setAttribute('height', 'auto');

        phone.textContent = member.phone;
        
        website.textContent = "Visit Website";
        website.setAttribute('href', member.website);

        // Set membership level text
        level.classList.add('badge');
        if(member.membershipLevel === 3) {
            level.textContent = "Gold Member";
            level.style.backgroundColor = "gold";
            level.style.color = "black";
        } else {
            level.textContent = "Silver Member";
            level.style.backgroundColor = "silver";
            level.style.color = "black";
        }

        // Append
        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        spotlightContainer.appendChild(card);
    });
}