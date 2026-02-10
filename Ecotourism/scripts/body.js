const slider = document.querySelector('.slider');
let currentIndex = 0;

async function fetchImages() {
    try {
        const response = await fetch('data/slider.json');
        const data = await response.json();
        
        // We call the next functions here inside the "try"
        displayImage(data);
        showSlides(); 
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImage(imageData) {
    imageData.forEach(image => {
        const slideDiv = document.createElement('div');
        slideDiv.classList.add('slide');
        
        slideDiv.innerHTML = `
            <img src="${image.img}" alt="${image.title}" loading="lazy">
            <div class="text-overlay">
                <h1>${image.title}</h1>
                <p>${image.desc}</p> 
                <a href="${image.link}" class="learn-more">${image.btnText}</a>
            </div>
        `;
        slider.appendChild(slideDiv);
    });
}

function showSlides() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;

    slides.forEach(s => s.style.display = "none");
    currentIndex++;
    if (currentIndex > slides.length) { currentIndex = 1; }
    
    slides[currentIndex - 1].style.display = "block";
    setTimeout(showSlides, 5000); 
}

// Start the process
fetchImages();










const yearSpan = document.querySelector('#year');
const lastModifiedSpan = document.querySelector('#lastModified');

if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

if (lastModifiedSpan) {
    lastModifiedSpan.textContent = document.lastModified;
}

















const discoverContainer = document.querySelector('.discover-info');

async function getdiscoverInfo() {
    try {
        const response = await fetch('data/discover.json');
        const data = await response.json();
        
        // We call the next functions here inside the "try"
        displaydiscoverInfo(data);
    if (typeof showSlides === "function") showSlides();
    } catch (error) {
        console.error('Error fetching images:', error);
    }

}

const displaydiscoverInfo = (datalist) => {

    discoverContainer.innerHTML = "";
    datalist.forEach(item => { 
        let card = document.createElement('section');
        card.classList.add('tour-card');

        let place = document.createElement('h3');
        let image = document.createElement('img');
        let description = document.createElement('p');
        let typeLabel = document.createElement('span');
        

        place.textContent = item.place;
        description.textContent = item.description;
        typeLabel.textContent = item.type;
        typeLabel.classList.add('type-badge');

        image.setAttribute('src', item.image);
        image.setAttribute('alt', item.place);
        image.setAttribute('loading', 'lazy');

        card.appendChild(place);
        card.appendChild(image);
        card.appendChild(description);
        card.appendChild(typeLabel);
        discoverContainer.appendChild(card);
        // discoverContainer.appendChild(card);

    
     });
}
getdiscoverInfo();
