// 1. SELECT ELEMENTS
const destContainer = document.getElementById('dest-grid');
const filterButtons = document.querySelectorAll('.filter-btn');
const jsonUrl = 'data/destinations.json';

// Store data globally so we can filter it later without re-fetching
let allDestinations = [];

// 2. FETCH DATA
async function getDestinations() {
    try {
        const response = await fetch('data/destination.json');
        allDestinations = await response.json(); // Save data to variable
        displayDestinations(allDestinations); // Show all initially
    } catch (error) {
        console.error("Error fetching destinations:", error);
    }
}

// 3. BUILD HTML
const displayDestinations = (destinations) => {
    destContainer.innerHTML = ""; // Clear existing cards

    destinations.forEach((dest) => {
        // Create Card Div
        let card = document.createElement('div');
        card.classList.add('dest-card', dest.category); // Add category class (e.g. 'water')

        // Fill HTML
        card.innerHTML = `
            <div class="badge">${dest.badge}</div>
            <img src="${dest.image}" alt="${dest.name}" loading="lazy">
            <div class="card-info">
                <h3>${dest.name}</h3>
                <p class="location"><i class="fa-solid fa-location-dot"></i> ${dest.location}</p>
                <div class="hidden-details">
                    <p>Price: ${dest.price}</p>
                    <button onclick="alert('Booking for ${dest.name} coming soon!')">Book Now</button>
                </div>
            </div>
        `;

        destContainer.appendChild(card);
    });
}

// 4. FILTER LOGIC
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // A. Handle Active Class on Buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // B. Filter Data
        const category = btn.getAttribute('data-filter'); // We need to add this to HTML
        
        if (category === 'all') {
            displayDestinations(allDestinations);
        } else {
            // Create a new array with only matching items
            const filtered = allDestinations.filter(item => item.category === category);
            displayDestinations(filtered);
        }
    });
});

// Run it!
getDestinations();

