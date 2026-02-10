document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('dest-grid');
    const modal = document.getElementById('booking-modal');
    const destinationNameSpan = document.getElementById('destination-name');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    let allDestinations = []; // Global variable to store fetched data

    // --- 1. CALL THE "API" (GET DATA) ---
    async function loadDestinations() {
        try {
            const response = await fetch('data/destination.json');
                // const response = await fetch('data/slider.json');
            allDestinations = await response.json();
            renderCards(allDestinations);
        } catch (error) {
            console.error("Error fetching data:", error);
            grid.innerHTML = "<p>Sorry, we couldn't load the tours right now.</p>";
        }
    }

    // --- 2. RENDER CARDS TO HTML ---
    function renderCards(data) {
        grid.innerHTML = '';
        data.forEach(dest => {
            const card = document.createElement('div');
            card.className = 'dest-card';
            card.innerHTML = `
                <img src="${dest.image}" alt="${dest.name}">
                <div class="dest-card-content">
                    <span class="category-tag">${dest.category}</span>
                    <h3>${dest.name}</h3>
                    <p>📍 ${dest.location}</p>
                    <button class="book-btn" onclick="openBooking('${dest.name}')">Book Now</button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // --- 3. FILTER LOGIC ---
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Toggle
            document.querySelector('.filter-btn.active').classList.remove('active');
            btn.classList.add('active');

            // Filtering
            const category = btn.getAttribute('data-filter');
            const filtered = category === 'all' 
                ? allDestinations 
                : allDestinations.filter(d => d.category === category);
            
            renderCards(filtered);
        });
    });

    // --- 4. MODAL & LOCAL STORAGE (POST DATA) ---
    window.openBooking = (name) => {
        destinationNameSpan.innerText = name;
        modal.showModal();
    };

    const bookingForm = modal.querySelector('form');
    bookingForm.addEventListener('submit', (e) => {
        // Collect info
        const userName = bookingForm.querySelector('input[type="text"]').value;
        const userEmail = bookingForm.querySelector('input[type="email"]').value;
        const tripName = destinationNameSpan.innerText;

        const bookingObject = {
            customer: userName,
            email: userEmail,
            trip: tripName,
            date: new Date().toLocaleDateString()
        };

        // Save to Local Storage
        localStorage.setItem('lastBooking', JSON.stringify(bookingObject));

        // Close modal and show "Congrats" alert
        modal.close();
        alert(`Congratulations ${userName}! We saved your booking for ${tripName} to Local Storage.`);
    });

    document.getElementById('close-modal').onclick = () => modal.close();

    // Start the app
    loadDestinations();
});