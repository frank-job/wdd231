import { businesses } from '../data/uganda-business.mjs';

const businessContainer = document.getElementById('business-container');

const displayBusinesses = (businessesList) => {
    if (!businessContainer) return;
    businessContainer.innerHTML = '';

    businessesList.forEach((business) => {
      
        let card = document.createElement('div');
        card.classList.add('business-card');

        let title = document.createElement('h2'); 
        title.textContent = business.name;

        let figure = document.createElement('figure');
        let img = document.createElement('img');
        img.setAttribute('src', business.image);
        img.setAttribute('alt', business.name);
        img.setAttribute('loading', 'lazy');
        figure.appendChild(img);

        let address = document.createElement('address'); 
        address.textContent = business.address;

        let description = document.createElement('p'); 
        description.textContent = business.description;

        let button = document.createElement('button'); 
        button.textContent = "Learn More";

      
        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        businessContainer.appendChild(card);
    });
}

displayBusinesses(businesses);





const vistDisplay = document.getElementById('visit-message');

const now = new Date();

let lastVisit = window.localStorage.getItem('lastVisit');

if (!lastVisit) {
     vistDisplay.textContent = "Welcome! Let us know if you have any questions.";
} else {
    const diff = now -lastVisit;
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
}
if (days < 1) {
    vistDisplay.textContent = "Welcome back! You last visited today.";
} else{
    const dayText = days === 1 ? "day" : "days";
    vistDisplay.textContent = `Welcome back! You last visited ${days} ${dayText} ago.`;
}
window.localStorage.setItem('lastVisit', now);