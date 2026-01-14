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

// 1. SELECT ELEMENTS
const membersContainer = document.querySelector('#members-container');
const gridBtn = document.querySelector('#grid-btn');
const listBtn = document.querySelector('#list-btn');
const url = 'data/members.json';

// 2. FETCH DATA
async function getMembers() {
    try {
        const response = await fetch('data/members.json');
        const data = await response.json();
        displayMembers(data.companies);
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

// 4. TOGGLE BUTTONS
gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid-view');
    membersContainer.classList.remove('list-view');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list-view');
    membersContainer.classList.remove('grid-view');
});

// Start
getMembers();


const yearSpan = document.querySelector('#year');
const lastModifiedSpan = document.querySelector('#lastModified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}