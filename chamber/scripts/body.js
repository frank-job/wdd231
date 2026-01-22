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


if (gridBtn) {
    gridBtn.addEventListener('click', () => {
        if (membersContainer) {
            membersContainer.classList.add('grid-view');
            membersContainer.classList.remove('list-view');
        }
    });
}

if (listBtn) {
    listBtn.addEventListener('click', () => {
        if (membersContainer) {
            membersContainer.classList.add('list-view');
            membersContainer.classList.remove('grid-view');
        }
    });
}


getMembers();


const yearSpan = document.querySelector('#year');
const lastModifiedSpan = document.querySelector('#lastModified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}




const displaySpotlights = (members) => {
    spotlightContainer.innerHTML = "";

    members.forEach((member) => {
        let card = document.createElement('div');
        card.classList.add('spotlight-card');
        let name = document.createElement('h3');
        let logo = document.createElement('img');
        let phone = document.createElement('p');
        let website = document.createElement('a');
        let level = document.createElement('p');


        name.textContent = member.name;

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('width', '100');
        logo.setAttribute('height', 'auto');

        phone.textContent = member.phone;

        website.textContent = "Visit Website";
        website.setAttribute('href', member.website);


        level.classList.add('badge');
        if (member.membershipLevel === 3) {
            level.textContent = "Gold Member";
            level.style.backgroundColor = "gold";
            level.style.color = "black";
        } else {
            level.textContent = "Silver Member";
            level.style.backgroundColor = "silver";
            level.style.color = "black";
        }


        card.appendChild(name);
        card.appendChild(logo);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        spotlightContainer.appendChild(card);
    });
}